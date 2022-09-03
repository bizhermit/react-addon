import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import { NextPage } from "next";
import { createRef } from "react";
import { colorIterator } from "../../../react-addon/dist/styles/css-var";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import Caption from "../../../react-addon/dist/elements/caption";

const LabelPage: NextPage = () => {
  const eref = createRef<HTMLSpanElement>();

  return (
    <>
      {/* <ExtraLabel bold wrap type="h1" color="warning"> */}
      <Row>
        <Label $nowrap ref={eref} style={{ width: 180 }} onClick={() => {
          console.log("click", eref.current);
        }} onMouseEnter={() => {
          console.log("hover", eref.current);
        }} onMouseLeave={() => {
          console.log("leave", eref.current);
        }}>hoge</Label>
        <Caption $border $label="unset" style={{ width: 180 }}><Label>unset</Label></Caption>
        <Caption $label="unset" style={{ width: 180 }}><Label>unset</Label></Caption>
        <Caption $label="unset" style={{ width: 180 }}><Label>unset</Label></Caption>
        <Caption $border $label="unset" style={{ width: 180 }}><Label>unset</Label></Caption>
      </Row>
      {/* </ExtraLabel> */}
      {colorIterator((s) => {
        return (
          <Row key={s}>
            <Label $color={s} style={{ width: 180 }}>{`label ${s}`}</Label>
            <Caption $color={s} $border $label={s} style={{ width: 180 }}><Label>{s}</Label></Caption>
            <Caption $fgColor={s} $label={s} style={{ width: 180 }}><Label>{s}</Label></Caption>
            <Caption $bgColor={s} $label={s} style={{ width: 180 }}><Label>{s}</Label></Caption>
            <Caption $bdColor={s} $border $label={s} style={{ width: 180 }}><Label>{s}</Label></Caption>
          </Row>
        );
      })}
      <Label $bold>Bold</Label>
      <Label $type="a">Link</Label>
      <Label $type="h1">H1</Label>
      <Label $type="h2">H2</Label>
      <Label $type="h3">H3</Label>
      <Label $type="h4">H4</Label>
      <Label $type="h5">H5</Label>
      <Label $type="h6">H6</Label>
      <Label style={{ maxWidth: 200 }} $nowrap>{ArrayUtils.generateArray(100, "x").join(" ")}</Label>
      <Label style={{ maxWidth: 200 }}>{ArrayUtils.generateArray(100, "x").join(" ")}</Label>
      </>
  );
};

export default LabelPage;