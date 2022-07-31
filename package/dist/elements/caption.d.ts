import { FC, HTMLAttributes, ReactNode } from "react";
import { Signal } from "../styles/css-var";
declare const Caption: FC<HTMLAttributes<HTMLDivElement> & {
    $signal?: Signal;
    $label?: ReactNode;
    $width?: number | string;
    $flow?: "row" | "column";
    $border?: boolean;
}>;
export default Caption;
