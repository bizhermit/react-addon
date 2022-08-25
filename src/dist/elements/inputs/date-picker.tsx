import DatetimeUtils from "@bizhermit/basic-utils/dist/datetime-utils";
import React, { Dispatch, FC, HTMLAttributes, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import useValue, { InputAttributesWithoutDispatch } from "../../hooks/value";
import { sbCn } from "../../styles/core-style";
import CssVar, { CssPV, colorIterator, switchDesign } from "../../styles/css-var";
import InputStyle, { InputBorder, inputCn } from "../../styles/input-style";
import JsxStyle from "../../styles/jsx-style";
import { _HookSetter } from "../../utils/hook";
import { inputAttributes, InputHook } from "../../utils/input";
import Icon from "../icon";
import Label from "../label";

const cn = "bh-dtp";

export type DatePickerHook = InputHook<string | number | Date> & {
  scrollToCurrent: () => void;
};
type Hook = _HookSetter<DatePickerHook>;

const monthTextsNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] as const;

export type DatePickerAttributes = HTMLAttributes<HTMLDivElement> & InputAttributesWithoutDispatch<string | number | Date> & {
  $hook?: DatePickerHook;
  $dataType?: "string" | "number" | "date";
  $mode?: "ymd" | "ym" | "y";
  $uiType?: "list" | "calendar";
  $monthTexts?: "en" | "en-s" | "ja" | "num" | Array<string>;
  $weekTexts?: "en" | "ja" | Array<string>;
  $startWeek?: number;
  $rangeFrom?: string | number | Date;
  $rangeTo?: string | number | Date;
  $border?: Omit<InputBorder, "under">;
  $dispatch?: Dispatch<string>
    | Dispatch<number>
    | Dispatch<Date>
    | Dispatch<string | number>
    | Dispatch<string | Date>
    | Dispatch<number | Date>
    | Dispatch<string | number | Date>;
  $clickPositive?: (date: string | number | Date) => void | Promise<void>;
  $positiveButtonLabel?: ReactNode;
  $clickNegative?: () => void | Promise<void>;
  $negativeButtonLabel?: ReactNode;
  $changing?: (date: Date) => void;
};

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerAttributes>((attrs, ref) => {
  const bref = useRef<HTMLDivElement>(),
    yref = useRef<HTMLDivElement>(),
    mref = useRef<HTMLDivElement>(),
    dref = useRef<HTMLDivElement>();
  const [sRev, setSRev] = useState(0);
  const [rRev, setRRev] = useState(0);
  const todayRef = useRef(new Date());
  const mode = attrs.$mode ?? "ymd";
  const notEdit = attrs.$disabled || attrs.$readOnly;
  const rangeFrom = useRef((() => {
    if (attrs.$rangeFrom) return DatetimeUtils.convert(attrs.$rangeFrom).getTime();
    return new Date(1900, 0, 1).getTime();
  })());
  const rangeTo = useRef((() => {
    if (attrs.$rangeTo) return DatetimeUtils.convert(attrs.$rangeTo).getTime();
    return new Date(2100, 11, 31).getTime();
  })());
  const [uiType, setUiType] = useState(() => {
    if (mode === "y" || mode === "ym") return "list";
    return attrs.$uiType ?? "calendar";
  });

  const { val, set, buf } = useValue(attrs, {
    effect: (v) => {
      const date = DatetimeUtils.removeTime(DatetimeUtils.convert(v), true) ?? DatetimeUtils.getDate();
      dispRef.current = DatetimeUtils.copy(date);
      optimizeSelected();
      optimizeYMDNum(true);
      if (uiType === "list") setSRev(c => c+1);
    },
  });

  const selectedRef = useRef((() => {
    const d = DatetimeUtils.convert(val);
    const date = DatetimeUtils.removeTime(d ?? new Date());
    if (mode !== "ymd") date.setDate(1);
    if (mode === "y") date.setMonth(0);
    return date;
  })());

  const dispRef = useRef(DatetimeUtils.copy(selectedRef.current));

  const [yNum, setYNum] = useState(dispRef.current.getFullYear());
  const [mNum, setMNum] = useState(dispRef.current.getMonth());
  const [dNum, setDNum] = useState(dispRef.current.getDate());

  const monthTexts = useMemo(() => {
    if (attrs.$monthTexts == null || attrs.$monthTexts === "num") return monthTextsNum;
    if (attrs.$monthTexts === "en") return DatetimeUtils.Month.En;
    if (attrs.$monthTexts === "en-s") return DatetimeUtils.Month.en;
    if (attrs.$monthTexts === "ja") return DatetimeUtils.Month.Ja;
    if (attrs.$monthTexts.length !== 12) return monthTextsNum;
    return attrs.$monthTexts;
  }, [attrs.$monthTexts]);
  const weekTexts = useMemo(() => {
    if (attrs.$weekTexts == null || attrs.$weekTexts === "ja") return DatetimeUtils.Week.ja;
    if (attrs.$weekTexts === "en") return DatetimeUtils.Week.en;
    if (attrs.$weekTexts.length !== 7) return DatetimeUtils.Week.ja;
    return attrs.$weekTexts;
  }, [attrs.$weekTexts]);

  const clickPositive = () => {
    let ret: Date | string | number;
    if (selectedRef.current.getTime() < rangeFrom.current || selectedRef.current.getTime() > rangeTo.current) return;
    switch (attrs.$dataType) {
      case "date":
        set.current(ret = new Date(selectedRef.current));
        break;
      case "number":
        set.current(ret = selectedRef.current?.getMilliseconds());
        break;
      default:
        set.current(ret = DatetimeUtils.format(selectedRef.current, "yyyy-MM-dd"));
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
    const d = DatetimeUtils.convert(val) ?? DatetimeUtils.getDate();
    dispRef.current = DatetimeUtils.copy(d);
    optimizeSelected();
    setYNum(dispRef.current.getFullYear());
    setMNum(dispRef.current.getMonth());
    setDNum(dispRef.current.getDate());
    attrs.$clickNegative?.();
    setSRev(c => c+1);
  };

  const optimizeSelected = useCallback(() => {
    selectedRef.current = DatetimeUtils.copy(dispRef.current);
  }, []);
  const optimizeYMDNum = useCallback((preventChanging?: boolean) => {
    setYNum(dispRef.current.getFullYear());
    setMNum(dispRef.current.getMonth());
    setDNum(dispRef.current.getDate());
    if (preventChanging) return;
    attrs.$changing?.(dispRef.current);
  }, []);
  
  const clickYearCell = useCallback((data: { [key: string]: any }, decide?: boolean, button?: boolean) => {
    if (notEdit) return;
    let m = data.m ?? dispRef.current.getMonth();
    if (m < 0) m = (12 + m) % 12;
    else if (m > 11) m = m % 12;
    dispRef.current.setFullYear(data.y);
    if (dispRef.current.getMonth() !== m) dispRef.current.setDate(0);
    if (button !== true || decide) optimizeSelected();
    optimizeYMDNum();
    if (decide) clickPositive();
  }, [notEdit]);
  const yNodes = useMemo(() => {
    if (uiType === "calendar") {
      return [
        <DatePickerCell
          key={yNum}
          click={clickYearCell}
          data={{ y: yNum }}
          selected={true}
        >{yNum}
        </DatePickerCell>
      ];
    }
    const nodes = [];
    const startYear = new Date(rangeFrom.current).getFullYear();
    const endYear = new Date(rangeTo.current).getFullYear();
    for (let i = startYear, il = endYear + 1; i < il; i++) {
      nodes.push(
        <DatePickerCell
          key={i}
          click={clickYearCell}
          data={{ y: i }}
          selected={i === yNum}
          today={i === todayRef.current.getFullYear()}
        >{i}</DatePickerCell>
      );
    }
    return nodes;
  }, [yNum, clickYearCell, uiType, rRev]);
  const clickMonthCell = useCallback((data: { [key: string]: any }, decide?: boolean, button?: boolean) => {
    if (notEdit) return;
    dispRef.current.setFullYear(data.y);
    dispRef.current.setMonth(data.m);
    let m = data.m;
    if (m < 0) m = (12 + m) % 12;
    else if (m > 11) m = m % 12;
    if (dispRef.current.getMonth() !== m) dispRef.current.setDate(0);
    if (button !== true || decide) optimizeSelected();
    optimizeYMDNum();
    if (decide) clickPositive();
  }, [notEdit]);
  const mNodes = useMemo(() => {
    if (uiType === "calendar") {
      return [
        <DatePickerCell
          key={mNum}
          click={clickMonthCell}
          data={{ y: yNum, m: mNum }}
          selected={true}
        >{monthTexts[mNum]}</DatePickerCell>
      ];
    }
    const nodes = [];
    for (let i = 0, il = 12; i < il; i++) {
      const fDate = new Date(yNum, i, 1).getTime();
      const lDate = new Date(yNum, i + 1, 0).getTime();
      fDate < rangeFrom.current || lDate > rangeTo.current
      nodes.push(
        <DatePickerCell
          key={i}
          click={clickMonthCell}
          data={{ y: yNum, m: i }}
          selected={i === mNum}
          today={i === todayRef.current.getMonth()}
          disabled={fDate > rangeTo.current || lDate < rangeFrom.current}
        >{monthTexts[i]}</DatePickerCell>
      );
    }
    return nodes;
  }, [yNum, mNum, clickMonthCell, uiType, rRev]);
  const clickDateCell = useCallback((data: { [key: string]: any }, decide?: boolean) => {
    if (notEdit) return;
    dispRef.current = new Date(data.y, data.m, data.d);
    optimizeSelected();
    optimizeYMDNum();
    if (decide) clickPositive();
  }, [notEdit]);
  const dNodes = useMemo(() => {
    const nodes = [];
    let date = new Date(yNum, mNum + 1, 0);
    const dateMax = date.getDate();
    date.setDate(1);
    date.setMonth(mNum);
    date.setFullYear(yNum);
    const firstWeek = date.getDay();
    const threshold = 2;
    if (uiType === "calendar") {
      const startWeek = attrs.$startWeek ?? 0;
      date.setDate(0);
      const bDateMax = date.getDate(), bYearNum = date.getFullYear(), bMonthNum = date.getMonth();
      let count = (firstWeek - startWeek + 7) % 7 || 7;
      if (count < threshold) count += 7;
      for (let i = 0, il = count; i < il; i++) {
        date.setDate(bDateMax - count + i + 1);
        nodes.push(
          <DatePickerCell
            key={`-${i}`}
            click={clickDateCell}
            data={{ y: bYearNum, m: bMonthNum, d: date.getDate() }}
            selected={false}
            weekNum={(startWeek + i) % 7}
            ym="before"
            disabled={date.getTime() < rangeFrom.current || date.getTime() > rangeTo.current}
          >{date.getDate()}</DatePickerCell>
        );
      }
    }
    const selectedYM = yNum === selectedRef.current.getFullYear() && mNum === selectedRef.current.getMonth(), d = selectedRef.current.getDate();
    const isCurrentYM = mNum === todayRef.current.getMonth() && yNum === todayRef.current.getFullYear();
    const isToday = (d: number) => {
      if (uiType === "list") return d === todayRef.current.getDate();
      return d === todayRef.current.getDate() && isCurrentYM;
    }
    date.setDate(1);
    date.setFullYear(yNum);
    date.setMonth(mNum);
    for (let i = 0, il = dateMax; i < il; i++) {
      const selected = d === i + 1 && selectedYM;
      date.setDate(i+1);
      nodes.push(
        <DatePickerCell
          key={i}
          click={clickDateCell}
          data={{ y: yNum, m: mNum, d: i + 1 }}
          selected={selected}
          weekNum={(firstWeek + i) % 7}
          today={isToday(i + 1)}
          disabled={date.getTime() < rangeFrom.current || date.getTime() > rangeTo.current}
        >{i + 1}</DatePickerCell>
      );
    }
    if (uiType === "calendar") {
      date = new Date(yNum, mNum + 1, 1);
      const fw = date.getDay(), aYearNum = date.getFullYear(), aMonthNum = date.getMonth();
      let count = 7 - (nodes.length % 7);
      if (count < 7 - threshold) count += 7;
      for (let i = 0, il = count; i < il; i++) {
        if (nodes.length >= 42) break;
        date.setDate(i+1);
        nodes.push(
          <DatePickerCell
            key={`+${i}`}
            click={clickDateCell}
            data={{ y: aYearNum, m: aMonthNum, d: i + 1 }}
            selected={false}
            weekNum={(fw + i) % 7}
            ym="after"
            disabled={date.getTime() < rangeFrom.current || date.getTime() > rangeTo.current}
          >{i + 1}</DatePickerCell>
        );
      }
    }
    return nodes;
  }, [yNum, mNum, dNum, uiType, attrs.$startWeek, clickDateCell, rRev]);
  const wNodes = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < 7; i++) {
      const weekNum = (i + (attrs.$startWeek ?? 0)) % 7;
      nodes.push(
        <DatePickerCell
          key={weekNum}
          click={() => {}}
          data={{}}
          selected={false}
          weekNum={weekNum}
        >{weekTexts[weekNum]}</DatePickerCell>
      );
    }
    return nodes;
  }, [weekTexts, attrs.$startWeek]);

  useEffect(() => {
    if (mode !== "ymd" && uiType === "calendar") {
      setUiType("list");
    }
  }, [mode]);

  useEffect(() => {
    if (attrs.$rangeFrom) {
      rangeFrom.current = DatetimeUtils.convert(attrs.$rangeFrom).getTime();
    } else {
      rangeFrom.current = new Date(1900, 0, 1).getTime();
    }
    if (attrs.$rangeTo) {
      rangeTo.current = DatetimeUtils.convert(attrs.$rangeTo).getTime();
    } else {
      rangeTo.current = new Date(2100, 11, 31).getTime();
    }
    if (dispRef.current.getTime() < rangeFrom.current) {
      dispRef.current = DatetimeUtils.removeTime(new Date(rangeFrom.current));
      optimizeSelected();
    }
    if (dispRef.current.getTime() > rangeTo.current) {
      dispRef.current = DatetimeUtils.removeTime(new Date(rangeTo.current));
      optimizeSelected();
    }
    optimizeYMDNum();
    setRRev(c => c+1);
  }, [attrs.$rangeFrom, attrs.$rangeTo]);

  useEffect(() => {
    if (uiType === "list") {
      setTimeout(() => {
        const selector = `.${cn}-cell[data-selected="true"]`;
        let elem = yref.current?.querySelector(selector) as HTMLElement;
        if (elem) yref.current.scrollTop = elem.offsetTop - (yref.current.clientHeight - elem.offsetHeight) / 2;
        if (mode !== "y") {
          elem = mref.current?.querySelector(selector);
          if (elem) mref.current.scrollTop = elem.offsetTop - (mref.current.clientHeight - elem.offsetHeight) / 2;
        }
        if (mode === "ymd") {
          elem = dref.current?.querySelector(selector);
          if (elem) dref.current.scrollTop = elem.offsetTop - (dref.current.clientHeight - elem.offsetHeight) / 2;
        }
      }, 0);
    }
  }, [sRev, mode, uiType, notEdit]);

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      focus: () => bref.current?.focus(),
      getValue: () => buf.current,
      setValue: (v) => set.current?.(v),
      scrollToCurrent: () => setRRev(c => c+1),
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
        data-ui={uiType}
        data-lang={attrs.$monthTexts}
        tabIndex={attrs.tabIndex ?? 0}
      >
        <div ref={yref} className={`${sbCn} ${cn}-y`}>
            {uiType === "list" || notEdit ? <></> :
              <div
                className={`${inputCn}_btn`}
                onClick={() => {
                  if (new Date(yNum - 1, 11, 31).getTime() < rangeFrom.current) return;
                  clickYearCell({ y: yNum - 1, m: mNum }, false, true)
                }}
                data-disabled={new Date(yNum - 1, 11, 31).getTime() < rangeFrom.current}
              ><Icon $image="pull-left" /></div>
            }
            {yNodes}
            {uiType === "list" || notEdit ? <></> :
              <div
                className={`${inputCn}_btn`}
                onClick={() => {
                  if (new Date(yNum+1, 0, 1).getTime() > rangeTo.current) return;
                  clickYearCell({ y: yNum + 1, m: mNum }, false, true)
                }}
                data-disabled={new Date(yNum+1, 0, 1).getTime() > rangeTo.current}
              ><Icon $image="pull-right" /></div>
            }
        </div>
        {mode === "y" ? <></> : <>
          {uiType === "list" ? <div className={`${cn}-sep`}>/</div> : <></>}
          <div ref={mref} className={`${sbCn} ${cn}-m`}>
            {uiType === "list" || notEdit ? <></> :
              <div
                className={`${inputCn}_btn`}
                onClick={() => {
                  if (new Date(yNum, mNum, 0).getTime() < rangeFrom.current) return;
                  clickMonthCell({ y: yNum, m: mNum - 1 }, false, true)
                }}
                data-disabled={new Date(yNum, mNum, 0).getTime() < rangeFrom.current}
              ><Icon $image="pull-left" /></div>
            }
            {mNodes}
            {uiType === "list" || notEdit ? <></> :
              <div
                className={`${inputCn}_btn`}
                onClick={() => {
                  if (new Date(yNum, mNum+1, 1).getTime() > rangeTo.current) return;
                  clickMonthCell({ y: yNum, m: mNum + 1 }, false, true)
                }}
                data-disabled={new Date(yNum, mNum+1, 1).getTime() > rangeTo.current}
              ><Icon $image="pull-right" /></div>
            }
          </div>
        </>}
        {mode === "ymd" ? <>
          {uiType === "list" ? <div className={`${cn}-sep`}>/</div> : <div className={`${cn}-w`}>{wNodes}</div>}
          <div
            ref={dref}
            className={`${sbCn} ${cn}-d`}
          >{dNodes}</div>
        </> : <></>}
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
            data-disabled={selectedRef.current.getTime() < rangeFrom.current || selectedRef.current.getTime() > rangeTo.current}
          >{attrs.$positiveButtonLabel ?? <Label>OK</Label>}</div>
          {mode === "ymd" ?
            <div
              className={`${inputCn}_btn ${cn}-btn_switch`}
              onClick={() => setUiType(c => c === "list" ? "calendar" : "list")}
              tabIndex={0}
              data-border
            ><Icon $image={uiType === "list" ? "calendar" : "list"} /></div>
            : <></>
          }
        </div>
      }
      {InputStyle}
      {Style}
    </div>
  );
});

