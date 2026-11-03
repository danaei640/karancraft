import type { StorybookConfig } from '@storybook/nextjs-vite';
import path from 'node:path';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: [
    "../public"
  ],
  async viteFinal(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components/ui': path.resolve(process.cwd(), 'src/registry/bases/base/ui'),
      '@': path.resolve(process.cwd(), 'src'),
      'cn': path.resolve(process.cwd(), 'src/lib/utils'),
      'icons': path.resolve(process.cwd(), 'src/lib/icons'),
    };
    return config;
  },
};
export default config;