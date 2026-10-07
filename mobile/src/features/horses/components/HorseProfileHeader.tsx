import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import type { HorseDetail, HorseSex } from "../detail/types";
import { HorseAvatar } from "./HorseAvatar";

import { HorseChip } from "@/components/HorseChip";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

const SEX_LABELS: Record<HorseSex, string> = { male: "Mâle", female: "Femelle", gelding: "Hongre" };
const SEX_ICONS: Record<HorseSex, "gender-male" | "gender-female"> = {
  male: "gender-male",
  female: "gender-female",
  gelding: "gender-male",
};

/** 1.7 gives "1m70". */
function formatHeight(meters: number): string {
  const whole = Math.floor(meters);
  return `${whole}m${Math.round((meters - whole) * 100)
    .toString()
    .padStart(2, "0")}`;
}

function joinDefined(parts: readonly (string | null)[]): string {
  return parts.filter((part): part is string => part !== null).join(" - ");
}

interface HorseProfileHeaderProps {
  horse: HorseDetail;
}

export function HorseProfileHeader({ horse }: HorseProfileHeaderProps) {
  const { breed, sex, ageYears, heightMeters, weightKg } = horse.profile;
  const age = ageYears !== null ? `${ageYears} ${ageYears > 1 ? "ans" : "an"}` : null;
  const size = joinDefined([
    heightMeters !== null ? formatHeight(heightMeters) : null,
    weightKg !== null ? `${weightKg}kg` : null,
  ]);

  return (
    <View style={styles.container}>
      <HorseAvatar color={horse.color} size={72} />
      <View style={styles.details}>
        <View style={styles.row}>
          <HorseChip name={horse.name} color={horse.color} />
          {breed ? <Text style={styles.text}>{breed}</Text> : null}
        </View>
        <View style={styles.row}>
          {sex ? (
            <View accessible accessibilityLabel={SEX_LABELS[sex]}>
              <MaterialCommunityIcons name={SEX_ICONS[sex]} size={20} color={COLORS.foreground} />
            </View>
          ) : null}
          {age ? <Text style={styles.text}>{sex ? `- ${age}` : age}</Text> : null}
          {size ? <Text style={styles.text}>{size}</Text> : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.lg,
  },
  details: {
    flex: 1,
    gap: SPACING.sm,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: SPACING.sm,
  },
  text: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.foreground,
  },
});
