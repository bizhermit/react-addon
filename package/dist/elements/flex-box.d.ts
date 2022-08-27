import React, { HTMLAttributes } from "react";
import { FitToOuter, Color, ColorType } from "../styles/css-var";
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
    $border?: boolean | Color;
    $color?: Color;
    $colorType?: ColorType;
};
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
    $border?: boolean | Color;
    $color?: Color;
    $colorType?: ColorType;
} & React.RefAttributes<HTMLDivElement>>;
export default FlexBox;
