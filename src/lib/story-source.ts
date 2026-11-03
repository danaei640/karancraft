import fs from 'node:fs';
import path from 'node:path';

export interface ExtractedStorySource {
  id: string;
  /** Full standalone React component code with filtered imports */
  fullCode: string;
  /** Concise JSX / body snippet without imports */
  jsx: string;
  /** Raw JSX/body template preserving {...args} or {...props} for live Canvas prop injection */
  rawTemplate: string;
  /** Filtered import block used by this story */
  imports: string;
  /** Whether the story is purely args-based (no custom render function) */
  isArgsOnly: boolean;
}

const STORIES_DIR = path.join(process.cwd(), 'src', 'stories', 'components');

function normalizeKey(str: string): string {
  return str.replace(/\.stories\.tsx$/, '').replace(/[-_]/g, '').toLowerCase();
}

/**
 * Finds the matching closing delimiter (`}`, `)`, `]`) accounting for strings,
 * template literals, and comments.
 */
function findMatchingDelimiter(
  source: string,
  openIndex: number,
  openChar: string,
  closeChar: string
): number {
  let depth = 0;
  let i = openIndex;
  const len = source.length;

  while (i < len) {
    const ch = source[i];
    const next = source[i + 1];

    // Line comment
    if (ch === '/' && next === '/') {
      i += 2;
      while (i < len && source[i] !== '\n') i++;
      continue;
    }

    // Block comment
    if (ch === '/' && next === '*') {
      i += 2;
      while (i < len && !(source[i] === '*' && source[i + 1] === '/')) i++;
      i += 2;
      continue;
    }

    // Single or double quoted string
    if (ch === "'" || ch === '"') {
      const quote = ch;
      i++;
      while (i < len && source[i] !== quote) {
        if (source[i] === '\\') i++;
        i++;
      }
      i++;
      continue;
    }

    // Template literal
    if (ch === '`') {
      i++;
      while (i < len && source[i] !== '`') {
        if (source[i] === '\\') {
          i += 2;
          continue;
        }
        if (source[i] === '$' && source[i + 1] === '{') {
          const endExpr = findMatchingDelimiter(source, i + 1, '{', '}');
          if (endExpr !== -1) {
            i = endExpr + 1;
            continue;
          }
        }
        i++;
      }
      i++;
      continue;
    }

    if (ch === openChar) {
      depth++;
    } else if (ch === closeChar) {
      depth--;
      if (depth === 0) {
        return i;
      }
    }
    i++;
  }

  return -1;
}

function dedent(text: string): string {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  while (lines.length > 0 && lines[0].trim() === '') lines.shift();
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();

  if (lines.length === 0) return '';

  const nonEmptyLines = lines.filter((l) => l.trim().length > 0);
  const minIndent = nonEmptyLines.reduce((min, line) => {
    const match = line.match(/^[ \t]*/);
    const indent = match ? match[0].length : 0;
    return Math.min(min, indent);
  }, Infinity);

  if (!Number.isFinite(minIndent) || minIndent === 0) {
    return lines.join('\n');
  }

  return lines.map((line) => line.slice(minIndent)).join('\n');
}

function indentBlock(text: string, spaces: number): string {
  const pad = ' '.repeat(spaces);
  return text
    .split('\n')
    .map((line) => (line.trim().length > 0 ? pad + line : ''))
    .join('\n');
}

interface ParsedImport {
  raw: string;
  moduleSpecifier: string;
  defaultImport?: string;
  namespaceImport?: string;
  namedImports: string[];
  isTypeOnly: boolean;
}

function parseImports(source: string): ParsedImport[] {
  const results: ParsedImport[] = [];
  const importRegex = /^import\s+([\s\S]*?)\s+from\s+['"]([^'"]+)['"];?/gm;
  let match: RegExpExecArray | null;

  while ((match = importRegex.exec(source)) !== null) {
    const fullMatch = match[0];
    const clause = match[1].trim();
    const moduleSpecifier = match[2].trim();

    if (moduleSpecifier.startsWith('@storybook/')) {
      continue;
    }

    const isTypeOnly = clause.startsWith('type ');
    if (isTypeOnly) continue;

    const parsed: ParsedImport = {
      raw: fullMatch,
      moduleSpecifier,
      namedImports: [],
      isTypeOnly: false,
    };

    const nsMatch = clause.match(/^\*\s+as\s+(\w+)/);
    if (nsMatch) {
      parsed.namespaceImport = nsMatch[1];
      results.push(parsed);
      continue;
    }

    const braceStart = clause.indexOf('{');
    const braceEnd = clause.lastIndexOf('}');
    if (braceStart !== -1 && braceEnd !== -1) {
      const beforeBrace = clause.slice(0, braceStart).replace(/,/g, '').trim();
      if (beforeBrace) {
        parsed.defaultImport = beforeBrace;
      }
      const insideBraces = clause.slice(braceStart + 1, braceEnd);
      parsed.namedImports = insideBraces
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && !s.startsWith('type '));
    } else {
      parsed.defaultImport = clause;
    }

    results.push(parsed);
  }

  return results;
}

