/**
 * Semantic design tokens (see `.claude/rules/styling.md`).
 * Components import these tokens, never raw color values.
 */
export const COLORS = {
  primary: "#4E6F59",
  primaryForeground: "#F4F4F4",
  primaryForegroundMuted: "rgba(244, 244, 244, 0.75)",
  background: "#F4F4F4",
  surface: "#E4E4E4",
  foreground: "#121212",
  muted: "#858484",
  border: "#7A7A7A",
  danger: "#D10000",
  dangerSoft: "#F5A3A3",
  success: "#1ED31E",
  successSoft: "#A6F0A6",
  warning: "#E8A317",
  warningSoft: "#F8DFA0",
  shadow: "#000000",
  overlay: "rgba(18, 18, 18, 0.4)",
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const RADIUS = {
  md: 8,
  full: 9999,
} as const;

export const FONT_SIZE = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  display: 56,
} as const;

export const FONT_WEIGHT = {
  regular: "400",
  medium: "500",
  bold: "700",
} as const;

/** Minimum touch target (Android 48dp, also covers iOS 44pt). */
export const TOUCH_TARGET = 48;

export interface ColorOption {
  label: string;
  value: string;
}

/** Colors a user can associate with a horse to recognize it across the app. */
export const HORSE_COLORS: readonly ColorOption[] = [
  { label: "Rouge", value: "#FF0000" },
  { label: "Orange", value: "#FF7F00" },
  { label: "Jaune", value: "#EEFF00" },
  { label: "Vert", value: "#5CFF00" },
  { label: "Turquoise", value: "#00FFB3" },
  { label: "Cyan", value: "#00CCFF" },
  { label: "Bleu", value: "#0029FF" },
  { label: "Violet", value: "#9E00FF" },
  { label: "Rose", value: "#FF00E6" },
  { label: "Gris", value: "#555555" },
];
