import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { BREED_OPTIONS } from "../breeds";
import { SEX_OPTIONS } from "../constants";
import type { HorseValues } from "../types";
import { validateHorse } from "../validation";

import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { ColorPicker } from "@/components/ColorPicker";
import { FieldRow } from "@/components/FieldRow";
import { SelectField } from "@/components/SelectField";
import { TextField } from "@/components/TextField";
import { useFormState } from "@/hooks/useFormState";
import { COLORS, HORSE_COLORS, SPACING } from "@/lib/theme";

interface HorseFormProps {
  initialValues: HorseValues;
  onSubmit: (values: HorseValues) => void;
}

export function HorseForm({ initialValues, onSubmit }: HorseFormProps) {
  const { values, errors, setValue, handleSubmit } = useFormState(initialValues, validateHorse);

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {/* Photo upload requires expo-image-picker (not installed). */}
        <Avatar size={100}>
          <MaterialCommunityIcons name="horse-variant" size={56} color={COLORS.muted} />
        </Avatar>
      </View>
      <FieldRow>
        <TextField
          label="Nom"
          required
          placeholder="Epona"
          value={values.name}
          onChangeText={(text) => setValue("name", text)}
          error={errors.name}
        />
        <TextField
          label="Âge"
          required
          placeholder="1 an"
          value={values.age}
          onChangeText={(text) => setValue("age", text)}
          error={errors.age}
          keyboardType="number-pad"
        />
      </FieldRow>
      <FieldRow>
        <SelectField
          label="Sexe"
          required
          placeholder="Mâle"
          options={SEX_OPTIONS}
          value={values.sex}
          onChange={(value) => setValue("sex", value)}
          error={errors.sex}
        />
        <SelectField
          label="Race"
          required
          searchable
          allowCustomValue
          placeholder="Frison"
          options={BREED_OPTIONS}
          value={values.breed || null}
          onChange={(value) => setValue("breed", value)}
          error={errors.breed}
        />
      </FieldRow>
      <FieldRow>
        <TextField
          label="Poids (kg)"
          required
          placeholder="100"
          value={values.weight}
          onChangeText={(text) => setValue("weight", text)}
          error={errors.weight}
          keyboardType="decimal-pad"
        />
        <TextField
          label="Taille (m)"
          required
          placeholder="1,70"
          value={values.height}
          onChangeText={(text) => setValue("height", text)}
          error={errors.height}
          keyboardType="decimal-pad"
        />
      </FieldRow>
      <FieldRow>
        <TextField
          label="Robe"
          placeholder="Brun"
          value={values.coat}
          onChangeText={(text) => setValue("coat", text)}
        />
        <TextField
          label="ID de la micropuce"
          placeholder="AA1111"
          value={values.microchipId}
          onChangeText={(text) => setValue("microchipId", text)}
          autoCapitalize="characters"
        />
      </FieldRow>
      <ColorPicker
        label="Couleur associée"
        options={HORSE_COLORS}
        value={values.color}
        onChange={(color) => setValue("color", color)}
      />
      <View style={styles.submit}>
        <Button label="Valider" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xl,
  },
  avatar: {
    alignItems: "center",
  },
  submit: {
    marginTop: SPACING.lg,
  },
});
