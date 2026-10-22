import { StyleSheet, Text, View } from "react-native";

import {
  EVENT_TYPE_OPTIONS,
  OTHER_EVENT_TYPE,
  validateNewEvent,
  type NewEventValues,
} from "../eventForm";

import { Button } from "@/components/Button";
import { SelectField } from "@/components/SelectField";
import { TextField } from "@/components/TextField";
import { useFormState } from "@/hooks/useFormState";
import { formatDateInput, formatTimeInput } from "@/lib/dateInput";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

interface AddEventFormProps {
  horseNames: readonly string[];
  /** Prefilled when the form is opened from a horse's agenda. */
  defaultHorseName: string | null;
  defaultOwner: string;
  onSubmit: (values: NewEventValues) => void;
}

export function AddEventForm({
  horseNames,
  defaultHorseName,
  defaultOwner,
  onSubmit,
}: AddEventFormProps) {
  const { values, errors, setValue, handleSubmit } = useFormState<NewEventValues>(
    {
      horseName: defaultHorseName,
      owner: defaultOwner,
      eventType: null,
      customType: "",
      description: "",
      date: "",
      time: "",
      location: "",
    },
    validateNewEvent,
  );

  return (
    <View style={styles.container}>
      <SelectField
        label="Nom du cheval"
        required
        searchable
        allowCustomValue
        placeholder="Epona"
        options={horseNames.map((name) => ({ label: name, value: name }))}
        value={values.horseName}
        onChange={(horseName) => setValue("horseName", horseName)}
        error={errors.horseName}
      />
      <TextField
        label="Propriétaire"
        required
        placeholder="Marie"
        value={values.owner}
        onChangeText={(text) => setValue("owner", text)}
        error={errors.owner}
        autoComplete="name"
      />
      <SelectField
        label="Événement"
        required
        placeholder="Sélectionnez un événement"
        options={EVENT_TYPE_OPTIONS}
        value={values.eventType}
        onChange={(eventType) => setValue("eventType", eventType)}
        error={errors.eventType}
      />
      {values.eventType === OTHER_EVENT_TYPE ? (
        <TextField
          label="Précisez l’événement"
          required
          placeholder="Séance d’ostéopathie"
          value={values.customType}
          onChangeText={(text) => setValue("customType", text)}
          error={errors.customType}
        />
      ) : null}
      <TextField
        label="Description"
        placeholder="Décrivez l’événement…"
        value={values.description}
        onChangeText={(text) => setValue("description", text)}
        multiline
      />
      <TextField
        label="Date"
        required
        placeholder="31/01/2026"
        value={values.date}
        onChangeText={(text) => setValue("date", formatDateInput(text))}
        error={errors.date}
        keyboardType="number-pad"
        maxLength={10}
      />
      <TextField
        label="Heure"
        required
        placeholder="10:00"
        value={values.time}
        onChangeText={(text) => setValue("time", formatTimeInput(text))}
        error={errors.time}
        keyboardType="number-pad"
        maxLength={5}
      />
      <TextField
        label="Lieu"
        placeholder="Centre équestre"
        value={values.location}
        onChangeText={(text) => setValue("location", text)}
      />
      <Text style={styles.hint}>* Champs obligatoires</Text>
      <Button label="Ajouter à l’agenda" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
  },
  hint: {
    fontSize: FONT_SIZE.md,
    color: COLORS.foreground,
  },
});
