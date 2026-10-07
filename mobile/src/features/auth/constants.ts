import type { UserProfile } from "./types";

import type { SelectOption } from "@/components/SelectOptionsModal";

// Placeholder options until the notification preferences are specified.
export const NOTIFICATION_OPTIONS: readonly SelectOption[] = [
  { label: "Toutes les alertes", value: "all" },
  { label: "Alertes importantes uniquement", value: "important" },
  { label: "Aucune notification", value: "none" },
];

// Placeholder text until the legal team provides the final EULA.
export const EULA_PARAGRAPHS: readonly string[] = [
  "Lorem ipsum dolor sit amet consectetur. Rhoncus amet at sed euismod etiam consequat lobortis vitae egestas. Scelerisque libero nibh pulvinar faucibus nisl morbi. Auctor tincidunt turpis enim pulvinar sed ac posuere at pretium. Malesuada volutpat est pulvinar at elementum sapien sagittis velit. Diam mi nec ullamcorper tincidunt a ullamcorper habitant urna rhoncus. Praesent faucibus bibendum nibh turpis. Tortor elit nec venenatis mattis pellentesque vitae eu. Vulputate elit posuere eget arcu. Suscipit parturient blandit ornare convallis in enim. Lorem ipsum dolor sit amet consectetur.",
  "Rhoncus amet at sed euismod etiam consequat lobortis vitae egestas. Scelerisque libero nibh pulvinar faucibus nisl morbi. Auctor tincidunt turpis enim pulvinar sed ac posuere at pretium.",
];

// Signed-in user until the auth API exists.
export const MOCK_USER: UserProfile = {
  firstName: "Jeanne",
  lastName: "Dupont",
  phone: "01 01 02 02 03",
  address: "12 rue de la Prairie",
  city: "Nantes, France",
  email: "jeanne.dupont@email.com",
  notifications: null,
};
