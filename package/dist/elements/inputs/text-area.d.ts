import React, { HTMLAttributes } from "react";
import { InputAttributes } from "../../hooks/value";
import { InputBorder } from "../../styles/input-style";
import { InputHook } from "../../utils/input";
export declare type TextAreaHook = InputHook<string>;
export declare type TextAreaAttributes = HTMLAttributes<HTMLDivElement> & InputAttributes<string> & {
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
declare const TextArea: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & InputAttributes<string, {}> & {
    $hook?: TextAreaHook;
    $autoComplete?: string;
    $maxLength?: number;
    $minLength?: number;
    $required?: boolean;
    $resize?: boolean | "x" | "y" | "xy";
    $textAlign?: "left" | "center" | "right";
    $border?: InputBorder;
    $changing?: (value: string) => boolean | void;
} & React.RefAttributes<HTMLDivElement>>;
export declare const useTextArea: () => TextAreaHook;
export default TextArea;
