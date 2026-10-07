import { createContext } from "react";

import type { Horse, HorseValues } from "../types";

export interface HorsesContextValue {
  horses: readonly Horse[];
  /** Values of the horse being added, kept while the sensor is synchronized. */
  draft: HorseValues | null;
  isAwaitingSync: boolean;
  startSync: (values: HorseValues) => void;
  cancelSync: () => void;
  /** Returns false when there is no horse waiting for a sensor. */
  completeSync: (sensorId: string) => boolean;
}

export const HorsesContext = createContext<HorsesContextValue | null>(null);
