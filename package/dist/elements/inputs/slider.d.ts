import React, { HTMLAttributes } from "react";
import { InputAttributes } from "../../hooks/value";
import { InputHook } from "../../utils/input";
export declare type SliderHook = InputHook<number>;
export declare type SliderAttributes = HTMLAttributes<HTMLDivElement> & InputAttributes<number> & {
    $hook?: SliderHook;
    $min?: number;
    $max?: number;
    $keydownInterval?: number;
    $resize?: boolean;
    $showKnobLabel?: boolean;
    $changing?: (value: number) => void;
};
declare const Slider: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & InputAttributes<number, {}> & {
    $hook?: SliderHook;
    $min?: number;
    $max?: number;
    $keydownInterval?: number;
    $resize?: boolean;
    $showKnobLabel?: boolean;
    $changing?: (value: number) => void;
} & React.RefAttributes<HTMLDivElement>>;
export declare const useSlider: () => SliderHook;
export default Slider;
