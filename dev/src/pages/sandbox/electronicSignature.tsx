import { NextPage } from "next";
import { createRef, useState } from "react";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Row from "../../../react-addon/dist/elements/row";
import ElectronicSignature, { useElectronicSignature } from "../../../react-addon/dist/elements/inputs/electronic-signature";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import { InputBorder } from "../../../react-addon/dist/styles/input-style";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import NumericBox from "../../../react-addon/dist/elements/inputs/numeric-box";

const ElectronicSignaturePage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const [value, setValue] = useState<string>();
  const [bind, setBind] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [border, setBorder] = useState<InputBorder>();
  const [lineWidth, setLineWidth] = useState(2);
  const [lineColor, setLineColor] = useState<string>("black");
  const hook = useElectronicSignature();
  
  return (
    <>
    <Row $fill>
      <Caption $label="disabled">
        <ToggleBox $value={disabled} $dispatch={setDisabled} />
      </Caption>
      <Caption $label="readonly">
        <ToggleBox $value={readOnly} $dispatch={setReadOnly} />
      </Caption>
      <Caption $label="Border">
        <RadioButtons
          $value={border}
          $dispatch={setBorder}
          $source={[
            { value: null, label: "unset" },
            { value: "less", label: "Less" },
            { value: "under", label: "Under" },
            { value: "round", label: "Round" },
          ]}
        />
      </Caption>
    </Row>
    <Row>
      <Caption $label="lineWidth">
        <NumericBox
          $value={lineWidth}
          $dispatch={setLineWidth}
          $min={0}
          $max={100}
          $float={0}
          style={{ width: 80 }}
        />
      </Caption>
      <Caption $label="lineColor">
        <RadioButtons
          $value={lineColor}
          $dispatch={setLineColor}
          $source={[
            { value: "black", label: "black" },
            { value: "red", label: "red" },
            { value: "blue", label: "blue" },
          ]}
        />
      </Caption>
    </Row>
    <Row>
      <Caption $label="bind">
        <Button $click={() => setBind({})}>clear</Button>
        <Button $click={() => console.log(bind)}>show</Button>
      </Caption>
      <Caption $label="state">
        <Button $click={() => {
          console.log(value);
        }}>get</Button>
      </Caption>
      <Caption $label="hook">
        <Button $click={() => {
          hook.focus();
        }}>focus</Button>
        <Button $click={() => {
          console.log(hook.getValue());
        }}>get</Button>
      </Caption>
      <Button $click={() => console.log(ref.current)}>ref</Button>
    </Row>
    <FlexBox $padding>
      <ElectronicSignature
        $hook={hook}
        $name="value"
        $bind={bind}
        $value={value}
        $dispatch={setValue}
        $disabled={disabled}
        $readOnly={readOnly}
        $border={border}
        $lineWidth={lineWidth}
        $lineColor={lineColor}
      />
    </FlexBox>
    <Row>
      <Button $click={() => {
        hook.clear();
      }}>clear</Button>
      <Button $click={() => {
        hook.save();
      }}>save</Button>
    </Row>
    <FlexBox $fto="fy" $padding style={{ overflowWrap: "anywhere" }}>
      {value}
    </FlexBox>
    </>
  )
};

export default ElectronicSignaturePage;