import React, { ButtonHTMLAttributes, MouseEvent } from "react";
import { Signal } from "../styles/css-var";
import { IconImage } from "./icon";
export declare const buttonCn = "bh-btn";
export declare type ButtonHook = {
    focus?: () => void;
};
export declare type ButtonIconProps = IconImage | {
    $image: IconImage;
    $signal?: Signal;
    $round?: boolean;
};
export declare type ButtonAttributes = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
    $hook?: ButtonHook;
    $signal?: Signal;
    $click?: (unlock: (preventFocus?: boolean) => void, event: MouseEvent<HTMLButtonElement>) => void;
    $round?: boolean;
    $transparent?: boolean;
    $fillLabel?: boolean;
    $icon?: ButtonIconProps;
    $iconRight?: boolean;
    $borderless?: boolean;
    $stopPropagation?: boolean;
};
declare const Button: React.ForwardRefExoticComponent<Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
    $hook?: ButtonHook;
    $signal?: Signal;
    $click?: (unlock: (preventFocus?: boolean) => void, event: MouseEvent<HTMLButtonElement>) => void;
    $round?: boolean;
    $transparent?: boolean;
    $fillLabel?: boolean;
    $icon?: ButtonIconProps;
    $iconRight?: boolean;
    $borderless?: boolean;
    $stopPropagation?: boolean;
} & React.RefAttributes<HTMLButtonElement>>;
export declare const useButton: () => ButtonHook;
export default Button;
