import React, { HTMLAttributes, KeyboardEvent, useCallback, useEffect, useRef } from "react";
import useValue, { InputAttributes } from "../../hooks/value";
import CssVar, { CssPV, colorIterator, switchDesign } from "../../styles/css-var";
import InputStyle from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { releaseCursor, setCursor } from "../../utils/cursor";
import { _HookSetter } from "../../utils/hook";
import { inputAttributes, InputHook } from "../../utils/input";
import Resizer from "../resizer";

const cn = "bh-sld";

export type SliderHook = InputHook<number>;
type Hook = _HookSetter<SliderHook>;

export type SliderAttributes = HTMLAttributes<HTMLDivElement> & InputAttributes<number> & {
  $hook?: SliderHook;
  $min?: number;
  $max?: number;
  $keydownInterval?: number;
  $resize?: boolean;
  $changing?: (value: number) => void;
};

const Slider = React.forwardRef<HTMLDivElement, SliderAttributes>((attrs, ref) => {
  const bref = useRef<HTMLDivElement>();
  const rref = useRef<HTMLDivElement>();
  const href = useRef<HTMLDivElement>();
  const min = useRef(attrs.$min ?? 0);
  const max = useRef(attrs.$max ?? 100);
  const interval = useRef(attrs.$keydownInterval ?? 1);

  const optimizeHadbleLeft = useCallback((value: number) => {
    if (href.current == null) return;
    const v = value ?? min.current;
    const rate = (v - min.current) / (max.current - min.current);
    rref.current.style.width = (rate * 100) + "%";
    href.current.style.left = ((bref.current.clientWidth - href.current.offsetWidth) * rate) + "px"
    href.current.textContent = String(v);
  }, []);

  const { val, set, buf } = useValue(attrs, {
    effect: optimizeHadbleLeft,
  });

  const changeStart = (clientX: number, isTouch?: boolean) => {
    if (attrs.$disabled || attrs.$readOnly) return;
    const maxLeft = bref.current.clientWidth - href.current.offsetWidth;
    let lpos = href.current.offsetLeft, pos = clientX;
    let num = buf.current;
    const moveImpl = (cx: number) => {
      num = Math.round(min.current + (max.current - min.current) * (Math.min(Math.max(0, cx - pos + lpos), maxLeft) / maxLeft));
      attrs.$changing?.(num);
      optimizeHadbleLeft(num);
    };
    if (isTouch) {
      const move = (e: TouchEvent) => moveImpl(e.touches[0].clientX);
      const end = () => {
        window.removeEventListener("touchmove", move);
        window.removeEventListener("touchend", end);
        set.current(num);
      };
      window.addEventListener("touchend", end);
      window.addEventListener("touchmove", move);
    } else {
      setCursor("col-resize");
      const move = (e: MouseEvent) => moveImpl(e.clientX);
      const end = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", end);
        releaseCursor();
        set.current(num);
      };
      window.addEventListener("mouseup", end);
      window.addEventListener("mousemove", move);
    }
  };

  const keydown = (e: KeyboardEvent) => {
    if (attrs.$disabled || attrs.$readOnly) return;
    switch (e.key) {
      case "ArrowLeft":
        if (e.ctrlKey) set.current(min.current);
        else set.current(Math.max(min.current, (val ?? min.current) - interval.current));
        e.stopPropagation();
        e.preventDefault();
        break;
      case "ArrowRight":
        if (e.ctrlKey) set.current(max.current);
        else set.current(Math.min(max.current, (val ?? min.current) + interval.current));
        e.stopPropagation();
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      focus: () => bref.current?.focus(),
      getValue: () => buf.current,
      setValue: (v) => set.current(v),
    })
  }, [(attrs.$hook as Hook)?._set])

  return (
    <div
      {...inputAttributes(attrs, cn)}
      ref={ref}
    >
      <div
        className={`${cn}-body`}
        ref={bref}
        tabIndex={attrs.$disabled === true ? -1 : attrs.tabIndex ?? 0}
        onKeyDown={keydown}
      >
        <div className={`${cn}-bar`}>
          <div className={`${cn}-rate`} ref={rref} />
        </div>
        <div
          className={`${cn}-handle`}
          ref={href}
          onMouseDown={e => changeStart(e.clientX)}
          onTouchStart={e => changeStart(e.touches[0].clientX, true)}
        />
      </div>
      {attrs.$resize ? <Resizer direction="x" resizing={() => optimizeHadbleLeft(val)}/> : <></>}
      {InputStyle}
      {Style}
    </div>
  );
});

