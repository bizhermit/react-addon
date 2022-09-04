import { Color } from "../../../styles/css-var";
import { SliderAttributes } from "../../inputs/slider";
import { ListViewColumnFunction, ListViewEditColumnProps, ListViewEditInputAttributes } from "../data-view";
declare const ListViewSliderColumn: ListViewColumnFunction<ListViewEditColumnProps<number> & {
    sliderAttributes?: ListViewEditInputAttributes<SliderAttributes>;
    labelDataName?: string;
    hideLabel?: boolean;
    hideBar?: boolean;
    barAlign?: "left" | "right";
    defaultColor?: Color;
    color?: (value?: number) => Color;
    progressbarRender?: (value: number, barElement: HTMLDivElement) => void;
    format?: (value?: number) => string;
}>;
export default ListViewSliderColumn;
