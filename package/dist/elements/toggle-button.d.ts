import { FC, MouseEvent } from "react";
import { ButtonAttributes } from "./button";
declare type ToggleButtonProps = Omit<ButtonAttributes, "$click"> & {
    key?: string;
    $click?: (unlock: (preventFocus?: boolean) => void, event: MouseEvent<HTMLButtonElement>) => (void | string | Promise<void | string>);
};
declare const ToggleButton: FC<{
    children: Array<ToggleButtonProps>;
    defaultKey?: string;
}>;
export default ToggleButton;
