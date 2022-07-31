import { ForwardedRef, FunctionComponent, HTMLAttributes, ReactElement } from "react";
import { InputAttributes } from "../../hooks/value";
import { InputHook } from "../../utils/input";
export declare type ToggleBoxHook<T extends string | number | boolean = boolean> = InputHook<T>;
export declare type ToggleBoxAttributes<T extends string | number | boolean = boolean> = Omit<HTMLAttributes<HTMLDivElement>, "children" | "onClick"> & InputAttributes<T> & {
    ref?: ForwardedRef<HTMLDivElement>;
    $hook?: ToggleBoxHook<T>;
    $checkedValue?: T;
    $uncheckedValue?: T;
};
interface ToggleBoxFC extends FunctionComponent {
    <T extends string | number | boolean = boolean>(attrs: ToggleBoxAttributes<T>, ref?: ForwardedRef<HTMLDivElement>): ReactElement<ToggleBoxAttributes<T>>;
}
declare const ToggleBox: ToggleBoxFC;
export declare const useToggleBox: <T extends string | number | boolean = any>() => {
    focus: () => void;
    getValue: () => T;
    setValue: (value: T) => void;
};
export default ToggleBox;
