import { FC, HTMLAttributes, ReactNode } from "react";
import { ColorAttributes } from "../utils/attributes";
export declare type RowAttributes = {
    $center?: boolean;
    $right?: boolean;
    $top?: boolean;
    $middle?: boolean;
    $fill?: boolean;
    $nowrap?: boolean;
    $shadow?: boolean | number;
    $padding?: boolean | number;
} & ColorAttributes;
declare const Row: FC<HTMLAttributes<HTMLDivElement> & RowAttributes & {
    children?: ReactNode;
}>;
export default Row;
