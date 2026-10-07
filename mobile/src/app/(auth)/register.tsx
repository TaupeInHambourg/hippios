import { useRouter } from "expo-router";

import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { RegisterForm, useSession, type RegisterValues } from "@/features/auth";

export default function RegisterScreen() {
  const router = useRouter();
  const { startRegistration } = useSession();

  const handleSubmit = (values: RegisterValues) => {
    startRegistration(values);
    router.push("/legal");
  };

  return (
    <Screen scrollable>
      <ScreenHeader title="Inscription" />
      <RegisterForm onSubmit={handleSubmit} />
    </Screen>
  );
}
