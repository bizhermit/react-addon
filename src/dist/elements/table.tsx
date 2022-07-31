import React, { HTMLAttributes, ReactNode } from "react";
import CssVar, { Signal, signalIterator } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import { attributes } from "../utils/attributes";

const cn = "bh-tbl";

type TableAttributes = HTMLAttributes<HTMLTableElement> & {
  children?: ReactNode;
  $border?: boolean;
  $oddEven?: boolean;
  $hover?: boolean;
  $signal?: Signal;
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
        data-signal={attrs.$signal}
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
  background: ${CssVar.lv.header.bgc};
  color: ${CssVar.lv.header.fc};
}
.${cn}[data-oddeven="true"] > tbody > tr:nth-child(odd) {
  background: ${CssVar.lv.cell.bg.b};
  color: ${CssVar.lv.cell.ft.b};
}
.${cn}[data-oddeven="true"] > tbody > tr:nth-child(even) {
  background: ${CssVar.lv.cell.bg.d};
  color: ${CssVar.lv.cell.ft.d};
}
.${cn}[data-hover="true"] > tbody > tr:hover {
  background: ${CssVar.lv.cell.hvr.row.bgc};
  color: ${CssVar.lv.cell.hvr.row.fc};
}
.${cn}[data-hover="true"] > tbody > tr > td:hover {
  background: ${CssVar.lv.cell.hvr.cell.bgc};
  color: ${CssVar.lv.cell.hvr.cell.fc};
}
${signalIterator((_s, v, qs) => `
.${cn}${qs} > * > * > th {
  background: ${v.head.bgc};
  color: ${v.head.fc};
  border-color: ${v.head.bdc};
}
.${cn}${qs} > * > * > td {
  border-color: ${v.head.bdc};
}
`).join("")}
`}</JsxStyle>;

export default Table;