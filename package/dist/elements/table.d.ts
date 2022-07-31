import React, { ReactNode } from "react";
import { Signal } from "../styles/css-var";
export declare const Table: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableElement> & {
    children?: ReactNode;
    $border?: boolean;
    $oddEven?: boolean;
    $hover?: boolean;
    $signal?: Signal;
} & React.RefAttributes<HTMLTableElement>>;
export default Table;
