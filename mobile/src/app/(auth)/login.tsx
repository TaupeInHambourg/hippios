import { StyleSheet, View } from "react-native";

import { Divider } from "@/components/Divider";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { LoginForm, SocialLoginButtons, useSession, type AuthProvider } from "@/features/auth";
import { SPACING } from "@/lib/theme";

// Wired once better-auth and the password reset screen exist (CLAUDE.md §7).
const handleForgotPassword = () => {};
const handleProviderLogin = (_provider: AuthProvider) => {};

export default function LoginScreen() {
  const { signIn } = useSession();

  return (
    <Screen scrollable>
      <ScreenHeader title="Connexion" />
      <View style={styles.content}>
        <LoginForm onSubmit={signIn} onForgotPassword={handleForgotPassword} />
        <Divider />
        <SocialLoginButtons onProviderPress={handleProviderLogin} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.xxl,
  },
});
