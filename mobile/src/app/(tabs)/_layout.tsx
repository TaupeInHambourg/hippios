import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router/js-tabs";
import { StyleSheet, type ColorValue } from "react-native";

import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "@/lib/theme";

const ICON_SIZE = 28;

interface TabIconProps {
  color: ColorValue;
}

const renderHomeIcon = ({ color }: TabIconProps) => (
  <Ionicons name="home" size={ICON_SIZE} color={color} />
);
const renderHorsesIcon = ({ color }: TabIconProps) => (
  <MaterialCommunityIcons name="horse-variant" size={ICON_SIZE} color={color} />
);
const renderAddIcon = ({ color }: TabIconProps) => (
  <Ionicons name="add-circle" size={ICON_SIZE} color={color} />
);
const renderAgendaIcon = ({ color }: TabIconProps) => (
  <Ionicons name="calendar" size={ICON_SIZE} color={color} />
);

export default function TabsLayout() {
  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: COLORS.primaryForeground,
        tabBarInactiveTintColor: COLORS.primaryForegroundMuted,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Accueil", tabBarIcon: renderHomeIcon }} />
      <Tabs.Screen name="horses" options={{ title: "Mes chevaux", tabBarIcon: renderHorsesIcon }} />
      <Tabs.Screen name="add" options={{ title: "Ajouter", tabBarIcon: renderAddIcon }} />
      <Tabs.Screen name="agenda" options={{ title: "Agenda", tabBarIcon: renderAgendaIcon }} />
      {/* Reachable from the header actions, hidden from the tab bar. */}
      <Tabs.Screen name="account" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: SPACING.sm,
    borderTopWidth: 0,
    backgroundColor: COLORS.primary,
  },
  tabBarLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
  },
});
