import React, { HTMLAttributes } from "react";
import { FitToOuter } from "../styles/css-var";
import { ColorAttributes } from "../utils/attributes";
export declare const flexBoxCn = "bh-fbx";
export declare type FlexBoxAttributes = HTMLAttributes<HTMLDivElement> & {
    $fto?: FitToOuter;
    $row?: boolean;
    $wrap?: boolean;
    $left?: boolean;
    $center?: boolean;
    $right?: boolean;
    $top?: boolean;
    $middle?: boolean;
    $bottom?: boolean;
    $shadow?: boolean | number;
    $hover?: boolean;
    $radius?: boolean;
    $scroll?: boolean;
    $padding?: boolean | number;
    $border?: boolean;
} & ColorAttributes;
declare const FlexBox: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    $fto?: FitToOuter;
    $row?: boolean;
    $wrap?: boolean;
    $left?: boolean;
    $center?: boolean;
    $right?: boolean;
    $top?: boolean;
    $middle?: boolean;
    $bottom?: boolean;
    $shadow?: boolean | number;
    $hover?: boolean;
    $radius?: boolean;
    $scroll?: boolean;
    $padding?: boolean | number;
    $border?: boolean;
} & ColorAttributes & React.RefAttributes<HTMLDivElement>>;
export default FlexBox;
