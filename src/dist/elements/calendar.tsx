import DatetimeUtils from "@bizhermit/basic-utils/dist/datetime-utils";
import React, { cloneElement, FC, HTMLAttributes, ReactElement, ReactNode, useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { sbCn } from "../styles/core-style";
import CssVar, { CssPV, FitToOuter, Color, switchDesign } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren, ftoCn } from "../utils/attributes";
import { _HookSetter } from "../utils/hook";
import Button, { ButtonIconProps } from "./button";
import DateBox from "./inputs/date-box";
import Row from "./row";

const cn = "bh-cal";

export type CalendarHook = {
  setDate: (value: Date | string | number) => void;
  getDate: () => Date;
};
type Hook = _HookSetter<CalendarHook>;

export type CalendarCellAttributes = {
  children?: ReactNode;
};

export type CalendarCellTemplate<P ={}> = FC<P & CalendarCellAttributes & {
  $$date?: Date;
  $$currentYM?: boolean;
}>;

const weekTextsJa = ["日", "月", "火", "水", "木", "金", "土"] as const;
const weekTextsEn = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."] as const;

export type CalendarAttributes = HTMLAttributes<HTMLDivElement> & {
  $hook?: CalendarHook;
  $fto?: FitToOuter;
  $weekTexts?: "en" | "ja" | Array<string>;
  $startWeek?: number;
  $defaultDate?: Date;
  $disabled?: boolean;
  $changed?: (ctx: { after: Date; before: Date; }) => void;
  children: ReactElement<CalendarCellAttributes>;
  $color?: Color;
  $prevMonthButtonIcon?: ButtonIconProps;
  $prevYearButtonIcon?: ButtonIconProps;
  $nextMonthButtonIcon?: ButtonIconProps;
  $nextYearButtonIcon?: ButtonIconProps;
};

const Calendar = React.forwardRef<HTMLDivElement, CalendarAttributes>((attrs, ref) => {
  const [target, setTarget] = useState(DatetimeUtils.getFirstDateAtMonth(DatetimeUtils.removeTime(DatetimeUtils.convert(attrs.$defaultDate ?? new Date()), true)));
  const targetRef = useRef(target);

  const weekTexts = useMemo(() => {
    if (attrs.$weekTexts == null || attrs.$weekTexts === "ja") return weekTextsJa;
    if (attrs.$weekTexts === "en") return weekTextsEn;
    if (attrs.$weekTexts.length !== 7) return weekTextsJa;
    return attrs.$weekTexts;
  }, [attrs.$weekTexts]);

  const wNodes = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < 7; i++) {
      const weekNum = (i + (attrs.$startWeek ?? 0)) % 7;
      nodes.push(
        <div
          key={weekNum}
          className={`${cn}-cell`}
          data-week={weekNum}
        >{weekTexts[weekNum]}</div>
      );
    }
    return nodes;
  }, [weekTexts, attrs.$startWeek]);

  const dNodes = useMemo(() => {
    const nodes = [];
    let date = new Date(target.getFullYear(), target.getMonth() + 1, 0);
    const dateMax = date.getDate();
    date.setDate(1);
    date.setMonth(target.getMonth());
    date.setFullYear(target.getFullYear());
    const firstWeek = date.getDay();
    const startWeek = attrs.$startWeek ?? 0;
    date.setDate(0);
    const bDateMax = date.getDate();
    let count = (firstWeek - startWeek + 7) % 7 || 7;
    if (count === 7) count -= 7;

    let keyY = date.getFullYear(), keyM = date.getMonth(), keyD = -1;
    for (let i = 0, il = count; i < il; i++) {
      keyD = bDateMax - count + i + 1;
      nodes.push(
        <div
          {...attrs.children.props}
          key={`${keyY}${keyM}${keyD}`}
          className={`${cn}-cell ${sbCn}`}
        >
          {cloneElement(attrs.children, {
            $$date: new Date(keyY, keyM, keyD),
            $$currentYM: false,
          })}
        </div>
      );
    }

    keyY = target.getFullYear(), keyM = target.getMonth();
    for (let i = 0, il = dateMax; i < il; i++) {
      keyD = i + 1;
      nodes.push(
        <div
          key={`${keyY}${keyM}${keyD}`}
          className={`${cn}-cell ${sbCn}`}
        >
          {cloneElement(attrs.children, {
            $$date: new Date(keyY, keyM, keyD),
            $$currentYM: true,
          })}
        </div>
      );
    }

    date = new Date(target.getFullYear(), target.getMonth() + 1, 1);
    keyY = date.getFullYear(), keyM = date.getMonth();
    count = 7 - (nodes.length % 7);
    if (count === 7) count -= 7;
    for (let i = 0, il = count; i < il; i++) {
      keyD = i + 1;
      nodes.push(
        <div
          {...attrs.children.props}
          key={`${keyY}${keyM}${keyD}`}
          className={`${cn}-cell ${sbCn}`}
        >
          {cloneElement(attrs.children, {
            $$date: new Date(keyY, keyM, keyD),
            $$currentYM: false,
          })}
        </div>
      );
    }
    return nodes;
  }, [target, attrs.$startWeek, attrs.children]);

  useEffect(() => {
    const before = targetRef.current;
    targetRef.current = target;
    attrs.$changed?.({ before, after: target });
  }, [target]);

  useEffect(() => {
    (attrs.$hook as Hook)?._set({
      getDate: () => targetRef.current,
      setDate: (v) => {
        setTarget(DatetimeUtils.getFirstDateAtMonth(DatetimeUtils.removeTime(DatetimeUtils.convert(v ?? new Date()), true)));
      },
    });
  }, [(attrs.$hook as Hook)?._set]);

  return (
    <div
      {...attributesWithoutChildren(attrs, cn, ftoCn(attrs.$fto))}
      ref={ref}
    >
      <Row $center $fill>
        {attrs.$disabled ? <></> :
          <>
            <Button
              $icon={attrs.$prevYearButtonIcon ?? "pull-left-d"}
              $color={attrs.$color}
              $click={() => {
                setTarget(DatetimeUtils.getPrevYearDate(target));
              }}
            />
            <Button
              $icon={attrs.$prevMonthButtonIcon ?? "pull-left"}
              $color={attrs.$color}
              $click={() => {
                setTarget(DatetimeUtils.getPrevMonthDate(target));
              }}
            />
          </>
        }
        <DateBox
          $mode="ym"
          $hideClearButton
          $dataType="date"
          $value={target}
          $dispatch={setTarget}
          $disabled={attrs.$disabled}
          $color={attrs.$color}
        />
        {attrs.$disabled ? <></> :
          <>
            <Button
              $icon={attrs.$nextMonthButtonIcon ?? "pull-right"}
              $color={attrs.$color}
              $click={() => {
                setTarget(DatetimeUtils.getNextMonthDate(target));
              }}
            />
            <Button
              $icon={attrs.$nextYearButtonIcon ?? "pull-right-d"}
              $color={attrs.$color}
              $click={() => {
                setTarget(DatetimeUtils.getNextYearDate(target));
              }}
            />
          </>
        }
      </Row>
      <div className={`${cn}-body`}>
        <div className={`${cn}-w`}>
          {wNodes}
        </div>
        <div
          className={`${cn}-d`}
          data-rows={dNodes.length / 7}
        >{dNodes}</div>
      </div>
      {Style}
    </div>
  );
});

