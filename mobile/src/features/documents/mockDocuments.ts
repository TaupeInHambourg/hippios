import type { DocumentFolder, HorseDocument } from "./types";

// Public sample PDF standing in for real files until the documents API exists.
const SAMPLE_PDF_URL = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const VET = "Dr Alphonse Robert";
const DENTIST = "Dr Stéphanie Dumont";

export const MOCK_FOLDERS: readonly DocumentFolder[] = [
  { id: "vet", name: "Vétérinaire", professionalName: VET },
  { id: "dentist", name: "Dentiste", professionalName: DENTIST },
];

const REMOTE_PDF = {
  storage: "remote",
  fileUrl: SAMPLE_PDF_URL,
  mimeType: "application/pdf",
} as const;
const VET_FILE = { ...REMOTE_PDF, folderId: "vet", addedBy: VET };
const DENTIST_FILE = { ...REMOTE_PDF, folderId: "dentist", addedBy: DENTIST };

export const MOCK_DOCUMENTS: readonly HorseDocument[] = [
  {
    ...VET_FILE,
    id: "1",
    title: "Relevé sanguin Epona 12/2025",
    category: "Relevé sanguin",
    horseName: "Epona",
    addedAt: new Date(2026, 0, 2),
    pageCount: 12,
  },
  {
    ...VET_FILE,
    id: "2",
    title: "Relevé sanguin Epona 11/2025",
    category: "Relevé sanguin",
    horseName: "Epona",
    addedAt: new Date(2025, 11, 1),
    pageCount: 10,
  },
  {
    ...VET_FILE,
    id: "3",
    title: "Relevé sanguin Epona 10/2025",
    category: "Relevé sanguin",
    horseName: "Epona",
    addedAt: new Date(2025, 10, 3),
    pageCount: 11,
  },
  {
    ...VET_FILE,
    id: "4",
    title: "ECD Petit Tonnerre",
    category: "ECD",
    horseName: "Petit Tonnerre",
    addedAt: new Date(2025, 10, 26),
    pageCount: 4,
  },
  {
    ...VET_FILE,
    id: "5",
    title: "ECD Epona",
    category: "ECD",
    horseName: "Epona",
    addedAt: new Date(2025, 10, 26),
    pageCount: 4,
  },
  {
    ...DENTIST_FILE,
    id: "6",
    title: "Contrôle dentaire Epona",
    category: "Contrôle dentaire",
    horseName: "Epona",
    addedAt: new Date(2025, 9, 14),
    pageCount: 2,
  },
];
