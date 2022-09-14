import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import React, { HTMLAttributes } from "react"
import { Color, colorIterator } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributes } from "../utils/attributes";

const cn = "bh-pgb";

export type ProgressBarAttributes = HTMLAttributes<HTMLDivElement> & {
  $mode?: "increment" | "phasedIncrement" | "flow"
  $color?: Color;
  $overlay?: boolean;
};

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarAttributes>((attrs, ref) => {
  return (
    <div
      {...attributes(attrs, cn)}
      ref={ref}
      data-color={attrs.$color}
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
  width: 100%;
}
.${cn}:not([data-overlay="true"]) {
  positoin: relative;
}
.${cn}[data-overlay="true"] {
  position: fixed;
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
  animation: ${cn}_inc 10s linear 0s infinite normal;
}
@keyframes ${cn}_inc {
  0% { width: 0%; }
  100% { width: 100%; }
}
.${cn}-linear[data-mode="phasedIncrement"] {
  animation: ${cn}_pinc 10s linear 0s infinite normal;
}
@keyframes ${cn}_pinc {
${ArrayUtils.generateArray(11, i => `
${i*10}% { width: ${i*10}%; }
`).join("")}
}
.${cn}-linear[data-mode="flow"] {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 20%;
  animation: ${cn}_flow 2s linear 0s infinite normal;
}
@keyframes ${cn}_flow {
  0% { left: -20%; }
  100% { left: 120%; }
}
${colorIterator((_c, v, s) => `
.${cn}${s} {
  background: ${v.bgc};
}
.${cn}${s} > .${cn}-linear {
  background: ${v.fgc};
}`).join("")}
`}</JsxStyle>

export default ProgressBar;