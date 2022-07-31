import React, { Dispatch, HTMLAttributes } from "react";
import { InputAttributesWithoutDispatch } from "../../hooks/value";
import { InputBorder } from "../../styles/input-style";
import { InputHook } from "../../utils/input";
export declare type TimeBoxHook = InputHook<string | number> & {
    showPicker: () => void;
};
export declare type TimeBoxAttributes = HTMLAttributes<HTMLDivElement> & InputAttributesWithoutDispatch<string | number> & {
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
    $dispatch?: Dispatch<number> | Dispatch<string> | Dispatch<number | string>;
};
declare const TimeBox: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & InputAttributesWithoutDispatch<string | number, {}> & {
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
    $dispatch?: Dispatch<number> | Dispatch<string> | Dispatch<number | string>;
} & React.RefAttributes<HTMLDivElement>>;
export declare const useTimeBox: () => TimeBoxHook;
export default TimeBox;
