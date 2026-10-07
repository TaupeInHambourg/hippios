import { Redirect } from "expo-router";

import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { LegalAgreement, useSession } from "@/features/auth";

// Wired once the privacy policy URL or screen exists.
const handlePrivacyPolicyPress = () => {};

export default function LegalScreen() {
  const { hasRegistrationDraft, completeRegistration } = useSession();

  // The EULA closes the sign-up flow: it cannot be reached without the form data.
  if (!hasRegistrationDraft) {
    return <Redirect href="/register" />;
  }

  return (
    <Screen scrollable>
      <ScreenHeader title="Informations juridiques" />
      <LegalAgreement
        onContinue={completeRegistration}
        onPrivacyPolicyPress={handlePrivacyPolicyPress}
      />
    </Screen>
  );
}
