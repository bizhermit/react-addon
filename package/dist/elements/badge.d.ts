import { FC, HTMLAttributes, ReactNode } from "react";
import { Color, Size } from "../styles/css-var";
declare const Badge: FC<HTMLAttributes<HTMLDivElement> & {
    $position?: "left-top" | "right-top" | "left-bottom" | "right-bottom";
    $color?: Color;
    $colorType?: "base" | "head" | "nav";
    $fill?: boolean;
    $shape?: "circle" | "square" | "none";
    $size?: Size;
    $shadow?: boolean | number;
    $title?: string;
    $borderless?: boolean;
    $visible?: boolean;
    $fixedSize?: boolean;
    $content?: ReactNode;
    children?: ReactNode;
}>;
export default Badge;
