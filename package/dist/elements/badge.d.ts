import { FC, HTMLAttributes, ReactNode } from "react";
import { Color, ColorType, Size } from "../styles/css-var";
declare const Badge: FC<HTMLAttributes<HTMLDivElement> & {
    $position?: "left-top" | "right-top" | "left-bottom" | "right-bottom";
    $fill?: boolean;
    $shape?: "circle" | "square" | "none";
    $size?: Size;
    $shadow?: boolean | number;
    $title?: string;
    $border?: boolean;
    $visible?: boolean;
    $fixedSize?: boolean;
    $content?: ReactNode;
    $color?: Color;
    $colorType?: ColorType;
    children?: ReactNode;
}>;
export default Badge;
