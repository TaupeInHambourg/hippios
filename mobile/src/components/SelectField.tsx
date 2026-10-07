import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { FieldError } from "./FieldError";
import { FieldLabel, getFieldAccessibilityLabel } from "./FieldLabel";
import { SearchableOptionsModal } from "./SearchableOptionsModal";
import { SelectOptionsModal, type SelectOption } from "./SelectOptionsModal";

import { COLORS, FONT_SIZE, RADIUS, SPACING, TOUCH_TARGET } from "@/lib/theme";

interface SelectFieldProps {
  label: string;
  placeholder: string;
  options: readonly SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string | undefined;
  /** Adds a search box to the options list, for long lists. */
  searchable?: boolean;
  /** Accepts a typed value that is not in the options (searchable lists only). */
  allowCustomValue?: boolean;
}

export function SelectField({
  label,
  placeholder,
  options,
  value,
  onChange,
  required = false,
  error,
  searchable = false,
  allowCustomValue = false,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);
  const customLabel = allowCustomValue && value ? value : undefined;
  const displayedLabel = selectedOption?.label ?? customLabel;

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <View>
      <FieldLabel label={label} required={required} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={getFieldAccessibilityLabel(label, required)}
        accessibilityValue={{ text: displayedLabel ?? placeholder }}
        accessibilityState={{ expanded: isOpen }}
        onPress={() => setIsOpen(true)}
        style={[styles.trigger, error ? styles.triggerError : null]}
      >
        <Text style={displayedLabel ? styles.value : styles.placeholder} numberOfLines={1}>
          {displayedLabel ?? placeholder}
        </Text>
        <Ionicons name="chevron-down" size={24} color={COLORS.foreground} />
      </Pressable>
      <FieldError message={error} />
      {searchable ? (
        <SearchableOptionsModal
          title={label}
          visible={isOpen}
          options={options}
          selectedValue={value}
          allowCustomValue={allowCustomValue}
          onSelect={handleSelect}
          onClose={() => setIsOpen(false)}
        />
      ) : (
        <SelectOptionsModal
          title={label}
          visible={isOpen}
          options={options}
          selectedValue={value}
          onSelect={handleSelect}
          onClose={() => setIsOpen(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    minHeight: TOUCH_TARGET - SPACING.xs,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
  },
  triggerError: {
    borderColor: COLORS.danger,
  },
  value: {
    flexShrink: 1,
    fontSize: FONT_SIZE.sm,
    color: COLORS.foreground,
  },
  placeholder: {
    flexShrink: 1,
    fontSize: FONT_SIZE.sm,
    fontStyle: "italic",
    color: COLORS.muted,
  },
});
