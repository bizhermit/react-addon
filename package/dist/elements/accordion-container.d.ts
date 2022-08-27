import React, { HTMLAttributes, ReactNode } from "react";
import { FitToOuter, Color } from "../styles/css-var";
import { IconImage } from "./icon";
export declare type AccordionContainerHook = {
    open: () => void;
    close: () => void;
    toggle: () => void;
};
export declare type AccordionContainerAttributes = HTMLAttributes<HTMLDivElement> & {
    $fto?: FitToOuter;
    $hook?: AccordionContainerHook;
    $disabled?: boolean;
    $header?: ReactNode;
    $defaultClose?: boolean;
    $close?: boolean;
    $toggled?: (opened: boolean) => void;
    $animationDuration?: number;
    $height?: number;
    $borderless?: boolean;
    $color?: Color;
    $openedIconImage?: IconImage;
    $closedIconImage?: IconImage;
    $iconPosition?: "left" | "right" | "none";
};
declare const AccordionContainer: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    $fto?: FitToOuter;
    $hook?: AccordionContainerHook;
    $disabled?: boolean;
    $header?: ReactNode;
    $defaultClose?: boolean;
    $close?: boolean;
    $toggled?: (opened: boolean) => void;
    $animationDuration?: number;
    $height?: number;
    $borderless?: boolean;
    $color?: Color;
    $openedIconImage?: IconImage;
    $closedIconImage?: IconImage;
    $iconPosition?: "left" | "right" | "none";
} & React.RefAttributes<HTMLDivElement>>;
export declare const useAccordionContainer: () => AccordionContainerHook;
export default AccordionContainer;
