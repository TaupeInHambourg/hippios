import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { OptionRow } from "./OptionRow";
import type { SelectOption } from "./SelectOptionsModal";

import { normalizeText } from "@/lib/normalizeText";
import { COLORS, FONT_SIZE, RADIUS, SPACING, TOUCH_TARGET } from "@/lib/theme";

interface SearchableOptionsModalProps {
  title: string;
  visible: boolean;
  options: readonly SelectOption[];
  selectedValue: string | null;
  /** Lets the user pick the typed text when no option matches it exactly. */
  allowCustomValue: boolean;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export function SearchableOptionsModal({
  title,
  visible,
  options,
  selectedValue,
  allowCustomValue,
  onSelect,
  onClose,
}: SearchableOptionsModalProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeText(query);
  const filteredOptions = normalizedQuery
    ? options.filter((option) => normalizeText(option.label).includes(normalizedQuery))
    : options;
  const customValue = query.trim();
  const canUseCustomValue =
    allowCustomValue &&
    customValue.length > 0 &&
    !options.some((option) => normalizeText(option.label) === normalizedQuery);

  const close = () => {
    setQuery("");
    onClose();
  };

  const select = (value: string) => {
    setQuery("");
    onSelect(value);
  };

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={close}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text accessibilityRole="header" style={styles.title}>
              {title}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Fermer"
              onPress={close}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={28} color={COLORS.foreground} />
            </Pressable>
          </View>
          <TextInput
            autoFocus
            autoCorrect={false}
            accessibilityLabel={`Rechercher : ${title}`}
            placeholder="Rechercher…"
            placeholderTextColor={COLORS.muted}
            value={query}
            onChangeText={setQuery}
            style={styles.search}
          />
          <FlatList
            data={filteredOptions}
            keyExtractor={(option) => option.value}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <OptionRow
                label={item.label}
                selected={item.value === selectedValue}
                onPress={() => select(item.value)}
              />
            )}
            ListHeaderComponent={
              canUseCustomValue ? (
                <OptionRow
                  label={`Utiliser « ${customValue} »`}
                  selected={false}
                  onPress={() => select(customValue)}
                />
              ) : null
            }
            ListEmptyComponent={
              canUseCustomValue ? null : <Text style={styles.empty}>Aucun résultat</Text>
            }
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: SPACING.lg,
    paddingRight: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZE.lg,
    color: COLORS.foreground,
  },
  closeButton: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    minHeight: TOUCH_TARGET - SPACING.xs,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.foreground,
  },
  empty: {
    padding: SPACING.lg,
    textAlign: "center",
    fontSize: FONT_SIZE.md,
    color: COLORS.muted,
  },
});
