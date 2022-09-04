import { Color } from "../../../styles/css-var";
import { SliderAttributes } from "../../inputs/slider";
import { DataViewColumnFunction, DataViewEditColumnProps, DataViewEditInputAttributes } from "../data-view";
declare const DataViewSliderColumn: DataViewColumnFunction<DataViewEditColumnProps<number> & {
    sliderAttributes?: DataViewEditInputAttributes<SliderAttributes>;
    labelDataName?: string;
    hideLabel?: boolean;
    hideBar?: boolean;
    barAlign?: "left" | "right";
    defaultColor?: Color;
    color?: (value?: number) => Color;
    progressbarRender?: (value: number, barElement: HTMLDivElement) => void;
    format?: (value?: number) => string;
}>;
export default DataViewSliderColumn;
