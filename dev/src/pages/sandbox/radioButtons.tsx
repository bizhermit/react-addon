import { NextPage } from "next";
import { createRef, useState } from "react";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Row from "../../../react-addon/dist/elements/row";
import RadioButtons, { useRadioButtons } from "../../../react-addon/dist/elements/inputs/radio-buttons";
import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import Label from "../../../react-addon/dist/elements/label";
import { CssPV, colorIterator } from "../../../react-addon/dist/styles/css-var";
import Icon from "../../../react-addon/dist/elements/icon";

const RadioButtonsPage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const [value, setValue] = useState(4);
  const [bind, setBind] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [direction, setDirection] = useState<"row" | "column">("row");
  const [showRadioButton, setRadioButton] = useState(true);
  const hook = useRadioButtons();

  return (
    <>
    <Row $fill>
      <Caption $label="disabled">
        <ToggleBox $value={disabled} $dispatch={setDisabled} />
      </Caption>
      <Caption $label="readonly">
        <ToggleBox $value={readOnly} $dispatch={setReadOnly} />
      </Caption>
      <Caption $label="direction" $border>
        <RadioButtons
          $value={direction}
          $dispatch={setDirection}
          $source={[
            { value: "row", label: "Row" },
            { value: "column", label: "Column" },
          ]}
        />
      </Caption>
      <Caption $label="RadioButtons">
          <ToggleBox $value={showRadioButton} $dispatch={setRadioButton} />
      </Caption>
    </Row>
    <Row>
      <Caption $label="bind">
        <Button $click={() => setBind({})}>clear</Button>
        <Button $click={() => setBind({ value: 3 })} >set</Button>
        <Button $click={() => console.log(bind)}>show</Button>
      </Caption>
      <Caption $label="state">
        <Button $click={() => setValue(2)}>set</Button>
      </Caption>
      <Caption $label="hook">
        <Button $click={() => {
          hook.focus();
        }}>focus</Button>
        <Button $click={() => {
          console.log(hook.getValue());
        }}>get</Button>
        <Button $click={() => {
          hook.setValue(1);
        }}>set</Button>
      </Caption>
      <Button $click={() => console.log(ref.current)}>ref</Button>
    </Row>
    <Caption $label="RadioButtons" $width={130}>
      <RadioButtons
        ref={ref}
        $hook={hook}
        $value={value}
        $dispatch={setValue}
        $name="value"
        $bind={bind}
        $disabled={disabled}
        $readOnly={readOnly}
        $column={direction === "column"}
        $placeholder="radio box"
        $hideRadioButton={!showRadioButton}
        $source={ArrayUtils.generateArray(5, (idx) => {
          return {
            value: idx,
            label: `item ${idx} ${ArrayUtils.generateArray(idx, "x ").join("")}`,
          }
        })}
        $changed={ctx => {
          console.log(ctx);
        }}
        style={{
          width: direction === "column" ? undefined : 800,
        }}
      />
    </Caption>
    <Caption $label="Value" $width={100}>
      <Label>{value}</Label>
    </Caption>
    <Row>
      <RadioButtons
        $disabled={disabled}
        $readOnly={readOnly}
        $hideRadioButton={!showRadioButton}
        $column={direction === "column"}
        $source={colorIterator(s => {
          return {
            value: s,
            // label: (
            //   <>
            //   <Label>{s.toUpperCase()}</Label>
            //   <Icon $image="signin" />
            //   </>
            // ),
            label: s.toUpperCase(),
            color: s,
          }
        })}
      />
      {/* <Button $icon={{ $image: "signin", $round: true }} $round /> */}
    </Row>
    <Row>
      <RadioButtons
        $disabled={disabled}
        $hideRadioButton={!showRadioButton}
        $column={direction === "column"}
        $source={[{
          value: "signin",
          color: "primary",
          label: <><Label>Signin</Label><Icon $image="signin" /></>
        }, {
          value: "signout",
          label: <><Icon $image="signout" $color="danger" /><Label>Signout</Label></>
        }]}
      />
    </Row>
    </>
  );
};

export default RadioButtonsPage;