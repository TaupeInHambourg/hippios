import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { ComingSoon } from "@/components/ComingSoon";
import { HeaderActions } from "@/components/HeaderActions";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { SegmentedTabs, type SegmentedTab } from "@/components/SegmentedTabs";
import { AccountSummary, ProfileDetails } from "@/features/account";
import { ProfileForm, useSession, type UserProfile } from "@/features/auth";
import { SPACING } from "@/lib/theme";

type AccountSection = "profile" | "documents" | "agenda";

const SECTIONS: readonly SegmentedTab<AccountSection>[] = [
  { label: "Profil", value: "profile" },
  { label: "Documents", value: "documents" },
  { label: "Agenda", value: "agenda" },
];

export default function AccountScreen() {
  const { user, updateProfile, signOut, deleteAccount } = useSession();
  const [section, setSection] = useState<AccountSection>("profile");
  const [isEditing, setIsEditing] = useState(false);

  // The root layout guard redirects signed-out users before this renders.
  if (!user) {
    return null;
  }

  const confirmDeleteAccount = () => {
    Alert.alert("Supprimer le compte", "Cette action est définitive.", [
      { text: "Annuler", style: "cancel" },
      { text: "Supprimer", style: "destructive", onPress: deleteAccount },
    ]);
  };

  const saveProfile = (values: UserProfile) => {
    updateProfile(values);
    setIsEditing(false);
  };

  const renderProfile = () =>
    isEditing ? (
      <ProfileForm
        initialValues={user}
        submitLabel="Enregistrer"
        onSubmit={saveProfile}
        onCancel={() => setIsEditing(false)}
      />
    ) : (
      <ProfileDetails
        user={user}
        onNotificationsChange={(notifications) => updateProfile({ notifications })}
        onEdit={() => setIsEditing(true)}
        onSignOut={signOut}
      />
    );

  return (
    <Screen scrollable>
      <ScreenHeader title="Mon compte" actions={<HeaderActions />} />
      <View style={styles.content}>
        <AccountSummary
          fullName={`${user.firstName} ${user.lastName}`}
          onDeleteAccount={confirmDeleteAccount}
        />
        <SegmentedTabs tabs={SECTIONS} value={section} onChange={setSection} />
        {section === "profile" ? renderProfile() : <ComingSoon />}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.xl,
  },
});
