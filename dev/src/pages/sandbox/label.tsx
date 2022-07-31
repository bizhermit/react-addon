import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import { NextPage } from "next";
import { createRef } from "react";
import { signalIterator } from "../../../react-addon/dist/styles/css-var";
import Label from "../../../react-addon/dist/elements/label";

const LabelPage: NextPage = () => {
  const eref = createRef<HTMLSpanElement>();

  return (
    <>
      {/* <ExtraLabel bold wrap type="h1" signal="warning"> */}
      <Label $nowrap ref={eref} onClick={() => {
        console.log("click", eref.current);
      }} onMouseEnter={() => {
        console.log("hover", eref.current);
      }} onMouseLeave={() => {
        console.log("leave", eref.current);
      }}>hoge</Label>
      {/* </ExtraLabel> */}
      {signalIterator((s) => {
        return <Label key={s} $signal={s}>{`label ${s}`}</Label>;
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