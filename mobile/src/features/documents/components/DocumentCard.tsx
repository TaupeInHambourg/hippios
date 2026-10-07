import type { HorseDocument } from "../types";

import { ListCard } from "@/components/ListCard";
import { formatDateWithWeekday } from "@/lib/dates";

interface DocumentCardProps {
  document: HorseDocument;
  onPress: () => void;
}

export function DocumentCard({ document, onPress }: DocumentCardProps) {
  return (
    <ListCard
      title={document.title}
      subtitle={`Ajouté par ${document.addedBy} le ${formatDateWithWeekday(document.addedAt)}`}
      onPress={onPress}
    />
  );
}
