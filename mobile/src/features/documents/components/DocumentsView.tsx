import { useState, type ReactNode } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import {
  getCategories,
  getScopedDocuments,
  searchDocuments,
  sortByMostRecent,
} from "../filterDocuments";
import type { DocumentsNavigation } from "../hooks/useDocumentsNavigation";
import type { DocumentFolder, DocumentsScreen, HorseDocument, NewDocumentValues } from "../types";
import { AddDocumentForm } from "./AddDocumentForm";
import { DocumentCard } from "./DocumentCard";
import { DocumentDetail } from "./DocumentDetail";
import { DocumentFilters } from "./DocumentFilters";
import { DocumentsHome } from "./DocumentsHome";
import { PdfViewer } from "./PdfViewer";

import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

interface DocumentsViewProps {
  documents: readonly HorseDocument[];
  folders: readonly DocumentFolder[];
  navigation: DocumentsNavigation;
  /** Rendered at the top, scrolling with the content. */
  header: ReactNode;
  /** Returns the created document's id, or null when it could not be created. */
  onCreateDocument: (values: NewDocumentValues) => string | null;
}

function getListTitle(
  screen: DocumentsScreen,
  folders: readonly DocumentFolder[],
  isSearching: boolean,
): string | null {
  if (isSearching) return "Résultats de recherche";
  if (screen.kind === "all") return "Tous les documents";
  if (screen.kind === "folder") {
    const folder = folders.find((item) => item.id === screen.folderId);
    return `Documents ${folder?.name.toLowerCase() ?? ""}`.trim();
  }
  return null;
}

export function DocumentsView({
  documents,
  folders,
  navigation,
  header,
  onCreateDocument,
}: DocumentsViewProps) {
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const { screen } = navigation;

  const detail =
    screen.kind === "viewer" ? screen.detail : screen.kind === "document" ? screen : null;
  const openedDocument = detail
    ? documents.find((document) => document.id === detail.documentId)
    : undefined;
  const isSearching = category !== null || query.trim() !== "";
  const showsList = screen.kind !== "document" && screen.kind !== "add" && screen.kind !== "viewer";
  const listTitle = showsList ? getListTitle(screen, folders, isSearching) : null;
  const categories = getCategories(documents);

  const handleCreate = (values: NewDocumentValues) => {
    const documentId = onCreateDocument(values);
    if (documentId) {
      navigation.openDocument(documentId);
    }
  };
  const listedDocuments = listTitle
    ? searchDocuments(getScopedDocuments(documents, screen), category, query)
    : [];

  const renderTop = () => {
    if (screen.kind === "add") {
      return (
        <AddDocumentForm
          categories={categories}
          folders={folders}
          horseNames={[...new Set(documents.map((document) => document.horseName))]}
          onSubmit={handleCreate}
          onCancel={navigation.goBack}
        />
      );
    }
    if (screen.kind === "document") {
      return openedDocument ? (
        <DocumentDetail document={openedDocument} onView={navigation.openViewer} />
      ) : (
        <Text style={styles.empty}>Ce document n’est plus disponible.</Text>
      );
    }
    return (
      <>
        <DocumentFilters
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
          query={query}
          onQueryChange={setQuery}
        />
        {listTitle ? (
          <Text accessibilityRole="header" style={styles.title}>
            {listTitle}
          </Text>
        ) : (
          <DocumentsHome
            recentDocument={sortByMostRecent(documents)[0]}
            folders={folders}
            onOpenDocument={navigation.openDocument}
            onOpenFolder={navigation.openFolder}
            onAddDocument={navigation.openAddForm}
            onSeeAll={navigation.openAll}
          />
        )}
      </>
    );
  };

  // The PDF reader needs the remaining height: it cannot live inside a scrolling list.
  if (screen.kind === "viewer" && openedDocument) {
    return (
      <View style={styles.viewer}>
        {header}
        <Text accessibilityRole="header" style={styles.title}>
          {openedDocument.title}
        </Text>
        <PdfViewer document={openedDocument} />
      </View>
    );
  }

  return (
    <FlatList
      data={listedDocuments}
      keyExtractor={(document) => document.id}
      renderItem={({ item }) => (
        <DocumentCard document={item} onPress={() => navigation.openDocument(item.id)} />
      )}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <View style={styles.header}>
          {header}
          {renderTop()}
        </View>
      }
      ListEmptyComponent={
        listTitle ? <Text style={styles.empty}>Aucun document trouvé</Text> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  header: {
    gap: SPACING.xl,
  },
  viewer: {
    flex: 1,
    gap: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.foreground,
  },
  empty: {
    fontSize: FONT_SIZE.md,
    color: COLORS.muted,
  },
});
