import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Avatar } from "@/components/Avatar";
import { COLORS } from "@/lib/theme";

interface HorseAvatarProps {
  color: string;
  size: number;
}

// Placeholder picture until horse photos are available.
export function HorseAvatar({ color, size }: HorseAvatarProps) {
  return (
    <Avatar size={size} bordered ringColor={color}>
      <MaterialCommunityIcons name="horse-variant" size={size * 0.55} color={COLORS.primary} />
    </Avatar>
  );
}
