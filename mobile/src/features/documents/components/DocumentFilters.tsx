import { StyleSheet, View } from "react-native";

import { SearchField } from "@/components/SearchField";
import { SelectField } from "@/components/SelectField";
import type { SelectOption } from "@/components/SelectOptionsModal";
import { SPACING } from "@/lib/theme";

const ALL_CATEGORIES = "__all__";

interface DocumentFiltersProps {
  categories: readonly string[];
  category: string | null;
  onCategoryChange: (category: string | null) => void;
  query: string;
  onQueryChange: (query: string) => void;
}

export function DocumentFilters({
  categories,
  category,
  onCategoryChange,
  query,
  onQueryChange,
}: DocumentFiltersProps) {
  const options: SelectOption[] = [
    { label: "Tous les intitulés", value: ALL_CATEGORIES },
    ...categories.map((name) => ({ label: name, value: name })),
  ];

  return (
    <View style={styles.container}>
      <SelectField
        label="Intitulé"
        placeholder="Tous les intitulés"
        options={options}
        value={category}
        onChange={(value) => onCategoryChange(value === ALL_CATEGORIES ? null : value)}
      />
      <SearchField
        accessibilityLabel="Rechercher un document"
        placeholder="Recherche"
        value={query}
        onChangeText={onQueryChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xl,
  },
});
