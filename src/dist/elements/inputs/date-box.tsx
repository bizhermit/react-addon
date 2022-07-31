import DatetimeUtils from "@bizhermit/basic-utils/dist/datetime-utils";
import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { Dispatch, FocusEvent, HTMLAttributes, KeyboardEvent, useEffect, useRef, useCallback, useImperativeHandle } from "react";
import useValue, { InputAttributesWithoutDispatch } from "../../hooks/value";
import CssVar, { CssPV } from "../../styles/css-var";
import InputStyle, { InputBorder, inputCn } from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { _HookSetter } from "../../utils/hook";
import { inputFieldAttributes, InputHook } from "../../utils/input";
import Icon from "../icon";
import Popup, { usePopup } from "../../popups/popup";
import DatePicker, { useDatePicker } from "./date-picker";

const cn = "bh-dtb";

export type DateBoxHook = InputHook<string | number | Date> & {
  showPicker: () => void;
};
type Hook = _HookSetter<DateBoxHook>;

export type DateBoxAttributes = HTMLAttributes<HTMLDivElement> & InputAttributesWithoutDispatch<string | number | Date> & {
  $hook?: DateBoxHook;
  $dataType?: "string" | "number" | "date";
  $mode?: "ymd" | "ym" | "y";
  $hidePickerButton?: boolean;
  $hideClearButton?: boolean;
  $notInputText?: boolean;
  $rangeFrom?: string | number | Date;
  $rangeTo?: string | number | Date;
  $border?: InputBorder;
  $dispatch?: Dispatch<string>
    | Dispatch<number>
    | Dispatch<Date>
    | Dispatch<string | number>
    | Dispatch<string | Date>
    | Dispatch<number | Date>
    | Dispatch<string | number | Date>;
};

