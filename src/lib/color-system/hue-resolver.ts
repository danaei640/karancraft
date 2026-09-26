// ============================================================================
// Hue Conflict Resolution
// ============================================================================
//
// Ensures all 6 semantic sets have perceptually distinct hues by resolving
// conflicts when the accent hue is too close to a semantic base hue.
//
// Strategy:
// 1. Start with canonical base hues for each semantic set
// 2. Primary always = accent hue (user's choice)
// 3. For each semantic set (info, success, warning, danger), check distance
//    from the accent hue
// 4. If distance < MIN_HUE_DISTANCE, shift the semantic hue away
// 5. After individual adjustments, verify all pairs and do a final spacing pass
// ============================================================================

import type { OklchColor, ResolvedHues } from "./types"
import { normalizeHue, hueDistance } from "./oklch"

/**
 * Minimum angular distance (degrees) between any two set hues
 * for them to be considered perceptually distinct.
 */
const MIN_HUE_DISTANCE = 30

/**
 * Canonical base hues for semantic color sets in OKLCH.
 * These are the "ideal" hues before conflict resolution.
 */
const CANONICAL_HUES = {
  info: 264,      // Blue
  success: 155,   // Green
  warning: 85,    // Yellow-orange
  danger: 25,     // Red
} as const

type SemanticSetName = keyof typeof CANONICAL_HUES

/**
 * Resolve hue conflicts and produce final hues for all 6 sets.
 *
 * @param accentColor - The user's chosen accent color
 * @returns A map of set name → resolved hue
 */
export function resolveHues(accentColor: OklchColor): ResolvedHues {
  const accentHue = normalizeHue(accentColor.h)

  // Step 1: Start with canonical hues for semantics, accent for primary
  const resolved: Record<string, number> = {
    primary: accentHue,
    neutral: accentHue, // Neutral uses accent hue but with minimal chroma (tint controls this)
  }

  // Step 2: Resolve each semantic set individually against accent
  const semanticSets: SemanticSetName[] = ["info", "success", "warning", "danger"]

  for (const set of semanticSets) {
    const canonical = CANONICAL_HUES[set]
    const dist = hueDistance(accentHue, canonical)

    if (dist < MIN_HUE_DISTANCE) {
      // Need to shift: find the direction that maximizes spacing
      resolved[set] = shiftAwayFrom(canonical, accentHue, MIN_HUE_DISTANCE)
    } else {
      resolved[set] = canonical
    }
  }

  // Step 3: Multi-pass pairwise deconfliction among all semantic sets
  // (primary is fixed, neutral doesn't need hue distinction since it's near-achromatic)
  const adjustableSets: SemanticSetName[] = ["info", "success", "warning", "danger"]
  const fixedHues = [accentHue] // primary is fixed

  for (let pass = 0; pass < 3; pass++) {
    for (let i = 0; i < adjustableSets.length; i++) {
      const setA = adjustableSets[i]
      let hueA = resolved[setA]

      // Check against all fixed hues and previously resolved sets
      const allOtherHues = [
        ...fixedHues,
        ...adjustableSets
          .filter((_, j) => j !== i)
          .map((s) => resolved[s]),
      ]

      for (const otherHue of allOtherHues) {
        const dist = hueDistance(hueA, otherHue)
        if (dist < MIN_HUE_DISTANCE) {
          hueA = shiftAwayFrom(hueA, otherHue, MIN_HUE_DISTANCE)
        }
      }

      resolved[setA] = hueA
    }
  }

  return resolved as ResolvedHues
}

/**
 * Shift `hue` away from `avoidHue` by at least `minDistance` degrees.
 * Picks the direction (clockwise or counter-clockwise) that keeps the hue
 * closest to its original position while achieving the required distance.
 */
function shiftAwayFrom(
  hue: number,
  avoidHue: number,
  minDistance: number
): number {
  const h = normalizeHue(hue)
  const avoid = normalizeHue(avoidHue)

  // Calculate signed distance (positive = h is clockwise from avoid)
  let signedDist = h - avoid
  if (signedDist > 180) signedDist -= 360
  if (signedDist < -180) signedDist += 360

  const absDist = Math.abs(signedDist)

  if (absDist >= minDistance) {
    return h // Already far enough
  }

  // Shift in the same direction as the existing offset, or clockwise if exactly overlapping
  const shiftAmount = minDistance - absDist
  const direction = signedDist >= 0 ? 1 : -1
  const effectiveDirection = signedDist === 0 ? 1 : direction

  return normalizeHue(h + shiftAmount * effectiveDirection)
}

/**
 * Diagnostic: get the minimum hue distance among all unique pairs.
 * Useful for testing and validation.
 */
export function getMinPairwiseDistance(hues: ResolvedHues): number {
  const setNames = Object.keys(hues) as Array<keyof ResolvedHues>
  // Exclude neutral since it's achromatic
  const chromatic = setNames.filter((n) => n !== "neutral")
  let minDist = 360

  for (let i = 0; i < chromatic.length; i++) {
    for (let j = i + 1; j < chromatic.length; j++) {
      const dist = hueDistance(hues[chromatic[i]], hues[chromatic[j]])
      if (dist < minDist) {
        minDist = dist
      }
    }
  }

  return minDist
}
