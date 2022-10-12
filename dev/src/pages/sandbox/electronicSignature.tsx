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
import Label from "../../../react-addon/dist/elements/label";

const ElectronicSignaturePage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const [value, setValue] = useState<string>();
  const [bind, setBind] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [border, setBorder] = useState<InputBorder>();
  const [lineWidth, setLineWidth] = useState(2);
  const [lineColor, setLineColor] = useState<string>("black");
  const [undoable, setUndoable] = useState(false);
  const [redoable, setRedoable] = useState(false);
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
        $height={150}
        $width={600}
        $changing={(ctx) => {
          // console.log(ctx);
          setUndoable(hook.canUndo());
          setRedoable(hook.canRedo());
        }}
      />
      <Row>
        <Button $icon="delete" $click={() => {
          hook.clearHistory();
          setUndoable(hook.canUndo());
          setRedoable(hook.canRedo());
        }}>clear history</Button>
        <Button $icon="save" $click={() => {
          hook.save();
        }}>save</Button>
        <Button $icon="cross" $click={() => {
          hook.clear();
        }}>clear</Button>
        <Button $icon="pull-left" disabled={!undoable} $click={(() => {
          hook.undo();
        })}>undo</Button>
        <Button $icon="pull-right" disabled={!redoable} $iconRight $click={() => {
          hook.redo();
        }}>redo</Button>
      </Row>
    </FlexBox>
    <FlexBox $fto="fy" $padding style={{ overflowWrap: "anywhere" }}>
      {value}
    </FlexBox>
    </>
  )
};

export default ElectronicSignaturePage;