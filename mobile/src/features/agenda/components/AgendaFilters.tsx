import { StyleSheet, View } from "react-native";

import { SearchField } from "@/components/SearchField";
import { SelectField } from "@/components/SelectField";
import type { SelectOption } from "@/components/SelectOptionsModal";
import { SPACING } from "@/lib/theme";

const ALL_HORSES = "__all__";

interface AgendaFiltersProps {
  horseNames: readonly string[];
  horseName: string | null;
  onHorseNameChange: (horseName: string | null) => void;
  query: string;
  onQueryChange: (query: string) => void;
}

export function AgendaFilters({
  horseNames,
  horseName,
  onHorseNameChange,
  query,
  onQueryChange,
}: AgendaFiltersProps) {
  const options: SelectOption[] = [
    { label: "Tous les chevaux", value: ALL_HORSES },
    ...horseNames.map((name) => ({ label: name, value: name })),
  ];

  return (
    <View style={styles.container}>
      <SelectField
        label="Cheval"
        placeholder="Tous les chevaux"
        options={options}
        value={horseName}
        onChange={(value) => onHorseNameChange(value === ALL_HORSES ? null : value)}
      />
      <SearchField
        accessibilityLabel="Rechercher un événement"
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