export const useCalendar = (): CalendarHook => {
  const dispatch = useRef<Partial<CalendarHook>>({});
  return {
    setDate: useCallback((v) => {
      dispatch.current.setDate?.(v);
    }, []),
    getDate: useCallback(() => {
      return dispatch.current.getDate?.();
    }, []),
    _set: useCallback((d) => {
      dispatch.current = d;
    }, []),
  } as Hook;
};

const Style = <JsxStyle id={cn} depsDesign>{({ design }) => `
.${cn} {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.${cn}-body {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  flex: 1;
  min-height: 0px;
}
.${cn}-cell {
  ${CssPV.flex}
  flex-flow: column nowrap;
  flex: none;
  width: 14.285%;
}
.${cn}-w {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: ${CssVar.size};
}
.${cn}-w > .${cn}-cell {
  padding-top: 3px;
  justify-content: center;
  align-items: center;
  height: 100%;
}
${switchDesign(design, {
c: `
.${cn}-w > .${cn}-cell[data-week="0"] {
  background: ${CssVar.week.sun.bgc};
  color: ${CssVar.week.sun.fc};
}
.${cn}-w > .${cn}-cell[data-week="6"] {
  background: ${CssVar.week.sat.bgc};
  color: ${CssVar.week.sat.fc};
}
.${cn}-w > .${cn}-cell:first-child {
  border-top-left-radius: ${CssVar.bdr};
}
.${cn}-w > .${cn}-cell:last-child {
  border-top-right-radius: ${CssVar.bdr};
}`
})}
.${cn}-d {
  ${CssPV.flex}
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  flex: 1;
  min-height: 0px;
}
.${cn}-d > .${cn}-cell {
  justify-content: flex-start;
  align-items: flex-start;
  height: 16.666%;
}
.${cn}-d[data-rows="5"] > .${cn}-cell {
  height: 20%;
}
.${cn}-d[data-rows="4"] > .${cn}-cell {
  height: 25%;
}
`}</JsxStyle>;

export default Calendar;