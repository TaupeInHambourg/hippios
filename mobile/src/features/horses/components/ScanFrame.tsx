import { StyleSheet, View } from "react-native";

import { COLORS } from "@/lib/theme";

const CORNER_SIZE = 50;
const CORNER_WIDTH = 1;
const CORNER_INSET = 8;

/** Viewfinder corners drawn over the camera preview. */
export function ScanFrame() {
  return (
    <View accessible={false} pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />
    </View>
  );
}

const styles = StyleSheet.create({
  corner: {
    position: "absolute",
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: COLORS.primaryForeground,
  },
  topLeft: {
    top: CORNER_INSET,
    left: CORNER_INSET,
    borderTopWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
  },
  topRight: {
    top: CORNER_INSET,
    right: CORNER_INSET,
    borderTopWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
  },
  bottomLeft: {
    bottom: CORNER_INSET,
    left: CORNER_INSET,
    borderBottomWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
  },
  bottomRight: {
    bottom: CORNER_INSET,
    right: CORNER_INSET,
    borderBottomWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
  },
});
