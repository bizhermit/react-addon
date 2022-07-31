import React, { HTMLAttributes } from "react";
import { FitToOuter } from "../styles/css-var";
export declare const codeCn = "bh-code";
export declare type CodeAttributes = HTMLAttributes<HTMLDivElement> & {
    $fto?: FitToOuter;
    $language?: "ts" | "tsx" | "js" | "jsx" | "html" | "css" | "scss" | "sass" | "rpg";
    $edgeText?: boolean;
    $lineHeight?: number;
    $tabSpace?: number;
    children?: string | Array<string>;
};
declare const Code: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    $fto?: FitToOuter;
    $language?: "ts" | "tsx" | "js" | "jsx" | "html" | "css" | "scss" | "sass" | "rpg";
    $edgeText?: boolean;
    $lineHeight?: number;
    $tabSpace?: number;
    children?: string | Array<string>;
} & React.RefAttributes<HTMLDivElement>>;
export declare const Style: JSX.Element;
export default Code;
