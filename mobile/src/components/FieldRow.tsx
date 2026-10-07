import { Children, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { SPACING } from "@/lib/theme";

interface FieldRowProps {
  children: ReactNode;
}

/** Lays out form fields side by side with equal widths. */
export function FieldRow({ children }: FieldRowProps) {
  return (
    <View style={styles.row}>
      {Children.map(children, (child) => (
        <View style={styles.item}>{child}</View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: SPACING.xl,
  },
  item: {
    flex: 1,
  },
});
