import { useRouter } from "expo-router";

import { Screen } from "@/components/Screen";
import { SyncSuccess } from "@/features/horses";

export default function SyncSuccessScreen() {
  const router = useRouter();

  // Leaves the sync flow and lands on the horses tab, where the new horse is listed.
  const handleCompleteProfile = () => {
    router.dismissAll();
    router.navigate("/horses");
  };

  return (
    <Screen>
      <SyncSuccess onCompleteProfile={handleCompleteProfile} />
    </Screen>
  );
}
