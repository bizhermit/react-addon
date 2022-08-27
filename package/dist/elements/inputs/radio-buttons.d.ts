import { HTMLAttributes, ForwardedRef, FunctionComponent, ReactElement } from "react";
import { SourceArray } from "../../hooks/source";
import { InputAttributes } from "../../hooks/value";
import { InputHook } from "../../utils/input";
export declare const radioButtonCn: string;
export declare type RadioButtonsHook<T extends string | number = string | number> = InputHook<T>;
export declare type RadioButtonsAttributes<T extends string | number = string | number, U = {
    [key: string | number]: any;
}> = Omit<HTMLAttributes<HTMLDivElement>, "children"> & InputAttributes<T, {
    beforeData?: U;
    afterData: U;
}> & {
    ref?: ForwardedRef<HTMLDivElement>;
    $hook?: RadioButtonsHook<T>;
    $column?: boolean;
    $nowrap?: boolean;
    $source?: SourceArray<U>;
    $preventSourceMemo?: boolean;
    $labelDataName?: string;
    $valueDataName?: string;
    $colorDataName?: string;
    $hideRadioButton?: boolean;
};
interface RadioButtonsFC extends FunctionComponent {
    <T extends string | number = string | number, U = {
        [key: string]: any;
    }>(attrs: RadioButtonsAttributes<T, U>, ref?: ForwardedRef<HTMLDivElement>): ReactElement<RadioButtonsAttributes<T, U>>;
}
declare const RadioButtons: RadioButtonsFC;
export declare const useRadioButtons: <T extends string | number = any>() => {
    focus: () => void;
    getValue: () => T;
    setValue: (value: T) => void;
};
export declare const RadioButtonStyle: JSX.Element;
export default RadioButtons;
