import { StyleSheet, View } from "react-native";

import { Button } from "@/components/Button";
import { InfoItem } from "@/components/InfoItem";
import { SelectField } from "@/components/SelectField";
import { NOTIFICATION_OPTIONS, type UserProfile } from "@/features/auth";
import { SPACING } from "@/lib/theme";

interface ProfileDetailsProps {
  user: UserProfile;
  onNotificationsChange: (value: string) => void;
  onEdit: () => void;
  onSignOut: () => void;
}

export function ProfileDetails({
  user,
  onNotificationsChange,
  onEdit,
  onSignOut,
}: ProfileDetailsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <InfoItem label="Prénom" value={user.firstName} />
        <InfoItem label="Nom" value={user.lastName} />
      </View>
      <InfoItem label="Numéro de téléphone" value={user.phone} />
      <InfoItem label="Adresse" value={user.address} />
      <InfoItem label="Ville" value={user.city} />
      <InfoItem label="Adresse e-mail" value={user.email} />
      <SelectField
        label="Notifications"
        placeholder="Sélectionnez un événement"
        options={NOTIFICATION_OPTIONS}
        value={user.notifications}
        onChange={onNotificationsChange}
      />
      <View style={styles.actions}>
        <Button label="Modifier" onPress={onEdit} />
        <Button label="Se déconnecter" variant="outline" onPress={onSignOut} />
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
  actions: {
    gap: SPACING.xl,
    marginTop: SPACING.lg,
  },
});
