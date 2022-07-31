import React, { FC, useMemo } from "react";
import { LayoutColor } from "../styles/css-var";
import { useLayout } from "../styles/layout-provider";
import RadioButtons, { RadioButtonsAttributes } from "../elements/inputs/radio-buttons";
import SelectBox, { SelectBoxAttributes } from "../elements/inputs/select-box";

type Options = {
  $unset?: boolean;
  $labels?: {
    unset?: string;
    system?: string;
    light?: string;
    dark?: string;
  };
  $customColors?: Array<{
    value: string;
    label: string;
  }>;
};

const layoutColorSource = (options?: Options) => {
  return [
    ...(options.$unset ? [{ label: options.$labels?.unset ?? "unset", value: null }] : []),
    { label: options.$labels?.system ?? "System", value: "system" },
    { label: options.$labels?.light ?? "Lignt", value: "light" },
    { label: options.$labels?.dark ?? "Dark", value: "dark" },
    ...(options.$customColors ?? []),
  ];
};

export const LayoutColorRadioButtons: FC<Omit<RadioButtonsAttributes<LayoutColor>, "$dispatch" | "$value" | "$source"> & Options> = (attrs) => {
  const layout = useLayout();
  return (
    <RadioButtons
      {...attrs}
      $value={layout.color}
      $dispatch={layout.setColor}
      $source={useMemo(() => {
        return layoutColorSource(attrs);
      }, [attrs.$unset, attrs.$customColors])}
    />
  );
};

export const LayoutColorSelectBox: FC<Omit<SelectBoxAttributes<LayoutColor>, "$dispatch" | "$value" | "$source"> & Options> = (attrs) => {
  const layout = useLayout();
  return (
    <SelectBox
      {...attrs}
      $value={layout.color}
      $dispatch={layout.setColor}
      $source={useMemo(() => {
        return layoutColorSource(attrs);
      }, [attrs.$unset, attrs.$customColors])}
    />
  );
};

export default layoutColorSource;