export const useSlider = (): SliderHook => {
  const dispatcher = useRef<Partial<SliderHook>>({});
  return {
    focus: useCallback(() => {
      dispatcher.current.focus?.();
    }, []),
    getValue: useCallback(() => {
      return dispatcher.current.getValue?.();
    }, []),
    setValue: useCallback((v) => {
      dispatcher.current.setValue?.(v);
    }, []),
    _set: useCallback((d) => {
      dispatcher.current = d;
    }, []),
  } as Hook;
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn} {
  overflow: hidden;
  width: 200px;
  overflow: visible;
}
.${cn}-body {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: visible;
${switchDesign(design, {
fm: `
  padding-left: calc(${CssVar.size} / 2);
  padding-right: calc(${CssVar.size} / 2);
`,
neumorphism: `padding: 2px;`,
})}
}
.${cn}[data-m="d"] > .${cn}-body {
  ${CssPV.inactOpacity}
}
.${cn}-bar {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
${switchDesign(design, {
_: `height: 100%;`,
fm: `
  border: 1px solid;
  height: 8px;
  border-radius: 4px;
`,
neumorphism: `
  height: 100%;
  box-shadow: ${CssPV.nCcvSdActive};
  border-radius: calc(${CssVar.size} / 2 - 1px);
`})}
}
.${cn}-rate {
  box-sizing: border-box;
  height: 100%;
  width: 0px;
${switchDesign(design, {
neumorphism: `
  box-shadow: ${CssPV.nCcvSdActive};
  border-radius: calc(${CssVar.size} / 2 - 1px) 0 0 calc(${CssVar.size} / 2 - 1px);
`})}
}
.${cn}-handle {
  box-sizing: border-box;
  position: absolute;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  flex: none;
  height: ${CssVar.size};
  width: ${CssVar.size};
  top: 0px;
  left: 0px;
  font-size: calc(${CssVar.fs} * 0.75);
  padding-top: 1px;
  z-index: 1;
${switchDesign(design, {
c: `transition: top 0.2s;`,
})}
}
.${cn}[data-m="e"] > .${cn}-body > .${cn}-handle {
  user-select: none;
}
.${cn}-handle::before {
  ${CssPV.ba}
  z-index: -1;
${switchDesign(design, {
c: `border-radius: 50%;`,
fm: `
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  top: 2px;
  left: 2px;
  border-width: 1px;
  border-style: solid;
`,
flat: `transition: border-color 0.2s;`,
material: `transition: box-shadow 0.2s;`,
neumorphism: `
  height: calc(100% - 6px);
  width: calc(100% - 6px);
  top: 3px;
  left: 3px;
  box-shadow: ${CssPV.nCvxSdBase};
  background: ${CssVar.bgc};
`})}
}
.${cn}[data-m="e"] > .${cn}-body > .${cn}-handle {
  cursor: col-resize;
}
${switchDesign(design, {
fm: `
.${cn}[data-m="e"] > .${cn}-body:focus > .${cn}-handle::before {
  border-width: 3px;
  border-style: double;
}
${colorIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-body > .${cn}-bar {
  border-color: ${v.ipt.bdc};
  background: ${v.ipt.off};
}
.${cn}${qs} > .${cn}-body > .${cn}-bar > .${cn}-rate {
  background: ${v.ipt.on};
}
.${cn}${qs} > .${cn}-body > .${cn}-handle::before {
  border-color: ${v.ipt.bdc};
  background: ${v.ipt.off};
}
.${cn}${qs}[data-m="e"] > .${cn}-body > .${cn}-handle:active::after {
  background: ${v.ipt.bdc};
}`).join("")}
.${cn}[data-m="e"] > .${cn}-body > .${cn}-handle:active {
  top: calc(${CssVar.size} / 2 * -1 - 4px);
}
.${cn}[data-m="e"] > .${cn}-body > .${cn}-handle:active::before {
  border-radius: ${CssVar.bdr};
  width: 120%;
  left: -10%;
}
.${cn}[data-m="e"] > .${cn}-body > .${cn}-handle:active::after {
  ${CssPV.ba}
  bottom: -1px;
  left: calc(50% - 2px);
  height: 4px;
  width: 4px;
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
  z-index: 1;
}`,
material: `
.${cn}[data-m="e"] > .${cn}-body > .${cn}-handle::before {
  box-shadow: 0px 3px 4px -2px ${CssVar.sdw.c};
}
.${cn}[data-m="e"] > .${cn}-body > .${cn}-handle:hover::before {
  box-shadow: 0px 4px 4px -2px ${CssVar.sdw.c};
}`,
neumorphism: `
.${cn}[data-m="e"] > .${cn}-body > .${cn}-handle:active {
  top: -100%;
}
.${cn}[data-m="e"] > .${cn}-body > .${cn}-handle:hover::before {
  box-shadow: ${CssPV.nCvxSdHover};
}
.${cn}[data-m="e"] > .${cn}-body > .${cn}-handle:active::before {
  border-radius: ${CssVar.bdr};
  width: 120%;
  left: -10%;
  box-shadow: ${CssPV.nCvxSdHover};
}
${colorIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-body > .${cn}-bar > .${cn}-rate {
  background: ${v.ipt.on};
}`).join("")}
.${cn}[data-m="r"] > .${cn}-body > .${cn}-bar,
.${cn}[data-m="d"] > .${cn}-body > .${cn}-bar {
  box-shadow: ${CssPV.nCcvSdDisabled};
}
.${cn}[data-m="r"] > .${cn}-body > .${cn}-handle::before,
.${cn}[data-m="d"] > .${cn}-body > .${cn}-handle::before {
  box-shadow: ${CssPV.nCvxSdShallow};
}`})}
.${cn}[data-m="r"] > .${cn}-body > .${cn}-bar,
.${cn}[data-m="d"] > .${cn}-body > .${cn}-bar {
  background: transparent;
}
`}</JsxStyle>;

export default Slider;