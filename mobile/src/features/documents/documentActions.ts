import { getDocumentAsync } from "expo-document-picker";
import { isAvailableAsync, shareAsync } from "expo-sharing";
import { Linking, Share } from "react-native";

import type { HorseDocument, PickedFile } from "./types";

const PDF_MIME_TYPE = "application/pdf";
const PDF_UTI = "com.adobe.pdf";
const DRIVE_VIEWER_URL = "https://drive.google.com/viewerng/viewer?url=";

/** Lets the user pick a PDF on the device. Resolves to null when canceled. */
export async function pickPdf(): Promise<PickedFile | null> {
  const result = await getDocumentAsync({ type: PDF_MIME_TYPE, copyToCacheDirectory: true });
  const asset = result.canceled ? undefined : result.assets[0];
  if (!asset) {
    return null;
  }
  return { uri: asset.uri, name: asset.name, mimeType: asset.mimeType ?? PDF_MIME_TYPE };
}

/**
 * Android cannot open local `file://` URIs through `Linking`: device files go
 * through the system sheet, which offers PDF readers as well as sharing targets.
 */
async function openDeviceFile(document: HorseDocument): Promise<void> {
  if (!(await isAvailableAsync())) {
    throw new Error("Sharing is not available on this device");
  }
  await shareAsync(document.fileUrl, {
    mimeType: document.mimeType,
    UTI: PDF_UTI,
    dialogTitle: document.title,
  });
}

/** Opens the document: in the browser for remote files (which also allows downloading). */
export function openDocument(document: HorseDocument): Promise<void> {
  return document.storage === "device"
    ? openDeviceFile(document)
    : Linking.openURL(document.fileUrl);
}

export function openInDriveViewer(document: HorseDocument): Promise<void> {
  return Linking.openURL(`${DRIVE_VIEWER_URL}${encodeURIComponent(document.fileUrl)}`);
}

export async function shareDocument(document: HorseDocument): Promise<void> {
  if (document.storage === "device") {
    await openDeviceFile(document);
    return;
  }
  // iOS shares `url`, Android only shares `message`.
  await Share.share({
    title: document.title,
    message: `${document.title} : ${document.fileUrl}`,
    url: document.fileUrl,
  });
}
