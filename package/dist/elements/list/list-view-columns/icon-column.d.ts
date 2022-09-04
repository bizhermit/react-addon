import { Color } from "../../../styles/css-var";
import { IconImage } from "../../icon";
import { ListViewColumnFunction } from "../data-view";
declare const ListViewIconColumn: ListViewColumnFunction<{
    name?: string;
    colorDataName?: string;
    fixed?: boolean;
    cellTextAlign?: "left" | "center" | "right";
    width?: number;
    defaultIcon?: IconImage;
    defaultColor?: Color;
}>;
export default ListViewIconColumn;
