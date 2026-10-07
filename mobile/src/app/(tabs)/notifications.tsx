import { HeaderActions } from "@/components/HeaderActions";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { MOCK_NOTIFICATIONS, NotificationList } from "@/features/notifications";

export default function NotificationsScreen() {
  return (
    <Screen>
      <ScreenHeader title="Notifications" actions={<HeaderActions />} />
      <NotificationList notifications={MOCK_NOTIFICATIONS} />
    </Screen>
  );
}
