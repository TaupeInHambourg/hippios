export interface LoginValues {
  identifier: string;
  password: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  email: string;
  notifications: string | null;
}

export type RegisterValues = UserProfile;

export type AuthProvider = "google" | "apple";