type DatePickerCellProps = {
  children?: ReactNode;
  click: (data: { [key: string]: any }, decide?: boolean) => void;
  data: { [key: string]: any };
  ym?: "before" | "current" | "after";
  selected: boolean;
  weekNum?: number;
  today?: boolean;
  disabled?: boolean;
};
const DatePickerCell: FC<DatePickerCellProps> = (props) => {
  return (
    <div
      className={`${cn}-cell`}
      onClick={() => {
        if (props.disabled) return;
        props.click(props.data)
      }}
      onDoubleClick={() => {
        if (props.disabled) return;
        props.click(props.data, true)
      }}
      data-selected={props.selected}
      data-disabled={props.disabled}
      data-week={props.weekNum ?? ""}
      data-ym={props.ym ?? "current"}
      data-today={props.today === true}
    >{props.children}</div>
  );
};

export const useDatePicker = (): DatePickerHook => {
  const dispatcher = useRef<Partial<DatePickerHook>>({});
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

const lcn = `.${cn}-body[data-ui="list"]`;
const ccn = `.${cn}-body[data-ui="calendar"]`;
const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${inputCn}.${cn} {
  flex-direction: column;
  height: calc(${CssVar.size} * 9);
  user-select: none;
}
.${cn}[data-mode="ymd"] {
  width: calc(${CssVar.size} * 9);
}
.${cn}[data-mode="ym"] {
  width: calc(${CssVar.size} * 7);
}
.${cn}[data-mode="y"] {
  width: calc(${CssVar.size} * 6);
}
.${cn}-body {
  ${CssPV.flex}
  flex-wrap: nowrap;
  justify-content: center;
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
  padding-bottom: 4px;
}
.${cn}-y > .${inputCn}_btn,
.${cn}-m > .${inputCn}_btn {
  z-index: 10;
}
.${cn}-y > .${inputCn}_btn,
.${cn}-m > .${inputCn}_btn {
  border-radius: ${CssVar.bdr};
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
${switchDesign(design, {
fm: `transition: background 0.1s, color 0.1s;`,
neumorphism: `transition: background 0.1s, color 0.1s, box-shadow 0.1s;`,
})}
}
.${cn}-cell[data-disabled="true"] {
  cursor: not-allowed !important;
  opacity: 0.1 !important;
}
${ccn} {
  flex-direction: column;
}
${ccn} > .${cn}-y,
${ccn} > .${cn}-m,
${ccn} > .${cn}-w {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: ${CssVar.size};
  width: 100%;
  overflow: visible;
}
${ccn} > .${cn}-w {
  height: calc(${CssVar.size} * 0.6);
  margin-top: ${CssVar.pdy};
}
${ccn} > .${cn}-d {
  ${CssPV.flex}
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  min-height: 0px;
  width: 100%;
  overflow: hidden;
}
${ccn} > .${cn}-y > .${cn}-cell,
${ccn} > .${cn}-m > .${cn}-cell {
  flex: 1;
}
.${cn}-w > .${cn}-cell {
  flex: 1;
  font-size: 70%;
  width: 14.285%;
  height: 100%;
}
.${cn}-w > .${cn}-cell[data-week="0"] {
  background: ${CssVar.week.sun.bgc};
  color: ${CssVar.week.sun.fc};
}
.${cn}-w > .${cn}-cell[data-week="6"] {
  background: ${CssVar.week.sat.bgc};
  color: ${CssVar.week.sat.fc};
}
${ccn} > .${cn}-y > .${cn}-cell[data-selected="false"],
${ccn} > .${cn}-m > .${cn}-cell[data-selected="false"] {
  display: none;
}
${ccn} > .${cn}-d > .${cn}-cell {
  height: 16.666%;
  width: 14.285%;
}
${ccn} > .${cn}-d > .${cn}-cell[data-ym="before"],
${ccn} > .${cn}-d > .${cn}-cell[data-ym="after"] {
  ${CssPV.inactOpacity}
}
.${cn}[data-m="e"] > ${ccn} > .${cn}-d > .${cn}-cell,
.${cn}[data-m="e"] > ${lcn} > .${cn}-y > .${cn}-cell,
.${cn}[data-m="e"] > ${lcn} > .${cn}-m > .${cn}-cell,
.${cn}[data-m="e"] > ${lcn} > .${cn}-d > .${cn}-cell {
  cursor: pointer;
}
.${cn}[data-m="e"] > ${ccn} > .${cn}-d > .${cn}-cell:hover:not([data-selected="true"]),
.${cn}[data-m="e"] > ${lcn} > .${cn}-y >.${cn}-cell:hover:not([data-selected="true"]),
.${cn}[data-m="e"] > ${lcn} > .${cn}-m >.${cn}-cell:hover:not([data-selected="true"]),
.${cn}[data-m="e"] > ${lcn} > .${cn}-d >.${cn}-cell:hover:not([data-selected="true"]) {
  background: ${CssVar.hvrBgc};
}
.${cn}[data-m="e"] > ${ccn} > .${cn}-d > .${cn}-cell:hover:active:not([data-selected="true"]),
.${cn}[data-m="e"] > ${lcn} > .${cn}-y > .${cn}-cell:hover:active:not([data-selected="true"]),
.${cn}[data-m="e"] > ${lcn} > .${cn}-m > .${cn}-cell:hover:active:not([data-selected="true"]),
.${cn}[data-m="e"] > ${lcn} > .${cn}-d > .${cn}-cell:hover:active:not([data-selected="true"]) {
  background: ${CssVar.actBgc};
}
${lcn} {
  padding-top: ${CssVar.pdy};
  padding-bottom: ${CssVar.pdy};
}
${lcn} > .${cn}-y,
${lcn} > .${cn}-m,
${lcn} > .${cn}-d {
  flex: 1;
  min-width: 0px;
  height: 100%;
${switchDesign(design, {
neumorphism: `padding: 0 ${CssVar.pdx};`
})}
}
${lcn} > .${cn}-y > .${cn}-cell,
${lcn} > .${cn}-m > .${cn}-cell,
${lcn} > .${cn}-d > .${cn}-cell {
  height: ${CssVar.size};
  width: 100%;
}
${lcn} > .${cn}-y > .${cn}-cell:first-child,
${lcn} > .${cn}-m > .${cn}-cell:first-child,
${lcn} > .${cn}-d > .${cn}-cell:first-child {
  margin-top: calc(${CssVar.size} * 3.5);
}
${lcn} > .${cn}-y > .${cn}-cell:last-child,
${lcn} > .${cn}-m > .${cn}-cell:last-child,
${lcn} > .${cn}-d > .${cn}-cell:last-child {
  margin-bottom: calc(${CssVar.size} * 3.5);
}
.${cn}-cell[data-today="true"] {
  text-decoration: underline;
}
${switchDesign(design, {
fm: `
.${cn}[data-m="e"][data-border="round"] > .${cn}-btns > .${cn}-btn_lbl,
.${cn}[data-m="e"][data-border="round"] > .${cn}-btns > .${cn}-btn_switch {
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
.${cn}${qs} > ${ccn} > .${cn}-d > .${cn}-cell[data-selected="true"],
.${cn}${qs} > ${lcn} > .${cn}-y > .${cn}-cell[data-selected="true"],
.${cn}${qs} > ${lcn} > .${cn}-m > .${cn}-cell[data-selected="true"],
.${cn}${qs} > ${lcn} > .${cn}-d > .${cn}-cell[data-selected="true"] {
  background: ${v.ipt.on};
  color: ${v.ipt.fc};
}
`).join("")}`,
neumorphism: `
${ccn} > .${cn}-d > .${cn}-cell[data-selected="true"],
${lcn} > .${cn}-y > .${cn}-cell[data-selected="true"],
${lcn} > .${cn}-m > .${cn}-cell[data-selected="true"],
${lcn} > .${cn}-d > .${cn}-cell[data-selected="true"] {
  box-shadow: ${CssPV.ccvSd};
}
.${cn}[data-m="r"] > ${ccn} > .${cn}-d > .${cn}-cell[data-selected="true"],
.${cn}[data-m="d"] > ${ccn} > .${cn}-d > .${cn}-cell[data-selected="true"],
.${cn}[data-m="r"] > ${lcn} > * > .${cn}-cell[data-selected="true"],
.${cn}[data-m="d"] > ${lcn} > * > .${cn}-cell[data-selected="true"] {
  box-shadow: ${CssPV.ccvSdS};
}
${colorIterator((_s, v, qs) => `
.${cn}${qs} > .${cn}-body {
  color: ${v.ipt.fc};
}
.${cn}${qs}[data-m="e"] > .${cn}-body {
  background: ${v.ipt.bgc};
}
.${cn}${qs} > ${ccn} > .${cn}-d > .${cn}-cell[data-selected="true"],
.${cn}${qs} > ${lcn} > .${cn}-y > .${cn}-cell[data-selected="true"],
.${cn}${qs} > ${lcn} > .${cn}-m > .${cn}-cell[data-selected="true"],
.${cn}${qs} > ${lcn} > .${cn}-d > .${cn}-cell[data-selected="true"] {
  background: ${v.ipt.on};
  color: ${v.ipt.fc};
}
`).join("")}`})}
`}</JsxStyle>

export default DatePicker;