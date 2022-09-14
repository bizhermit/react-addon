import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import React, { HTMLAttributes } from "react"
import { Color, colorIterator, ColorType } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributes } from "../utils/attributes";

const cn = "bh-pgb";

export type ProgressBarAttributes = HTMLAttributes<HTMLDivElement> & {
  $mode?: "increment" | "phasedIncrement" | "flow"
  $color?: Color;
  $colorType?: ColorType;
  $overlay?: boolean;
};

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarAttributes>((attrs, ref) => {
  return (
    <div
      {...attributes(attrs, cn)}
      ref={ref}
      data-color={attrs.$color || "default"}
      data-colortype={attrs.$colorType || "base"}
      data-overlay={attrs.$overlay}
    >
      <div
        className={`${cn}-linear`}
        data-mode={attrs.$mode || "flow"}
      />
      {Style}  
    </div>
  );
});

const Style = <JsxStyle id={cn}>{() => `
.${cn} {
  box-sizing: border-box;
  display: block;
  width: 100%;
  overflow: hidden;
  height: 5px;
  flex: none;
}
.${cn}:not([data-overlay="true"]) {
  position: relative;
}
.${cn}[data-overlay="true"] {
  position: absolute;
  background: transparent !important;
  z-index: 999;
}
.${cn}-linear {
  box-sizing: border-box;
}
.${cn}-linear[data-mode="increment"],
.${cn}-linear[data-mode="phasedIncrement"] {
  position: relative;
  height: 100%;
}
.${cn}-linear[data-mode="increment"] {
  animation: ${cn}_inc 5s linear 0s infinite normal;
}
@keyframes ${cn}_inc {
  0% { width: 0%; }
  100% { width: 100%; }
}
.${cn}-linear[data-mode="phasedIncrement"] {
  animation: ${cn}_pinc 5s linear 0s infinite normal;
}
@keyframes ${cn}_pinc {
  0% { width: 0%; }
${ArrayUtils.generateArray(10, i => `
${(i+1)*10-1-i}% { width: ${i*10}%; }
  ${(i+1)*10-i}% { width: ${(i+1)*10}%; }
`).join("")}
100% { width: 100% }
}
.${cn}-linear[data-mode="flow"] {
  position: absolute;
  top: 0px;
  height: 100%;
  animation: ${cn}_flow 2s linear 0s infinite normal;
}
@keyframes ${cn}_flow {
  0% {
    left: -40%;
    width: 40%;
  }
  100% {
    left: 105%;
    width: 0%;
  }
}
${colorIterator((_c, v, s) => `
.${cn}${s}[data-colortype="base"] {
  background: ${v.bgc};
}
.${cn}${s}[data-colortype="base"] > .${cn}-linear {
  background: ${v.fgc};
}
.${cn}${s}[data-colortype="head"] {
  background: ${v.head.bgc};
}
.${cn}${s}[data-colortype="head"] > .${cn}-linear {
  background: ${v.fgc};
}
.${cn}${s}[data-colortype="nav"] {
  background: ${v.nav.bgc};
}
.${cn}${s}[data-colortype="nav"] > .${cn}-linear {
  background: ${v.nav.fgc};
}`).join("")}
`}</JsxStyle>

export default ProgressBar;