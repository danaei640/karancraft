// ============================================================================
// OKLCH Math Utilities
// ============================================================================

import type { OklchColor } from "./types"

/**
 * Normalize a hue to [0, 360).
 */
export function normalizeHue(h: number): number {
  return ((h % 360) + 360) % 360
}

/**
 * Compute the shortest angular distance between two hues (0–180).
 */
export function hueDistance(h1: number, h2: number): number {
  const diff = Math.abs(normalizeHue(h1) - normalizeHue(h2))
  return diff > 180 ? 360 - diff : diff
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Linear interpolation between two values.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1)
}

/**
 * Format an OKLCH color to a CSS oklch() string.
 */
export function formatOklch(color: OklchColor): string {
  const l = roundTo(clamp(color.l, 0, 1), 4)
  const c = roundTo(clamp(color.c, 0, 0.4), 4)
  const h = roundTo(normalizeHue(color.h), 2)
  return `oklch(${l} ${c} ${h})`
}

/**
 * Parse an oklch() CSS string back to OklchColor.
 * Accepts: oklch(0.5 0.2 240) and oklch(0.5 0.2 240 / 50%)
 */
export function parseOklch(css: string): OklchColor | null {
  const match = css.match(
    /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*[\d.]+%?\s*)?\)/
  )
  if (!match) return null
  return {
    l: parseFloat(match[1]),
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
  }
}

/**
 * Create an OKLCH color with clamped values.
 */
export function oklch(l: number, c: number, h: number): OklchColor {
  return {
    l: clamp(l, 0, 1),
    c: clamp(c, 0, 0.4),
    h: normalizeHue(h),
  }
}

/**
 * Round a number to N decimal places.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * Compute a perceptual contrast score using OKLCH lightness.
 *
 * This is a simplified APCA-like contrast model based on OKLCH lightness difference.
 * Real APCA operates on luminance (Y), but OKLCH lightness is perceptually uniform
 * and gives us a very strong proxy for readability contrast.
 *
 * Returns a value roughly in the range 0–100 where:
 * - 75+ = excellent for body text
 * - 60+ = good for large text / secondary
 * - 45+ = minimum for decorative / UI elements
 */
export function contrastScore(bgL: number, fgL: number): number {
  // Using the lightness difference scaled to ~0-106 range
  // (maximum difference is |1 - 0| = 1 → score = 106)
  const diff = Math.abs(bgL - fgL)
  // Apply a perceptual exponent for better modeling of low-contrast sensitivity
  return Math.pow(diff, 0.7) * 106
}

/**
 * Determine whether light or dark text has better contrast on a given background.
 * Uses a sharp step at lightness 0.60:
 * - Below 0.60 (e.g. violet, blue, red): returns 0.98 (white)
 * - At or above 0.60 (e.g. canary yellow, amber, lime): returns 0.12 (black)
 */
export function bestOnFillLightness(bgL: number): number {
  return bgL >= 0.60 ? 0.12 : 0.98
}

/**
 * Test if an OKLCH color is inside the standard sRGB gamut (with small tolerance).
 */
export function isOklchInSrgb(l: number, c: number, h: number): boolean {
  if (c <= 0.0001) return l >= 0 && l <= 1
  const hr = (h * Math.PI) / 180
  const a = c * Math.cos(hr)
  const b_ = c * Math.sin(hr)

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b_
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b_
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b_

  const l3 = l_ * l_ * l_
  const m3 = m_ * m_ * m_
  const s3 = s_ * s_ * s_

  const r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
  const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
  const b = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3

  const eps = 0.005
  return r >= -eps && r <= 1 + eps && g >= -eps && g <= 1 + eps && b >= -eps && b <= 1 + eps
}

/**
 * Compute the maximum in-gamut chroma for a given lightness and hue in OKLCH.
 */
export function approxMaxChroma(l: number, h: number): number {
  return gamutClampChroma(l, 0.4, h)
}

/**
 * Ensure chroma doesn't exceed true sRGB gamut boundary for the given lightness and hue.
 * Uses fast binary bisection if out-of-gamut.
 */
export function gamutClampChroma(
  l: number,
  c: number,
  h: number
): number {
  if (c <= 0.001) return 0
  if (isOklchInSrgb(l, c, h)) return c

  let low = 0
  let high = c
  for (let i = 0; i < 10; i++) {
    const mid = (low + high) / 2
    if (isOklchInSrgb(l, mid, h)) {
      low = mid
    } else {
      high = mid
    }
  }
  return low
}
