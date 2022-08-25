import { NextPage } from "next";
import { createRef, useState } from "react";
import { colorIterator } from "../../../react-addon/dist/styles/css-var";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import ToggleBox, { useToggleBox } from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";

const ToggleBoxPage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const [value, setValue] = useState(1);
  const [bind, setBind] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const hook = useToggleBox();

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
    <Caption $label="ToggleBox" $width={110}>
      <ToggleBox
        ref={ref}
        $hook={hook}
        $value={value}
        $dispatch={setValue}
        $name="value"
        $bind={bind}
        $disabled={disabled}
        $readOnly={readOnly}
        $placeholder="toggle box"
        $changed={(ctx => {
          console.log(ctx.before, "->", ctx.after);
        })}
        $checkedValue={1}
        $uncheckedValue={10}
      />
    </Caption>
    <Caption $label="Value" $width={110}>
      <Label>{String(value)}</Label>
    </Caption>
    <Row>
      {colorIterator(s => {
        return (
          <ToggleBox
            key={s}
            $color={s}
            $disabled={disabled}
            $readOnly={readOnly}
          />
        )
      })}
    </Row>
    </>
  );
};

export default ToggleBoxPage;