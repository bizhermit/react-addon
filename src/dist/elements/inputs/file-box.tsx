import React, { ChangeEvent, HTMLAttributes, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import useValue, { InputAttributes } from "../../hooks/value";
import { CssPV } from "../../styles/css-var";
import InputStyle, { inputCn } from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { _HookSetter } from "../../utils/hook";
import { inputAttributes, InputHook } from "../../utils/input";
import Button, { ButtonAttributes, buttonCn, useButton } from "../button";
import Label, { labelCn } from "../label";
import Resizer from "../resizer";

const cn = "bh-flb";

export type FileBoxHook = InputHook<File>;
type Hook = _HookSetter<FileBoxHook>;

export type FileAccept = ".txt" | ".csv" | ".jpg" | ".png" | ".gif" | ".conf" | ".zip" | ".data" | string;

export type FileBoxAttributes = HTMLAttributes<HTMLDivElement> & InputAttributes<File> & {
  $hook?: FileBoxHook;
  $resize?: boolean;
  $accept?: Array<FileAccept>;
  $butotnAttributes?: Omit<ButtonAttributes, "$click" | "$hook">;
  $hideLabel?: boolean;
  children?: ReactNode;
};

const FileBox = React.forwardRef<HTMLDivElement, FileBoxAttributes>((attrs, ref) => {
  const iref = useRef<HTMLInputElement>();
  const btn = useButton();
  const [label, setLabel] = useState("");

  const { val, set, buf } = useValue(attrs, {
    effect: (file) => {
      setLabel(file?.name ?? "");
      if (iref.current) iref.current.value = "";
    }
  })

  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (attrs.$disabled || attrs.$readOnly) return;
    set.current(e.target.files[0]);
  };

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      focus: () => btn.focus(),
      getValue: () => buf.current,
      setValue: (v) => set.current(v),
    });
  }, [(attrs.$hook as Hook)?._set])

  return (
    <div
      {...inputAttributes(attrs, cn)}
      ref={ref}
    >
      <div className={`${cn}-body`}>
        {attrs.$readOnly || attrs.$disabled ? <></> :
          <Button
            {...attrs.$butotnAttributes}
            $hook={btn}
            $color={attrs.$butotnAttributes?.$color ?? attrs.$color}
            $click={() => {
              iref.current.click();
            }}
          >{attrs.$butotnAttributes?.children ?? "ファイルを選択"}</Button>
        }
        {attrs.$hideLabel || val == null ? <></> :
          <Label $nowrap $color={attrs.$color}>{label}</Label>
        }
        {attrs.children}
      </div>
      {attrs.$resize ? <Resizer direction="x" /> : <></>}
      <input
        ref={iref}
        className={`${inputCn}-hidden`}
        type="file"
        accept={attrs.$accept?.join(",") ?? "."}
        tabIndex={-1}
        onChange={changeFile}
      />
      {InputStyle}
      {Style}
    </div>
  )
});

export const useFileBox = (): FileBoxHook => {
  const dispatcher = useRef<Partial<FileBoxHook>>({});
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
.${cn} {
  width: unset;
}
.${cn}-body {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  overflow: visible;
  height: 100%;
  width: 100%;
}
.${cn} > .${cn}-body > .${buttonCn} + .${labelCn} {
  padding-left: 3px;
}
.${cn} > .${cn}-body > .${labelCn} {
  flex: 1;
}
`}</JsxStyle>;

export default FileBox;