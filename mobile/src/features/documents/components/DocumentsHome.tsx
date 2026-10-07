import { StyleSheet, Text, View } from "react-native";

import type { DocumentFolder, HorseDocument } from "../types";
import { DocumentCard } from "./DocumentCard";

import { Button } from "@/components/Button";
import { ListCard } from "@/components/ListCard";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

interface DocumentsHomeProps {
  recentDocument: HorseDocument | undefined;
  folders: readonly DocumentFolder[];
  onOpenDocument: (documentId: string) => void;
  onOpenFolder: (folderId: string) => void;
  onAddDocument: () => void;
  onSeeAll: () => void;
}

export function DocumentsHome({
  recentDocument,
  folders,
  onOpenDocument,
  onOpenFolder,
  onAddDocument,
  onSeeAll,
}: DocumentsHomeProps) {
  return (
    <View style={styles.container}>
      {recentDocument ? (
        <View style={styles.section}>
          <Text accessibilityRole="header" style={styles.title}>
            Récents
          </Text>
          <DocumentCard
            document={recentDocument}
            onPress={() => onOpenDocument(recentDocument.id)}
          />
        </View>
      ) : null}
      <View style={styles.section}>
        <Text accessibilityRole="header" style={styles.title}>
          Dossiers
        </Text>
        {/* One folder per professional: a short, bounded list. */}
        {folders.map((folder) => (
          <ListCard
            key={folder.id}
            title={folder.name}
            subtitle={folder.professionalName}
            onPress={() => onOpenFolder(folder.id)}
          />
        ))}
      </View>
      <View style={styles.buttons}>
        <Button label="Ajouter un document" onPress={onAddDocument} />
        <Button label="Voir tout" variant="outline" onPress={onSeeAll} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xl,
  },
  section: {
    gap: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.foreground,
  },
  buttons: {
    gap: SPACING.xl,
  },
});
