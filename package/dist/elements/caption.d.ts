import { FC, HTMLAttributes, ReactNode } from "react";
import { Color } from "../styles/css-var";
import { ColorAttributes } from "../utils/attributes";
declare const Caption: FC<HTMLAttributes<HTMLDivElement> & {
    $color?: Color;
    $label?: ReactNode;
    $width?: number | string;
    $flow?: "row" | "column";
    $border?: boolean;
} & ColorAttributes>;
export default Caption;
