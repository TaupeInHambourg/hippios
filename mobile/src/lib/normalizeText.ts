/** Lowercases and strips accents so "selle francais" matches "Selle Français". */
export function normalizeText(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}
