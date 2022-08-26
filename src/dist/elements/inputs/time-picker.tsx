import Time, { TimeUtils } from "@bizhermit/time";
import React, { Dispatch, HTMLAttributes, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import useValue, { InputAttributesWithoutDispatch } from "../../hooks/value";
import { sbCn } from "../../styles/core-style";
import CssVar, { CssPV, colorIterator, switchDesign } from "../../styles/css-var";
import InputStyle, { InputBorder, inputCn } from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { _HookSetter } from "../../utils/hook";
import { inputAttributes, InputHook } from "../../utils/input";
import Label from "../label";

const cn = "bh-tmp";

export type TimePickerHook = InputHook<number | string> & {
  scrollToCurrent: () => void;
};
type Hook = _HookSetter<TimePickerHook>;

export type TimePickerAttributes = HTMLAttributes<HTMLDivElement> & InputAttributesWithoutDispatch<number | string> & {
  $hook?: TimePickerHook;
  $mode?: "hms" | "hm" | "h" | "ms";
  $dataType?: "number" | "string";
  $unit?: "hour" | "minute" | "second" | "millisecond";
  $hourInterval?: number;
  $minuteInterval?: number;
  $secondInterval?: number;
  $border?: Omit<InputBorder, "under">;
  $dispatch?: Dispatch<number>
    | Dispatch<string>
    | Dispatch<number | string>;
  $clickPositive?: (value: string | number) => void | Promise<void>;
  $positiveButtonLabel?: ReactNode;
  $clickNegative?: () => void | Promise<void>;
  $negativeButtonLabel?: ReactNode;
  $changing?: (value: string | number) => void;
};

const TimePicker = React.forwardRef<HTMLDivElement, TimePickerAttributes>((attrs, ref) => {
  const bref = useRef<HTMLDivElement>();
  const href = useRef<HTMLDivElement>();
  const mref = useRef<HTMLDivElement>();
  const sref = useRef<HTMLDivElement>();
  const [sRev, setSRev] = useState(0);
  const notEdit = attrs.$disabled || attrs.$readOnly;
  const mode = attrs.$mode ?? "hm";
  const unit = useRef((() => {
    if (attrs.$unit) return attrs.$unit;
    switch (mode) {
      case "h":
        return "hour";
      case "hm":
        return "minute";
      case "hms":
        return "second";
      default:
        return "millisecond";
    };
  })());

  const toTime = (v: string | number) => {
    if (v == null) return new Time();
    if (typeof v === "string") return new Time(v);
    return new Time(TimeUtils.convertUnitToMilliseconds(v, unit.current));
  };

  const { set, buf } = useValue(attrs, {
    effect: (v) => {
      selectedRef.current = toTime(v);
      setHNum(selectedRef.current.getHours());
      setMNum(selectedRef.current.getMinutes());
      setSNum(selectedRef.current.getSeconds());
      setSRev(c => c+1);
    },
  });

  const selectedRef  = useRef(toTime(buf.current));
  const [hNum, setHNum] = useState(selectedRef.current.getHours());
  const [mNum, setMNum] = useState(selectedRef.current.getMinutes());
  const [sNum, setSNum] = useState(selectedRef.current.getSeconds());
  
  const clickPositive = () => {
    let ret: number | string;
    switch (attrs.$dataType) {
      case "string":
        set.current(ret = selectedRef.current.format());
        break;
      default:
        set.current(ret = TimeUtils.convertMillisecondsToUnit(selectedRef.current.getTime(), unit.current));
        break;
    }
    if (attrs.$clickPositive) {
      setTimeout(() => {
        attrs.$clickPositive(ret);
      }, 0);
    }
    setSRev(c => c+1);
  };
  const clickNegative = () => {
    selectedRef.current = toTime(buf.current);
    setHNum(selectedRef.current.getHours());
    setMNum(selectedRef.current.getMinutes());
    setSNum(selectedRef.current.getSeconds());
    attrs.$clickNegative?.();
    setSRev(c => c+1);
  };

  const hNodes = useMemo(() => {
    const nodes = [];
    if (mode === "hm" || mode === "hms" || mode === "h") {
      const int = attrs.$hourInterval ?? 1;
      for (let i = 0; i < 24; i++) {
        if (i % int !== 0) continue;
        nodes.push(
          <div
            key={i}
            className={`${cn}-cell`}
            data-selected={i === hNum}
            onClick={notEdit ? undefined : () => {
              selectedRef.current.setHours(i);
              setHNum(i);
            }}
            onDoubleClick={notEdit ? undefined : () => {
              selectedRef.current.setHours(i);
              setHNum(i);
              clickPositive();
            }}
          >{`00${i}`.slice(-2)}</div>
        );
      }
    }
    return nodes;
  }, [hNum, mode, notEdit]);

  const mNodes = useMemo(() => {
    const nodes = [];
    if (mode === "hm" || mode === "hms" || mode === "ms") {
      const int = attrs.$minuteInterval ?? 1;
      for (let i = 0; i < 60; i++) {
        if (i % int !== 0) continue;
        nodes.push(
          <div
            key={i}
            className={`${cn}-cell`}
            data-selected={i === mNum}
            onClick={notEdit ? undefined : () => {
              selectedRef.current.setMinutes(i);
              setMNum(i);
            }}
            onDoubleClick={notEdit ? undefined : () => {
              selectedRef.current.setMinutes(i);
              setMNum(i);
              clickPositive();
            }}
          >{`00${i}`.slice(-2)}</div>
        );
      }
    }
    return nodes;
  }, [mNum, mode, notEdit]);

  const sNodes = useMemo(() => {
    const nodes = [];
    if (mode === "hms" || mode === "ms") {
      const int = attrs.$secondInterval ?? 1;
      for (let i = 0; i < 60; i++) {
        if (i % int !== 0) continue;
        nodes.push(
          <div
            key={i}
            className={`${cn}-cell`}
            data-selected={i === sNum}
            onClick={notEdit ? undefined : () => {
              selectedRef.current.setSeconds(i);
              setSNum(i);
            }}
            onDoubleClick={notEdit ? undefined : () => {
              selectedRef.current.setSeconds(i);
              setSNum(i);
              clickPositive();
            }}
          >{`00${i}`.slice(-2)}</div>
        );
      }
    }
    return nodes;
  }, [sNum, mode, notEdit]);

  useEffect(() => {
    setTimeout(() => {
      const selector = `.${cn}-cell[data-selected="true"]`;
      if (href.current) {
        const elem = href.current?.querySelector(selector) as HTMLElement;
        if (elem) href.current.scrollTop = elem.offsetTop - (href.current.clientHeight - elem.offsetHeight) / 2;
      }
      if (mref.current) {
        const elem = mref.current?.querySelector(selector) as HTMLElement;
        if (elem) mref.current.scrollTop = elem.offsetTop - (mref.current.clientHeight - elem.offsetHeight) / 2;
      }
      if (sref.current) {
        const elem = sref.current?.querySelector(selector) as HTMLElement;
        if (elem) sref.current.scrollTop = elem.offsetTop - (sref.current.clientHeight - elem.offsetHeight) / 2;
      }
    }, 0);
  }, [sRev, mode, notEdit]);

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      focus: () => bref.current?.focus(),
      getValue: () => buf.current,
      setValue: (v) => set.current(v),
      scrollToCurrent: () => setSRev(c => c+1),
    });
  }, [(attrs.$hook as Hook)?._set]);

  return (
    <div
      {...inputAttributes(attrs, cn)}
      ref={ref}
      data-mode={mode}
      data-border={attrs.$border ?? "round"}
    >
      <div
        className={`${cn}-body`}
        ref={bref}
        tabIndex={attrs.tabIndex ?? 0}
      >
        {mode === "hm" || mode === "hms" || mode === "h" ?
          <div
            className={`${cn}-h ${sbCn}`}
            ref={href}
          >{hNodes}</div> : <></>
        }
        {mode === "hm" || mode === "hms" ?  <span className={`${cn}-sep`}>:</span> : <></>}
        {mode === "hm" || mode === "hms" || mode === "ms" ?
          <div
            className={`${cn}-m ${sbCn}`}
            ref={mref}
          >{mNodes}</div> : <></>
        }
        {mode === "hms" || mode === "ms" ?
          <>
            <span className={`${cn}-sep`}>:</span>
            <div
              className={`${cn}-s ${sbCn}`}
              ref={sref}
            >{sNodes}</div>
          </> : <></>
        }
      </div>
      {notEdit ? <></> :
        <div className={`${cn}-btns`}>
          <div
            className={`${inputCn}_btn ${cn}-btn_lbl`}
            onClick={clickNegative}
            tabIndex={0}
            data-border
          >{attrs.$negativeButtonLabel ?? <Label>キャンセル</Label>}</div>
          <div
            className={`${inputCn}_btn ${cn}-btn_lbl`}
            onClick={clickPositive}
            tabIndex={0}
            data-border
          >{attrs.$positiveButtonLabel ?? <Label>OK</Label>}</div>
        </div>
      }
      {InputStyle}
      {Style}
    </div>
  );
});

