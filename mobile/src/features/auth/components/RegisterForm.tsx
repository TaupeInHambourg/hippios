import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import type { RegisterValues } from "../types";
import { ProfileForm } from "./ProfileForm";

import { Avatar } from "@/components/Avatar";
import { COLORS, SPACING } from "@/lib/theme";

const INITIAL_VALUES: RegisterValues = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  city: "",
  email: "",
  notifications: null,
};

interface RegisterFormProps {
  onSubmit: (values: RegisterValues) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {/* Photo upload requires expo-image-picker (not installed). */}
        <Avatar size={100}>
          <Ionicons name="person" size={50} color={COLORS.muted} />
        </Avatar>
      </View>
      <ProfileForm initialValues={INITIAL_VALUES} submitLabel="Valider" onSubmit={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xl,
  },
  avatar: {
    alignItems: "center",
  },
});
