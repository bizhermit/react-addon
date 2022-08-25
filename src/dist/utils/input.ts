import { inputCn } from "../styles/input-style";
import { attributesWithoutChildren } from "./attributes";

export const inputMode = (attrs: { $disabled?: boolean; $readOnly?: boolean; }, ext?: { d?: boolean; r?: boolean; }) => {
  if (attrs.$disabled || ext?.d) return "d"; // disabled
  if (attrs.$readOnly || ext?.r) return "r"; // readonly
  return "e"; // editable
};

export const inputAttributes = (attrs: { [key: string]: any }, ...cns: Array<string>) => {
  const retAttrs = attributesWithoutChildren(attrs, ...cns);
  if ("tabIndex" in retAttrs) {
    delete retAttrs["tabIndex"];
  }
  retAttrs.className = `${inputCn} ${retAttrs.className ?? ""}`;
  retAttrs["data-color"] = attrs.$color ?? "default";
  retAttrs["data-m"] = inputMode(attrs);
  if (attrs.$placeholder) retAttrs["data-placeholder"] = attrs.$placeholder;
  return retAttrs;
};

export const inputFieldAttributes = (attrs: { [key: string]: any }, ...cns: Array<string>) => {
  const retAttrs = inputAttributes(attrs, ...cns);
  retAttrs["data-t"] = "f";
  retAttrs["data-border"] = attrs.$border ?? "round";
  return retAttrs;
}

export type InputHook<T, Q extends {[key: string]: any} = {}> = {
  focus: () => void;
  getValue: () => T;
  setValue: (value: T) => void;
} & Q;