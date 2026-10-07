import { Directory, File, Paths } from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { Platform } from "react-native";

import type { HorseDocument } from "./types";

const PDF_UTI = "com.adobe.pdf";
const DOWNLOADS_DIRECTORY = "documents";
const PICKER_CANCELLED_CODE = "ERR_PICKER_CANCELLED";

export type DownloadResult = "saved" | "shared" | "canceled";

function isPickerCancelled(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === PICKER_CANCELLED_CODE
  );
}

/** "Relevé sanguin 12/2025" gives "Relevé sanguin 12-2025.pdf". */
function toPdfFileName(title: string): string {
  const name = title.replace(/[\\/:*?"<>|]+/g, "-").trim() || "document";
  return `${name}.pdf`;
}

/** Local copy of the document: remote files are downloaded to the cache first. */
async function getLocalFile(document: HorseDocument): Promise<File> {
  if (document.storage === "device") {
    return new File(document.fileUrl);
  }
  const directory = new Directory(Paths.cache, DOWNLOADS_DIRECTORY);
  directory.create({ idempotent: true });
  return File.downloadFileAsync(document.fileUrl, new File(directory, `${document.id}.pdf`), {
    idempotent: true,
  });
}

/**
 * Saves the PDF where the user chooses: a folder picker on Android, the share
 * sheet on iOS (which offers "Enregistrer dans Fichiers").
 */
export async function downloadDocument(document: HorseDocument): Promise<DownloadResult> {
  const file = await getLocalFile(document);

  if (Platform.OS !== "android") {
    await shareAsync(file.uri, { UTI: PDF_UTI, mimeType: document.mimeType });
    return "shared";
  }

  try {
    const directory = await Directory.pickDirectoryAsync();
    const target = directory.createFile(toPdfFileName(document.title), document.mimeType);
    target.write(await file.bytes());
    return "saved";
  } catch (error) {
    if (isPickerCancelled(error)) {
      return "canceled";
    }
    throw new Error("Could not save the document", { cause: error });
  }
}
