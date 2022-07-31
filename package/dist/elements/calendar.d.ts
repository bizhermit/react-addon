import React, { FC, HTMLAttributes, ReactElement, ReactNode } from "react";
import { FitToOuter, Signal } from "../styles/css-var";
import { ButtonIconProps } from "./button";
export declare type CalendarHook = {
    setDate: (value: Date | string | number) => void;
    getDate: () => Date;
};
export declare type CalendarCellAttributes = {
    children?: ReactNode;
};
export declare type CalendarCellTemplate<P = {}> = FC<P & CalendarCellAttributes & {
    $$date?: Date;
    $$currentYM?: boolean;
}>;
export declare type CalendarAttributes = HTMLAttributes<HTMLDivElement> & {
    $hook?: CalendarHook;
    $fto?: FitToOuter;
    $weekTexts?: "en" | "ja" | Array<string>;
    $startWeek?: number;
    $defaultDate?: Date;
    $disabled?: boolean;
    $changed?: (ctx: {
        after: Date;
        before: Date;
    }) => void;
    children: ReactElement<CalendarCellAttributes>;
    $signal?: Signal;
    $prevMonthButtonIcon?: ButtonIconProps;
    $prevYearButtonIcon?: ButtonIconProps;
    $nextMonthButtonIcon?: ButtonIconProps;
    $nextYearButtonIcon?: ButtonIconProps;
};
declare const Calendar: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    $hook?: CalendarHook;
    $fto?: FitToOuter;
    $weekTexts?: "en" | "ja" | Array<string>;
    $startWeek?: number;
    $defaultDate?: Date;
    $disabled?: boolean;
    $changed?: (ctx: {
        after: Date;
        before: Date;
    }) => void;
    children: ReactElement<CalendarCellAttributes>;
    $signal?: Signal;
    $prevMonthButtonIcon?: ButtonIconProps;
    $prevYearButtonIcon?: ButtonIconProps;
    $nextMonthButtonIcon?: ButtonIconProps;
    $nextYearButtonIcon?: ButtonIconProps;
} & React.RefAttributes<HTMLDivElement>>;
export declare const useCalendar: () => CalendarHook;
export default Calendar;
