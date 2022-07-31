import React, { FC } from "react";
import Row from "../../react-addon/dist/elements/row";
import { LayoutColorRadioButtons, LayoutColorSelectBox } from "../../react-addon/dist/components/layout-color";
import { LayoutDesignRadioButtons, LayoutDesignSelectBox } from "../../react-addon/dist/components/layout-design";
import { useLayout } from "../../react-addon/dist/styles/layout-provider";

const LayoutBox: FC = () => {
  const layout = useLayout();
  return (
    <Row $fill>
      <LayoutColorRadioButtons $unset style={{ marginRight: 0 }} $changed={(v) => {
        layout.setColor(v.after);
      }} />
      <LayoutColorSelectBox $unset $notInputText style={{ marginRight: 0, width: 100 }} $changed={(v) => {
        layout.setColor(v.after);
      }} />
      <LayoutDesignRadioButtons $unset style={{ marginRight: 0 }} $changed={(v) => {
        layout.setDesign(v.after);
      }} />
      <LayoutDesignSelectBox $unset $notInputText style={{ width: 150 }} $changed={(v) => {
        layout.setDesign(v.after);
      }} />
    </Row>
  );
};

export default LayoutBox;