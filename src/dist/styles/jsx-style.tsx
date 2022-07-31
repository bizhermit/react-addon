import React, { FC, useMemo } from "react";
import StyledJsx from "styled-jsx/style";
import { LayoutColor, LayoutDesign } from "./css-var";
import { useLayout } from "./layout-provider";

type JsxStyleProps = {
  id: string;
  depsDesign?: boolean;
  depsColor?: boolean;
  children: (params: { color: LayoutColor; design: LayoutDesign; }) => string;
};

const minify = (contents: string) => {
  if (typeof contents !== "string") return contents;
  return contents.replace(/(  |\n|)/g, "").replace(/: /g, ":").replace(/, /g, ",").replace(/ {/g, "{").replace(/ > /g, ">");
};

const JsxStyle: FC<JsxStyleProps> = ({ id, depsDesign, depsColor, children }) => {
  const layout = useLayout();
  return useMemo(() => {
    const key = `${id}__${(depsDesign ? layout.design : "") ?? ""}_${(depsColor ? layout.color : "") ?? ""}`;
    return (
      <StyledJsx id={key} jsx>
        {layout.cache[key] = layout.cache[key] ?? minify(children({ color: layout._color, design: layout.design }) ?? "")}
      </StyledJsx>
    );
  }, [depsDesign ? layout.design : undefined, depsColor ? layout.color : undefined]);
};

export default JsxStyle;