import React, { ForwardedRef, FunctionComponent, HTMLAttributes, ReactElement, useCallback, useEffect, useRef } from "react";
import useValue, { equalValue, InputAttributes } from "../../hooks/value";
import CssVar, { CssPV, colorIterator, switchDesign } from "../../styles/css-var";
import InputStyle from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { pressPositiveKey } from "../../utils/dom";
import { _HookSetter } from "../../utils/hook";
import { inputAttributes, InputHook, inputMode } from "../../utils/input";
import { labelCn } from "../label";

const cn = "bh-ckb";
export const checkBoxCn = `${cn}_btn`;

export type CheckBoxHook<T extends string | number | boolean = boolean> = InputHook<T>;
type Hook<T extends string | number | boolean = boolean> = _HookSetter<CheckBoxHook<T>>;

export type CheckBoxAttributes<T extends string | number | boolean = boolean> = Omit<HTMLAttributes<HTMLDivElement>, "onClick"> & InputAttributes<T> & {
  ref?: ForwardedRef<HTMLDivElement>;
  $hook?: CheckBoxHook<T>;
  $checkedValue?: T;
  $uncheckedValue?: T;
  $fill?: boolean;
};

interface CheckBoxFC extends FunctionComponent {
  <T extends string | number | boolean = boolean>(attrs: CheckBoxAttributes<T>, ref?: ForwardedRef<HTMLDivElement>): ReactElement<CheckBoxAttributes<T>>;
}

const CheckBox: CheckBoxFC = React.forwardRef<HTMLDivElement, CheckBoxAttributes<any>>(<T extends string | number | boolean = boolean>(attrs: CheckBoxAttributes<T>, ref: ForwardedRef<HTMLDivElement>) => {
  const c = (attrs.$checkedValue ?? true) as T;
  const un = (attrs.$uncheckedValue ?? false) as T;

  const iref = useRef<HTMLDivElement>();
  const { val, set, buf } = useValue(attrs);
  const toggle = () => {
    if (attrs.$disabled || attrs.$readOnly) return;
    set.current(equalValue(val, c) ? un : c);
  };

  useEffect(() => {
    (attrs.$hook as Hook<T>)?._set({
      focus: () => iref.current?.focus(),
      getValue: () => buf.current,
      setValue: (v) => set.current(v),
    });
  }, [(attrs.$hook as Hook<T>)?._set]);

  const m = inputMode(attrs);

  return (
    <div
      {...inputAttributes(attrs, cn)}
      ref={ref}
    >
      <div
        className={`${cn}-body`}
        ref={iref}
        tabIndex={attrs.$disabled ? undefined : attrs.tabIndex ?? 0}
        onClick={toggle}
        onKeyDown={e => {
          pressPositiveKey(e, () => {
            toggle();
          }, true);
          attrs.onKeyDown?.(e);
        }}
      >
        <div
          className={checkBoxCn}
          data-m={m}
          data-checked={equalValue(val, c)}
          data-fill={attrs.$fill}
        />
        {attrs.children}
      </div>
      {InputStyle}
      {CheckButtonStyle}
      {Style}
    </div>
  );
});

