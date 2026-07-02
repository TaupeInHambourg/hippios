/**
 * Couleurs de l'application équestre
 * Pour modifier la couleur principale, changez uniquement la valeur de EQUESTRE_PRIMARY
 */

// Couleur principale de l'application
export const EQUESTRE_PRIMARY = "#4E6E58"

// Autres couleurs du thème
export const EQUESTRE_PRIMARY_DARK = "#3d5546"
export const EQUESTRE_GREEN = "#17C963"
export const EQUESTRE_ORANGE = "#ED973A"
export const EQUESTRE_BLUE = "#4E6E58"
export const EQUESTRE_BEIGE = "#e9e4d4"
export const EQUESTRE_SOFT = "#f5f3ed"
export const EQUESTRE_MUTED = "#6b7280"
export const EQUESTRE_ALERT = "#E5443C"
export const EQUESTRE_BORDER = "#e5e7eb"

// Fonction utilitaire pour obtenir une couleur CSS variable
export const getCSSVariable = (variableName: string): string => {
  if (typeof window === 'undefined') return EQUESTRE_PRIMARY
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim() || EQUESTRE_PRIMARY
}

