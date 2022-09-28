import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { FC, HTMLAttributes, useMemo } from "react";
import { sbCn } from "../styles/core-style";
import { CssPV, FitToOuter } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributesWithoutChildren, ftoCn } from "../utils/attributes";
import { convertToTsCode } from "../utils/syntax-highlight/typescript";

export const codeCn = "bh-code";

export type CodeAttributes = HTMLAttributes<HTMLDivElement> & {
  $fto?: FitToOuter;
  $language?: "ts" | "tsx" | "js" | "jsx" | "html" | "css" | "scss" | "sass" | "rpg";
  $edgeText?: boolean;
  $lineHeight?: number;
  $tabSpace?: number;
  children?: string | Array<string>;
};

const Code = React.forwardRef<HTMLDivElement, CodeAttributes>((attrs, ref) => {
  
  const { lineNodes, lineNumNodes, lineNumWidth } = useMemo(() => {
    let arr: Array<string> = [];
    switch (attrs.$language) {
      case "ts":
      case "tsx":
        arr = convertToTsCode(attrs.children);
        break;
      default:
        if (StringUtils.isString(attrs.children)) {
          arr = attrs.children.split(/\r\n|\n/);
        } else {
          arr = [...attrs.children];
        }
        break;
    }
    const lineNodes: Array<JSX.Element> = [], lineNumNodes: Array<JSX.Element> = [];
    const lineNumWidth = Math.max(String(arr.length).length * 10 + 10, 20);
    const lineHeight = attrs.$lineHeight || 24;
    arr.forEach((value, index) => {
      lineNumNodes.push(<CodeLineNumber key={index} lineNumber={index + 1} lineHeight={lineHeight} />);
      lineNodes.push(<CodeLine key={index} lineHeight={lineHeight}>{value}</CodeLine>);
    });
    return { lineNodes, lineNumNodes, lineNumWidth };
  }, [attrs.children]);
  
  return (
    <>
      <div
        {...attributesWithoutChildren(attrs, codeCn, sbCn, ftoCn(attrs.$fto))}
        ref={ref}
        data-lang={attrs.$language ?? ""}
      >
        {attrs.$edgeText ? <div className={`${codeCn}-edge`}>start</div> : <></>}
        <div className={`${codeCn}-body`}>
          <div className={`${codeCn}-line_number-wrap`} style={{ width: lineNumWidth }}>{lineNumNodes}</div>
          <div className={`${codeCn}-line-wrap`}>{lineNodes}</div>
        </div>
        {attrs.$edgeText ? <div className={`${codeCn}-edge`}>end</div> : <></>}
      </div>
      {Style}
    </>
  )
});

const CodeLineNumber: FC<{ lineHeight: number; lineNumber: number; }> = ({ lineHeight, lineNumber }) => {
  return <div className={`${codeCn}-line_number`} style={{ height: lineHeight }}>{lineNumber}</div>
};

const CodeLine: FC<{ children?: string; lineHeight: number; }> = ({ lineHeight, children }) => {
  return <div className={`${codeCn}-line`} style={{ height: lineHeight }} dangerouslySetInnerHTML={{ __html: children }} />;
};

export const Style = <JsxStyle id={codeCn}>{() => `
.${codeCn} {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  color: #eee;
  font-family: Consolas, "Courier New", monospace;
}
.${codeCn}-edge {
  width: 100%;
  color: #aaa;
  background: #000;
  padding: 0px 10px;
  flex: none;
  left: 0px;
  position: sticky;
}
.${codeCn}-body {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: none;
  background: #111;
  min-width: 100%;
}
.${codeCn}-line_number-wrap,
.${codeCn}-line-wrap {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 0px;
  flex: none;
}
.${codeCn}-line_number-wrap {
  border-right: 1px solid #666;
  background: #000;
  color: #ccc;
  min-width: 30px;
  left: 0px;
  position: sticky;
  z-index: 1;
}
.${codeCn}-line-wrap {
  z-index: 0;
}
.${codeCn}-line_number {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  flex: none;
  width: 100%;
  margin: 0px;
  padding-right: 5px;
}
.${codeCn}-line {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  min-width: 100%;
  white-space: nowrap;
  margin: 0px;
  padding: 0px 5px;
}
.${codeCn}-line:hover {
  background: #222;
}
.${codeCn}[data-lang="rpg"] .${codeCn}-line_number-wrap{
  color: #88f
}
.${codeCn}[data-lang="rpg"] .${codeCn}-line-wrap{
  color: #8f8;
}
.${codeCn}[data-lang="ts"] .${codeCn}-comment,
.${codeCn}[data-lang="ts"] .${codeCn}-comment span {
  color: #3cb371 !important;
}
.${codeCn}[data-lang="ts"] .${codeCn}-string,
.${codeCn}[data-lang="tsx"] .${codeCn}-string {
  color: #ffa07a;
}
.${codeCn}[data-lang="ts"] .${codeCn}-import,
.${codeCn}[data-lang="tsx"] .${codeCn}-import {
  color: #ff89d4;
}
.${codeCn}[data-lang="ts"] .${codeCn}-export,
.${codeCn}[data-lang="tsx"] .${codeCn}-export {
  color: #ff89d4;
}
.${codeCn}[data-lang="ts"] .${codeCn}-return,
.${codeCn}[data-lang="tsx"] .${codeCn}-return {
  color: #ff89d4;
}
.${codeCn}[data-lang="ts"] .${codeCn}-var,
.${codeCn}[data-lang="tsx"] .${codeCn}-var {
  color: #9e90ff;
}
.${codeCn}[data-lang="ts"] .${codeCn}-jsx,
.${codeCn}[data-lang="tsx"] .${codeCn}-jsx {
  color: #9edf90;
}
`}</JsxStyle>;

export default Code;