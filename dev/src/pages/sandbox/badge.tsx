import { NextPage } from "next";
import Badge from "../../../react-addon/dist/elements/badge";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import { colorIterator } from "../../../react-addon/dist/styles/css-var";

const Page: NextPage = () => {
  return (
    <FlexBox $fto="fy" $scroll $padding>
      <Label>Positoin</Label>
      <FlexBox $fto="x" $row style={{ gap: 20 }}>
        <Badge $content="1" $position="left">
          <Button $icon="message" />
        </Badge>
        <Badge $content="1" $position="left-top">
          <Button $icon="message" />
        </Badge>
        <Badge $content="1" $position="left-bottom">
          <Button $icon="message" />
        </Badge>
        <Badge $content="1" $position="right">
          <Button $icon="message" />
        </Badge>
        <Badge $content="1" $position="right-top">
          <Button $icon="message" />
        </Badge>
        <Badge $content="1" $position="right-bottom">
          <Button $icon="message" />
        </Badge>
      </FlexBox>
      <Label>Size</Label>
      <FlexBox $fto="x" $row style={{ gap: 20 }}>
        <Badge $content="1" $size="xs">
          <Button $icon="message" />
        </Badge>
        <Badge $content="1" $size="s">
          <Button $icon="message" />
        </Badge>
        <Badge $content="1" $size="m">
          <Button $icon="message" />
        </Badge>
        <Badge $content="1" $size="l">
          <Button $icon="message" />
        </Badge>
        <Badge $content="1" $size="xl">
          <Button $icon="message" />
        </Badge>
      </FlexBox>
      <Label>Color</Label>
      <FlexBox $fto="x">
        {colorIterator(c => {
          return (
            <Caption $label={c} $width={100} $color={c}>
              <Row key={c} style={{ gap: 20 }}>
                <Badge $content="1" $color={c} $shape="circle">
                  <Button $icon="message" />
                </Badge>
                <Badge $content="1" $color={c} $fill $shape="circle">
                  <Button $icon="message" />
                </Badge>
                <Badge $content="1" $color={c} $shape="square">
                  <Button $icon="message" />
                </Badge>
                <Badge $content="1" $color={c} $fill $shape="square">
                  <Button $icon="message" />
                </Badge>
              </Row>
            </Caption>
          );
        })}
      </FlexBox>

    </FlexBox>
  );
};

export default Page;