import { HeaderActions } from "@/components/HeaderActions";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useSession } from "@/features/auth";
import { HomeGreeting } from "@/features/home";

export default function HomeScreen() {
  const { user } = useSession();

  return (
    <Screen scrollable>
      <ScreenHeader title="Accueil" showBack={false} actions={<HeaderActions />} />
      {user ? <HomeGreeting firstName={user.firstName} /> : null}
    </Screen>
  );
}
