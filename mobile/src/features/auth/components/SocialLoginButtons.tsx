import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import type { AuthProvider } from "../types";

import { Button } from "@/components/Button";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

interface SocialLoginButtonsProps {
  onProviderPress: (provider: AuthProvider) => void;
}

export function SocialLoginButtons({ onProviderPress }: SocialLoginButtonsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter avec :</Text>
      <Button
        label="Se connecter avec Google"
        variant="outline"
        icon={<Ionicons name="logo-google" size={22} color={COLORS.foreground} />}
        onPress={() => onProviderPress("google")}
      />
      <Button
        label="Se connecter avec Apple"
        variant="outline"
        icon={<Ionicons name="logo-apple" size={22} color={COLORS.foreground} />}
        onPress={() => onProviderPress("apple")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xl,
  },
  title: {
    marginBottom: SPACING.sm,
    fontSize: FONT_SIZE.lg,
    textAlign: "center",
    color: COLORS.foreground,
  },
});
