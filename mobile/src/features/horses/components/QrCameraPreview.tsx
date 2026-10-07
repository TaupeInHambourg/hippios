import { CameraView, type BarcodeScanningResult } from "expo-camera";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import { parseSensorId } from "../sensor";
import { ScanFrame } from "./ScanFrame";

import { FieldError } from "@/components/FieldError";
import { COLORS, SPACING } from "@/lib/theme";

const PREVIEW_SIZE = 270;
const INVALID_QR_MESSAGE = "Ce QR code ne correspond pas à un capteur Hippios.";

interface QrCameraPreviewProps {
  onSensorScanned: (sensorId: string) => void;
}

export function QrCameraPreview({ onSensorScanned }: QrCameraPreviewProps) {
  // The camera fires many events per second: refs stop duplicate handling.
  const hasScannedRef = useRef(false);
  const lastRejectedRef = useRef<string | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleBarcodeScanned = ({ data }: BarcodeScanningResult) => {
    if (hasScannedRef.current || data === lastRejectedRef.current) {
      return;
    }
    const sensorId = parseSensorId(data);
    if (!sensorId) {
      lastRejectedRef.current = data;
      setError(INVALID_QR_MESSAGE);
      return;
    }
    hasScannedRef.current = true;
    onSensorScanned(sensorId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        <CameraView
          accessibilityLabel="Aperçu de l’appareil photo"
          style={StyleSheet.absoluteFill}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={handleBarcodeScanned}
        />
        <ScanFrame />
      </View>
      <FieldError message={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: SPACING.sm,
  },
  preview: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    overflow: "hidden",
    backgroundColor: COLORS.surface,
  },
});