const DateBox = React.forwardRef<HTMLDivElement, DateBoxAttributes>((attrs, $ref) => {
  const ref = useRef<HTMLDivElement>();
  useImperativeHandle($ref, () => ref.current);
  const mode = attrs.$mode ?? "ymd";
  const yref = useRef<HTMLInputElement>();
  const mref = useRef<HTMLInputElement>();
  const dref = useRef<HTMLInputElement>();
  const picHook = useDatePicker();
  const popup = usePopup();
  
  const cacheNum = useRef<{ y?: number; m?: number; d?: number; }>({});
  const cacheNumToDate = () => {
    switch (mode) {
      case "y":
        if (cacheNum.current.y != null) {
          return new Date(cacheNum.current.y, 0, 1);
        }
        break;
      case "ym":
        if (cacheNum.current.y != null || cacheNum.current.m != null) {
          const d = new Date();
          return new Date(cacheNum.current.y ?? d.getFullYear(), cacheNum.current.m ?? d.getMonth(), 1);
        }
        break;
      default:
        if (cacheNum.current.y != null || cacheNum.current.m != null || cacheNum.current.d != null) {
          const d = new Date();
          return new Date(cacheNum.current.y ?? d.getFullYear(), cacheNum.current.m ?? d.getMonth(), cacheNum.current.d ?? d.getDate());
        }
        break;
    }
    return undefined;
  };

  const optimizeRange = (date: Date) => {
    if (date == null) {
      return { date, change: false };
    }
    let ret: Date;
    if (attrs.$rangeFrom && date) {
      const rFrom = DatetimeUtils.convert(attrs.$rangeFrom);
      if (date.getTime() < rFrom.getTime()) {
        ret = DatetimeUtils.removeTime(rFrom);
      }
    }
    if (attrs.$rangeTo && date) {
      const tFrom = DatetimeUtils.convert(attrs.$rangeTo);
      if (date.getTime() > tFrom.getTime()) {
        ret = DatetimeUtils.removeTime(tFrom);
      }
    }
    if (ret) {
      return { date: ret, change: true };
    }
    return { date, change: false };
  };

  const setInputValue = (v: string | number | Date) => {
    const date = DatetimeUtils.convert(v);
    if (date == null) {
      if (yref.current) yref.current.value = "";
      if (mref.current) mref.current.value = "";
      if (dref.current) dref.current.value = "";
      cacheNum.current = {};
      return;
    }
    if (yref.current) {
      yref.current.value = String(cacheNum.current.y = date.getFullYear());
    } else {
      cacheNum.current.y = undefined;
    }
    if (mref.current) {
      mref.current.value = String((cacheNum.current.m = date.getMonth()) + 1);
    } else {
      cacheNum.current.m = 0;
    }
    if (dref.current) {
      dref.current.value = String(cacheNum.current.d = date.getDate());
    } else {
      cacheNum.current.d = 1;
    }
  };

  const { val, set, buf } = useValue(attrs, {
    effect: setInputValue,
  });

  const changeY = (v: string) => {
    if (!isNumericOrEmpty(v)) {
      yref.current.value = String(cacheNum.current.y ?? "");
      return;
    }
    cacheNum.current.y = v === "" ? undefined : Number(v);
    if (v.length === 4) mref.current?.focus();
  };
  const changeM = (v: string) => {
    if (!isNumericOrEmpty(v)) {
      mref.current.value = String(cacheNum.current.m ?? "");
      return;
    }
    cacheNum.current.m = v === "" ? undefined : Number(v) - 1;
    if (v.length === 2 || cacheNum.current.m > 0) dref.current?.focus();
  };
  const changeD = (v: string) => {
    if (!isNumericOrEmpty(v)) {
      dref.current.value = String(cacheNum.current.d ?? "");
      return;
    }
    cacheNum.current.d = v === "" ? undefined : Number(v);
  }

  const focus = () => {
    switch (mode) {
      case "y":
        yref.current?.focus();
        break;
      case "ym":
        mref.current?.focus();
        break;
      default:
        dref.current?.focus();
        break;
    }
  };

  const showDPic = () => {
    if (attrs.$disabled || attrs.$readOnly) return;
    popup.show({ anchor: ref.current });
  };

  const closeDPic = () => {
    popup.hide();
    switch (mode) {
      case "y":
        yref.current.focus?.();
        break;
      case "ym":
        mref.current.focus?.();
        break;
      default:
        dref.current.focus?.();
        break;
    }
  };

  const clear = () => {
    setInputValue(undefined);
    set.current(undefined);
  };

  const commitCache = () => {
    const { date, change } = optimizeRange(cacheNumToDate());
    if (change) {
      setInputValue(buf.current);
      return;
    }
    if (date == null) {
      setInputValue(undefined);
    }
    switch (attrs.$dataType) {
      case "date":
        set.current(date);
        break;
      case "number":
        set.current(date.getMilliseconds());
        break;
      default:
        set.current(DatetimeUtils.format(date, "yyyy-MM-dd"));
        break;
    }
  };

  const blur = (e: FocusEvent) => {
    if (e.relatedTarget === yref.current || e.relatedTarget === mref.current || e.relatedTarget === dref.current) return;
    commitCache();
  };

  const optimizeUpdown = () => {
    switch (mode) {
      case "y":
        if (cacheNum.current.y == null) cacheNum.current.y = new Date().getFullYear();
        cacheNum.current.m = 0;
        cacheNum.current.d = 1;
        break;
      case "ym":
        if (cacheNum.current.y == null) cacheNum.current.y = new Date().getFullYear();
        if (cacheNum.current.m == null) cacheNum.current.m = new Date().getMonth();
        cacheNum.current.d = 1;
        break;
      default:
        if (cacheNum.current.y == null) cacheNum.current.y = new Date().getFullYear();
        if (cacheNum.current.m == null) cacheNum.current.m = new Date().getMonth();
        if (cacheNum.current.d == null) cacheNum.current.d = new Date().getDate();
        break;
    }
    const date = optimizeRange(cacheNumToDate()).date;
    setInputValue(date);
  };

  const keydownY = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "F2":
        showDPic();
        break;
      case "Enter":
        commitCache();
        break;
      case "ArrowUp":
        if (cacheNum.current.y == null) cacheNum.current.y = new Date().getFullYear();
        else cacheNum.current.y++;
        optimizeUpdown();
        break;
      case "ArrowDown":
        if (cacheNum.current.y == null) cacheNum.current.y = new Date().getFullYear();
        else cacheNum.current.y--;
        optimizeUpdown();
        break;
      case "Tab":
        if (attrs.$disabled || attrs.$readOnly) return;
        if (!e.shiftKey && mode !== "y") {
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
        showDPic();
        break;
      case "Enter":
        commitCache();
        break;
      case "Backspace":
        if (e.currentTarget.value.length === 0) {
          yref.current?.focus();
        }
        break;
      case "ArrowUp":
        if (cacheNum.current.m == null) cacheNum.current.m = new Date().getMonth();
        else cacheNum.current.m++;
        optimizeUpdown();
        break;
      case "ArrowDown":
        if (cacheNum.current.m == null) cacheNum.current.m = new Date().getMonth();
        else cacheNum.current.m--;
        optimizeUpdown();
        break;
      case "Tab":
        if (attrs.$disabled || attrs.$readOnly) return;
        if (mode === "ymd" || e.shiftKey) {
          e.stopPropagation();
        } else {
          commitCache();
        }
        break;
      default:
        break;
    }
  };
  const keydownD = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "F2":
        showDPic();
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
        if (cacheNum.current.d == null) cacheNum.current.d = new Date().getDate();
        else cacheNum.current.d++;
        optimizeUpdown();
        break;
      case "ArrowDown":
        if (cacheNum.current.d == null) cacheNum.current.d = new Date().getDate();
        else cacheNum.current.d--;
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
  }, [(attrs.$hook as Hook)?._set, mode]);

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
        <input
          className={`${cn}-y`}
          ref={yref}
          type="text"
          readOnly={attrs.$readOnly || attrs.$notInputText}
          disabled={attrs.$disabled}
          maxLength={4}
          onChange={e => changeY(e.currentTarget.value)}
          onKeyDown={keydownY}
          onFocus={e => e.currentTarget.select()}
        />
        {mode !== "y" ? 
          <>
            <span className={`${cn}-sep`}>/</span>
            <input
              className={`${cn}-m`}
              ref={mref}
              type="text"
              readOnly={attrs.$readOnly || attrs.$notInputText}
              disabled={attrs.$disabled}
              maxLength={2}
              onChange={e => changeM(e.currentTarget.value)}
              onKeyDown={keydownM}
              onFocus={e => e.currentTarget.select()}
            />
          </> : <></>
        }
        {mode === "ymd" ?
          <>
            <span className={`${cn}-sep`}>/</span>
            <input
              className={`${cn}-d`}
              ref={dref}
              type="text"
              readOnly={attrs.$readOnly || attrs.$notInputText}
              disabled={attrs.$disabled}
              maxLength={2}
              onChange={e => changeD(e.currentTarget.value)}
              onKeyDown={keydownD}
              onFocus={e => e.currentTarget.select()}
            />
          </> : <></>
        }
      </div>
      {attrs.$hidePickerButton || attrs.$disabled || attrs.$readOnly ? <></> :
        <div
          className={`${inputCn}_btn`}
          tabIndex={-1}
          onClick={() => showDPic()}
        ><Icon $image="calendar" /></div>
      }
      {attrs.$hideClearButton || attrs.$disabled || attrs.$readOnly ? <></> :
        <div
          className={`${inputCn}_btn`}
          tabIndex={-1}
          onClick={clear}
        ><Icon $image="cross" /></div>
      }
      {attrs.$disabled || attrs.$readOnly ? <></> :
        <Popup
          $hook={popup}
          $position ={{
            x: "inner",
            y: "outer",
          }}
          $showed={() => {
            picHook.focus();
            picHook.scrollToCurrent();
          }}
        >
          <DatePicker
            $hook={picHook}
            $mode={attrs.$mode}
            $rangeFrom={attrs.$rangeFrom}
            $rangeTo={attrs.$rangeTo}
            $dataType={attrs.$dataType}
            $value={val}
            $border="less"
            $clickNegative={() => {
              closeDPic();
            }}
            $clickPositive={(v) => {
              set.current(v);
              closeDPic();
            }}
            onClick={e => e.stopPropagation()}
          />
        </Popup>
      }
      {InputStyle}
      {Style}
    </div>
  );
});

const isNumericOrEmpty = (value: string) => {
  if (StringUtils.isEmpty(value)) return true;
  return /^[0-9]+$/.test(value);
};

export const useDateBox = (): DateBoxHook => {
  const dispatcher = useRef<Partial<DateBoxHook>>({});
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
.${cn}-y {
  width: 46px;
}
.${cn}-m,
.${cn}-d {
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

export default DateBox;