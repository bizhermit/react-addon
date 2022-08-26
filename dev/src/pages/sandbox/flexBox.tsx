import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import { NextPage } from "next";
import { createRef, CSSProperties, useState } from "react";
import Button from "../../../react-addon/dist/elements/button";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import { colorIterator } from "../../../react-addon/dist/styles/css-var";

const FlexBoxPage: NextPage = () => {
  const commonStyle: CSSProperties = {
    height: 150,
    width: 150,
    margin: 5,
    // borderRadius: 25,
  };
  const eref = createRef<HTMLDivElement>();

  return (
    <FlexBox $fto="f" $row $padding>
      <FlexBox ref={eref} onClick={() => console.log(eref.current)}>
        <Label $type="h2">Column</Label>
        <Label $type="h3">Top/Left</Label>
        <FlexBox style={commonStyle} $border>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Top/Center</Label>
        <FlexBox style={commonStyle} $border $center>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Top/Right</Label>
        <FlexBox style={commonStyle} $border $right>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Middle/Left</Label>
        <FlexBox style={commonStyle} $border $middle>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Middle/Center</Label>
        <FlexBox style={commonStyle} $border $middle $center>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Middle/Right</Label>
        <FlexBox style={commonStyle} $border $middle $right>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Bottom/Left</Label>
        <FlexBox style={commonStyle} $border $bottom>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Bottom/Center</Label>
        <FlexBox style={commonStyle} $border $bottom $center>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Bottom/Right</Label>
        <FlexBox style={commonStyle} $border $bottom $right>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
      </FlexBox>
      <FlexBox style={{ marginLeft: 5 }}>
        <Label $type="h2">Row</Label>
        <Label $type="h3">Top/Left</Label>
        <FlexBox style={commonStyle} $border $row>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Top/Center</Label>
        <FlexBox style={commonStyle} $border $row $center>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Top/Right</Label>
        <FlexBox style={commonStyle} $border $row $right>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Middle/Left</Label>
        <FlexBox style={commonStyle} $border $row $middle>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Middle/Center</Label>
        <FlexBox style={commonStyle} $border $row $middle $center>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Middle/Right</Label>
        <FlexBox style={commonStyle} $border $row $middle $right>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Bottom/Left</Label>
        <FlexBox style={commonStyle} $border $row $bottom>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Bottom/Center</Label>
        <FlexBox style={commonStyle} $border $row $bottom $center>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
        <Label $type="h3">Bottom/Right</Label>
        <FlexBox style={commonStyle} $border $row $bottom $right>
          <Label>body</Label>
          <Label>body</Label>
        </FlexBox>
      </FlexBox>
      <FlexBox style={{ marginLeft: 5 }}>
        <Label $type="h2">Others</Label>
        <Label $type="h3">Shadow</Label>
        <Button />
        <FlexBox style={commonStyle} $radius $shadow></FlexBox>
        {ArrayUtils.generateArray(11, idx => {
          return (
            <FlexBox
              key={idx}
              style={{...commonStyle, marginTop: idx * 5}}
              $center
              $middle
              $padding
              $radius
              $shadow={idx}
              $hover
            >shadow {idx}</FlexBox>
          );
        })}
      </FlexBox>
      <FlexBox style={{ marginLeft: 5 }}>
        <Label $type="h2">Others</Label>
        <Label $type="h3">NegativeShadow</Label>
        <Button />
        <FlexBox style={commonStyle} $radius $shadow></FlexBox>
        {ArrayUtils.generateArray(11, idx => {
          return (
            <FlexBox
              key={-idx}
              style={{...commonStyle, marginTop: idx * 5}}
              $center
              $middle
              $padding
              $radius
              $shadow={-idx}
              $hover
            >shadow {-idx}</FlexBox>
          );
        })}
      </FlexBox>
      <FlexBox style={{ marginLeft: 5 }}>
        <Label $type="h2">Others</Label>
        <Label $type="h3">Radius</Label>
        <FlexBox style={commonStyle} $radius $border></FlexBox>
        <Label $type="h3">Padding</Label>
        <FlexBox style={commonStyle} $border $padding $wrap $scroll>
          {ArrayUtils.generateArray(100, "X ").join("")}
        </FlexBox>
      </FlexBox>
      <FlexBox style={{ marginLeft: 5 }}>
        <Label $type="h2">Color</Label>
        {colorIterator(s => {
          return (
            <FlexBox key={s}>
              <Label $type="h3">{s}</Label>
              <Row>
                <FlexBox style={{...commonStyle, marginLeft: 5 }} $color={s}>{s}</FlexBox>
                <FlexBox style={{...commonStyle, marginLeft: 5 }} $color={s} $colorType="head">{s} head</FlexBox>
                <FlexBox style={{...commonStyle, marginLeft: 5 }} $color={s} $colorType="nav">{s} nav</FlexBox>
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