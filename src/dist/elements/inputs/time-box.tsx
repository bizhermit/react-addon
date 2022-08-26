import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import Time, { TimeUtils } from "@bizhermit/time";
import React, { Dispatch, FocusEvent, HTMLAttributes, KeyboardEvent, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import useValue, { InputAttributesWithoutDispatch } from "../../hooks/value";
import CssVar, { CssPV } from "../../styles/css-var";
import InputStyle, { InputBorder, inputCn } from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { _HookSetter } from "../../utils/hook";
import { inputFieldAttributes, InputHook } from "../../utils/input";
import Icon from "../icon";
import Popup, { usePopup } from "../../popups/popup";
import TimePicker, { useTimePicker } from "./time-picker";

const cn = "bh-tmb";

export type TimeBoxHook = InputHook<string | number> & {
  showPicker: () => void;
};
type Hook = _HookSetter<TimeBoxHook>;

export type TimeBoxAttributes = HTMLAttributes<HTMLDivElement> & InputAttributesWithoutDispatch<string | number> & {
  $hook?: TimeBoxHook;
  $mode?: "hms" | "hm" | "h" | "ms";
  $dataType?: "number" | "string";
  $unit?: "hour" | "minute" | "second" | "millisecond";
  $keydownIncrement?: boolean;
  $hourInterval?: number;
  $minuteInterval?: number;
  $secondInterval?: number;
  $hidePickerButton?: boolean;
  $hideClearButton?: boolean;
  $notInputText?: boolean;
  $border?: InputBorder;
  $dispatch?: Dispatch<number>
    | Dispatch<string>
    | Dispatch<number | string>;
};

const TimeBox = React.forwardRef<HTMLDivElement, TimeBoxAttributes>((attrs, $ref) => {
  const ref = useRef<HTMLDivElement>();
  useImperativeHandle($ref, () => ref.current);
  const href = useRef<HTMLInputElement>();
  const mref = useRef<HTMLInputElement>();
  const sref = useRef<HTMLInputElement>();
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
  const picHook = useTimePicker();
  const popup = usePopup();

  const cacheNum = useRef<{ h?: number; m?: number; s?: number; }>({});
  const cacheNumToTime = () => {
    switch (mode) {
      case "hms":
        if (cacheNum.current.h != null || cacheNum.current.m != null || cacheNum.current.s != null) {
          return new Time()
            .setHours(cacheNum.current.h ?? 0)
            .setMinutes(cacheNum.current.m ?? 0)
            .setSeconds(cacheNum.current.s ?? 0);
        }
        break;
      case "ms":
        if (cacheNum.current.m != null || cacheNum.current.s != null) {
          return new Time()
            .setMinutes(cacheNum.current.m ?? 0)
            .setSeconds(cacheNum.current.s ?? 0);
        }
        break;
      case "h":
        if (cacheNum.current.h != null) {
          return new Time().setHours(cacheNum.current.h);
        }
        break;
      default:
        if (cacheNum.current.h != null || cacheNum.current.m != null) {
          return new Time()
            .setHours(cacheNum.current.h ?? 0)
            .setMinutes(cacheNum.current.m ?? 0);
        }
        break;
    }
    return undefined;
  };

  const toTime = (v: string | number) => {
    if (v == null) return undefined;
    if (typeof v === "string") return new Time(v);
    return new Time(TimeUtils.convertUnitToMilliseconds(v, unit.current));
  };

  const setInputValue = (v: string | number) => {
    const time = toTime(v);
    if (time == null) {
      if (href.current) href.current.value = "";
      if (mref.current) mref.current.value = "";
      if (sref.current) sref.current.value = "";
      cacheNum.current = {};
      return;
    }
    if (href.current) {
      href.current.value = String(cacheNum.current.h = time.getHours());
    } else {
      cacheNum.current.h = 0;
    }
    if (mref.current) {
      mref.current.value = String(cacheNum.current.m = time.getMinutes());
    } else {
      cacheNum.current.m = 0;
    }
    if (sref.current) {
      sref.current.value = String(cacheNum.current.s = time.getSeconds());
    } else {
      cacheNum.current.s = 0;
    }
  }

  const { val, set, buf } = useValue(attrs, {
    effect: setInputValue,
  });

  const changeH = (v: string) => {
    if (!isNumericOrEmpty(v)) {
      href.current.value = String(cacheNum.current.h ?? "");
      return;
    }
    cacheNum.current.h = v === "" ? undefined : Number(v);
    if (v.length === 2) mref.current?.focus();
  };
  const changeM = (v: string) => {
    if (!isNumericOrEmpty(v)) {
      mref.current.value = String(cacheNum.current.m ?? "");
      return;
    }
    cacheNum.current.m = v === "" ? undefined : Number(v);
    if (v.length === 2) sref.current?.focus();
  };
  const changeS = (v: string) => {
    if (!isNumericOrEmpty(v)) {
      sref.current.value = String(cacheNum.current.s ?? "");
      return;
    }
    cacheNum.current.s = v === "" ? undefined : Number(v);
  };

  const focus = () => {
    if (href.current) href.current.focus();
    else if (mref.current) mref.current.focus();
    else if (sref.current) sref.current.focus();
  };

  const showTPic = () => {
    if (attrs.$disabled || attrs.$readOnly) return;
    popup.show({ anchor: ref.current });
  };

  const closeTPic = () => {
    popup.hide();
    if (sref.current) sref.current.focus();
    else if (mref.current) mref.current.focus();
    else if (href.current) href.current.focus();
  };

  const clear = () => {
    setInputValue(undefined);
    set.current(undefined);
  };

  const commitCache = () => {
    const time = cacheNumToTime();
    if (time == null) {
      setInputValue(undefined);
      set.current(undefined);
    } else {
      switch (attrs.$dataType) {
        case "string":
          set.current(time.format());
          break;
        default:
          set.current(TimeUtils.convertMillisecondsToUnit(time.getTime(), unit.current));
          break;
      }
    }
  };

  const blur = (e: FocusEvent) => {
    if (e.relatedTarget === href.current || e.relatedTarget === mref.current || e.relatedTarget === sref.current) return;
    commitCache();
  };

  const optimizeUpdown = () => {
    if (cacheNum.current.h == null) cacheNum.current.h = 0;
    if (cacheNum.current.m == null) cacheNum.current.m = 0;
    if (cacheNum.current.s == null) cacheNum.current.s = 0;
    const time = cacheNumToTime();
    setInputValue(TimeUtils.convertMillisecondsToUnit(time.getTime(), unit.current));
  };

  const keydownH = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "F2":
        showTPic();
        break;
      case "Enter":
        commitCache();
        break;
      case "ArrowUp":
        if (cacheNum.current.h != null) {
          cacheNum.current.h += attrs.$hourInterval ?? 1;
        }
        optimizeUpdown();
        break;
      case "ArrowDown":
        if (cacheNum.current.h != null) {
          cacheNum.current.h -= attrs.$hourInterval ?? 1;
        }
        optimizeUpdown();
        break;
      case "Tab":
        if (attrs.$disabled || attrs.$readOnly) return;
        if (mode !== "h" && !e.shiftKey) {
          e.stopPropagation();
        } else {
          commitCache();
        }
        break;
      default:
        break;
    }
  };
  const keydownM = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "F2":
        showTPic();
        break;
      case "Enter":
        commitCache();
        break;
      case "Backspace":
        if (e.currentTarget.value.length === 0) {
          href.current?.focus();
        }
        break;
      case "ArrowUp":
        if (cacheNum.current.m != null) {
          cacheNum.current.m += attrs.$minuteInterval ?? 1;
        }
        optimizeUpdown();
        break;
      case "ArrowDown":
        if (cacheNum.current.m != null) {
          cacheNum.current.m -= attrs.$minuteInterval ?? 1;
        }
        optimizeUpdown();
        break;
      case "Tab":
        if (attrs.$disabled || attrs.$readOnly) return;
        if (mode === "hms" || (mode === "hm" && e.shiftKey) || (mode === "ms" && !e.shiftKey)) {
          e.stopPropagation();
        } else {
          commitCache();
        }
        break;
      default:
        break;
    }
  };
  const keydownS = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "F2":
        showTPic();
        break;
      case "Enter":
        commitCache();
        break;
      case "Backspace":
        if (e.currentTarget.value.length === 0) {
          mref.current?.focus();
        }
        break;
      case "ArrowUp":
        if (cacheNum.current.s != null) {
          cacheNum.current.s += attrs.$secondInterval ?? 1;
        }
        optimizeUpdown();
        break;
      case "ArrowDown":
        if (cacheNum.current.s != null) {
          cacheNum.current.s -= attrs.$secondInterval ?? 1;
        }
        optimizeUpdown();
        break;
      case "Tab":
        if (attrs.$disabled || attrs.$readOnly) return;
        if (e.shiftKey) {
          e.stopPropagation();
        } else {
          commitCache();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setInputValue(val);
  }, [mode]);

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      focus: () => focus(),
      getValue: () => buf.current,
      setValue: (v) => set.current(v),
      showPicker: () => popup.show({ anchor: ref.current }),
    });
  }, [(attrs.$hook as Hook)?._set, mode])

  return (
    <div
      {...inputFieldAttributes(attrs, cn)}
      ref={ref}
      data-v={val != null}
    >
      <div
        className={`${inputCn}_fld ${cn}_fld`}
        onBlur={blur}
      >
        {mode === "hm" || mode === "hms" || mode === "h" ?
          <input
            className={`${cn}-h`}
            ref={href}
            readOnly={attrs.$readOnly || attrs.$notInputText}
            disabled={attrs.$disabled}
            maxLength={2}
            onChange={e => changeH(e.currentTarget.value)}
            onKeyDown={keydownH}
            onFocus={e => e.currentTarget.select()}
          /> : <></>
        }
        {mode === "hm" || mode === "hms" ?  <span className={`${cn}-sep`}>:</span> : <></>}
        {mode === "hm" || mode === "hms" || mode === "ms" ?
          <input
            className={`${cn}-m`}
            ref={mref}
            readOnly={attrs.$readOnly || attrs.$notInputText}
            disabled={attrs.$disabled}
            maxLength={2}
            onChange={e => changeM(e.currentTarget.value)}
            onKeyDown={keydownM}
            onFocus={e => e.currentTarget.select()}
          /> : <></>
        }
        {mode === "hms" || mode === "ms" ?
          <>
            <span className={`${cn}-sep`}>:</span>
            <input
              className={`${cn}-s`}
              ref={sref}
              readOnly={attrs.$readOnly || attrs.$notInputText}
              disabled={attrs.$disabled}
              maxLength={2}
              onChange={e => changeS(e.currentTarget.value)}
              onKeyDown={keydownS}
              onFocus={e => e.currentTarget.select()}
            />
          </> : <></>
        }
      </div>
      {attrs.$hidePickerButton ? <></> :
        <div
          className={`${inputCn}_btn`}
          tabIndex={-1}
          onClick={() => showTPic()}
        ><Icon $image="clock" $transition /></div>
      }
      {attrs.$hideClearButton ? <></> :
        <div
          className={`${inputCn}_btn`}
          tabIndex={-1}
          onClick={clear}
        ><Icon $image="cross" $transition /></div>
      }
      <Popup
        $hook={popup}
        $position={{
          x: "inner",
          y: "outer",
        }}
        $showed={() => {
          picHook.focus();
          picHook.scrollToCurrent();
        }}
      >
        <TimePicker
          $hook={picHook}
          $mode={attrs.$mode}
          $dataType={attrs.$dataType}
          $value={val}
          $border="less"
          $clickNegative={() => {
            closeTPic();
          }}
          $clickPositive={(v) => {
            set.current(v);
            closeTPic();
          }}
          onClick={e => e.stopPropagation()}
        />
      </Popup>
      {InputStyle}
      {Style}
    </div>
  );
});

