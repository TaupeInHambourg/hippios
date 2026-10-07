export interface DocumentFolder {
  id: string;
  /** Profession, e.g. "Vétérinaire". */
  name: string;
  professionalName: string;
}

export interface HorseDocument {
  id: string;
  title: string;
  /** Document type, used by the "Intitulé" filter. */
  category: string;
  folderId: string;
  horseName: string;
  addedBy: string;
  addedAt: Date;
  /** Unknown for files picked on the device. */
  pageCount: number | null;
  /** Remote files open in the browser; device files open through the share sheet. */
  storage: "remote" | "device";
  fileUrl: string;
  mimeType: string;
}

export interface PickedFile {
  uri: string;
  name: string;
  mimeType: string;
}

export interface NewDocumentValues {
  file: PickedFile | null;
  title: string;
  category: string | null;
  folderId: string | null;
  horseName: string | null;
}

export type DocumentListScreen =
  { kind: "home" } | { kind: "folder"; folderId: string } | { kind: "all" };

export interface DocumentDetailScreen {
  kind: "document";
  documentId: string;
  previous: DocumentListScreen;
}

export type DocumentsScreen =
  | DocumentListScreen
  | { kind: "add" }
  | DocumentDetailScreen
  | { kind: "viewer"; detail: DocumentDetailScreen };
