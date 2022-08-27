import React, { HTMLAttributes, ReactNode } from "react";
import { Color } from "../styles/css-var";
export declare type GroupBoxAttributes = HTMLAttributes<HTMLDivElement> & {
    $caption?: ReactNode;
    $color?: Color;
    $padding?: boolean;
};
declare const GroupBox: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    $caption?: ReactNode;
    $color?: Color;
    $padding?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
export default GroupBox;
