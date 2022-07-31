import { NextPage } from "next";
import { createRef, useState } from "react";
import TimePicker, { useTimePicker } from "../../../react-addon/dist/elements/inputs/time-picker";
import { signalIterator } from "../../../react-addon/dist/styles/css-var";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import { InputBorder } from "../../../react-addon/dist/styles/input-style";

const TimePickerPage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const [value, setValue] = useState("6:05");
  const [bind, setBind] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [mode, setMode] = useState<"hms" | "hm" | "h" | "ms">("hm");
  const [border, setBorder] = useState<"less" | "round">();
  const hook = useTimePicker();

  return (
    <>
    <Row $fill>
      <Caption $label="disabled">
        <ToggleBox $value={disabled} $dispatch={setDisabled} />
      </Caption>
      <Caption $label="readonly">
        <ToggleBox $value={readOnly} $dispatch={setReadOnly} />
      </Caption>
      <Caption $label="mode">
        <RadioButtons
          $value={mode}
          $dispatch={setMode}
          $source={[
            { value: "hms", label: "HMS" },
            { value: "hm", label: "HM" },
            { value: "h", label: "H" },
            { value: "ms", label: "MS" },
          ]}
        />
      </Caption>
      <Caption $label="Border">
        <RadioButtons
          $value={border}
          $dispatch={setBorder}
          $source={[
            { value: null, label: "unset" },
            { value: "less", label: "Less" },
            { value: "round", label: "Round" },
          ]}
        />
      </Caption>
    </Row>
    <Row>
      <Caption $label="bind">
        <Button $click={() => setBind({})}>clear</Button>
        <Button $click={() => setBind({ value: "7:45" })} >set</Button>
        <Button $click={() => console.log(bind)}>show</Button>
      </Caption>
      <Caption $label="state">
        <Button $click={() => setValue("8:30")}>set</Button>
      </Caption>
      <Caption $label="hook">
        <Button $click={() => {
          hook.focus();
        }}>focus</Button>
        <Button $click={() => {
          console.log(hook.getValue());
        }}>get</Button>
        <Button $click={() => {
          hook.setValue("9:10");
        }}>set</Button>
      </Caption>
      <Button $click={() => console.log(ref.current)}>ref</Button>
    </Row>
    <Caption $label="TimePicker" $width={100}>
      <TimePicker
        ref={ref}
        $hook={hook}
        $mode={mode}
        $dataType="string"
        $value={value}
        $dispatch={setValue}
        $bind={bind}
        $name="value"
        $changed={(ctx) => {
          console.log(ctx);
        }}
        $placeholder="time picker"
        $readOnly={readOnly}
        $disabled={disabled}
        $border={border}
      />
    </Caption>
    <Caption $label="Value" $width={100}>
      <Label>{value}</Label>
    </Caption>
    <Row $fill>
      {signalIterator(s => {
        return (
          <TimePicker
            key={s}
            $signal={s}
            $readOnly={readOnly}
            $disabled={disabled}
            $border={border}
          />
        );
      })}
    </Row>
    </>
  )
};

export default TimePickerPage;