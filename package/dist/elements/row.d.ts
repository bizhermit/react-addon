import { FC, HTMLAttributes } from "react";
import { Color, ColorType } from "../styles/css-var";
declare const Row: FC<HTMLAttributes<HTMLDivElement> & {
    $center?: boolean;
    $right?: boolean;
    $top?: boolean;
    $middle?: boolean;
    $fill?: boolean;
    $nowrap?: boolean;
    $color?: Color;
    $colorType?: ColorType;
    $shadow?: boolean | number;
    $padding?: boolean | number;
}>;
export default Row;
