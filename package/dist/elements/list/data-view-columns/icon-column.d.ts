import { Color } from "../../../styles/css-var";
import { IconImage } from "../../icon";
import { DataViewColumnFunction } from "../data-view";
declare const DataViewIconColumn: DataViewColumnFunction<{
    name?: string;
    colorDataName?: string;
    fixed?: boolean;
    cellTextAlign?: "left" | "center" | "right";
    width?: number;
    defaultIcon?: IconImage;
    defaultColor?: Color;
}>;
export default DataViewIconColumn;
