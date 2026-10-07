import { useState, type ReactNode } from "react";

import { MOCK_USER } from "../constants";
import type { LoginValues, RegisterValues, UserProfile } from "../types";
import { SessionContext } from "./SessionContext";

interface SessionProviderProps {
  children: ReactNode;
}

/**
 * In-memory session until better-auth is installed (CLAUDE.md §7): nothing is
 * persisted, so the user is signed out when the app restarts.
 */
export function SessionProvider({ children }: SessionProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [registrationDraft, setRegistrationDraft] = useState<RegisterValues | null>(null);

  const signIn = (_values: LoginValues) => {
    setUser(MOCK_USER);
  };

  const completeRegistration = () => {
    if (!registrationDraft) {
      return;
    }
    // The draft is kept until sign-out so the EULA screen never sees it vanish
    // while the navigator redirects to the signed-in area.
    setUser(registrationDraft);
  };

  const updateProfile = (changes: Partial<UserProfile>) => {
    setUser((current) => (current ? { ...current, ...changes } : current));
  };

  const signOut = () => {
    setUser(null);
    setRegistrationDraft(null);
  };

  return (
    <SessionContext
      value={{
        user,
        hasRegistrationDraft: registrationDraft !== null,
        signIn,
        startRegistration: setRegistrationDraft,
        completeRegistration,
        updateProfile,
        signOut,
        // Same as signing out until the account API exists.
        deleteAccount: signOut,
      }}
    >
      {children}
    </SessionContext>
  );
}
