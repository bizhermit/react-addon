import { CSSProperties, FC, ReactNode } from "react";
import { _HookSetter } from "../utils/hook";
declare type Position = {
    x?: "center" | "outer" | "inner" | "outer-left" | "outer-right" | "inner-left" | "inner-right";
    y?: "center" | "outer" | "inner" | "outer-bottom" | "outer-top" | "inner-bottom" | "inner-top";
};
export declare type PopupProps = {
    anchor?: HTMLElement | null;
    position?: Position;
    transparent?: boolean;
    style?: Omit<CSSProperties, "top" | "left" | "display" | "visibility">;
    showed?: () => void;
    closed?: () => void;
    hid?: () => void;
    props?: {
        [key: string]: any;
    };
};
export declare type PopupHook = {
    show: (props?: PopupProps) => void;
    hide: () => void;
    close: () => void;
    reposition: (position?: Position) => void;
    isShowed: () => boolean;
    getElement: () => HTMLDivElement;
};
declare type Hook = _HookSetter<PopupHook>;
declare type PopupAttributes = {
    $hook: PopupHook;
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
    $preventClickClose?: boolean;
    $position?: Position;
    $transparent?: boolean;
    $style?: Omit<CSSProperties, "top" | "left" | "display" | "visibility">;
    $showed?: () => void;
    $closed?: () => void;
    $hid?: () => void;
    $mask?: boolean;
    children?: ReactNode;
};
export declare type PopupController = {
    close: () => void;
    hide: () => void;
    reposition: (position: Position) => void;
    getElement: () => HTMLDivElement;
};
export declare type PopupWindowFC<P = {}> = FC<P & {
    $$popupController?: PopupController;
}>;
declare const Popup: FC<PopupAttributes>;
export declare const usePopup: () => Hook;
export default Popup;
