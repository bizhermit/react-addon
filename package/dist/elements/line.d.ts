import { FC, HTMLAttributes } from "react";
declare type LineAttributes = HTMLAttributes<HTMLHRElement> & {
    $bold?: boolean | number;
    $margin?: boolean | number;
    $padding?: boolean | number;
};
declare const HLine: FC<LineAttributes>;
export declare const VLine: FC<LineAttributes>;
export default HLine;
