import { NextPage } from "next";
import { createRef, useState } from "react";
import Slider, { useSlider } from "../../../react-addon/dist/elements/inputs/slider";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Row from "../../../react-addon/dist/elements/row";
import Label from "../../../react-addon/dist/elements/label";
import { colorIterator } from "../../../react-addon/dist/styles/css-var";

const SliderPage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const [value, setValue] = useState(1);
  const [bind, setBind] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [resize, setResize] = useState(false);
  const hook = useSlider();

  return (
    <>
    <Row $fill>
      <Caption $label="disabled">
        <ToggleBox $value={disabled} $dispatch={setDisabled} />
      </Caption>
      <Caption $label="readonly">
        <ToggleBox $value={readOnly} $dispatch={setReadOnly} />
      </Caption>
      <Caption $label="resize">
        <ToggleBox $value={resize} $dispatch={setResize} />
      </Caption>
      <Caption $label="label">
        <ToggleBox $value={showLabel} $dispatch={setShowLabel} />
      </Caption>
    </Row>
    <Row>
      <Caption $label="bind">
        <Button $click={() => setBind({})}>clear</Button>
        <Button $click={() => setBind({ value: 10 })} >set</Button>
        <Button $click={() => console.log(bind)}>show</Button>
      </Caption>
      <Caption $label="state">
        <Button $click={() => setValue(20)}>set</Button>
      </Caption>
      <Caption $label="hook">
        <Button $click={() => {
          hook.focus();
        }}>focus</Button>
        <Button $click={() => {
          console.log(hook.getValue());
        }}>get</Button>
        <Button $click={() => {
          hook.setValue(30);
        }}>set</Button>
      </Caption>
      <Button $click={() => console.log(ref.current)}>ref</Button>
    </Row>
    <Caption $label="Slider" $width={110}>
      <Slider
        ref={ref}
        $hook={hook}
        $value={value}
        $dispatch={setValue}
        $name="value"
        $bind={bind}
        $disabled={disabled}
        $readOnly={readOnly}
        $placeholder="slider"
        $changed={(ctx => {
          console.log(ctx.before, "->", ctx.after);
        })}
        $keydownInterval={10}
        $resize={resize}
        $changing={(v) => {
          // console.log(v);
        }}
        $showKnobLabel={showLabel}
      />
    </Caption>
    <Caption $label="Value" $width={110}>
      <Label>{String(value)}</Label>
    </Caption>
    <Row>
      {colorIterator(s => {
        return <Slider key={s} $color={s} $defaultValue={50} $disabled={disabled} $readOnly={readOnly} $resize={resize} $showKnobLabel={showLabel} />
      })}
    </Row>
    </>
  );
};

export default SliderPage;