export const useCheckBox = <T extends string | number | boolean = any>(): CheckBoxHook<T> => {
  const dispatcher = useRef<Partial<CheckBoxHook<T>>>({});
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
.${cn} {
  width: unset;
  align-items: center;
}
.${cn}-body {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: none;
}
.${cn}[data-m="e"] > .${cn}-body {
  cursor: pointer;
}
.${cn}[data-m="d"] > .${cn}-body {
 ${CssPV.inactOpacity}
}
.${cn}[data-m="d"] > .${cn}-body > .${checkBoxCn} {
  opacity: unset;
}
${switchDesign(design, {
fm: `
.${cn}[data-m="e"] > .${cn}-body:focus > .${checkBoxCn}::before {
  outline: 1px solid ${CssVar.default.ipt.bdc};
  outline-offset: 2px;
}
.${cn}[data-m="e"] > .${cn}-body:hover > .${checkBoxCn}::before {
  border-width: 2px;
  border-style: solid;
}`,
neumorphism: `
.${cn}[data-m="e"] > .${cn}-body:hover > .${checkBoxCn}::before {
  box-shadow: ${CssPV.nCcvSdDeep};
}`})}
${colorIterator((_s, v, qs) => `
${switchDesign(design, {
fm: `
.${cn}${qs} > .${cn}-body > .${checkBoxCn}::before {
  border-color: ${v.ipt.bdc};
}
.${cn}${qs} > .${cn}-body:focus > .${checkBoxCn}::before {
  outline-color: ${v.ipt.bdc};
}
.${cn}${qs} > .${cn}-body > .${checkBoxCn}[data-m="e"]::before {
  background: ${v.ipt.off};
}`})}
.${cn}${qs} > .${cn}-body > .${checkBoxCn}[data-checked="true"]::after {
  border-color: ${v.fgc};
}
.${cn}${qs} > .${cn}-body > .${checkBoxCn}[data-checked="true"][data-fill="true"]::before {
  background: ${v.ipt.bdc};
}
.${cn}${qs} > .${cn}-body > .${checkBoxCn}[data-checked="true"][data-fill="true"]::after {
  border-color: ${v.ipt.bgc};
}
.${cn}${qs} > .${cn}-body {
  color: ${v.fgc};
}`).join("")}
`}</JsxStyle>;

export const CheckButtonStyle = <JsxStyle id={checkBoxCn} depsDesign>{({ design }) => `
.${checkBoxCn} {
  box-sizing: border-box;
  position: relative;
  overflow: visible;
  height: ${CssVar.size};
  width: ${CssVar.size};
}
.${checkBoxCn}::before,
.${checkBoxCn}::after {
  ${CssPV.ba}
}
.${checkBoxCn}::before {
  height: 70%;
  width: 70%;
  top: 15%;
  left: 15%;
${switchDesign(design, {
c: `border-radius: ${CssVar.bdr};`,
fm: `
  border: 1px solid ${CssVar.default.ipt.bdc};
  transition: border-width 0.1s;
`,
neumorphism: `transition: box-shadow 0.1s;`
})}
}
.${checkBoxCn}::after {
  height: 54%;
  width: 35%;
  top: 17%;
  left: 33%;
  transform: rotate(40deg);
  border-bottom: 2.5px solid transparent;
  border-right: 2.5px solid transparent;
  border-radius: 1px;
  transition: border-color 0.1s;
}
.${checkBoxCn}[data-checked="true"]::after {
  border-color: ${CssVar.default.ipt.fgc};
}
.${checkBoxCn}[data-m="e"] {
  cursor: pointer;
}
.${checkBoxCn}[data-m="e"]::before {
${switchDesign(design, {
fm: `background: ${CssVar.default.ipt.off};`,
neumorphism: `box-shadow: ${CssPV.nCcvSdActive};`
})}
}
.${checkBoxCn}[data-checked="true"][data-fill="true"]::before {
  transition: background 0.1s;
}
.${checkBoxCn}[data-checked="true"][data-fill="true"]::before {
  background: ${CssVar.default.ipt.bdc};
}
.${checkBoxCn}[data-checked="true"][data-fill="true"]::after {
  border-color: ${CssVar.default.ipt.bgc};
}
${switchDesign(design, {
fm: `
.${checkBoxCn}[data-m="e"]:hover::before {
  border-width: 2px;
  border-style: solid;
}`,
neumorphism: `
.${checkBoxCn}[data-m="e"]:hover::before {
  box-shadow: ${CssPV.nCcvSdDeep};
}
.${checkBoxCn}[data-m="r"]::before,
.${checkBoxCn}[data-m="d"]::before {
  box-shadow: ${CssPV.nCcvSdDisabled};
}`
})}
.${checkBoxCn}[data-m="d"] {
  ${CssPV.inactOpacity}
}
.${checkBoxCn} + .${labelCn} {
  padding-left: 3px;
}
.${checkBoxCn}[data-m="e"] + .${labelCn} {
  user-select: none;
}
`}</JsxStyle>;

export default CheckBox;