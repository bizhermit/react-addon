import React, { Dispatch, FC, HTMLAttributes, ReactElement, ReactNode } from "react";
import { SourceArray } from "../../hooks/source";
import { FitToOuter } from "../../styles/css-var";
import { IconImage } from "../icon";
export declare type TreeViewHook = {
    getSelectedItems: () => Array<Data>;
};
declare type Data = {
    [key: string]: any;
};
declare type TreeViewItemProps = {
    id: string | number;
    data: Data;
    parent?: TreeViewItemProps;
    selected: boolean;
    setSelect?: Dispatch<boolean>;
    selectPropagate: (selected?: boolean, mode?: "s" | "p" | "c") => boolean;
    opened: boolean;
    setOpen?: Dispatch<boolean>;
    openPropagate: (opened?: boolean, deep?: boolean) => boolean;
    visible?: boolean;
    setVisible?: Dispatch<boolean>;
    children?: Array<TreeViewItemProps>;
};
export declare type TreeViewItemAttributes = HTMLAttributes<HTMLDivElement> & {
    $clickToggleOpen?: boolean;
    $clickToggleSelect?: boolean;
    children?: ReactNode;
};
export declare type TreeViewItemTemplateFC<P = {}> = FC<P & TreeViewItemAttributes & {
    $$props?: TreeViewItemProps;
    $$nestLevel?: number;
    $$setChildren?: (items: Array<Data>) => void;
    $$toggleSelect?: (select?: boolean, deep?: boolean) => void;
    $$toggleOpenChildren?: (open?: boolean, deep?: boolean) => void;
}>;
export declare type TreeViewAttributes = HTMLAttributes<HTMLDivElement> & {
    $hook?: TreeViewHook;
    $fto?: FitToOuter;
    $items?: SourceArray<Data>;
    $filter?: (item: Data) => boolean;
    $checkBox?: boolean;
    $checkPropagation?: boolean;
    $idDataName?: string;
    $parentIdDataName?: string;
    $selectedDataName?: string;
    $defaultOpenedDataName?: string;
    $openedIconImage?: IconImage;
    $closedIconImage?: IconImage;
    $animationDuration?: number;
    $border?: boolean;
    $grouping?: Array<{
        id: string;
        dataName: string;
        labelDataName?: string | ((data: {
            [key: string]: any;
        }) => string);
    }>;
    children: ReactElement<TreeViewItemAttributes>;
};
declare const TreeView: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    $hook?: TreeViewHook;
    $fto?: FitToOuter;
    $items?: SourceArray<Data>;
    $filter?: (item: Data) => boolean;
    $checkBox?: boolean;
    $checkPropagation?: boolean;
    $idDataName?: string;
    $parentIdDataName?: string;
    $selectedDataName?: string;
    $defaultOpenedDataName?: string;
    $openedIconImage?: IconImage;
    $closedIconImage?: IconImage;
    $animationDuration?: number;
    $border?: boolean;
    $grouping?: {
        id: string;
        dataName: string;
        labelDataName?: string | ((data: {
            [key: string]: any;
        }) => string);
    }[];
    children: ReactElement<TreeViewItemAttributes>;
} & React.RefAttributes<HTMLDivElement>>;
export declare const useTreeView: () => TreeViewHook;
export default TreeView;
