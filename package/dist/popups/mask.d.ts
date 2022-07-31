import React, { FC, HTMLAttributes, ReactNode } from "react";
import { FitToOuter } from "../styles/css-var";
export declare type MaskImage = "spin" | "flow";
export declare type MaskProps = {
    image?: MaskImage;
    content?: ReactNode;
};
export declare type MaskHook = {
    show: (props?: MaskProps) => void;
    close: () => void;
};
export declare type MaskAttributes = HTMLAttributes<HTMLDivElement> & {
    $hook: MaskHook;
    $fto?: FitToOuter;
    $row?: boolean;
    $wrap?: boolean;
    $left?: boolean;
    $center?: boolean;
    $right?: boolean;
    $top?: boolean;
    $middle?: boolean;
    $bottom?: boolean;
    $scroll?: boolean;
    $padding?: boolean;
    $className?: string;
    $data?: {
        [key: string]: any;
    };
    children?: ReactNode;
};
declare const MaskContainer: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    $hook: MaskHook;
    $fto?: FitToOuter;
    $row?: boolean;
    $wrap?: boolean;
    $left?: boolean;
    $center?: boolean;
    $right?: boolean;
    $top?: boolean;
    $middle?: boolean;
    $bottom?: boolean;
    $scroll?: boolean;
    $padding?: boolean;
    $className?: string;
    $data?: {
        [key: string]: any;
    };
    children?: ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
export declare const MaskProvider: FC<Omit<MaskAttributes, "$hook"> & {
    initProps?: MaskProps;
}>;
export declare const useMask: (initProps?: {
    show?: boolean;
} & MaskProps) => MaskHook;
export default MaskContainer;
