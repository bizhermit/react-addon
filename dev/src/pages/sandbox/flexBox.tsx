import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import { NextPage } from "next";
import { createRef, CSSProperties } from "react";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import { signalIterator } from "../../../react-addon/dist/styles/css-var";

const FlexBoxPage: NextPage = () => {
  const commonStyle: CSSProperties = {
    height: 200,
    width: 200,
  };
  const eref = createRef<HTMLDivElement>();

  return (
    <FlexBox $fto="f" $row>
      <FlexBox ref={eref} onClick={() => console.log(eref.current)}>
        <Label $type="h2">Column</Label>
        <Label $type="h3">Top/Left</Label>
        <FlexBox style={commonStyle} $border>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Top/Center</Label>
        <FlexBox style={commonStyle} $border $center>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Top/Right</Label>
        <FlexBox style={commonStyle} $border $right>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Middle/Left</Label>
        <FlexBox style={commonStyle} $border $middle>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Middle/Center</Label>
        <FlexBox style={commonStyle} $border $middle $center>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Middle/Right</Label>
        <FlexBox style={commonStyle} $border $middle $right>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Bottom/Left</Label>
        <FlexBox style={commonStyle} $border $bottom>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Bottom/Center</Label>
        <FlexBox style={commonStyle} $border $bottom $center>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Bottom/Right</Label>
        <FlexBox style={commonStyle} $border $bottom $right>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
      </FlexBox>
      <FlexBox style={{ marginLeft: 5 }}>
        <Label $type="h2">Row</Label>
        <Label $type="h3">Top/Left</Label>
        <FlexBox style={commonStyle} $border $row>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Top/Center</Label>
        <FlexBox style={commonStyle} $border $row $center>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Top/Right</Label>
        <FlexBox style={commonStyle} $border $row $right>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Middle/Left</Label>
        <FlexBox style={commonStyle} $border $row $middle>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Middle/Center</Label>
        <FlexBox style={commonStyle} $border $row $middle $center>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Middle/Right</Label>
        <FlexBox style={commonStyle} $border $row $middle $right>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Bottom/Left</Label>
        <FlexBox style={commonStyle} $border $row $bottom>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Bottom/Center</Label>
        <FlexBox style={commonStyle} $border $row $bottom $center>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
        <Label $type="h3">Bottom/Right</Label>
        <FlexBox style={commonStyle} $border $row $bottom $right>
          <Label>body1</Label>
          <Label>body1</Label>
        </FlexBox>
      </FlexBox>
      <FlexBox style={{ marginLeft: 5 }}>
        <Label $type="h2">Others</Label>
        <Label $type="h3">Shadow</Label>
        <FlexBox style={commonStyle} $radius $shadow></FlexBox>
        <Label $type="h3">Radius</Label>
        <FlexBox style={commonStyle} $radius $border></FlexBox>
        <Label $type="h3">Padding</Label>
        <FlexBox style={commonStyle} $border $padding $wrap $scroll>
          {ArrayUtils.generateArray(100, "X ").join("")}
        </FlexBox>
      </FlexBox>
      <FlexBox style={{ marginLeft: 5 }}>
        <Label $type="h2">Signal-Color</Label>
        {signalIterator(s => {
          return (
            <FlexBox key={s}>
              <Label $type="h3">{s}</Label>
              <Row>
                <FlexBox style={{...commonStyle, marginLeft: 5 }} $signal={s} $padding>{s}</FlexBox>
                <FlexBox style={{...commonStyle, marginLeft: 5 }} $color={s}>{s}</FlexBox>
                <FlexBox style={{...commonStyle, marginLeft: 5 }} $border={s}>{s}</FlexBox>
              </Row>
            </FlexBox>
          );
        })}
      </FlexBox>
    </FlexBox>
  );
};

export default FlexBoxPage;