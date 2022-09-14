import { NextPage } from "next";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Label from "../../../react-addon/dist/elements/label";
import ProgressBar from "../../../react-addon/dist/elements/progress-bar";
import { colorIterator } from "../../../react-addon/dist/styles/css-var";

const ProgressPage: NextPage = () => {
  return (
    <>
    <Label>flow</Label>
    <ProgressBar $overlay />
    <Label>inc</Label>
    <ProgressBar $mode="increment" />
    <Label>pinc</Label>
    <ProgressBar $mode="phasedIncrement" />
    {colorIterator(c => {
      return (
        <FlexBox key={c} $fto="x">
          <Label style={{ marginTop: 5 }}>{c}</Label>
          <ProgressBar $color={c} />
          <ProgressBar $color={c} $colorType="head" />
          <ProgressBar $color={c} $colorType="nav" />
        </FlexBox>
      );
    })}
    </>
  );
};

export default ProgressPage;