function filterImportsForCode(imports: ParsedImport[], code: string): string {
  const lines: string[] = [];

  for (const imp of imports) {
    if (imp.namespaceImport) {
      const regex = new RegExp(`\\b${imp.namespaceImport}\\b`);
      if (regex.test(code)) {
        lines.push(`import * as ${imp.namespaceImport} from '${imp.moduleSpecifier}';`);
      }
      continue;
    }

    const usedDefault =
      imp.defaultImport && new RegExp(`\\b${imp.defaultImport}\\b`).test(code)
        ? imp.defaultImport
        : undefined;

    const usedNamed = imp.namedImports.filter((spec) => {
      const localName = spec.includes(' as ')
        ? spec.split(' as ')[1].trim()
        : spec.trim();
      return new RegExp(`\\b${localName}\\b`).test(code);
    });

    if (!usedDefault && usedNamed.length === 0) continue;

    if (usedDefault && usedNamed.length > 0) {
      lines.push(
        `import ${usedDefault}, { ${usedNamed.join(', ')} } from '${imp.moduleSpecifier}';`
      );
    } else if (usedDefault) {
      lines.push(`import ${usedDefault} from '${imp.moduleSpecifier}';`);
    } else if (usedNamed.length > 3) {
      lines.push(
        `import {\n  ${usedNamed.join(',\n  ')},\n} from '${imp.moduleSpecifier}';`
      );
    } else {
      lines.push(`import { ${usedNamed.join(', ')} } from '${imp.moduleSpecifier}';`);
    }
  }

  return lines.join('\n');
}

interface TopLevelHelper {
  name: string;
  code: string;
}

function extractTopLevelHelpers(source: string): TopLevelHelper[] {
  const helpers: TopLevelHelper[] = [];

  // 1. Top-level function declarations: function Foo(...) { ... }
  const fnRegex = /^function\s+(\w+)\s*\([^)]*\)(?:\s*:[^{]+)?\s*\{/gm;
  let match: RegExpExecArray | null;
  while ((match = fnRegex.exec(source)) !== null) {
    const name = match[1];
    const openBrace = source.indexOf('{', match.index);
    const closeBrace = findMatchingDelimiter(source, openBrace, '{', '}');
    if (closeBrace !== -1) {
      helpers.push({
        name,
        code: source.slice(match.index, closeBrace + 1).trim(),
      });
    }
  }

  // 2. Top-level const declarations that are NOT `meta`
  const constRegex = /^const\s+(\w+)\s*(?::[^=]+)?=\s*/gm;
  while ((match = constRegex.exec(source)) !== null) {
    const name = match[1];
    if (name === 'meta') continue;
    const startIdx = match.index;
    const afterEq = match.index + match[0].length;
    const firstChar = source[afterEq];

    let endIdx = -1;
    if (firstChar === '[' || firstChar === '{' || firstChar === '(') {
      const closeChar =
        firstChar === '[' ? ']' : firstChar === '{' ? '}' : ')';
      const closePos = findMatchingDelimiter(source, afterEq, firstChar, closeChar);
      if (closePos !== -1) {
        endIdx = source.indexOf(';', closePos);
        if (endIdx === -1 || endIdx - closePos > 5) endIdx = closePos + 1;
        else endIdx += 1;
      }
    } else if (firstChar === '`') {
      const closePos = findMatchingDelimiter(source, afterEq, '`', '`');
      // For template literal, scan manually to closing backtick
      let i = afterEq + 1;
      while (i < source.length && source[i] !== '`') {
        if (source[i] === '\\') i++;
        i++;
      }
      if (i < source.length) {
        endIdx = source.indexOf(';', i);
        if (endIdx === -1 || endIdx - i > 5) endIdx = i + 1;
        else endIdx += 1;
      }
      void closePos;
    }

    if (endIdx !== -1) {
      helpers.push({
        name,
        code: source.slice(startIdx, endIdx).trim(),
      });
    }
  }

  return helpers;
}

function stripArgsSpread(jsx: string): string {
  // Remove {...args} or {...props} on their own line or inline
  return jsx
    .replace(/\n[ \t]*\{\.\.\.(?:args|props)\}[ \t]*(?=\n)/g, '')
    .replace(/\s*\{\.\.\.(?:args|props)\}/g, '');
}

function extractRenderFromStoryObject(storyObjCode: string): {
  body: string;
  isBlockBody: boolean;
} | null {
  const renderMatch = storyObjCode.match(
    /\brender\s*:\s*(?:async\s*)?(?:\([^)]*\)|[a-zA-Z0-9_$]+)\s*=>\s*/
  );

  if (!renderMatch || renderMatch.index === undefined) {
    return null;
  }

  const exprStart = renderMatch.index + renderMatch[0].length;
  const firstChar = storyObjCode[exprStart];

  if (firstChar === '(') {
    const closeParen = findMatchingDelimiter(storyObjCode, exprStart, '(', ')');
    if (closeParen !== -1) {
      const inner = storyObjCode.slice(exprStart + 1, closeParen);
      return {
        body: dedent(inner),
        isBlockBody: false,
      };
    }
  } else if (firstChar === '{') {
    const closeBrace = findMatchingDelimiter(storyObjCode, exprStart, '{', '}');
    if (closeBrace !== -1) {
      const inner = storyObjCode.slice(exprStart + 1, closeBrace);
      return {
        body: dedent(inner),
        isBlockBody: true,
      };
    }
  } else {
    // Unparenthesized single-line or JSX expression (e.g. render: (args) => <DefaultSliderDemo {...args} />)
    let i = exprStart;
    let depthParen = 0;
    let depthBrace = 0;
    let depthBracket = 0;
    while (i < storyObjCode.length) {
      const c = storyObjCode[i];
      if (c === '(') depthParen++;
      else if (c === ')') depthParen = Math.max(0, depthParen - 1);
      else if (c === '{') depthBrace++;
      else if (c === '}') {
        if (depthBrace === 0 && depthParen === 0 && depthBracket === 0) break;
        depthBrace = Math.max(0, depthBrace - 1);
      } else if (c === '[') depthBracket++;
      else if (c === ']') depthBracket = Math.max(0, depthBracket - 1);
      else if (
        c === ',' &&
        depthParen === 0 &&
        depthBrace === 0 &&
        depthBracket === 0
      ) {
        break;
      }
      i++;
    }
    return {
      body: dedent(storyObjCode.slice(exprStart, i)),
      isBlockBody: false,
    };
  }

  return null;
}

