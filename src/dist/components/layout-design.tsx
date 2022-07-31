import React, { FC, useMemo } from "react";
import { LayoutDesign } from "../styles/css-var";
import { useLayout } from "../styles/layout-provider";
import RadioButtons, { RadioButtonsAttributes } from "../elements/inputs/radio-buttons";
import SelectBox, { SelectBoxAttributes } from "../elements/inputs/select-box";

type Options = {
  $unset?: boolean;
  $labels?: {
    unset?: string;
    flat?: string;
    material?: string;
    neumorphism?: string;
  };
  $customDesigns?: Array<{
    value: string;
    label: string;
  }>;
};

const layoutDesignSource = (options?: Options) => {
  return [
    ...(options.$unset ? [{ label: options.$labels?.unset ?? "unset", value: null }] : []),
    { label: options.$labels?.flat ?? "Flat", value: "flat" },
    { label: options.$labels?.material ?? "Material", value: "material" },
    { label: options.$labels?.neumorphism ?? "Neumorphism", value: "neumorphism" },
    ...(options.$customDesigns ?? []),
  ];
};

export const LayoutDesignRadioButtons: FC<Omit<RadioButtonsAttributes<LayoutDesign>, "$dispatch" | "$value" | "$source"> & Options> = (attrs) => {
  const layout = useLayout();
  return (
    <RadioButtons
      {...attrs}
      $value={layout.design}
      $dispatch={layout.setDesign}
      $source={useMemo(() => {
        return layoutDesignSource(attrs);
      }, [attrs.$unset, attrs.$customDesigns])}
    />
  );
};

export const LayoutDesignSelectBox: FC<Omit<SelectBoxAttributes<LayoutDesign>, "$dispatch" | "$value" | "$source"> & Options> = (attrs) => {
  const layout = useLayout();
  return (
    <SelectBox
      {...attrs}
      $value={layout.design}
      $dispatch={layout.setDesign}
      $source={useMemo(() => {
        return layoutDesignSource(attrs);
      }, [attrs.$unset, attrs.$customDesigns])}
    />
  );
};

export default layoutDesignSource;