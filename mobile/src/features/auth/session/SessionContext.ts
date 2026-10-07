import { createContext } from "react";

import type { LoginValues, RegisterValues, UserProfile } from "../types";

export interface SessionContextValue {
  user: UserProfile | null;
  hasRegistrationDraft: boolean;
  signIn: (values: LoginValues) => void;
  startRegistration: (values: RegisterValues) => void;
  completeRegistration: () => void;
  updateProfile: (changes: Partial<UserProfile>) => void;
  signOut: () => void;
  deleteAccount: () => void;
}

export const SessionContext = createContext<SessionContextValue | null>(null);