function extractSimpleArgsObject(objCode: string): Record<string, any> {
  const argsMatch = objCode.match(/\bargs\s*:\s*\{/);
  if (!argsMatch || argsMatch.index === undefined) return {};
  const openBrace = objCode.indexOf('{', argsMatch.index);
  const closeBrace = findMatchingDelimiter(objCode, openBrace, '{', '}');
  if (closeBrace === -1) return {};

  const inner = objCode.slice(openBrace + 1, closeBrace);
  const result: Record<string, any> = {};

  const propRegex = /(\w+)\s*:\s*(?:'([^']*)'|"([^"]*)"|(true|false)|(-?\d+(?:\.\d+)?))/g;
  let m: RegExpExecArray | null;
  while ((m = propRegex.exec(inner)) !== null) {
    const key = m[1];
    if (m[2] !== undefined) result[key] = m[2];
    else if (m[3] !== undefined) result[key] = m[3];
    else if (m[4] !== undefined) result[key] = m[4] === 'true';
    else if (m[5] !== undefined) result[key] = Number(m[5]);
  }
  return result;
}

function buildJsxFromArgs(
  componentName: string,
  args: Record<string, any>,
  includeSpread = false
): string {
  const propParts: string[] = [];
  for (const [k, v] of Object.entries(args)) {
    if (k === 'children') continue;
    if (v === undefined || v === null || v === '') continue;
    if (typeof v === 'boolean') {
      if (v) propParts.push(k);
    } else if (typeof v === 'string') {
      propParts.push(`${k}="${v}"`);
    } else {
      propParts.push(`${k}={${JSON.stringify(v)}}`);
    }
  }
  if (includeSpread) {
    propParts.push('{...args}');
  }

  const propsStr = propParts.length > 0 ? ` ${propParts.join(' ')}` : '';
  const children = args.children;
  if (typeof children === 'string' && children.length > 0) {
    return `<${componentName}${propsStr}>\n  ${children}\n</${componentName}>`;
  }
  return `<${componentName}${propsStr} />`;
}

