import { DataViewColumnProps } from "../data-view";
declare type Props = {
    name?: string;
    width?: number;
    disabled?: boolean;
    range?: "cell" | "row";
    fixed?: boolean;
    borderless?: boolean;
};
declare const DataViewReorderColumn: (props?: Props) => DataViewColumnProps;
export default DataViewReorderColumn;
