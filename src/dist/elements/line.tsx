import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import React, { FC, HTMLAttributes } from "react";
import CssVar from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributes } from "../utils/attributes";

const cn = "bh-line";
type LineAttributes = HTMLAttributes<HTMLHRElement> & {
  $bold?: boolean | number;
  $margin?: boolean | number;
  $padding?: boolean | number;
};

const HLine: FC<LineAttributes> = (attrs) => {
  return (
    <>
      <hr
        {...attributes(attrs, `${cn}_h`)}
        data-b={attrs.$bold}
        data-m={attrs.$margin}
        data-p={attrs.$padding}
      />
      {Style}
    </>
  );
};

export const VLine: FC<LineAttributes> = (attrs) => {
  return (
    <>
      <hr
        {...attributes(attrs, `${cn}_v`)}
        data-b={attrs.$bold}
        data-m={attrs.$margin}
        data-p={attrs.$padding}
      />
      {Style}
    </>
  )
};

const Style = <JsxStyle id={cn}>{() => `
.${cn}_h,
.${cn}_v {
  box-sizing: border-box;
  border: none;
  margin: 0px;
  padding: 0px;
  background: ${CssVar.bdc};
  flex: none;
  border-radius: 9999px;
}
.${cn}_h {
  width: 100%;
  height: ${CssVar.bsize};
}
.${cn}_v {
  height: 100%;
  width: ${CssVar.bsize};
}
.${cn}_h[data-m="true"] {
  margin-top: calc(${CssVar.pdy});
  margin-bottom: calc(${CssVar.pdy});
}
.${cn}_h[data-p="true"] {
  margin-left: calc(${CssVar.pdy} / 2);
  width: calc(100% - ${CssVar.pdy});
}
.${cn}_v[data-m="true"] {
  margin-left: calc(${CssVar.pdy});
  margin-right: calc(${CssVar.pdy});
}
.${cn}_v[data-p="true"] {
  margin-top: calc(${CssVar.pdy} / 2);
  height: calc(100% - ${CssVar.pdy});
}
${ArrayUtils.generateArray(10, lvl => {
if (lvl === 0) return "";
return `
.${cn}_h[data-m="${lvl}"] {
  margin-top: calc(${CssVar.pdy} * ${lvl});
  margin-bottom: calc(${CssVar.pdy} * ${lvl});
}
.${cn}_h[data-p="${lvl}"] {
  margin-left: calc(${CssVar.pdy} * ${lvl} / 2);
  width: calc(100% - ${CssVar.pdy} * ${lvl});
}
.${cn}_v[data-m="${lvl}"] {
  margin-left: calc(${CssVar.pdy} * ${lvl});
  margin-right: calc(${CssVar.pdy} * ${lvl});
}
.${cn}_v[data-p="${lvl}"] {
  margin-top: calc(${CssVar.pdy} * ${lvl} / 2);
  height: calc(100% - ${CssVar.pdy} * ${lvl});
}`;
}).join("")}
.${cn}_h[data-b="true"] {
  height: calc(${CssVar.bsize} * 2);
}
.${cn}_v[data-b="true"] {
  width: calc(${CssVar.bsize} * 2);
}
${ArrayUtils.generateArray(6, level => {
if (level === 0) return "";
const lvl = level + 1;
return `
.${cn}_h[data-b="${level}"] {
  height: calc(${CssVar.bsize} * ${lvl});
}
.${cn}_v[data-b="${level}"] {
  width: calc(${CssVar.bsize} * ${lvl});
}`;
}).join("")}
`}</JsxStyle>;

export default HLine;