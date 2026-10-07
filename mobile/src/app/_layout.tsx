import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { SessionProvider, useSession } from "@/features/auth";
import { HorsesProvider } from "@/features/horses";

export default function RootLayout() {
  return (
    <SessionProvider>
      <StatusBar style="dark" />
      <RootNavigator />
    </SessionProvider>
  );
}

// Switching the guards redirects automatically: signing in lands on the tabs,
// signing out goes back to the auth flow.
function RootNavigator() {
  const { user } = useSession();
  const isSignedIn = user !== null;

  return (
    // Remounting on sign-in/out drops the previous user's horses.
    <HorsesProvider key={isSignedIn ? "signed-in" : "signed-out"}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isSignedIn}>
          <Stack.Screen name="(tabs)" />
          {/* Outside the tabs: the sensor sync screens have no tab bar. */}
          <Stack.Screen name="scan-sensor" />
          <Stack.Screen name="sync-success" />
        </Stack.Protected>
        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </HorsesProvider>
  );
}