const isNumericOrEmpty = (value: string) => {
  if (StringUtils.isEmpty(value)) return true;
  return /^[0-9]+$/.test(value);
};

export const useTimeBox = (): TimeBoxHook => {
  const dispatcher = useRef<Partial<TimeBoxHook>>({});
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
    showPicker: useCallback(() => {
      dispatcher.current.showPicker?.();
    }, []),
    _set: useCallback((d) => {
      dispatcher.current = d;
    }, []),
  } as Hook;
};

const Style = <JsxStyle id={cn}>{() => `
.${inputCn}.${cn} {
  width: unset;
}
.${cn}_fld {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  height: 100%;
  min-width: 0px;
}
.${cn} input {
  text-align: center;
  flex: none;
  padding-left: 0px;
  padding-right: 0px;
}
.${cn}-h,
.${cn}-m,
.${cn}-s {
  width: 28px;
}
.${cn}-sep {
  padding-top: 2px;
  font-size: calc(${CssVar.fs} * 0.9);
  opacity: 0;
}
.${cn}[data-m="e"]:focus-within > .${cn}_fld > .${cn}-sep,
.${cn}[data-v="true"] > .${cn}_fld > .${cn}-sep {
  opacity: 1;
}
`}</JsxStyle>;

export default TimeBox;