import type { DocumentsScreen, HorseDocument } from "./types";

import { normalizeText } from "@/lib/normalizeText";

export function sortByMostRecent(documents: readonly HorseDocument[]): HorseDocument[] {
  return [...documents].sort((a, b) => +b.addedAt - +a.addedAt);
}

/** Documents visible on a list screen: a folder's content, or everything. */
export function getScopedDocuments(
  documents: readonly HorseDocument[],
  screen: DocumentsScreen,
): HorseDocument[] {
  const scoped =
    screen.kind === "folder"
      ? documents.filter((document) => document.folderId === screen.folderId)
      : documents;
  return sortByMostRecent(scoped);
}

export function searchDocuments(
  documents: readonly HorseDocument[],
  category: string | null,
  query: string,
): HorseDocument[] {
  const normalizedQuery = normalizeText(query);
  return documents.filter(
    (document) =>
      (category === null || document.category === category) &&
      (normalizedQuery === "" ||
        normalizeText(`${document.title} ${document.horseName}`).includes(normalizedQuery)),
  );
}

export function getCategories(documents: readonly HorseDocument[]): string[] {
  return [...new Set(documents.map((document) => document.category))].sort();
}
