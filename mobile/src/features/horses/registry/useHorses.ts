import { useContext } from "react";

import { HorsesContext, type HorsesContextValue } from "./HorsesContext";

export function useHorses(): HorsesContextValue {
  const horses = useContext(HorsesContext);
  if (!horses) {
    throw new Error("useHorses must be used inside a HorsesProvider");
  }
  return horses;
}
