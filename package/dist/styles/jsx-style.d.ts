import { FC } from "react";
import { LayoutColor, LayoutDesign } from "./css-var";
declare type JsxStyleProps = {
    id: string;
    depsDesign?: boolean;
    depsColor?: boolean;
    children: (params: {
        color: LayoutColor;
        design: LayoutDesign;
    }) => string;
};
declare const JsxStyle: FC<JsxStyleProps>;
export default JsxStyle;
