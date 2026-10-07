import { StyleSheet, Text, View } from "react-native";

import type { DocumentFolder, NewDocumentValues, PickedFile } from "../types";
import { getTitleFromFileName, validateNewDocument } from "../validation";
import { FilePickerField } from "./FilePickerField";

import { Button } from "@/components/Button";
import { SelectField } from "@/components/SelectField";
import type { SelectOption } from "@/components/SelectOptionsModal";
import { TextField } from "@/components/TextField";
import { useFormState } from "@/hooks/useFormState";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

const EMPTY_VALUES: NewDocumentValues = {
  file: null,
  title: "",
  category: null,
  folderId: null,
  horseName: null,
};

const toOptions = (labels: readonly string[]): SelectOption[] =>
  labels.map((label) => ({ label, value: label }));

interface AddDocumentFormProps {
  categories: readonly string[];
  folders: readonly DocumentFolder[];
  horseNames: readonly string[];
  onSubmit: (values: NewDocumentValues) => void;
  onCancel: () => void;
}

export function AddDocumentForm({
  categories,
  folders,
  horseNames,
  onSubmit,
  onCancel,
}: AddDocumentFormProps) {
  const { values, errors, setValue, handleSubmit } = useFormState(
    EMPTY_VALUES,
    validateNewDocument,
  );

  const handleFileChange = (file: PickedFile) => {
    setValue("file", file);
    if (!values.title.trim()) {
      setValue("title", getTitleFromFileName(file.name));
    }
  };

  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        Ajouter un document
      </Text>
      <FilePickerField file={values.file} onChange={handleFileChange} error={errors.file} />
      <TextField
        label="Titre"
        required
        placeholder="Relevé sanguin Epona"
        value={values.title}
        onChangeText={(text) => setValue("title", text)}
        error={errors.title}
      />
      <SelectField
        label="Intitulé"
        required
        searchable
        allowCustomValue
        placeholder="Relevé sanguin"
        options={toOptions(categories)}
        value={values.category}
        onChange={(category) => setValue("category", category)}
        error={errors.category}
      />
      <SelectField
        label="Dossier"
        required
        placeholder="Vétérinaire"
        options={folders.map((folder) => ({
          label: `${folder.name} (${folder.professionalName})`,
          value: folder.id,
        }))}
        value={values.folderId}
        onChange={(folderId) => setValue("folderId", folderId)}
        error={errors.folderId}
      />
      <SelectField
        label="Cheval"
        required
        searchable
        allowCustomValue
        placeholder="Epona"
        options={toOptions(horseNames)}
        value={values.horseName}
        onChange={(horseName) => setValue("horseName", horseName)}
        error={errors.horseName}
      />
      <View style={styles.buttons}>
        <Button label="Ajouter le document" onPress={handleSubmit(onSubmit)} />
        <Button label="Annuler" variant="outline" onPress={onCancel} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.foreground,
  },
  buttons: {
    gap: SPACING.xl,
    marginTop: SPACING.lg,
  },
});
