import { NextPage } from "next";
import { useState } from "react";
import Badge from "../../../react-addon/dist/elements/badge";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Icon from "../../../react-addon/dist/elements/icon";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import { colorIterator } from "../../../react-addon/dist/styles/css-var";

const Page: NextPage = () => {
  const [count, setCount] = useState(1000);
  const [visible, setVisible] = useState(true);
  const [borderless, setBorderless] = useState(false);

  return (
    <FlexBox $fto="fy" $scroll $padding>
      <Row $fill>
        <Button $click={() => setCount(c => c+1)}>count up</Button>
        <Button $click={() => setCount(0)}>rest</Button>
        <Caption $label="Visible">
          <ToggleBox $value={visible} $dispatch={setVisible} />
        </Caption>
        <Caption $label="Borderless">
          <ToggleBox $value={borderless} $dispatch={setBorderless} />
        </Caption>
      </Row>
      <Row>
        <Badge
          $content="New!"
          $borderless={borderless}
          $color="warning"
          style={{ marginRight: 30 }}
        >
          <Button $icon="message">Contents</Button>
        </Badge>
        <Badge
          $content={count}
          $borderless={borderless}
          $color="warning"
          $position="left-top"
          $fixedSize
          style={{ marginLeft: 30 }}
        >
          <Button $icon="message">Contents</Button>
        </Badge>
      </Row>
      <Label>Positoin</Label>
      <FlexBox $fto="x" $row style={{ gap: 20 }}>
        <Badge $content={count} $position="left-top" $borderless={borderless}>
          <Button $icon="message" />
        </Badge>
        <Badge $content={count} $position="left-bottom" $borderless={borderless}>
          <Button $icon="message" />
        </Badge>
        <Badge $content={count} $position="right-top" $borderless={borderless}>
          <Button $icon="message" />
        </Badge>
        <Badge $content={count} $position="right-bottom" $borderless={borderless}>
          <Button $icon="message" />
        </Badge>
      </FlexBox>
      <Label>Size</Label>
      <FlexBox $fto="x" $row style={{ gap: 20 }}>
        <Badge $content={count} $size="xs" $borderless={borderless}>
          <Button $icon="message" $size="xs" />
        </Badge>
        <Badge $content={count} $size="s" $borderless={borderless}>
          <Button $icon="message" $size="s" />
        </Badge>
        <Badge $content={count} $size="m" $borderless={borderless}>
          <Button $icon="message" $size="m" />
        </Badge>
        <Badge $content={count} $size="l" $borderless={borderless}>
          <Button $icon="message" $size="l" />
        </Badge>
        <Badge $content={count} $size="xl" $borderless={borderless}>
          <Button $icon="message" $size="xl" />
        </Badge>
      </FlexBox>
      <FlexBox $fto="x" $row style={{ gap: 20 }}>
        <Badge $content={<Icon $image="c-check" $color="primary" />} $shape="none" $size="xs" $title="xs" $borderless={borderless}>
          <Button $icon="message" $size="xs" />
        </Badge>
        <Badge $content={<Icon $image="c-check" $color="primary" />} $shape="none" $size="s" $title="s" $borderless={borderless}>
          <Button $icon="message" $size="s" />
        </Badge>
        <Badge $content={<Icon $image="c-check" $color="primary" />} $shape="none" $size="m" $title="m" $borderless={borderless}>
          <Button $icon="message" $size="m" />
        </Badge>
        <Badge $content={<Icon $image="c-check" $color="primary" />} $shape="none" $size="l" $title="l" $borderless={borderless}>
          <Button $icon="message" $size="l" />
        </Badge>
        <Badge $content={<Icon $image="c-check" $color="primary" />} $shape="none" $size="xl" $title="xl" $borderless={borderless}>
          <Button $icon="message" $size="xl" />
        </Badge>
      </FlexBox>
      <Label>Color</Label>
      <FlexBox $fto="x">
        {colorIterator(c => {
          return (
            <Caption key={c} $label={c} $width={100} $color={c}>
              <Row key={c} style={{ gap: 20 }}>
                <Badge $visible={visible} $content={<Icon $image="crown" />} $color={c} $colorType="base" $shape="none" $borderless={borderless}>
                  <Button $icon="message" />
                </Badge>
                <Badge $visible={visible} $content={count} $color={c} $colorType="base" $shape="circle" $borderless={borderless}>
                  <Button $icon="message" $round />
                </Badge>
                <Badge $visible={visible} $content={count} $color={c} $colorType="base" $shape="circle" $borderless={borderless}>
                  <Button $icon="message" />
                </Badge>
                <Badge $visible={visible} $content={count} $color={c} $colorType="head" $shape="circle" $borderless={borderless}>
                  <Button $icon="message" />
                </Badge>
                <Badge $visible={visible} $content={count} $color={c} $colorType="nav" $shape="circle" $borderless={borderless}>
                  <Button $icon="message" />
                </Badge>
                <Badge $visible={visible} $content={count} $color={c} $colorType="base" $shape="square" $borderless={borderless}>
                  <Button $icon="message" />
                </Badge>
                <Badge $visible={visible} $content={count} $color={c} $colorType="head" $shape="square" $borderless={borderless}>
                  <Button $icon="message" />
                </Badge>
                <Badge $visible={visible} $content={count} $color={c} $colorType="nav" $shape="square" $borderless={borderless}>
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