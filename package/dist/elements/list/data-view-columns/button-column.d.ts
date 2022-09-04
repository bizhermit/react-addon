import { Color } from "../../../styles/css-var";
import { IconImage } from "../../icon";
import { DataViewColumnFunction, DataViewColumnProps } from "../data-view";
declare const DataViewButtonColumn: DataViewColumnFunction<DataViewColumnProps & {
    buttonLabel?: string;
    icon?: IconImage | {
        color?: Color;
        image?: IconImage;
        position?: "left" | "right";
    };
    title?: string;
    valid?: (itemData: {
        [key: string]: any;
    }) => boolean | {
        valid: boolean;
        visible?: boolean;
        buttonLabel?: string;
    };
}>;
export default DataViewButtonColumn;
