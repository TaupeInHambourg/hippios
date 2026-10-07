export type NotificationKind = "reminder" | "alert" | "watch" | "document" | "appointment";

export type AlertLevel = "critical" | "warning";

export interface MessagePart {
  text: string;
  emphasized: boolean;
}

export interface AppNotification {
  id: string;
  horseName: string;
  kind: NotificationKind;
  title: string;
  alertLevel: AlertLevel | null;
  message: readonly MessagePart[];
}
