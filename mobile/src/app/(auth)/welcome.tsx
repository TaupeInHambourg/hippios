import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { WelcomeHero } from "@/features/auth";
import { SPACING } from "@/lib/theme";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <Screen>
      <WelcomeHero />
      <View style={styles.actions}>
        <Button label="Créer un compte" onPress={() => router.push("/register")} />
        <Button label="Se connecter" variant="outline" onPress={() => router.push("/login")} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
});
