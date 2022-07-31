import React, { HTMLAttributes, ReactNode } from "react";
import { Signal } from "../styles/css-var";
export declare type GroupBoxAttributes = HTMLAttributes<HTMLDivElement> & {
    $caption?: ReactNode;
    $signal?: Signal;
    $padding?: boolean;
};
declare const GroupBox: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    $caption?: ReactNode;
    $signal?: Signal;
    $padding?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
export default GroupBox;
