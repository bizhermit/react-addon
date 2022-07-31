import { Signal } from "../../../styles/css-var";
import { SliderAttributes } from "../../inputs/slider";
import { ListViewColumnFunction, ListViewEditColumnProps, ListViewEditInputAttributes } from "../list-view";
declare const ListViewSliderColumn: ListViewColumnFunction<ListViewEditColumnProps<number> & {
    sliderAttributes?: ListViewEditInputAttributes<SliderAttributes>;
    labelDataName?: string;
    hideLabel?: boolean;
    hideBar?: boolean;
    barAlign?: "left" | "right";
    defaultSignal?: Signal;
    signal?: (value?: number) => Signal;
    progressbarRender?: (value: number, barElement: HTMLDivElement) => void;
    format?: (value?: number) => string;
}>;
export default ListViewSliderColumn;
