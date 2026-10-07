import { useHorseOverviews } from "../health/useHorseOverviews";
import { useHorses } from "../registry/useHorses";
import type { HorseValues } from "../types";
import { MOCK_HORSE_DETAILS, deriveReadings } from "./mockDetails";
import type { HorseDetail, HorseProfile, HorseSex } from "./types";

const HORSE_SEXES: readonly HorseSex[] = ["male", "female", "gelding"];

function isHorseSex(value: string | null): value is HorseSex {
  return HORSE_SEXES.some((sex) => sex === value);
}

/** Form values are strings like "1,70": invalid numbers become null. */
function parseNumber(value: string): number | null {
  const parsed = Number.parseFloat(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function profileFromValues(values: HorseValues): HorseProfile {
  return {
    breed: values.coat ? `${values.breed} ${values.coat.toLowerCase()}` : values.breed,
    sex: isHorseSex(values.sex) ? values.sex : null,
    ageYears: parseNumber(values.age),
    heightMeters: parseNumber(values.height),
    weightKg: parseNumber(values.weight),
  };
}

function getMockLastUpdate(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 10);
}

/** Null when no horse matches the id (e.g. an outdated link). */
export function useHorseDetail(horseId: string | undefined): HorseDetail | null {
  const overviews = useHorseOverviews();
  const { horses } = useHorses();
  const overview = overviews.find((horse) => horse.id === horseId);
  if (!overview) {
    return null;
  }

  const base = { id: overview.id, name: overview.name, color: overview.color };
  const mock = MOCK_HORSE_DETAILS[overview.id];
  if (mock) {
    return {
      ...base,
      profile: mock.profile,
      lastUpdate: getMockLastUpdate(),
      readings: deriveReadings(mock.baseReadings),
    };
  }

  const added = horses.find((horse) => horse.id === overview.id);
  return {
    ...base,
    profile: added
      ? profileFromValues(added)
      : { breed: "", sex: null, ageYears: null, heightMeters: null, weightKg: null },
    lastUpdate: null,
    readings: null,
  };
}
