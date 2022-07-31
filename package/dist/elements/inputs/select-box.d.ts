import { ForwardedRef, FunctionComponent, HTMLAttributes, ReactElement } from "react";
import { SourceArray } from "../../hooks/source";
import { InputAttributes } from "../../hooks/value";
import { InputBorder } from "../../styles/input-style";
import { InputHook } from "../../utils/input";
export declare type SelectBoxHook<T extends string | number = string | number> = InputHook<T>;
export declare type SelectBoxAttributes<T extends string | number = string | number, U = {
    [key: string | number]: any;
}> = Omit<HTMLAttributes<HTMLDivElement>, "children"> & InputAttributes<T, {
    beforeData?: U;
    afterData: U;
}> & {
    ref?: ForwardedRef<HTMLDivElement>;
    $hook?: SelectBoxHook<T>;
    $source?: SourceArray<U>;
    $preventSourceMemo?: boolean;
    $labelDataName?: string;
    $valueDataName?: string;
    $notInputText?: boolean;
    $textAlign?: "left" | "center" | "right";
    $border?: InputBorder;
    $round?: boolean;
    $resize?: boolean;
};
interface SelectBoxFC extends FunctionComponent {
    <T extends string | number = string | number, U = {
        [key: string]: any;
    }>(attrs: SelectBoxAttributes<T, U>, ref?: ForwardedRef<HTMLDivElement>): ReactElement<SelectBoxAttributes<T, U>>;
}
declare const SelectBox: SelectBoxFC;
export declare const useSelectBox: <T extends string | number = any>() => {
    focus: () => void;
    getValue: () => T;
    setValue: (value: T) => void;
};
export default SelectBox;
