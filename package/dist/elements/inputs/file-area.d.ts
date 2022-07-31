import React, { HTMLAttributes, ReactNode } from "react";
import { FitToOuter, Signal } from "../../styles/css-var";
import { InputHook } from "../../utils/input";
import { FileAccept } from "./file-box";
export declare type FileAreaHook = InputHook<Array<File>> & {
    clear: () => void;
};
export declare type FileAreaAttributes = HTMLAttributes<HTMLDivElement> & {
    $hook?: FileAreaHook;
    $fto?: FitToOuter;
    $signal?: Signal;
    $disabled?: boolean;
    $accept?: Array<FileAccept>;
    $resize?: boolean | "x" | "y" | "xy";
    $noPadding?: boolean;
    $changed?: (ctx: {
        files: Array<File>;
        size: number;
        count: number;
    }) => boolean | void;
    children?: ReactNode;
};
declare const FileArea: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    $hook?: FileAreaHook;
    $fto?: FitToOuter;
    $signal?: Signal;
    $disabled?: boolean;
    $accept?: Array<FileAccept>;
    $resize?: boolean | "x" | "y" | "xy";
    $noPadding?: boolean;
    $changed?: (ctx: {
        files: Array<File>;
        size: number;
        count: number;
    }) => boolean | void;
    children?: ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
export declare const useFileArea: () => FileAreaHook;
export default FileArea;
