import { useCameraPermissions } from "expo-camera";
import { ActivityIndicator } from "react-native";

import { CameraPermissionRequest } from "./CameraPermissionRequest";
import { QrCameraPreview } from "./QrCameraPreview";

import { COLORS } from "@/lib/theme";

interface SensorScannerProps {
  onSensorScanned: (sensorId: string) => void;
}

export function SensorScanner({ onSensorScanned }: SensorScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <ActivityIndicator accessibilityLabel="Chargement" color={COLORS.primary} />;
  }

  if (!permission.granted) {
    return (
      <CameraPermissionRequest canAskAgain={permission.canAskAgain} onRequest={requestPermission} />
    );
  }

  return <QrCameraPreview onSensorScanned={onSensorScanned} />;
}
