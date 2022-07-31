import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { HTMLAttributes, useRef, useEffect, ChangeEvent, KeyboardEvent, useCallback } from "react";
import useValue, { InputAttributes } from "../../hooks/value";
import CssVar from "../../styles/css-var";
import InputStyle, { InputBorder, inputCn } from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { _HookSetter } from "../../utils/hook";
import { inputFieldAttributes, InputHook } from "../../utils/input";
import Resizer from "../resizer";

const cn = "bh-txb";

export type TextBoxHook = InputHook<string>;
type Hook = _HookSetter<TextBoxHook>;

export type TextBoxAttributes = HTMLAttributes<HTMLDivElement> & InputAttributes<string> & {
  $hook?: TextBoxHook;
  $type?: "text" | "email" | "tel" | "url" | "search" | "password";
  $autoComplete?: string;
  $pattern?: string;
  $maxLength?: number;
  $minLength?: number;
  $required?: boolean;
  $resize?: boolean;
  $textAlign?: "left" | "center" | "right";
  $border?: InputBorder;
  $round?: boolean;
  $changing?: (value: string) => boolean | void;
};

const TextBox = React.forwardRef<HTMLDivElement, TextBoxAttributes>((attrs, ref) => {
  const iref = useRef<HTMLInputElement>();
  const { val, set, buf } = useValue(attrs, {
    effect: (v) => {
      if (iref.current.value !== v) {
        iref.current.value = v ?? "";
      }
    },
  });

  const commit = (val: string) => {
    if (attrs.$disabled || attrs.$readOnly) return;
    set.current(val);
  };

  const ibuf = useRef(val);
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value;
    const ret = attrs.$changing?.(v);
    if (ret === false) {
      iref.current.value = ibuf.current ?? "";
      return;
    }
    ibuf.current = v;
  };

  const keydown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        commit(e.currentTarget.value);
        break;
      case "Tab":
        commit(e.currentTarget.value);
        break;
      case "Escape":
        iref.current.value = buf.current;
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      focus: () => iref.current?.focus(),
      getValue: () => buf.current,
      setValue: (v) => set.current(v),
    });
  }, [(attrs.$hook as Hook)?._set]);

  return (
    <div
      {...inputFieldAttributes(attrs, cn)}
      ref={ref}
      data-v={StringUtils.isNotEmpty(val)}
      data-round={attrs.$round}
    >
      <input
        ref={iref}
        type={attrs.$type}
        className={`${inputCn}_fld ${cn}_fld`}
        tabIndex={attrs.tabIndex}
        name={attrs.$name}
        disabled={attrs.$disabled}
        readOnly={attrs.$readOnly}
        autoComplete={attrs.$autoComplete}
        pattern={attrs.$pattern}
        maxLength={attrs.$maxLength}
        minLength={attrs.$minLength}
        required={attrs.$required}
        placeholder={attrs.placeholder}
        data-align={attrs.$textAlign}
        onChange={change}
        onBlur={(e) => {
          commit(e.currentTarget.value);
        }}
        onKeyDown={keydown}
      />
      {attrs.$resize ? <Resizer direction="x" /> : <></>}
      {attrs.children}
      {InputStyle}
      {Style}
    </div>
  );
});

export const useTextBox = (): TextBoxHook => {
  const dispatcher = useRef<Partial<TextBoxHook>>({});
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

const Style = <JsxStyle id={cn}>{() => `
.${cn}_fld {
  flex: 1;
}
.${cn}[data-round="true"] > .${cn}_fld {
  padding-left: calc(${CssVar.size} / 2);
  padding-right: calc(${CssVar.size} / 2);
}`}</JsxStyle>;

export default TextBox;