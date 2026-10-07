import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { EULA_PARAGRAPHS } from "../constants";

import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { COLORS, FONT_SIZE, SPACING } from "@/lib/theme";

interface LegalAgreementProps {
  onContinue: () => void;
  onPrivacyPolicyPress: () => void;
}

export function LegalAgreement({ onContinue, onPrivacyPolicyPress }: LegalAgreementProps) {
  const [hasAccepted, setHasAccepted] = useState(false);

  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        Contrat de licence utilisateur final
      </Text>
      <View style={styles.paragraphs}>
        {EULA_PARAGRAPHS.map((paragraph) => (
          <Text key={paragraph} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}
      </View>
      <Checkbox
        label="J’ai lu et j’accepte le CLUF"
        checked={hasAccepted}
        onChange={setHasAccepted}
      />
      <Text style={styles.privacy}>
        La protection de votre vie privée est importante pour Hippios. Vous pouvez consulter la
        politique de confidentialité de Hippios.{" "}
        <Text accessibilityRole="link" onPress={onPrivacyPolicyPress} style={styles.link}>
          Politique de confidentialité.
        </Text>
      </Text>
      <Button label="Continuer" disabled={!hasAccepted} onPress={onContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.foreground,
  },
  paragraphs: {
    gap: SPACING.xl,
  },
  paragraph: {
    fontSize: FONT_SIZE.sm,
    lineHeight: SPACING.xl,
    color: COLORS.foreground,
  },
  privacy: {
    fontSize: FONT_SIZE.sm,
    lineHeight: SPACING.xl,
    color: COLORS.foreground,
  },
  link: {
    textDecorationLine: "underline",
  },
});
