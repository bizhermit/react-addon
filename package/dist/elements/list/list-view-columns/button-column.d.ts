import { Signal } from "../../../styles/css-var";
import { IconImage } from "../../icon";
import { ListViewColumnFunction, ListViewColumnProps } from "../list-view";
declare const ListViewButtonColumn: ListViewColumnFunction<ListViewColumnProps & {
    buttonLabel?: string;
    icon?: IconImage | {
        signal?: Signal;
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
export default ListViewButtonColumn;
