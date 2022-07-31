import { FC } from "react";
import { LayoutColor } from "../styles/css-var";
import { RadioButtonsAttributes } from "../elements/inputs/radio-buttons";
import { SelectBoxAttributes } from "../elements/inputs/select-box";
declare type Options = {
    $unset?: boolean;
    $labels?: {
        unset?: string;
        system?: string;
        light?: string;
        dark?: string;
    };
    $customColors?: Array<{
        value: string;
        label: string;
    }>;
};
declare const layoutColorSource: (options?: Options) => {
    value: string;
    label: string;
}[];
export declare const LayoutColorRadioButtons: FC<Omit<RadioButtonsAttributes<LayoutColor>, "$dispatch" | "$value" | "$source"> & Options>;
export declare const LayoutColorSelectBox: FC<Omit<SelectBoxAttributes<LayoutColor>, "$dispatch" | "$value" | "$source"> & Options>;
export default layoutColorSource;
