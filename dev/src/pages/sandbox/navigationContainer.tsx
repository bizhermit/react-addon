import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import { NextPage } from "next";
import { createRef, useState } from "react";
import { CssPV, Color, colorIterator } from "../../../react-addon/dist/styles/css-var";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Icon from "../../../react-addon/dist/elements/icon";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import NavigationContainer, { Navigation, useNavigationContainer } from "../../../react-addon/dist/elements/navigation-container";
import Row from "../../../react-addon/dist/elements/row";

const NavigationContainerPage: NextPage = () => {
  const [position, setPosition] = useState<"left" | "top" | "right" | "bottom">();
  const [mode, setMode] = useState<"visible" | "edge" | "manual">("visible");
  const [color, setColor] = useState<Color>();
  const [preventClickClose, setPreventClickClose] = useState(false);
  const [opened, setOpen] = useState(false);
  const navHook = useNavigationContainer();
  const ref = createRef<HTMLDivElement>();

  return (
    <>
      <Row>
        <Caption $label="NavPosition">
          <RadioButtons
            $value={position}
            $dispatch={setPosition}
            $source={[
              { value: null, label: "unset" },
              { value: "left", label: "Left" },
              { value: "top", label: "Top" },
              { value: "right", label: "Right" },
              { value: "bottom", label: "Bottom" },
            ]}
          />
        </Caption>
        <Caption $label="Mode">
          <RadioButtons
            $value={mode}
            $dispatch={setMode}
            $source={[
              { value: null, label: "unset" },
              { value: "visible", label: "Visible" },
              { value: "edge", label: "Edge" },
              { value: "manual", label: "Manual" },
            ]}
          />
        </Caption>
        {mode === "manual" ?
          <Button $icon={opened ? "cross" : "hamburger"} $click={() => {
            setTimeout(() => {
              navHook.toggleNavigation();
            }, 0);
          }}></Button> : <></>
        }
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
        <Caption $label="preventClickClose">
          <ToggleBox $value={preventClickClose} $dispatch={setPreventClickClose} />
        </Caption>
      </Row>
      <FlexBox $fto="fy">
        <NavigationContainer $fto="f" $hook={navHook} ref={ref}>
          <Navigation
            $position={position}
            $mode={mode}
            $color={color}
            $edgeSize={40}
            $toggled={(opened) => {
              console.log("toggled", opened);
              setOpen(opened);
            }}
            // $animationDuration={100}
            $preventClickClose={preventClickClose}
          >
            <Label>Navigation</Label>
            <Icon $image="cloud" />
            <FlexBox $center>
              <Icon $image="heart" />
              <Label>Heart</Label>
            </FlexBox>
            <Button $transparent $borderless>Button</Button>
            <Button $transparent>Button</Button>
            <Button>Button</Button>
            {ArrayUtils.generateArray(2, idx => {
              // return <Button key={idx} $transparent $click={() => console.log(idx)} style={{ width: 150 }}>Button {idx}</Button>
              return (
                <FlexBox key={idx} $center $middle $border>
                  <Icon $image="heart" />
                  <Label>Heart</Label>
                </FlexBox>
              );
              // return <Icon key={idx} $image="cloud" />;
            })}
          </Navigation>
          <Row>
            <Button $click={() => {
              console.log(ref.current);
            }}>hoge</Button>
          </Row>
          <FlexBox $fto="fy" $scroll>
            <div>
              {ArrayUtils.generateArray(100, idx => {
                return <h1 key={idx}>Body {idx}</h1>
              })}
            </div>
          </FlexBox>
        </NavigationContainer>
      </FlexBox>
    </>
  );
};

export default NavigationContainerPage;