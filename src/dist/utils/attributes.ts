import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import { ReactElement, ReactNode } from "react";
import { Color, ColorType, FitToOuter } from "../styles/css-var";

export type ColorAttributes = {
  $color?: Color;
  $colorType?: ColorType;
  $fgColor?: Color;
  $fgColorType?: ColorType;
  $bgColor?: Color;
  $bgColorType?: ColorType;
  $bdColor?: Color;
  $bdColorType?: ColorType;
};

export const attributes = (attrs: {[key: string]: any}, ...cns: Array<string>) => {
  const retAttrs = {
    ...attrs,
    className: StringUtils.join(" ", ...cns, attrs.className),
  };
  Object.keys(retAttrs).forEach(key => {
    if (key[0] === "$") {
      delete retAttrs[key];
    }
  });
  return retAttrs;
};
export const attributesWithoutChildren = (attrs: {[key: string]: any}, ...cns: Array<string>) => {
  const retAttrs = attributes(attrs, ...cns);
  if ("children" in retAttrs) {
    delete retAttrs["children"];
  }
  return retAttrs;
};

export const dBool = (flag?: boolean) => {
  return flag === true;
};

export const dPosX = (l?: boolean, c?: boolean, r?: boolean) => {
  if (l) return "l";
  if (c) return "c";
  if (r) return "r";
  return undefined;
};

export const dPosY = (t?: boolean, m?: boolean, b?: boolean) => {
  if (t) return "t";
  if (m) return "m";
  if (b) return "b";
  return undefined;
};

export const ftoCn = (fto?: FitToOuter) => {
  if (StringUtils.isEmpty(fto)) return "bh-fto";
  return `bh-fto-${fto}`;
};
export const paddingCn = (padding?: boolean | number) => {
  if (padding == null) return "";
  if (typeof padding === "boolean") return padding ? "bh-pad-2" : "";
  return `bh-pad-${padding}`;
};
export const shadowCn = (shadow?: boolean | number) => {
  if (shadow == null) return "";
  if (typeof shadow === "boolean") return shadow ? "bh-sd-2" : "";
  return `bh-sd-${shadow < 0 ? "n" : ""}${Math.abs(shadow)}`;
};
export const dropShadowCn = (shadow?: boolean | number) => {
  if (shadow == null) return "";
  if (typeof shadow === "boolean") return shadow ? "bh-dsd-2" : "";
  return `bh-dsd-${shadow}`;
};
export const colorCn = (color?: Color, type?: ColorType) => {
  if (color == null) return "";
  return `bh-c_${color}_${type || "base"}`;
};
export const fgColorCn = (color?: Color, type?: ColorType) => {
  if (color == null) return "";
  return `bh-fgc_${color}_${type || "base"}`;
};
export const bgColorCn = (color?: Color, type?: ColorType) => {
  if (color == null) return "";
  return `bh-bgc_${color}_${type || "base"}`;
};
export const bdColorCn = (color?: Color, type?: ColorType) => {
  if (color == null) return "";
  return `bh-bdc_${color}_${type || "base"}`;
};
export const colorsCn = (attrs: ColorAttributes) => {
  if (attrs == null) return [];
  return [
    colorCn(attrs.$color, attrs.$colorType),
    fgColorCn(attrs.$fgColor, attrs.$fgColorType),
    bgColorCn(attrs.$bgColor, attrs.$bgColorType),
    bdColorCn(attrs.$bdColor, attrs.$bdColorType)
  ];
};

export const convertClassNames = (classNames: string | Array<string>) => {
  if (classNames) {
    if (typeof classNames === "string") return [classNames];
    return classNames;
  }
  return undefined;
};

export const isReactElement = (node: ReactNode): node is ReactElement<any> => {
  if (node == null) return false;
  if (typeof node !== "object") return false;
  if (Array.isArray(node)) return false;
  return true;
};