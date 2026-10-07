import { useHorses } from "../registry/useHorses";
import { sortByUrgency } from "./healthStatus";
import { MOCK_HORSE_OVERVIEWS } from "./mockHealth";
import type { HorseOverview } from "./types";

import { COLORS } from "@/lib/theme";

/**
 * Every horse of the user, most urgent first. Horses added in the app have no
 * sensor data yet, so they come last with a pending status.
 */
export function useHorseOverviews(): HorseOverview[] {
  const { horses } = useHorses();
  const addedHorses: HorseOverview[] = horses.map((horse) => ({
    id: horse.id,
    name: horse.name,
    color: horse.color ?? COLORS.primary,
    health: null,
  }));
  return sortByUrgency([...MOCK_HORSE_OVERVIEWS, ...addedHorses]);
}
