import React, { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { FitToOuter } from "../styles/css-var";
declare const functionKeys: readonly ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];
export declare type FunctionKey = typeof functionKeys[number];
export declare type FunctionKeyContainerHook = {
    focus: () => void;
};
export declare type FunctionKeyProps = {
    label?: ReactNode;
    disabled?: boolean;
    click?: (unlock: () => void) => (void | Promise<void>);
    buttonAttributes?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;
    removeKeyLabel?: boolean;
};
export declare type FunctionKeyContainerAttributes = HTMLAttributes<HTMLDivElement> & {
    $fto?: FitToOuter;
    $hook?: FunctionKeyContainerHook;
    $defaultActions?: Array<FunctionKeyProps>;
    $disabled?: boolean;
    $hideButton?: boolean;
};
declare const FunctionKeyContainer: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    $fto?: FitToOuter;
    $hook?: FunctionKeyContainerHook;
    $defaultActions?: Array<FunctionKeyProps>;
    $disabled?: boolean;
    $hideButton?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
export declare const useFunctionKeyContainer: () => FunctionKeyContainerHook;
export declare const useFunctionKey: (actions: Array<FunctionKeyProps | null>, deps?: React.DependencyList) => {
    focus: () => void;
};
declare type generateFunctionKeyActionsController = {
    set: (key: FunctionKey, props: FunctionKeyProps) => generateFunctionKeyActionsController;
};
export declare const generateFunctionKeyProps: (func?: (con: generateFunctionKeyActionsController) => void) => FunctionKeyProps[];
export default FunctionKeyContainer;
