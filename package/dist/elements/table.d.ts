import React, { ReactNode } from "react";
import { Color } from "../styles/css-var";
export declare const Table: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableElement> & {
    children?: ReactNode;
    $border?: boolean;
    $oddEven?: boolean;
    $hover?: boolean;
    $color?: Color;
} & React.RefAttributes<HTMLTableElement>>;
export default Table;
