import { Color } from "../../../styles/css-var";
import { DataViewColumnFunction } from "../data-view";
declare type GanttChartColumnData = {
    dataName: string;
    fromDataName: string;
    toDataName: string;
    barLabelDataName?: string;
    rateDataName?: string;
    barClassName?: string;
    disabled?: boolean;
    defaultColor?: Color;
};
declare type GanttChartUnit = "day" | "week" | "month";
declare const DataViewGanttChartColumn: DataViewColumnFunction<{
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
    defaultColor?: Color;
}>;
export default DataViewGanttChartColumn;
