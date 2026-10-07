import { useContext } from "react";

import { SessionContext, type SessionContextValue } from "./SessionContext";

export function useSession(): SessionContextValue {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useSession must be used inside a SessionProvider");
  }
  return session;
}
