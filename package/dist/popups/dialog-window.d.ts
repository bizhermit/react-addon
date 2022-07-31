import { FC, ReactNode } from "react";
import { Signal } from "../styles/css-var";
import { MaskHook } from "./mask";
import { _HookSetter } from "../utils/hook";
export declare type DialogWindowProps = {
    showed?: () => void;
    closed?: (props?: {
        [key: string]: any;
    }) => void;
    hid?: (props?: {
        [key: string]: any;
    }) => void;
    props?: {
        [key: string]: any;
    };
};
export declare type DialogWindowHook = {
    show: (props?: DialogWindowHook) => void;
    close: (props?: {
        [key: string]: any;
    }) => void;
    hide: (props?: {
        [key: string]: any;
    }) => void;
    isShowed: () => boolean;
};
declare type Hook = _HookSetter<DialogWindowHook>;
declare type DialogWindowAttributes = {
    $hook: DialogWindowHook;
    $modal?: boolean;
    $title?: ReactNode;
    $hideHeader?: boolean;
    $hideCloseButton?: boolean;
    $hideMinimizeButton?: boolean;
    $preventMove?: boolean;
    $preventResize?: boolean;
    $fullScreen?: boolean;
    $clickMaskAction?: "none" | "hide" | "close";
    $top?: number | string;
    $left?: number | string;
    $height?: number | string;
    $width?: number | string;
    $signal?: Signal;
    $showed?: () => void;
    $closed?: (props?: {
        [key: string]: any;
    }) => void;
    $hid?: (props?: {
        [key: string]: any;
    }) => void;
    children?: ReactNode;
};
export declare type DialogWindowController = {
    close: (props?: {
        [key: string]: any;
    }) => void;
    hide: (props?: {
        [key: string]: any;
    }) => void;
};
export declare type DialogWindowFC<P = {}> = FC<P & {
    $$mask?: MaskHook;
    $$dialogWindowController?: DialogWindowController;
}>;
declare const DialogWindow: FC<DialogWindowAttributes>;
export declare const useDialogWindow: () => Hook;
export default DialogWindow;
