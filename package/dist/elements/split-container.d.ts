import React, { FC, HTMLAttributes, ReactElement, ReactNode } from "react";
import { Dispatch } from "react";
import { FitToOuter } from "../styles/css-var";
import { MaskHook, MaskProps } from "../popups/mask";
export declare type SplitContainerHook = {
    setSecondarySize: (size?: number | string) => void;
    setVisible: Dispatch<{
        primary?: boolean;
        secondary?: boolean;
    }>;
    showMask: (props?: MaskProps) => void;
    closeMask: () => void;
};
export declare type SplitController = {
    dispatch: (params?: {
        [key: string]: any;
    }) => SplitController;
    setDispatcher: (dispatcher: (params?: {
        [key: string]: any;
    }) => void) => SplitController;
    setVisible: (visible: {
        self?: boolean;
        partner?: boolean;
    }) => SplitController;
    isVisibleSelf: () => boolean;
    isVisiblePartner: () => boolean;
};
export declare type SplitContentAttributes = {
    children?: ReactNode;
};
export declare type SplitContentWrapperFC<P = {}> = FC<P & SplitContentAttributes>;
export declare type SplitContentFC<P = {}> = SplitContentWrapperFC<P & {
    $$mask?: MaskHook;
    $$splitController?: SplitController;
}>;
export declare const SplitContentWrapper: SplitContentWrapperFC;
export declare type SplitContainerAttributes = HTMLAttributes<HTMLDivElement> & {
    $fto?: FitToOuter;
    $hook?: SplitContainerHook;
    $column?: boolean;
    $reverse?: boolean;
    $hidePrimary?: boolean;
    $defaultHidePrimary?: boolean;
    $secondarySize?: number | string;
    $defaultSecondarySize?: number | string;
    $hideSecondary?: boolean;
    $defaultHideSecondary?: boolean;
    $disabled?: boolean;
    children?: [ReactElement<SplitContentAttributes>, ReactElement<SplitContentAttributes>];
};
declare const SplitContainer: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    $fto?: FitToOuter;
    $hook?: SplitContainerHook;
    $column?: boolean;
    $reverse?: boolean;
    $hidePrimary?: boolean;
    $defaultHidePrimary?: boolean;
    $secondarySize?: number | string;
    $defaultSecondarySize?: number | string;
    $hideSecondary?: boolean;
    $defaultHideSecondary?: boolean;
    $disabled?: boolean;
    children?: [ReactElement<SplitContentAttributes>, ReactElement<SplitContentAttributes>];
} & React.RefAttributes<HTMLDivElement>>;
export declare const useSplitContainer: () => SplitContainerHook;
export default SplitContainer;
