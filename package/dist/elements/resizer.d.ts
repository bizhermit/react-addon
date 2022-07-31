import { FC } from "react";
export declare const resizeCn = "bh-rsz";
export declare type ResizeAttributes = {
    direction?: "x" | "y" | "xy";
    reverse?: boolean;
    resizing?: () => void;
    resized?: () => void;
};
declare const Resizer: FC<ResizeAttributes>;
export default Resizer;
