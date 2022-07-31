import { ForwardedRef, FunctionComponent, HTMLAttributes, ReactElement } from "react";
import { InputAttributes } from "../../hooks/value";
import { InputHook } from "../../utils/input";
export declare const checkBoxCn: string;
export declare type CheckBoxHook<T extends string | number | boolean = boolean> = InputHook<T>;
export declare type CheckBoxAttributes<T extends string | number | boolean = boolean> = Omit<HTMLAttributes<HTMLDivElement>, "onClick"> & InputAttributes<T> & {
    ref?: ForwardedRef<HTMLDivElement>;
    $hook?: CheckBoxHook<T>;
    $checkedValue?: T;
    $uncheckedValue?: T;
    $fill?: boolean;
};
interface CheckBoxFC extends FunctionComponent {
    <T extends string | number | boolean = boolean>(attrs: CheckBoxAttributes<T>, ref?: ForwardedRef<HTMLDivElement>): ReactElement<CheckBoxAttributes<T>>;
}
declare const CheckBox: CheckBoxFC;
export declare const useCheckBox: <T extends string | number | boolean = any>() => {
    focus: () => void;
    getValue: () => T;
    setValue: (value: T) => void;
};
export declare const CheckButtonStyle: JSX.Element;
export default CheckBox;
