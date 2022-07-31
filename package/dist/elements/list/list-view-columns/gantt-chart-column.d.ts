import { Signal } from "../../../styles/css-var";
import { ListViewColumnFunction } from "../list-view";
declare type GanttChartColumnData = {
    dataName: string;
    fromDataName: string;
    toDataName: string;
    barLabelDataName?: string;
    rateDataName?: string;
    barClassName?: string;
    disabled?: boolean;
    defaultSignal?: Signal;
};
declare type GanttChartUnit = "day" | "week" | "month";
declare const ListViewGanttChartColumn: ListViewColumnFunction<{
    name: string;
    disabled?: boolean;
    term: {
        from: Date;
        to: Date;
    };
    dateCellWidth?: number;
    dataNames: Array<GanttChartColumnData>;
    dataType?: "string" | "number" | "date";
    dateFormat?: string;
    progressLine?: boolean;
    unit?: GanttChartUnit;
    barTitleFormat?: (params: {
        from: Date;
        to: Date;
        length: number;
    }) => string;
    defaultSignal?: Signal;
}>;
export default ListViewGanttChartColumn;
