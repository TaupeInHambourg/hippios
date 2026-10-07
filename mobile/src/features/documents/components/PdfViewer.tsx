import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Pdf from "react-native-pdf";

import type { HorseDocument } from "../types";

import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

const LOAD_ERROR = "Impossible d’afficher le document. Vérifiez votre connexion et réessayez.";

interface PdfViewerProps {
  document: HorseDocument;
}

export function PdfViewer({ document }: PdfViewerProps) {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState<number | null>(document.pageCount);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <Text accessibilityLiveRegion="polite" style={styles.error}>
        {LOAD_ERROR}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      {/* The native PDF view takes no accessibility props: the wrapper announces it. */}
      <View accessible accessibilityLabel={`Document ${document.title}`} style={styles.pdf}>
        <Pdf
          source={{ uri: document.fileUrl, cache: true }}
          // Never accept invalid TLS certificates (the library default is to trust all on Android).
          trustAllCerts={false}
          renderActivityIndicator={() => <ActivityIndicator color={COLORS.primary} />}
          onLoadComplete={(numberOfPages) => setPageCount(numberOfPages)}
          onPageChanged={(currentPage) => setPage(currentPage)}
          onError={() => setHasError(true)}
          style={styles.pdf}
        />
      </View>
      {pageCount !== null ? (
        <Text accessibilityLiveRegion="polite" style={styles.pageIndicator}>
          Page {page} / {pageCount}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACING.sm,
  },
  pdf: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  pageIndicator: {
    alignSelf: "center",
    fontSize: FONT_SIZE.sm,
    color: COLORS.foreground,
  },
  error: {
    fontSize: FONT_SIZE.md,
    color: COLORS.danger,
  },
});
