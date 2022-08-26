import { NextPage } from "next";
import Badge from "../../../react-addon/dist/elements/badge";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Icon from "../../../react-addon/dist/elements/icon";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import { colorIterator } from "../../../react-addon/dist/styles/css-var";

const Page: NextPage = () => {
  return (
    <FlexBox $fto="fy" $scroll $padding>
      <Label>Positoin</Label>
      <FlexBox $fto="x" $row style={{ gap: 20 }}>
        <Badge $content="1" $position="left-top">
          <Button $icon="message" />
        </Badge>
        <Badge $content="1" $position="left-bottom">
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
          <Button $icon="message" $size="xs" />
        </Badge>
        <Badge $content="1" $size="s">
          <Button $icon="message" $size="s" />
        </Badge>
        <Badge $content="1" $size="m">
          <Button $icon="message" $size="m" />
        </Badge>
        <Badge $content="1" $size="l">
          <Button $icon="message" $size="l" />
        </Badge>
        <Badge $content="1" $size="xl">
          <Button $icon="message" $size="xl" />
        </Badge>
      </FlexBox>
      <FlexBox $fto="x" $row style={{ gap: 20 }}>
        <Badge $content={<Icon $image="c-check" $color="primary" />} $size="xs" $title="xs">
          <Button $icon="message" $size="xs" />
        </Badge>
        <Badge $content={<Icon $image="c-check" $color="primary" />} $size="s" $title="s">
          <Button $icon="message" $size="s" />
        </Badge>
        <Badge $content={<Icon $image="c-check" $color="primary" />} $size="m" $title="m">
          <Button $icon="message" $size="m" />
        </Badge>
        <Badge $content={<Icon $image="c-check" $color="primary" />} $size="l" $title="l">
          <Button $icon="message" $size="l" />
        </Badge>
        <Badge $content={<Icon $image="c-check" $color="primary" />} $size="xl" $title="xl">
          <Button $icon="message" $size="xl" />
        </Badge>
      </FlexBox>
      <Label>Color</Label>
      <FlexBox $fto="x">
        {colorIterator(c => {
          return (
            <Caption key={c} $label={c} $width={100} $color={c}>
              <Row key={c} style={{ gap: 20 }}>
                <Badge $content={<Icon $color="danger" $image="error" />} $color={c} $colorType="base" $shape="circle">
                  <Button $icon="message" />
                </Badge>
                <Badge $content="1" $color={c} $colorType="base" $shape="circle">
                  <Button $icon="message" />
                </Badge>
                <Badge $content="1" $color={c} $colorType="head" $shape="circle">
                  <Button $icon="message" />
                </Badge>
                <Badge $content="1" $color={c} $colorType="nav" $shape="circle">
                  <Button $icon="message" />
                </Badge>
                <Badge $content="1" $color={c} $colorType="base" $shape="square">
                  <Button $icon="message" />
                </Badge>
                <Badge $content="1" $color={c} $colorType="head" $shape="square">
                  <Button $icon="message" />
                </Badge>
                <Badge $content="1" $color={c} $colorType="nav" $shape="square">
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