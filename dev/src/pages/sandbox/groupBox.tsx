import { NextPage } from "next";
import GroupBox from "../../../react-addon/dist/elements/group-box";
import { colorIterator } from "../../../react-addon/dist/styles/css-var";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import { createRef, CSSProperties } from "react";
import Label from "../../../react-addon/dist/elements/label";
import Button from "../../../react-addon/dist/elements/button";

const GroupBoxPage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const style: CSSProperties = {
    height: 200,
    width: 500,
    marginBottom: 10,
  };

  return (
    <FlexBox $fto="f" $padding>
      <Button $click={() => {
        console.log(ref.current);
      }}></Button>
      <GroupBox $caption="GroupBox" $padding style={style} ref={ref}>
        <h1>Body</h1>
        <h1>Body</h1>
        <h1>Body</h1>
      </GroupBox>
      {colorIterator(s => {
        return (
          <GroupBox $caption={<Label>{s}</Label>} key={s} $color={s} style={style}>
            <h1>Body</h1>
            <h1>Body</h1>
            <h1>Body</h1>
          </GroupBox>
        )
      })}
    </FlexBox>
  );
};

export default GroupBoxPage;