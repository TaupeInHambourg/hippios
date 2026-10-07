import type { HorseValues } from "./types";

import type { SelectOption } from "@/components/SelectOptionsModal";

export const SEX_OPTIONS: readonly SelectOption[] = [
  { label: "Mâle", value: "male" },
  { label: "Femelle", value: "female" },
  { label: "Hongre", value: "gelding" },
];

export const EMPTY_HORSE: HorseValues = {
  name: "",
  age: "",
  sex: null,
  breed: "",
  weight: "",
  height: "",
  coat: "",
  microchipId: "",
  color: null,
};
