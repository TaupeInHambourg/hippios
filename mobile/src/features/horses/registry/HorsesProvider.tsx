import { useState, type ReactNode } from "react";

import type { Horse, HorseValues } from "../types";
import { HorsesContext } from "./HorsesContext";

interface HorsesProviderProps {
  children: ReactNode;
}

/** In-memory horses until the horses API exists: nothing survives an app restart. */
export function HorsesProvider({ children }: HorsesProviderProps) {
  const [horses, setHorses] = useState<readonly Horse[]>([]);
  const [draft, setDraft] = useState<HorseValues | null>(null);
  const [isAwaitingSync, setIsAwaitingSync] = useState(false);

  const startSync = (values: HorseValues) => {
    setDraft(values);
    setIsAwaitingSync(true);
  };

  const completeSync = (sensorId: string): boolean => {
    if (!draft || !isAwaitingSync) {
      return false;
    }
    const horse: Horse = { ...draft, id: `${Date.now()}`, sensorId };
    setHorses((current) => [...current, horse]);
    setDraft(null);
    setIsAwaitingSync(false);
    return true;
  };

  return (
    <HorsesContext
      value={{
        horses,
        draft,
        isAwaitingSync,
        startSync,
        // Keeps the draft so the form is pre-filled when going back to it.
        cancelSync: () => setIsAwaitingSync(false),
        completeSync,
      }}
    >
      {children}
    </HorsesContext>
  );
}