export const useTimePicker = (): TimePickerHook => {
  const dispatcher = useRef<Partial<TimePickerHook>>({});
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
    scrollToCurrent: useCallback(() => {
      dispatcher.current.scrollToCurrent?.();
    }, []),
    _set: useCallback((d) => {
      dispatcher.current = d;
    }, []),
  } as Hook;
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${inputCn}.${cn} {
  flex-direction: column;
  height: calc(${CssVar.size} * 9);
  width: calc(${CssVar.size} * 6);
  user-select: none;
}
.${cn}[data-mode="hms"] {
  width: calc(${CssVar.size} * 9);
}
.${cn}[data-mode="hm"],
.${cn}[data-mode="ms"] {
  width: calc(${CssVar.size} * 7);
}
.${cn}[data-mode="h"] {
  width: calc(${CssVar.size} * 6);
}
.${cn}-body {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  min-height: 0px;
  width: 100%;
  overflow: visible;
  outline: none;
}
.${cn}[data-m="e"] > .${cn}-body {
  border-radius: ${CssVar.bdr} ${CssVar.bdr} 0 0;
}
.${cn}[data-m="r"] > .${cn}-body,
.${cn}[data-m="d"] > .${cn}-body {
  border-radius: ${CssVar.bdr};
}
.${cn}-btns {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  width: 100%;
}
.${cn}-btn_lbl {
  flex: 1;
}
.${cn}-btn_lbl:first-child {
  border-radius: ${CssVar.bdr} 0 0 ${CssVar.bdr};
}
.${cn}-sep {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  flex: none;
  height: ${CssVar.size};
}
.${cn}-h,
.${cn}-m,
.${cn}-s {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  min-width: 0px;
  flex: 1;
${switchDesign(design, {
neumorphism: `padding: 0 ${CssVar.pdx};`
})}
}
.${cn}-cell {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  flex: none;
  padding-top: 2px;
  white-space: nowrap;
  border-radius: ${CssVar.bdr};
  height: ${CssVar.size};
  width: 100%;
${switchDesign(design, {
fm: `transition: background 0.1s, color 0.1s;`,
neumorphism: `transition: background 0.1s, color 0.1s, box-shadow 0.1s;`,
})}
}
.${cn}-cell:first-child {
  margin-top: calc(${CssVar.size} * 3.5);
}
.${cn}-cell:last-child {
  margin-bottom: calc(${CssVar.size} * 3.5);
}
.${cn}-cell:hover {
  background: ${CssVar.hvrBgc};
}
.${cn}-cell:hover:active {
  background: ${CssVar.actBgc};
}
.${cn}[data-m="e"] > .${cn}-body > .${cn}-h > .${cn}-cell,
.${cn}[data-m="e"] > .${cn}-body > .${cn}-m > .${cn}-cell,
.${cn}[data-m="e"] > .${cn}-body > .${cn}-s > .${cn}-cell {
  cursor: pointer;
}
${switchDesign(design, {
fm: `
.${cn}[data-m="e"][data-border="round"] > .${cn}-btns > .${cn}-btn_lbl {
  border-top: none;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
${colorIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-body {
  color: ${v.ipt.fc};
}
.${cn}${qs}[data-m="e"] > .${cn}-body {
  background: ${v.ipt.bgc};
}
.${cn}${qs}[data-m="e"][data-border="round"] > .${cn}-body,
.${cn}${qs}[data-m="r"][data-border="round"] > .${cn}-body {
  border: 1px solid ${v.ipt.bdc};
}
.${cn}${qs} > .${cn}-body > .${cn}-h > .${cn}-cell[data-selected="true"],
.${cn}${qs} > .${cn}-body > .${cn}-m > .${cn}-cell[data-selected="true"],
.${cn}${qs} > .${cn}-body > .${cn}-s > .${cn}-cell[data-selected="true"] {
  background: ${v.ipt.on};
  color: ${v.ipt.on_fc ?? v.ipt.fc};
}
`).join("")}`,
neumorphism: `
.${cn}-cell[data-selected="true"] {
  box-shadow: ${CssPV.nCcvSdActive};
}
.${cn}[data-m="r"] .${cn}-cell[data-selected="true"], 
.${cn}[data-m="d"] .${cn}-cell[data-selected="true"] {
  box-shadow: ${CssPV.nCcvSdDisabled};
}
${colorIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-body {
  color: ${v.ipt.fc};
}
.${cn}${qs}[data-m="e"] > .${cn}-body {
  background: ${v.ipt.bgc};
}
.${cn}${qs} > .${cn}-body > .${cn}-h > .${cn}-cell[data-selected="true"],
.${cn}${qs} > .${cn}-body > .${cn}-m > .${cn}-cell[data-selected="true"],
.${cn}${qs} > .${cn}-body > .${cn}-s > .${cn}-cell[data-selected="true"] {
  background: ${v.ipt.on};
  color: ${v.ipt.on_fc ?? v.ipt.fc};
}
`).join("")}`})}
`}</JsxStyle>;

export default TimePicker;