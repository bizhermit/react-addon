import { ReactNode } from "react";
import { Color } from "../styles/css-var";
import { ButtonAttributes } from "../elements/button";
import { TextBoxAttributes } from "../elements/inputs/text-box";
declare type MessageBoxButton = Omit<ButtonAttributes, "$click" | "$hook"> & {
    $code?: string | number;
    $escapeButton?: boolean;
    $default?: boolean;
    $click?: (resolve: (value: any) => void, attrs?: MessageBoxButton) => void;
};
declare type MessageBoxProps = {
    title?: string;
    message: ReactNode;
    buttons: Array<MessageBoxButton>;
    color?: Color;
};
declare const useMessageBox: () => {
    show: <T>(props: MessageBoxProps) => Promise<T>;
    alert: (message: ReactNode, title?: string) => Promise<void>;
    confirm: (message: ReactNode, title?: string) => Promise<boolean>;
    text: (props: {
        message?: ReactNode;
        textBoxAttributes?: TextBoxAttributes;
        title?: string;
    }) => Promise<{
        result: boolean;
        text: string;
    }>;
};
export default useMessageBox;