export function getComponentStorySources(
  slug: string
): Record<string, ExtractedStorySource> {
  try {
    if (!fs.existsSync(STORIES_DIR)) return {};
    const files = fs.readdirSync(STORIES_DIR).filter((f) => f.endsWith('.stories.tsx'));
    const targetNorm = normalizeKey(slug);
    const matchedFile = files.find((f) => normalizeKey(f) === targetNorm);
    if (!matchedFile) return {};

    const filePath = path.join(STORIES_DIR, matchedFile);
    const source = fs.readFileSync(filePath, 'utf-8');

    const parsedImports = parseImports(source);
    const helpers = extractTopLevelHelpers(source);

    // Extract component name and meta args
    const compMatch = source.match(/\bcomponent\s*:\s*(\w+)/);
    const componentName = compMatch
      ? compMatch[1]
      : matchedFile.replace(/\.stories\.tsx$/, '');

    let metaArgs: Record<string, any> = {};
    const metaMatch = source.match(/const\s+meta[\s\S]*?=\s*\{/);
    if (metaMatch && metaMatch.index !== undefined) {
      const openBrace = source.indexOf('{', metaMatch.index);
      const closeBrace = findMatchingDelimiter(source, openBrace, '{', '}');
      if (closeBrace !== -1) {
        metaArgs = extractSimpleArgsObject(source.slice(openBrace, closeBrace + 1));
      }
    }

    const storiesMap: Record<string, ExtractedStorySource> = {};
    const storyExportRegex = /export\s+const\s+(\w+)\s*(?::\s*Story\s*)?=\s*\{/g;
    let match: RegExpExecArray | null;

    while ((match = storyExportRegex.exec(source)) !== null) {
      const storyId = match[1];
      const openBrace = source.indexOf('{', match.index + match[0].length - 1);
      const closeBrace = findMatchingDelimiter(source, openBrace, '{', '}');
      if (closeBrace === -1) continue;

      const storyObjCode = source.slice(openBrace, closeBrace + 1);
      const renderInfo = extractRenderFromStoryObject(storyObjCode);

      let rawTemplate = '';
      let cleanJsx = '';
      let fullFunctionCode = '';
      let isArgsOnly = false;

      const demoFnName = `${storyId.replace(/[^a-zA-Z0-9]/g, '')}Demo`;

      if (renderInfo) {
        rawTemplate = renderInfo.body;
        cleanJsx = stripArgsSpread(rawTemplate);

        // Check if this render simply delegates to a top-level helper component (e.g. <DefaultSliderDemo {...args} />)
        const delegatedHelper = helpers.find(
          (h) =>
            cleanJsx.startsWith(`<${h.name}`) &&
            cleanJsx.length < h.name.length + 30
        );

        if (delegatedHelper) {
          // Use the helper function body as the main showcase code
          const helperClean = stripArgsSpread(delegatedHelper.code);
          cleanJsx = helperClean;
          rawTemplate = delegatedHelper.code;
          fullFunctionCode = `export ${helperClean}`;
        } else if (renderInfo.isBlockBody) {
          fullFunctionCode = `export function ${demoFnName}() {\n${indentBlock(cleanJsx, 2)}\n}`;
        } else {
          fullFunctionCode = `export function ${demoFnName}() {\n  return (\n${indentBlock(cleanJsx, 4)}\n  );\n}`;
        }
      } else {
        isArgsOnly = true;
        const storyArgs = extractSimpleArgsObject(storyObjCode);
        const mergedArgs = { ...metaArgs, ...storyArgs };
        cleanJsx = buildJsxFromArgs(componentName, mergedArgs, false);
        rawTemplate = buildJsxFromArgs(componentName, mergedArgs, true);
        fullFunctionCode = `export function ${demoFnName}() {\n  return (\n${indentBlock(cleanJsx, 4)}\n  );\n}`;
      }

      // Include any referenced top-level helper constants/functions (unless already inlined as delegatedHelper)
      const usedHelpers = helpers
        .filter(
          (h) =>
            !fullFunctionCode.includes(`function ${h.name}`) &&
            new RegExp(`\\b${h.name}\\b`).test(fullFunctionCode)
        )
        .map((h) => h.code);

      const combinedBody =
        usedHelpers.length > 0
          ? `${usedHelpers.join('\n\n')}\n\n${fullFunctionCode}`
          : fullFunctionCode;

      const filteredImports = filterImportsForCode(parsedImports, combinedBody);
      const fullCode = filteredImports
        ? `${filteredImports}\n\n${combinedBody}`
        : combinedBody;

      storiesMap[storyId] = {
        id: storyId,
        fullCode,
        jsx: cleanJsx,
        rawTemplate,
        imports: filteredImports,
        isArgsOnly,
      };
    }

    return storiesMap;
  } catch (err) {
    console.warn(`Failed to extract story sources for ${slug}:`, err);
    return {};
  }
}
