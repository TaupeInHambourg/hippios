import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { BackHandler } from "react-native";

import type { DocumentListScreen, DocumentsScreen } from "../types";

export interface DocumentsNavigation {
  screen: DocumentsScreen;
  canGoBack: boolean;
  goBack: () => void;
  openFolder: (folderId: string) => void;
  openAll: () => void;
  openAddForm: () => void;
  openDocument: (documentId: string) => void;
  /** Opens the in-app PDF reader for the document currently displayed. */
  openViewer: () => void;
}

function getPreviousScreen(screen: DocumentsScreen): DocumentsScreen {
  switch (screen.kind) {
    case "viewer":
      return screen.detail;
    case "document":
      return screen.previous;
    default:
      return { kind: "home" };
  }
}

/** The list a document is opened from: home after adding one. */
function getReturnScreen(screen: DocumentsScreen): DocumentListScreen {
  switch (screen.kind) {
    case "viewer":
      return screen.detail.previous;
    case "document":
      return screen.previous;
    case "add":
      return { kind: "home" };
    default:
      return screen;
  }
}

/**
 * In-screen navigation of the documents section (home > folder > document > viewer).
 * While `isActive`, the Android back button goes up one level instead of
 * leaving the tab.
 */
export function useDocumentsNavigation(isActive: boolean): DocumentsNavigation {
  const [screen, setScreen] = useState<DocumentsScreen>({ kind: "home" });
  const canGoBack = screen.kind !== "home";

  // Stable reference: it is a dependency of the back handler effect below.
  const goBack = useCallback(() => setScreen(getPreviousScreen), []);

  useFocusEffect(
    useCallback(() => {
      if (!isActive || !canGoBack) {
        return undefined;
      }
      const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
        goBack();
        return true;
      });
      return () => subscription.remove();
    }, [isActive, canGoBack, goBack]),
  );

  return {
    screen,
    canGoBack,
    goBack,
    openFolder: (folderId) => setScreen({ kind: "folder", folderId }),
    openAll: () => setScreen({ kind: "all" }),
    openAddForm: () => setScreen({ kind: "add" }),
    openDocument: (documentId) =>
      setScreen((current) => ({
        kind: "document",
        documentId,
        previous: getReturnScreen(current),
      })),
    openViewer: () =>
      setScreen((current) =>
        current.kind === "document" ? { kind: "viewer", detail: current } : current,
      ),
  };
}
