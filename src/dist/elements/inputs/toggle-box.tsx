import React, {ForwardedRef, FunctionComponent, HTMLAttributes, ReactElement, useCallback, useEffect, useRef } from "react";
import useValue, { equalValue, InputAttributes } from "../../hooks/value";
import CssVar, { CssPV, colorIterator, switchDesign } from "../../styles/css-var";
import InputStyle, { inputCn } from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { pressPositiveKey } from "../../utils/dom";
import { _HookSetter } from "../../utils/hook";
import { inputAttributes, InputHook } from "../../utils/input";

const cn = "bh-tgb";

export type ToggleBoxHook<T extends string | number | boolean = boolean> = InputHook<T>;
type Hook<T extends string | number | boolean = boolean> = _HookSetter<ToggleBoxHook<T>>

export type ToggleBoxAttributes<T extends string | number | boolean = boolean> = Omit<HTMLAttributes<HTMLDivElement>, "children" | "onClick"> & InputAttributes<T> & {
  ref?: ForwardedRef<HTMLDivElement>;
  $hook?: ToggleBoxHook<T>;
  $checkedValue?: T;
  $uncheckedValue?: T;
};

interface ToggleBoxFC extends FunctionComponent {
  <T extends string | number | boolean = boolean>(attrs: ToggleBoxAttributes<T>, ref?: ForwardedRef<HTMLDivElement>): ReactElement<ToggleBoxAttributes<T>>;
}

const ToggleBox: ToggleBoxFC = React.forwardRef<HTMLDivElement, ToggleBoxAttributes<any>>(<T extends string | number | boolean = boolean>(attrs: ToggleBoxAttributes<T>, ref: ForwardedRef<HTMLDivElement>) => {
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

  return (
    <div
      {...inputAttributes(attrs, cn)}
      ref={ref}
    >
      <div
        ref={iref}
        className={`${cn}-body`}
        tabIndex={attrs.$disabled ? undefined : attrs.tabIndex ?? 0}
        onClick={toggle}
        onKeyDown={e => {
          pressPositiveKey(e, () => {
            toggle();
          }, true);
          attrs.onKeyDown?.(e);
        }}
        data-checked={equalValue(val, c)}
      >
        <div className={`${cn}-switch`} />
      </div>
      {InputStyle}
      {Style}
    </div>
  );
});

export const useToggleBox = <T extends string | number | boolean = any>(): ToggleBoxHook<T> => {
  const dispatcher = useRef<Partial<ToggleBoxHook<T>>>({});
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
${switchDesign(design, {
flat: `width: calc(${CssVar.size} * 1.75);`,
material: `width: calc(${CssVar.size} * 1.8);`,
neumorphism: `width: calc(${CssVar.size} * 2);`,
})}
  user-select: none;
}
.${cn}-body {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
  outline-offset: 1px;
}
.${cn}[data-m="e"] > .${cn}-body {
  cursor: pointer;
}
.${cn}[data-m="d"] > .${cn}-body {
  ${CssPV.inactOpacity}
}
.${cn}-body::before {
  ${CssPV.ba}
${switchDesign(design, {
c: `
  border-radius: calc(${CssVar.size} / 2);
  transition: background 0.3s;
`,
fm: `
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  top: 5px;
  left: 5px;
  border-width: 1px;
  border-style: solid;
`,
neumorphism: `
  height: calc(100% - 2px);
  width: calc(100% - 2px);
  top: 1px;
  left: 1px;
`})}
}
.${cn}-switch {
  box-sizing: border-box;
  position: absolute;
  transition: left 0.3s;
  height: 100%;
  width: ${CssVar.size};
  top: 0px;
}
.${cn}-body[data-checked="false"] > .${cn}-switch {
  left: 0px;
}
.${cn}-body[data-checked="true"] > .${cn}-switch {
  left: calc(100% - ${CssVar.size});
}
.${cn}-switch::before {
  ${CssPV.ba}
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
flat: `transition: border-color 0.1s, border-width 0.1s;`,
material: `transition: box-shadow 0.1s, border-width 0.1s;`,
neumorphism: `
  height: calc(100% - 6px);
  width: calc(100% - 6px);
  top: 3px;
  left: 3px;
  box-shadow: ${CssPV.nCvxSdBase};
  background: ${CssVar.bgc};
`})}
}
${switchDesign(design, {
fm: `
.${cn}[data-m="e"] > .${cn}-body:focus > .${cn}-switch::before {
  outline: 1px solid ${CssVar.default.ipt.bdc};
  outline-offset: -3px;
}
.${cn}[data-m="e"] > .${cn}-body:hover > .${cn}-switch::before {
  border-width: 2px;
  border-style: solid;
}
${colorIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-body::before {
  border-color: ${v.ipt.bdc};
}
.${cn}${qs}[data-m="e"] > .${cn}-body::before {
  background: ${v.ipt.off};
}
.${cn}${qs} > .${cn}-body > .${cn}-switch::before {
  border-color: ${v.ipt.bdc};
  background: ${v.ipt.knob};
}
.${cn}${qs} > .${cn}-body[data-checked="true"]::before {
  background: ${v.ipt.on};
}
.${cn}${qs}[data-m="e"] > .${cn}-body:focus > .${cn}-switch::before {
  outline-color: ${v.ipt.bdc};
}
`).join("")}
`,
material: `
.${cn}[data-m="e"] > .${cn}-body > .${cn}-switch::before {
  box-shadow: 0px 3px 4px -2px ${CssVar.sdw.c};
}
.${cn}[data-m="e"] > .${cn}-body:hover > .${cn}-switch::before {
  box-shadow: 0px 4px 4px -2px ${CssVar.sdw.c};
}
.${cn}[data-m="e"] > .${cn}-body:hover:active .${cn}-switch::before {
  box-shadow: none;
}`,
neumorphism: `
.${cn}[data-m="e"] > .${cn}-body::before {
  box-shadow: ${CssPV.nCcvSdActive};
}
.${cn}[data-m="e"] > .${cn}-body:hover > .${cn}-switch::before {
  box-shadow: ${CssPV.nCvxSdHover};
}
.${cn}[data-m="r"] .${cn}-body::before,
.${cn}[data-m="d"] .${cn}-body::before {
  box-shadow: ${CssPV.nCcvSdDisabled};
}
.${cn}[data-m="r"] .${cn}-body > .${cn}-switch::before,
.${cn}[data-m="d"] .${cn}-body > .${cn}-switch::before {
  box-shadow: ${CssPV.nCvxSdShallow};
}
${colorIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-body[data-checked="true"]::before {
  background: ${v.ipt.on};
}`).join("")}`})}
`}</JsxStyle>;

export default ToggleBox;