import React, { FC } from "react";
import Row from "../../react-addon/dist/elements/row";
import { LayoutColorRadioButtons, LayoutColorSelectBox } from "../../react-addon/dist/components/layout-color";
import { LayoutDesignRadioButtons, LayoutDesignSelectBox } from "../../react-addon/dist/components/layout-design";
import { useLayout } from "../../react-addon/dist/styles/layout-provider";
import useElectron from "../hooks/electron";
import Label from "../../react-addon/dist/elements/label";

const LayoutBox: FC = () => {
  const layout = useLayout();
  const electron = useElectron();
  return (
    <Row $fill $middle>
      <LayoutColorRadioButtons $unset style={{ marginRight: 0 }} $changed={(v) => {
        layout.setColor(v.after);
        electron?.setLayoutColor(v.after);
      }} />
      {/* <LayoutColorSelectBox $unset $notInputText style={{ marginRight: 0, width: 100 }} $changed={(v) => {
        layout.setColor(v.after);
        electron?.setLayoutColor(v.after);
      }} /> */}
      <Label>/</Label>
      <LayoutDesignRadioButtons $unset style={{ marginRight: 0 }} $changed={(v) => {
        layout.setDesign(v.after);
        electron?.setLayoutDesign(v.after);
      }} />
      {/* <LayoutDesignSelectBox $unset $notInputText style={{ width: 150 }} $changed={(v) => {
        layout.setDesign(v.after);
        electron?.setLayoutDesign(v.after);
      }} /> */}
    </Row>
  );
};

export default LayoutBox;