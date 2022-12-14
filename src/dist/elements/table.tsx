import React, { HTMLAttributes, ReactNode } from "react";
import CssVar, { Color, colorIterator } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributes } from "../utils/attributes";

const cn = "bh-tbl";

type TableAttributes = HTMLAttributes<HTMLTableElement> & {
  children?: ReactNode;
  $border?: boolean;
  $oddEven?: boolean;
  $hover?: boolean;
  $color?: Color;
};
export const Table = React.forwardRef<HTMLTableElement, TableAttributes>((attrs, ref) => {
  return (
    <>
      <table
        {...attributes(attrs, cn)}
        ref={ref}
        data-border={attrs.$border}
        data-oddeven={attrs.$oddEven}
        data-hover={attrs.$hover}
        data-color={attrs.$color}
      />
      {Style}
    </>
  );
});

const Style = <JsxStyle id={cn}>{() => `
.${cn}[data-border="true"],
.${cn}[data-oddeven="true"] {
  border-collapse: collapse;
}
.${cn}[data-border="true"] > * > * > th,
.${cn}[data-border="true"] > * > * > td {
  border: 1px solid ${CssVar.bdc};
}
.${cn}[data-oddeven="true"] > * > * > th {
  background: ${CssVar.dataview.header.bgc};
  color: ${CssVar.dataview.header.fgc};
}
.${cn}[data-oddeven="true"] > tbody > tr:nth-child(odd) {
  background: ${CssVar.dataview.cell.bg.b};
  color: ${CssVar.dataview.cell.ft.b};
}
.${cn}[data-oddeven="true"] > tbody > tr:nth-child(even) {
  background: ${CssVar.dataview.cell.bg.d};
  color: ${CssVar.dataview.cell.ft.d};
}
.${cn}[data-hover="true"] > tbody > tr:hover {
  background: ${CssVar.dataview.cell.hvr.row.bgc};
  color: ${CssVar.dataview.cell.hvr.row.fgc};
}
.${cn}[data-hover="true"] > tbody > tr > td:hover {
  background: ${CssVar.dataview.cell.hvr.cell.bgc};
  color: ${CssVar.dataview.cell.hvr.cell.fgc};
}
${colorIterator((_s, v, qs) => `
.${cn}${qs} > * > * > th {
  background: ${v.head.bgc};
  color: ${v.head.fgc};
  border-color: ${v.head.bdc};
}
.${cn}${qs} > * > * > td {
  border-color: ${v.head.bdc};
}
`).join("")}
`}</JsxStyle>;

export default Table;