import { useState } from "react";

import type { HorseDocument, NewDocumentValues } from "../types";

interface DocumentsStore {
  documents: readonly HorseDocument[];
  /** Returns the created document, or null when required values are missing. */
  addDocument: (values: NewDocumentValues, addedBy: string) => HorseDocument | null;
}

/** In-memory documents until the documents API exists: added files are lost on restart. */
export function useDocumentsStore(initialDocuments: readonly HorseDocument[]): DocumentsStore {
  const [documents, setDocuments] = useState(initialDocuments);

  const addDocument = (values: NewDocumentValues, addedBy: string): HorseDocument | null => {
    const { file, category, folderId, horseName } = values;
    if (!file || !category || !folderId || !horseName) {
      return null;
    }
    const document: HorseDocument = {
      id: `${Date.now()}`,
      title: values.title.trim(),
      category,
      folderId,
      horseName,
      addedBy,
      addedAt: new Date(),
      pageCount: null,
      storage: "device",
      fileUrl: file.uri,
      mimeType: file.mimeType,
    };
    setDocuments((current) => [document, ...current]);
    return document;
  };

  return { documents, addDocument };
}
