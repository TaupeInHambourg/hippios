import { StyleSheet, Text, View } from "react-native";

import { NOTIFICATION_OPTIONS } from "../constants";
import type { UserProfile } from "../types";
import { validateRegister } from "../validation";

import { Button } from "@/components/Button";
import { SelectField } from "@/components/SelectField";
import { TextField } from "@/components/TextField";
import { useFormState } from "@/hooks/useFormState";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

interface ProfileFormProps {
  initialValues: UserProfile;
  submitLabel: string;
  onSubmit: (values: UserProfile) => void;
  onCancel?: () => void;
}

/** Profile fields shared by sign-up and profile edition. */
export function ProfileForm({ initialValues, submitLabel, onSubmit, onCancel }: ProfileFormProps) {
  const { values, errors, setValue, handleSubmit } = useFormState(initialValues, validateRegister);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <TextField
            label="Prénom"
            required
            placeholder="Jean"
            value={values.firstName}
            onChangeText={(text) => setValue("firstName", text)}
            error={errors.firstName}
            autoComplete="given-name"
            textContentType="givenName"
          />
        </View>
        <View style={styles.rowItem}>
          <TextField
            label="Nom"
            required
            placeholder="Dupont"
            value={values.lastName}
            onChangeText={(text) => setValue("lastName", text)}
            error={errors.lastName}
            autoComplete="family-name"
            textContentType="familyName"
          />
        </View>
      </View>
      <TextField
        label="Numéro de téléphone"
        placeholder="06 12 34 56 78"
        value={values.phone}
        onChangeText={(text) => setValue("phone", text)}
        error={errors.phone}
        keyboardType="phone-pad"
        autoComplete="tel"
        textContentType="telephoneNumber"
      />
      <TextField
        label="Adresse"
        placeholder="12 rue des Écuries"
        value={values.address}
        onChangeText={(text) => setValue("address", text)}
        autoComplete="street-address"
        textContentType="streetAddressLine1"
      />
      <TextField
        label="Ville"
        required
        placeholder="Paris"
        value={values.city}
        onChangeText={(text) => setValue("city", text)}
        error={errors.city}
        autoComplete="postal-address-locality"
        textContentType="addressCity"
      />
      <TextField
        label="Adresse e-mail"
        placeholder="jean.dupont@mail.com"
        value={values.email}
        onChangeText={(text) => setValue("email", text)}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
      />
      <SelectField
        label="Notifications"
        required
        placeholder="Sélectionnez un événement"
        options={NOTIFICATION_OPTIONS}
        value={values.notifications}
        onChange={(value) => setValue("notifications", value)}
        error={errors.notifications}
      />
      <Text style={styles.requiredHint}>*Champs obligatoires</Text>
      <View style={styles.actions}>
        <Button label={submitLabel} onPress={handleSubmit(onSubmit)} />
        {onCancel ? <Button label="Annuler" variant="outline" onPress={onCancel} /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xl,
  },
  row: {
    flexDirection: "row",
    gap: SPACING.xl,
  },
  rowItem: {
    flex: 1,
  },
  requiredHint: {
    marginBottom: SPACING.lg,
    fontSize: FONT_SIZE.md,
    color: COLORS.foreground,
  },
  actions: {
    gap: SPACING.xl,
  },
});
