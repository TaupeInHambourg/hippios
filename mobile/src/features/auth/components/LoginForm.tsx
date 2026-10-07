import { Pressable, StyleSheet, Text, View } from "react-native";

import type { LoginValues } from "../types";
import { validateLogin } from "../validation";

import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { useFormState } from "@/hooks/useFormState";
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING, TOUCH_TARGET } from "@/lib/theme";

const INITIAL_VALUES: LoginValues = { identifier: "", password: "" };

interface LoginFormProps {
  onSubmit: (values: LoginValues) => void;
  onForgotPassword: () => void;
}

export function LoginForm({ onSubmit, onForgotPassword }: LoginFormProps) {
  const { values, errors, setValue, handleSubmit } = useFormState(INITIAL_VALUES, validateLogin);

  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        Se connecter
      </Text>
      <View style={styles.fields}>
        <TextField
          label="Adresse e-mail ou nom d’utilisateur"
          placeholder="jean.dupont@mail.com"
          value={values.identifier}
          onChangeText={(text) => setValue("identifier", text)}
          error={errors.identifier}
          autoCapitalize="none"
          autoComplete="username"
          textContentType="username"
        />
        <TextField
          label="Mot de passe"
          placeholder="••••••••"
          value={values.password}
          onChangeText={(text) => setValue("password", text)}
          error={errors.password}
          secureTextEntry
          autoComplete="current-password"
          textContentType="password"
        />
      </View>
      <Button label="Se connecter" onPress={handleSubmit(onSubmit)} />
      <Pressable accessibilityRole="link" onPress={onForgotPassword} style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordLabel}>Mot de passe oublié ?</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xl,
  },
  title: {
    marginTop: SPACING.xxl,
    fontSize: FONT_SIZE.lg,
    textAlign: "center",
    color: COLORS.foreground,
  },
  fields: {
    gap: SPACING.xl,
    marginBottom: SPACING.sm,
  },
  forgotPassword: {
    minHeight: TOUCH_TARGET,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -SPACING.md,
  },
  forgotPasswordLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.foreground,
  },
});
