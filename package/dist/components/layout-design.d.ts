import { FC } from "react";
import { LayoutDesign } from "../styles/css-var";
import { RadioButtonsAttributes } from "../elements/inputs/radio-buttons";
import { SelectBoxAttributes } from "../elements/inputs/select-box";
declare type Options = {
    $unset?: boolean;
    $labels?: {
        unset?: string;
        flat?: string;
        material?: string;
        neumorphism?: string;
    };
    $customDesigns?: Array<{
        value: string;
        label: string;
    }>;
};
declare const layoutDesignSource: (options?: Options) => {
    value: string;
    label: string;
}[];
export declare const LayoutDesignRadioButtons: FC<Omit<RadioButtonsAttributes<LayoutDesign>, "$dispatch" | "$value" | "$source"> & Options>;
export declare const LayoutDesignSelectBox: FC<Omit<SelectBoxAttributes<LayoutDesign>, "$dispatch" | "$value" | "$source"> & Options>;
export default layoutDesignSource;
