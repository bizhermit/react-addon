import React, { FC, HTMLAttributes, ReactElement, ReactNode } from "react";
import { FitToOuter, Color } from "../styles/css-var";
import { MaskHook, MaskProps } from "../popups/mask";
declare type TabKey = string | number;
export declare type TabContainerHook = {
    selectTab: (tabKey: TabKey) => void;
    showMask: (props?: MaskProps) => void;
    closeMask: () => void;
};
export declare type TabContentAttributes = {
    key: TabKey;
    title: string | ReactNode;
    $selected?: () => void;
    $color?: Color;
    children?: ReactNode;
};
export declare type TabContentWrapperFC<P = {}> = FC<P & TabContentAttributes>;
export declare type TabContentFC<P = {}> = TabContentWrapperFC<P & {
    $$mask?: MaskHook;
}>;
export declare const TabContentWrapper: TabContentWrapperFC;
export declare type TabContainerAttributes = HTMLAttributes<HTMLDivElement> & {
    $fto?: FitToOuter;
    $hook?: TabContainerHook;
    $defaultKey?: TabKey;
    $selected?: (key: TabKey) => void;
    $calcTabWidth?: boolean;
    $color?: Color;
    $navigationBackgroundColor?: boolean;
    children: ReactElement<TabContentAttributes> | Array<ReactElement<TabContentAttributes>>;
};
declare const TabContainer: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    $fto?: FitToOuter;
    $hook?: TabContainerHook;
    $defaultKey?: TabKey;
    $selected?: (key: TabKey) => void;
    $calcTabWidth?: boolean;
    $color?: Color;
    $navigationBackgroundColor?: boolean;
    children: ReactElement<TabContentAttributes> | Array<ReactElement<TabContentAttributes>>;
} & React.RefAttributes<HTMLDivElement>>;
export declare const useTabContainer: () => TabContainerHook;
export default TabContainer;
