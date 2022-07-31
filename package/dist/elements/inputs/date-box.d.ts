import React, { Dispatch, HTMLAttributes } from "react";
import { InputAttributesWithoutDispatch } from "../../hooks/value";
import { InputBorder } from "../../styles/input-style";
import { InputHook } from "../../utils/input";
export declare type DateBoxHook = InputHook<string | number | Date> & {
    showPicker: () => void;
};
export declare type DateBoxAttributes = HTMLAttributes<HTMLDivElement> & InputAttributesWithoutDispatch<string | number | Date> & {
    $hook?: DateBoxHook;
    $dataType?: "string" | "number" | "date";
    $mode?: "ymd" | "ym" | "y";
    $hidePickerButton?: boolean;
    $hideClearButton?: boolean;
    $notInputText?: boolean;
    $rangeFrom?: string | number | Date;
    $rangeTo?: string | number | Date;
    $border?: InputBorder;
    $dispatch?: Dispatch<string> | Dispatch<number> | Dispatch<Date> | Dispatch<string | number> | Dispatch<string | Date> | Dispatch<number | Date> | Dispatch<string | number | Date>;
};
declare const DateBox: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & InputAttributesWithoutDispatch<string | number | Date, {}> & {
    $hook?: DateBoxHook;
    $dataType?: "string" | "number" | "date";
    $mode?: "ymd" | "ym" | "y";
    $hidePickerButton?: boolean;
    $hideClearButton?: boolean;
    $notInputText?: boolean;
    $rangeFrom?: string | number | Date;
    $rangeTo?: string | number | Date;
    $border?: InputBorder;
    $dispatch?: Dispatch<string> | Dispatch<number> | Dispatch<Date> | Dispatch<string | number> | Dispatch<string | Date> | Dispatch<number | Date> | Dispatch<string | number | Date>;
} & React.RefAttributes<HTMLDivElement>>;
export declare const useDateBox: () => DateBoxHook;
export default DateBox;
