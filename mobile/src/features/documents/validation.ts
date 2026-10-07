import type { NewDocumentValues } from "./types";

import type { FormErrors } from "@/hooks/useFormState";

const REQUIRED_MESSAGE = "Ce champ est obligatoire";

export function validateNewDocument(values: NewDocumentValues): FormErrors<NewDocumentValues> {
  return {
    file: values.file ? undefined : "Choisissez un fichier PDF",
    title: values.title.trim() ? undefined : REQUIRED_MESSAGE,
    category: values.category ? undefined : REQUIRED_MESSAGE,
    folderId: values.folderId ? undefined : REQUIRED_MESSAGE,
    horseName: values.horseName ? undefined : REQUIRED_MESSAGE,
  };
}

/** Suggested title from the file name: "releve_sanguin.pdf" gives "releve sanguin". */
export function getTitleFromFileName(fileName: string): string {
  return fileName
    .replace(/\.pdf$/i, "")
    .replace(/[_-]+/g, " ")
    .trim();
}
