import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { HTMLAttributes, ReactNode, useRef, useEffect, KeyboardEvent, useMemo, ForwardedRef, FunctionComponent, ReactElement, useCallback, useImperativeHandle } from "react";
import useSource, { SourceArray } from "../../hooks/source";
import useValue, { equalValue, InputAttributes } from "../../hooks/value";
import CssVar, { CssPV, Signal, signalIterator, switchDesign } from "../../styles/css-var";
import InputStyle, { inputCn } from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { pressPositiveKey } from "../../utils/dom";
import { _HookSetter } from "../../utils/hook";
import { inputAttributes, InputHook, inputMode } from "../../utils/input";
import { iconCn } from "../icon";
import Label, { labelCn } from "../label";

const cn = "bh-rdo";
export const radioButtonCn = `${cn}_btn`;

export type RadioButtonsHook<T extends string | number = string | number> = InputHook<T>;
type Hook<T extends string | number = string | number> = _HookSetter<RadioButtonsHook<T>>;

export type RadioButtonsAttributes<T extends string | number = string | number, U = { [key: string | number]: any }> = Omit<HTMLAttributes<HTMLDivElement>, "children"> & InputAttributes<T, { beforeData?: U; afterData: U; }> & {
  ref?: ForwardedRef<HTMLDivElement>;
  $hook?: RadioButtonsHook<T>;
  $column?: boolean;
  $nowrap?: boolean;
  $source?: SourceArray<U>;
  $preventSourceMemo?: boolean;
  $labelDataName?: string;
  $valueDataName?: string;
  $signalDataName?: string;
  $hideRadioButton?: boolean;
};

interface RadioButtonsFC extends FunctionComponent {
  <T extends string | number = string | number, U = { [key: string]: any }>(attrs: RadioButtonsAttributes<T, U>, ref?: ForwardedRef<HTMLDivElement>): ReactElement<RadioButtonsAttributes<T, U>>;
}

const RadioButtons: RadioButtonsFC = React.forwardRef<HTMLDivElement, RadioButtonsAttributes<any>>(<T extends string | number = string | number, U = { [key: string]: any }>(attrs: RadioButtonsAttributes<T, U>, $ref: ForwardedRef<HTMLDivElement>) => {
  const labelDn = attrs.$labelDataName || "label";
  const valueDn = attrs.$valueDataName || "value";
  const signalDn = attrs.$signalDataName || "signal";
  const { loading, source } = useSource(attrs.$source, {
    preventSourceMemo: attrs.$preventSourceMemo,
    changeSource: (src) => {
      if (val != null) {
        const item = src.find(item => equalValue(item[valueDn], val));
        if (item != null) return;
      }
      const firstItem = src[0];
      if (firstItem == null) return;
      set.current(firstItem[valueDn]);
    },
  });
  const { val, set, buf } = useValue(attrs, {
    setChangeCtx: (ctx) => {
      const beforeData = ctx.before == null ? undefined : source.find(item => equalValue(item[valueDn], ctx.before));
      const afterData = source.find(item => equalValue(item[valueDn], ctx.after));
      return { ...ctx, beforeData, afterData };
    }
  });
  const ref = useRef<HTMLDivElement>();
  useImperativeHandle($ref, () => ref.current);

  const select = (value: T) => {
    if (attrs.$disabled || attrs.$readOnly || loading) return;
    set.current(value);
  };

  const moveFocus = (next?: boolean) => {
    const aelem = document.activeElement;
    if (aelem == null) return;
    if (!aelem.classList.contains(`${cn}-item`)) return;
    if (next) (aelem.nextElementSibling as HTMLDivElement)?.focus();
    else (aelem.previousElementSibling as HTMLDivElement)?.focus();
  };
  
  const keydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        moveFocus(true);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        moveFocus(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    (attrs.$hook as Hook<T>)?._set({
      focus: () => {
        if (!ref.current) return;
        let elem = ref.current.querySelector(`.${cn}-item[data-selected="true"]`);
        if (elem == null) elem = ref.current.querySelector(`.${cn}-item`);
        if (elem == null) return;
        (elem as HTMLDivElement).focus();
      },
      getValue: () => buf.current,
      setValue: (v) => set.current(v),
    });
  }, [(attrs.$hook as Hook<T>)?._set, ref]);

  const m = inputMode(attrs);

  const rbtns = useMemo(() => {
    let hasSelected = false;
    const nodes = source?.map(item => {
      const l = item[labelDn] as ReactNode | string;
      const v = item[valueDn] as T;
      const s = item[signalDn] as Signal;
      const selected = equalValue(val, v);
      if (selected) hasSelected = true;
      return (
        <div
          key={v ?? null}
          className={`${cn}-item`}
          data-selected={selected}
          data-signal={s || attrs.$signal}
          tabIndex={0}
          onClick={() => { select(v) }}
          onKeyDown={(e) => {
            pressPositiveKey(e, () => {
              select(v);
            }, true);
          }}
        >
          {attrs.$hideRadioButton ? <></> :
            <div
              className={radioButtonCn}
              data-selected={selected}
              data-m={m}
            />
          }
          {StringUtils.isString(l) ? <Label className={`${cn}-lbl`}>{l}</Label> : l}
        </div>
      );
    });
    if (!hasSelected && (source?.length ?? 0) > 0) {
      setTimeout(() => {
        set.current(source[0][valueDn]);
      }, 0);
    }
    return nodes;
  }, [val, source, loading, m, attrs.$signal, attrs.$hideRadioButton, attrs.$disabled, attrs.$readOnly]);

  return (
    <div
      {...inputAttributes(attrs, cn)}
      ref={ref}
      data-flow={attrs.$column ? "column" : "row"}
      data-nowrap={attrs.$nowrap}
      data-hrb={attrs.$hideRadioButton}
      onKeyDown={keydown}
    >
      {rbtns}
      {InputStyle}
      {RadioButtonStyle}
      {Style}
    </div>
  );
});

