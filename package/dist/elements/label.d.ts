import React, { HTMLAttributes } from "react";
import { Color } from "../styles/css-var";
export declare const labelCn = "bh-lbl";
export declare type LabelAttributes = HTMLAttributes<HTMLSpanElement> & {
    $nowrap?: boolean;
    $bold?: boolean;
    $color?: Color;
    $type?: "h0" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "a";
    $fill?: boolean;
};
declare const Label: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & {
    $nowrap?: boolean;
    $bold?: boolean;
    $color?: Color;
    $type?: "h0" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "a";
    $fill?: boolean;
} & React.RefAttributes<HTMLSpanElement>>;
export default Label;
