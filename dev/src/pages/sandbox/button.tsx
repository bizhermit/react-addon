import { NextPage } from "next";
import { createRef, useState } from "react";
import Caption from "../../../react-addon/dist/elements/caption";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Button from "../../../react-addon/dist/elements/button";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import Row from "../../../react-addon/dist/elements/row";
import ToggleButton from "../../../react-addon/dist/elements/toggle-button";
import { signalIterator } from "../../../react-addon/dist/styles/css-var";

const ButtonPage: NextPage = () => {
  const [disabled, setDisabled] = useState(false);
  const ref = createRef<HTMLButtonElement>();
  const eref = createRef<HTMLButtonElement>();

  return (
    <FlexBox $fto="f"
      $scroll
      // style={{ background: "gray" }}
    >
      <button>button</button>
      <Row>
        <Caption $label="disabled">
          <ToggleBox $value={disabled} $dispatch={setDisabled} />
        </Caption>
      </Row>
      <Row>
        <Button disabled={disabled} $click={() => {
          console.log("click");
        }}>sync func</Button>
        <Button ref={eref} disabled={disabled} $click={async (unlock) => {
          console.log("click 1");
          setTimeout(() => {
            console.log("click 2");
            unlock();
          }, 2000);
        }}>async func</Button>
        <Button ref={ref} $click={async (unlock) => {
          console.log(eref.current);
          console.log(ref.current);
          setTimeout(() => {
            unlock();
          }, 1000);
        }}>active</Button>
        <ToggleButton>{[{
          key: "1",
          children: "Button-1",
          $click: () => console.log("click button 1"),
          $icon: {
            $image: "cloud",
          },
        }, {
          key: "2",
          children: "Button-2",
          $click: () => console.log("click button 2"),
          $icon: {
            $image: "cloud-upload",
          }
        }, {
          key: "3",
          children: "Button-3",
          $click: () => {
            console.log("click button 3");
            return "5";
          },
          $icon: {
            $image: "cloud-download",
          }
        }, {
          key: "4",
          children: "Button-4",
          $click: () => {
            console.log("click button 4");
            return "6";
          },
        }, {
          key: "5",
          children: "Button-5",
          $click: () => {
            console.log("click button 5");
            return "4";
          },
          $icon: {
            $image: "cloud-check",
          },
        }, {
          key: "6",
          children: "Button-6",
          $click: () => console.log("click button 6"),
        }]}</ToggleButton>
      </Row>
      <Caption $label="Label" $width={120}>
        <Button disabled={disabled}>Button</Button>
        <Button disabled={disabled} $round>Button</Button>
      </Caption>
      <Caption $label="Icon" $width={120}>
        <Button disabled={disabled} $icon={{ $image: "signin" }} ></Button>
        <Button disabled={disabled} $icon={{ $image: "signin" }} $round></Button>
      </Caption>
      <Caption $label="Label + Icon" $width={120}>
        <Button disabled={disabled} $icon="favicon">Button</Button>
        <Button disabled={disabled} $icon="favicon" $round>Button</Button>
        <Button disabled={disabled} $icon="favicon" $iconRight>Button</Button>
        <Button disabled={disabled} $icon="favicon" $iconRight $round>Button</Button>
      </Caption>
      <FlexBox
        // style={{ backgroundColor: "white" }}
      >
        <Row>
          <Button $icon="cloud-download" disabled={disabled} style={{ width: 130 }}>button</Button>
          <Button $icon="cloud-download" disabled={disabled} style={{ width: 130 }}>button</Button>
          <Button $icon="cloud-download" $fillLabel disabled={disabled} style={{ width: 130 }}>button</Button>
          <Button $icon="cloud-download" $fillLabel $borderless disabled={disabled} style={{ width: 130 }}>button</Button>
          <Button $icon="cloud-download" disabled={disabled} $transparent $iconRight style={{ width: 130 }}>button</Button>
          <Button $icon="cloud-download" disabled={disabled} $transparent $iconRight $fillLabel style={{ width: 130 }}>button</Button>
          <Button $icon="cloud-download" disabled={disabled} $transparent $iconRight $fillLabel $borderless style={{ width: 130 }}>button</Button>
        </Row>
        {signalIterator(s => {
          return (
            <Row key={s}>
              <Button $signal={s} $icon="cloud-download" disabled={disabled} style={{ width: 130 }}>{s}</Button>
              <Button $signal={s} $icon="cloud-download" disabled={disabled} style={{ width: 130 }}>{s}</Button>
              <Button $signal={s} $icon="cloud-download" $fillLabel disabled={disabled} style={{ width: 130 }}>{s}</Button>
              <Button $signal={s} $icon="cloud-download" $fillLabel $borderless disabled={disabled} style={{ width: 130 }}>{s}</Button>
              <Button $signal={s} $icon="cloud-download" disabled={disabled} $transparent $iconRight style={{ width: 130 }}>{s}</Button>
              <Button $signal={s} $icon="cloud-download" disabled={disabled} $transparent $iconRight $fillLabel style={{ width: 130 }}>{s}</Button>
              <Button $signal={s} $icon="cloud-download" disabled={disabled} $transparent $iconRight $fillLabel $borderless style={{ width: 130 }}>{s}</Button>
            </Row>
          );
        })}
      </FlexBox>
    </FlexBox>
  )
};

export default ButtonPage;