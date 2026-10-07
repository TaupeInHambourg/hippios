const MAX_SENSOR_ID_LENGTH = 128;
const SENSOR_ID_PATTERN = /^[\w-]+$/;

/**
 * Extracts the sensor ID from a scanned QR code. The payload comes from the
 * outside world, so anything that does not look like an ID is rejected.
 * The format is a placeholder until the sensor QR specification is known.
 */
export function parseSensorId(data: string): string | null {
  const candidate = data.trim();
  if (candidate.length === 0 || candidate.length > MAX_SENSOR_ID_LENGTH) {
    return null;
  }
  return SENSOR_ID_PATTERN.test(candidate) ? candidate : null;
}
