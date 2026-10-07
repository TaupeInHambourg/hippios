import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { openDocument, openInDriveViewer, shareDocument } from "../documentActions";
import { downloadDocument, type DownloadResult } from "../documentFiles";
import type { HorseDocument } from "../types";

import { Button } from "@/components/Button";
import { FieldError } from "@/components/FieldError";
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING, TOUCH_TARGET } from "@/lib/theme";

const ACTION_ERROR = "Impossible d’ouvrir le document. Vérifiez votre connexion et réessayez.";
const DOWNLOAD_ERROR = "Le téléchargement a échoué. Vérifiez votre connexion et réessayez.";
const DOWNLOAD_MESSAGES: Record<DownloadResult, string | undefined> = {
  saved: "Document enregistré dans le dossier choisi.",
  shared: undefined,
  canceled: undefined,
};

interface DocumentDetailProps {
  document: HorseDocument;
  onView: () => void;
}

export function DocumentDetail({ document, onView }: DocumentDetailProps) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [notice, setNotice] = useState<string | undefined>(undefined);
  const [isDownloading, setIsDownloading] = useState(false);

  const run = (action: (document: HorseDocument) => Promise<void>) => async () => {
    setError(undefined);
    try {
      await action(document);
    } catch {
      setError(ACTION_ERROR);
    }
  };

  const handleDownload = async () => {
    setError(undefined);
    setNotice(undefined);
    setIsDownloading(true);
    try {
      setNotice(DOWNLOAD_MESSAGES[await downloadDocument(document)]);
    } catch {
      setError(DOWNLOAD_ERROR);
    } finally {
      setIsDownloading(false);
    }
  };

  // Device files have no URL for the browser or Drive: the system sheet lists PDF readers.
  const textActions =
    document.storage === "device"
      ? [
          { label: "Ouvrir avec…", onPress: run(openDocument) },
          { label: "Partager", onPress: run(shareDocument) },
        ]
      : [
          { label: "Ouvrir avec Internet Lecteur PDF", onPress: run(openDocument) },
          { label: "Ouvrir avec Drive Lecteur PDF", onPress: run(openInDriveViewer) },
          { label: "Partager", onPress: run(shareDocument) },
        ];

  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {document.title}
      </Text>
      {document.pageCount !== null ? (
        <Text style={styles.pages}>{document.pageCount} pages</Text>
      ) : null}
      <View>
        {textActions.map((action) => (
          <Pressable
            key={action.label}
            accessibilityRole="button"
            onPress={action.onPress}
            style={styles.textAction}
          >
            <Text style={styles.textActionLabel}>{action.label}</Text>
          </Pressable>
        ))}
      </View>
      <FieldError message={error} />
      {notice ? (
        <Text accessibilityLiveRegion="polite" style={styles.notice}>
          {notice}
        </Text>
      ) : null}
      <View style={styles.buttons}>
        <Button label="Voir le document" onPress={onView} />
        <Button
          label={isDownloading ? "Téléchargement…" : "Télécharger (PDF)"}
          variant="outline"
          disabled={isDownloading}
          onPress={handleDownload}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.foreground,
  },
  pages: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZE.sm,
    color: COLORS.foreground,
  },
  textAction: {
    minHeight: TOUCH_TARGET + SPACING.sm,
    justifyContent: "center",
  },
  textActionLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.foreground,
  },
  notice: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
  buttons: {
    gap: SPACING.xl,
    marginTop: SPACING.lg,
  },
});
