import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { ChangeEvent, HTMLAttributes, KeyboardEvent, useCallback, useEffect, useRef } from "react";
import useValue, { InputAttributes } from "../../hooks/value";
import { sbCn } from "../../styles/core-style";
import CssVar, { switchDesign } from "../../styles/css-var";
import InputStyle, { InputBorder, inputCn } from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { _HookSetter } from "../../utils/hook";
import { inputFieldAttributes, InputHook } from "../../utils/input";
import Resizer from "../resizer";

const cn = "bh-txa";

export type TextAreaHook = InputHook<string>;
type Hook = _HookSetter<TextAreaHook>;

export type TextAreaAttributes = HTMLAttributes<HTMLDivElement> & InputAttributes<string> & {
  $hook?: TextAreaHook;
  $autoComplete?: string;
  $maxLength?: number;
  $minLength?: number;
  $required?: boolean;
  $resize?: boolean | "x" | "y" | "xy";
  $textAlign?: "left" | "center" | "right";
  $border?: InputBorder;
  $changing?: (value: string) => boolean | void;
};

const TextArea = React.forwardRef<HTMLDivElement, TextAreaAttributes>((attrs, ref) => {
  const iref = useRef<HTMLTextAreaElement>();
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
  const change = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.currentTarget.value;
    const ret = attrs.$changing?.(v);
    if (ret === false) {
      iref.current.value = ibuf.current ?? "";
      return;
    }
    ibuf.current = v;
  };

  const keydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    switch (e.key) {
      case "Enter":
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
  }, [(attrs.$hook as Hook)?._set])

  return (
    <div
      {...inputFieldAttributes(attrs, cn)}
      ref={ref}
      data-v={StringUtils.isNotEmpty(val)}
    >
      <textarea
        ref={iref}
        className={`${inputCn}_fld ${cn}_fld ${sbCn}`}
        name={attrs.$name}
        disabled={attrs.$disabled}
        readOnly={attrs.$readOnly}
        autoComplete={attrs.$autoComplete}
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
      {attrs.$resize ? <Resizer direction={typeof attrs.$resize === "boolean" ? "xy" : attrs.$resize} /> : <></>}
      {InputStyle}
      {Style}
    </div>
  );
});

export const useTextArea = (): TextAreaHook => {
  const dispatcher = useRef<Partial<TextAreaHook>>({});
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
  width: 200px;
  height: calc(${CssVar.size} * 3 + ${CssVar.pdy} * 2);
}
.${cn}[data-placeholder] {
${switchDesign(design, {
_: `height: calc(${CssVar.size} * 3 + ${CssVar.pdy} * 2);`,
c: `height: calc(${CssVar.size} * 3 + ${CssVar.pdy} * 2 + ${CssVar.phsize});`
})}
}
`}</JsxStyle>;

export default TextArea;