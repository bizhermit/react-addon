import { NextPage } from "next";
import { createRef, useState } from "react";
import { Color, colorIterator } from "../../../react-addon/dist/styles/css-var";
import AccordionContainer, { useAccordionContainer } from "../../../react-addon/dist/elements/accordion-container";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Icon from "../../../react-addon/dist/elements/icon";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";

const AccordionContainerPage: NextPage = () => {
  const [disabled, setDisabled] = useState(false);
  const [headerless, setHeaderless] = useState(false);
  const [borderless, setBorderless] = useState(false);
  const [color, setColor] = useState<Color>();
  const acdCtrHook = useAccordionContainer();
  const [iconPosition, setIconPosition] = useState<"left" | "right" | "none">("left");
  const ref = createRef<HTMLDivElement>();

  return (
    <>
      <Row $fill>
        <Caption $label="disabled">
          <ToggleBox $value={disabled} $dispatch={setDisabled} />
        </Caption>
        <Caption $label="headerless">
          <ToggleBox $value={headerless} $dispatch={setHeaderless} />
        </Caption>
        <Caption $label="borderless">
          <ToggleBox $value={borderless} $dispatch={setBorderless} />
        </Caption>
        <Caption $label="iconPosition">
          <RadioButtons
            $value={iconPosition}
            $dispatch={setIconPosition}
            $source={[
              { value: "left", label: "Left" },
              { value: "right", label: "Right" },
              { value: "none", label: "None" },
            ]}
          />
        </Caption>
      </Row>
      <Row $fill>
        <Button $click={() => {
          acdCtrHook.open();
        }}>open</Button>
        <Button $click={() => {
          acdCtrHook.close();
        }}>close</Button>
        <Button $click={() => {
          acdCtrHook.toggle();
        }}>toggle</Button>
        <Button $click={() => {
          console.log(ref.current);
        }}>ref</Button>
      </Row>
      <Row>
        <RadioButtons
          $source={[{
            value: null,
            label: `unset`,
          }, ...(colorIterator(s => {
            return {
              value: s,
              label: s,
              color: s,
            }
          }))]}
          $value={color}
          $dispatch={setColor}
        />
      </Row>
      <FlexBox $fto="fy" $padding>
        <AccordionContainer
          ref={ref}
          $hook={acdCtrHook}
          $fto="x"
          $color={color}
          $disabled={disabled}
          // $header="AccordionContainer"
          $header={
            <Row $center style={{ flex: 1 }}>
              <Icon $image="heart" />
              <Label>AccordionContainer</Label>
              <Icon $image="heart" />
            </Row>
          }
          $headerless={headerless}
          // $height={200}
          // $height={500}
          $borderless={borderless}
          $openedIconImage="c-minus"
          $closedIconImage="c-add"
          $toggled={(opened) => {
            console.log(`toggle: `, opened);
            console.log(ref.current);
          }}
          $iconPosition={iconPosition}
          // $defaultClose
          // $animationDuration={500}
        >
          <FlexBox>
            <Label $type="h2">Body</Label>
            <Label $type="h2">Body</Label>
            <Label $type="h2">Body</Label>
            <Label $type="h2">Body</Label>
            <Label $type="h2">Body</Label>
            <Label $type="h2">Body</Label>
          </FlexBox>
        </AccordionContainer>
      </FlexBox>
    </>
  );
};

export default AccordionContainerPage;