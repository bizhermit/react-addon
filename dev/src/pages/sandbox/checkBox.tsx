import { NextPage } from "next";
import { createRef, useState } from "react";
import CheckBox, { useCheckBox } from "../../../react-addon/dist/elements/inputs/check-box";
import { signalIterator } from "../../../react-addon/dist/styles/css-var";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";

const CheckBoxPage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const [value, setValue] = useState(1);
  const [bind, setBind] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const hook = useCheckBox();

  return (
    <>
    <Row $fill>
      <Caption $label="disabled">
        <ToggleBox $value={disabled} $dispatch={setDisabled} />
      </Caption>
      <Caption $label="readonly">
        <ToggleBox $value={readOnly} $dispatch={setReadOnly} />
      </Caption>
    </Row>
    <Row>
      <Caption $label="bind">
        <Button $click={() => setBind({})}>clear</Button>
        <Button $click={() => setBind({ value: 1 })} >set</Button>
        <Button $click={() => console.log(bind)}>show</Button>
      </Caption>
      <Caption $label="state">
        <Button $click={() => setValue(1)}>set</Button>
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
    <Caption $label="CheckBox" $width={110}>
      <CheckBox
        ref={ref}
        $hook={hook}
        $value={value}
        $dispatch={setValue}
        $name="value"
        $bind={bind}
        $disabled={disabled}
        $readOnly={readOnly}
        $placeholder="check box"
        $changed={(ctx => {
          console.log(ctx.before, "->", ctx.after);
        })}
        $checkedValue={1}
        $uncheckedValue={0}
      >
        <Label>CheckBox</Label>
      </CheckBox>
      <CheckBox
        $disabled={disabled}
        $readOnly={readOnly}
        $placeholder="check box"
        $fill
      />
    </Caption>
    <Caption $label="Value" $width={110}>
      <Label>{String(value)}</Label>
    </Caption>
    <Row>
      {signalIterator(s => {
        return (
          <CheckBox key={s} $signal={s} $disabled={disabled} $readOnly={readOnly}>
            <Label>{s.toUpperCase()}</Label>
          </CheckBox>
        );
      })}
    </Row>
    <Row>
      {signalIterator(s => {
        return (
          <CheckBox key={s} $signal={s} $disabled={disabled} $readOnly={readOnly} $fill>
            <Label>{s.toUpperCase()}</Label>
          </CheckBox>
        );
      })}
    </Row>
    </>
  );
};

export default CheckBoxPage;