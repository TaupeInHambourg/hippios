import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { pickPdf } from "../documentActions";
import type { PickedFile } from "../types";

import { FieldError } from "@/components/FieldError";
import { FieldLabel, getFieldAccessibilityLabel } from "@/components/FieldLabel";
import { COLORS, FONT_SIZE, RADIUS, SPACING, TOUCH_TARGET } from "@/lib/theme";

const LABEL = "Fichier PDF";
const PICK_ERROR = "Impossible d’ouvrir vos fichiers. Réessayez.";

interface FilePickerFieldProps {
  file: PickedFile | null;
  onChange: (file: PickedFile) => void;
  error?: string | undefined;
}

export function FilePickerField({ file, onChange, error }: FilePickerFieldProps) {
  const [pickError, setPickError] = useState<string | undefined>(undefined);

  const handlePress = async () => {
    setPickError(undefined);
    try {
      const picked = await pickPdf();
      if (picked) {
        onChange(picked);
      }
    } catch {
      setPickError(PICK_ERROR);
    }
  };

  return (
    <View>
      <FieldLabel label={LABEL} required />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={getFieldAccessibilityLabel(LABEL, true)}
        accessibilityValue={{ text: file?.name ?? "Aucun fichier choisi" }}
        accessibilityHint="Ouvre vos fichiers pour choisir un PDF"
        onPress={handlePress}
        style={[styles.picker, error ? styles.pickerError : null]}
      >
        <Ionicons
          name={file ? "document-text" : "cloud-upload-outline"}
          size={24}
          color={COLORS.foreground}
        />
        <Text style={file ? styles.fileName : styles.placeholder} numberOfLines={1}>
          {file?.name ?? "Choisir un fichier PDF"}
        </Text>
        {file ? <Text style={styles.change}>Changer</Text> : null}
      </Pressable>
      <FieldError message={pickError ?? error} />
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    minHeight: TOUCH_TARGET + SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
  },
  pickerError: {
    borderColor: COLORS.danger,
  },
  fileName: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.foreground,
  },
  placeholder: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.muted,
  },
  change: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
});
