import React, { ButtonHTMLAttributes, MouseEvent } from "react";
import { Color, Size } from "../styles/css-var";
import { IconImage } from "./icon";
export declare const buttonCn = "bh-btn";
export declare type ButtonHook = {
    focus?: () => void;
};
export declare type ButtonIconProps = IconImage | {
    $image: IconImage;
    $color?: Color;
    $round?: boolean;
};
export declare type ButtonAttributes = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
    $hook?: ButtonHook;
    $color?: Color;
    $size?: Size;
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
    $color?: Color;
    $size?: Size;
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
