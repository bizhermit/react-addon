import React, { FunctionComponent, HTMLAttributes, ReactElement, ReactNode } from "react";
import { FitToOuter, Signal } from "../styles/css-var";
export declare type NavigationContainerHook = {
    openNavigation: () => void;
    closeNavigation: () => void;
    toggleNavigation: () => void;
};
declare type NavigationAttributes = HTMLAttributes<HTMLDivElement> & {
    children?: ReactNode;
    $position?: "left" | "top" | "right" | "bottom";
    $mode?: "visible" | "edge" | "manual";
    $signal?: Signal;
    $toggled?: (opened: boolean) => void;
    $edgeSize?: number | string;
    $preventClickClose?: boolean;
    $animationDuration?: number;
    $$opened?: boolean;
};
declare type NavigationElement = ReactElement<NavigationAttributes>;
export interface NavigationFC extends FunctionComponent<NavigationAttributes> {
    (props: NavigationAttributes, context?: any): NavigationElement;
}
export declare type NavigationContainerAttributes = HTMLAttributes<HTMLDivElement> & {
    $hook?: NavigationContainerHook;
    $fto?: FitToOuter;
    $toggled?: (opened: boolean) => void;
    children: [NavigationElement, ...Array<ReactElement>];
};
declare const NavigationContainer: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    $hook?: NavigationContainerHook;
    $fto?: FitToOuter;
    $toggled?: (opened: boolean) => void;
    children: [NavigationElement, ...Array<ReactElement>];
} & React.RefAttributes<HTMLDivElement>>;
export declare const useNavigationContainer: () => NavigationContainerHook;
export declare const Navigation: NavigationFC;
export default NavigationContainer;