export const useRadioButtons = <T extends string | number = any>(): RadioButtonsHook<T> => {
  const dispatcher = useRef<Partial<RadioButtonsHook<T>>>({});
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
  } as Hook<T>;
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${inputCn}.${cn} {
  flex-wrap: wrap;
  width: unset;
  height: unset;
  min-height: calc(${CssVar.size} + ${CssVar.pdy} * 2 + ${CssVar.phsize});
  padding-bottom: unset;
  padding-left: unset;
  padding-right: unset;
}
.${inputCn}.${cn}:not([data-placeholder]) {
  padding-top: unset;
  min-height: calc(${CssVar.size} + ${CssVar.pdy} * 2);
}
.${cn}[data-flow="column"] {
  flex-direction: column;
  align-items: stretch;
  height: unset;
}
.${cn}[data-flow="row"] {
  flex-direction: row;
}
.${cn}[data-nowrap="true"] {
  flex-wrap: nowrap;
}
.${cn}-item {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  padding: ${CssVar.pdy} ${CssVar.pdx};
  min-height: calc(${CssVar.size} + ${CssVar.pdy} * 2);
  min-width: calc(${CssVar.size} + ${CssVar.pdx} * 2);
  outline-offset: -2px;
  flex: 1 0 auto;
}
.${cn}[data-flow="row"]:not([data-hrb="true"]) > .${cn}-item:not(:last-child) {
  margin-right: 5px;
}
.${cn}[data-hrb="true"] > .${cn}-item > .${cn}-lbl {
  padding-left: 10px;
  padding-right: 10px;
}
.${cn}[data-hrb="true"] > .${cn}-item {
  justify-content: center;
}
.${cn}[data-flow="column"] > .${cn}-item,
.${cn}[data-hrb="true"][data-flow="column"] > .${cn}-item {
  justify-content: flex-start;
}
.${cn}[data-m="e"] > .${cn}-item {
  cursor: pointer;
  user-select: none;
}
.${cn}[data-m="d"] > .${cn}-item {
  ${CssPV.inactOpacity}
}
.${radioButtonCn} + .${cn}-lbl {
  padding-left: unset;
}
.${cn}-item > .${radioButtonCn}[data-m="d"] {
  opacity: unset;
}
.${cn}[data-hrb="true"] > .${cn}-item::before {
  ${CssPV.ba};
  z-index: -1;
${switchDesign(design, {
fm: `transition: box-shadow 0.2s;`,
neumorphism: `transition: box-shadow 0.1s;`,
})}
}
.${cn}[data-hrb="true"][data-flow="row"] > .${cn}-item::before {
  top: ${CssVar.pdy};
  height: calc(100% - ${CssVar.pdy} * 2);
${switchDesign(design, {
fm: `
  width: calc(100% - ${CssVar.pdx} * 2);
  left: ${CssVar.pdx};
`,
neumorphism: `
  width: 100%;
  left: 0px;
`,
})}
}
.${cn}[data-hrb="true"][data-flow="row"] > .${cn}-item:first-child::before {
  left: ${CssVar.pdx};
${switchDesign(design, {
fm: `width: calc(100% - ${CssVar.pdx} * 2);`,
neumorphism: `
  width: calc(100% - ${CssVar.pdx});
  border-top-left-radius: ${CssVar.bdr};
  border-bottom-left-radius: ${CssVar.bdr};
`})} 
}
.${cn}[data-hrb="true"][data-flow="row"] > .${cn}-item:last-child::before {
${switchDesign(design, {
fm: `width: calc(100% - ${CssVar.pdx} * 2);`,
neumorphism: `
  width: calc(100% - ${CssVar.pdx});
  border-top-right-radius: ${CssVar.bdr};
  border-bottom-right-radius: ${CssVar.bdr};
`})} 
}
.${cn}[data-hrb="true"][data-flow="column"] > .${cn}-item::before {
  top: ${CssVar.pdy};
  left: ${CssVar.pdx};
  height: calc(100% - ${CssVar.pdy} * 2);
${switchDesign(design, {
fm: `width: calc(100% - ${CssVar.pdx} * 2);`,
neumorphism: `width: calc(100% - ${CssVar.pdx} * 2);`
})}
}
${switchDesign(design, {
fm: `
.${cn}-item:focus > .${radioButtonCn}[data-m="e"]::before {
  outline: 1px solid ${CssVar.default.ipt.bdc};
  outline-offset: 2px;
}
.${cn}-item:hover > .${radioButtonCn}[data-m="e"]::before {
  border-width: 2px;
  border-style: solid;
}
.${cn}[data-hrb="true"][data-flow="row"][data-m="e"] > .${cn}-item::before {
  box-shadow: 0 -4px 0 -2px ${CssVar.default.ipt.off} inset;
}
.${cn}[data-hrb="true"][data-flow="row"][data-m="e"] > .${cn}-item:not([data-selected="true"]):hover::before {
  box-shadow: 0 -4px 0 -2px ${CssVar.default.ipt.on} inset;
}
.${cn}[data-hrb="true"][data-flow="row"] > .${cn}-item[data-selected="true"]::before {
  box-shadow: 0 -4px 0px -2px ${CssVar.default.bdc} inset;
}
.${cn}[data-hrb="true"][data-flow="column"][data-m="e"] > .${cn}-item::before {
  box-shadow: 4px 0 0 -2px ${CssVar.default.ipt.off} inset;
}
.${cn}[data-hrb="true"][data-flow="column"][data-m="e"] > .${cn}-item:not([data-selected="true"]):hover::before {
  box-shadow: 4px 0 0 -2px ${CssVar.default.ipt.on} inset;
}
.${cn}[data-hrb="true"][data-flow="column"] > .${cn}-item[data-selected="true"]::before {
  box-shadow: 4px 0 0 -2px ${CssVar.default.bdc} inset;
}
${signalIterator((_s, v, qs) => `
.${cn}-item${qs} > .${radioButtonCn}::before {
  border-color: ${v.ipt.bdc};
}
.${cn}-item${qs}:focus > .${radioButtonCn}::before {
  outline-color: ${v.ipt.bdc};
}
.${cn}-item${qs} > .${radioButtonCn}[data-selected="true"]::after {
  background: ${v.fc};
}
.${cn}-item${qs} .${cn}-lbl,
.${cn}-item${qs} .${labelCn} {
  color: ${v.fc};
}
.${cn}-item${qs} .${iconCn} {
  --bh-icon-fc: ${v.fc};
}
.${cn}[data-hrb="true"][data-flow="row"][data-m="e"] > .${cn}-item${qs}::before {
  box-shadow: 0 -4px 0 -2px ${v.ipt.off} inset;
}
.${cn}[data-hrb="true"][data-flow="row"][data-m="e"] > .${cn}-item${qs}:not([data-selected="true"]):hover::before {
  box-shadow: 0 -4px 0 -2px ${v.ipt.on} inset;
}
.${cn}[data-hrb="true"][data-flow="row"] > .${cn}-item${qs}[data-selected="true"]::before {
  box-shadow: 0 -4px 0px -2px ${v.bdc} inset;
}
.${cn}[data-hrb="true"][data-flow="column"][data-m="e"] > .${cn}-item${qs}::before {
  box-shadow: 4px 0 0 -2px ${v.ipt.off} inset;
}
.${cn}[data-hrb="true"][data-flow="column"][data-m="e"] > .${cn}-item${qs}:not([data-selected="true"]):hover::before {
  box-shadow: 4px 0 0 -2px ${v.ipt.on} inset;
}
.${cn}[data-hrb="true"][data-flow="column"] > .${cn}-item${qs}[data-selected="true"]::before {
  box-shadow: 4px 0 0 -2px ${v.bdc} inset;
}`).join("")}`,
neumorphism: `
.${cn}-item:hover > .${radioButtonCn}[data-m="e"]::before {
  box-shadow: ${CssPV.ccvSdD};
}
.${cn}[data-hrb="true"][data-m="e"] > .${cn}-item::before {
  box-shadow: ${CssPV.cvxSd};
}
.${cn}[data-hrb="true"][data-m="e"] > .${cn}-item[data-selected="true"]::before {
  box-shadow: ${CssPV.ccvSd};
}
.${cn}[data-hrb="true"][data-flow="row"] > .${cn}-item[data-selected="true"],
.${cn}[data-hrb="true"][data-flow="column"] > .${cn}-item[data-selected="true"]:first-child {
  padding-top: calc(${CssVar.pdy} + 1px);
}
.${cn}[data-hrb="true"][data-m="e"] > .${cn}-item:not([data-selected="true"]):hover::before {
  box-shadow: ${CssPV.cvxSdD};
}
.${cn}[data-hrb="true"][data-m="r"] > .${cn}-item[data-selected="true"]::before,
.${cn}[data-hrb="true"][data-m="d"] > .${cn}-item[data-selected="true"]::before {
  box-shadow: ${CssPV.ccvSdS};
}
.${cn}[data-hrb="true"][data-m="r"] > .${cn}-item:not([data-selected="true"])::before,
.${cn}[data-hrb="true"][data-m="d"] > .${cn}-item:not([data-selected="true"])::before {
  box-shadow: ${CssPV.cvxSdS};
}
.${cn}[data-hrb="true"][data-flow="column"] > .${cn}-item {
  min-height: ${CssVar.size};
}
.${cn}[data-hrb="true"][data-flow="column"] > .${cn}-item::before {
  top: 0px;
  height: 100%;
}
.${cn}[data-hrb="true"][data-flow="column"] > .${cn}-item:first-child,
.${cn}[data-hrb="true"][data-flow="column"] > .${cn}-item:last-child {
  height: calc(${CssVar.size} + ${CssVar.pdy});
}
.${cn}[data-hrb="true"][data-flow="row"] > .${cn}-item:not(:first-child) {
  padding-left: unset;
}
.${cn}[data-hrb="true"][data-flow="row"] > .${cn}-item:not(:last-child) {
  padding-right: unset;
}
.${cn}[data-hrb="true"][data-flow="column"] > .${cn}-item:not(:first-child) {
  padding-top: unset;
}
.${cn}[data-hrb="true"][data-flow="column"] > .${cn}-item:not(:last-child) {
  padding-bottom: unset;
}
.${cn}[data-hrb="true"][data-flow="column"] > .${cn}-item[data-selected="true"]:not(:first-child) {
  padding-top: 1px;
}
.${cn}[data-hrb="true"][data-flow="column"] > .${cn}-item:first-child::before {
  top: ${CssVar.pdy};
  height: calc(100% - ${CssVar.pdy});
  border-top-left-radius: ${CssVar.bdr};
  border-top-right-radius: ${CssVar.bdr};
}
.${cn}[data-hrb="true"][data-flow="column"] > .${cn}-item:last-child::before {
  top: 0px;
  height: calc(100% - ${CssVar.pdy});
  border-bottom-left-radius: ${CssVar.bdr};
  border-bottom-right-radius: ${CssVar.bdr};
}
.${cn}[data-hrb="true"][data-flow="column"] > .${cn}-item:first-child:last-child::before {
  height: calc(100% - ${CssVar.pdy} * 2);
}
.${cn}-item > .${radioButtonCn}[data-selected="true"]::after {
  background: ${CssVar.default.ipt.fc};
}
${signalIterator((_s, v, qs) => `
.${cn}-item${qs} .${cn}-lbl,
.${cn}-item${qs} .${labelCn} {
  color: ${v.fc};
}
.${cn}-item${qs} .${iconCn} {
  --bh-icon-fc: ${v.fc};
}
.${cn}[data-hrb="true"] > .${cn}-item${qs}[data-selected="true"] .${cn}-lbl,
.${cn}[data-hrb="true"] > .${cn}-item${qs}[data-selected="true"] .${labelCn} {
  color: ${v.ipt.fc};
}
.${cn}[data-hrb="true"] > .${cn}-item${qs}[data-selected="true"] .${iconCn} {
  --bh-icon-fc: ${v.ipt.fc};
}
.${cn}[data-hrb="true"] > .${cn}-item${qs}[data-selected="true"]::before {
  background: ${v.ipt.on};
}`).join("")}
`})}
`}</JsxStyle>;

export const RadioButtonStyle = <JsxStyle id={radioButtonCn} depsDesign>{({ design }) => `
.${radioButtonCn} {
  box-sizing: border-box;
  position: relative;
  height: ${CssVar.size};
  width: ${CssVar.size};
  flex: none;
}
.${radioButtonCn}[data-m="e"] {
  cursor: pointer;
}
.${radioButtonCn}::before,
.${radioButtonCn}::after {
  ${CssPV.ba}
  border-radius: 50%;
}
.${radioButtonCn}::before {
  height: 60%;
  width: 60%;
  left: 20%;
  top: 20%;
${switchDesign(design, {
fm: `
  border: 1px solid ${CssVar.default.ipt.bdc};
  transition: border-width 0.1s;
`,
neumorphism: `transition: box-shadow 0.1s;`
})}
}
${switchDesign(design, {
fm: `
.${radioButtonCn}[data-m="e"]::before {
  background: ${CssVar.default.ipt.off};
}`,
neumorphism: `
.${radioButtonCn}[data-m="e"]::before {
  box-shadow: ${CssPV.ccvSd};
}
.${radioButtonCn}[data-m="r"]::before,
.${radioButtonCn}[data-m="d"]::before {
  box-shadow: ${CssPV.ccvSdS};
}`})}
.${radioButtonCn}::after {
  left: 33%;
  top: 33%;
  height: 34%;
  width: 34%;
${switchDesign(design, {
fm: `transition: background 0.2s;`,
neumorphism: `transition: background 0.2s, box-shadow 0.2s;`
})}
}
.${radioButtonCn}[data-selected="true"]::after {
${switchDesign(design, {
fm: `background: ${CssVar.default.fc};`,
neumorphism: `
  background: ${CssVar.default.fc};
  box-shadow: ${CssPV.cvxSd};
`})}
}
${switchDesign(design, {
fm: `
.${radioButtonCn}[data-m="e"]:hover::before {
  border-width: 2px;
  border-style: solid;
}`,
neumorphism: `
.${radioButtonCn}[data-m="e"]:hover::before {
  box-shadow: ${CssPV.ccvSdD};
}`})}
.${radioButtonCn}[data-m="d"] {
  ${CssPV.inactOpacity}
}
`}</JsxStyle>;

export default RadioButtons;