import { NextPage } from "next";
import { createRef, useState } from "react";
import DatePicker, { useDatePicker } from "../../../react-addon/dist/elements/inputs/date-picker";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import { signalIterator } from "../../../react-addon/dist/styles/css-var";
import { InputBorder } from "../../../react-addon/dist/styles/input-style";

const DatePickerPage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const [value, setValue] = useState<string>("2000-01-01");
  const [bind, setBind] = useState<Struct>({});
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [mode, setMode] = useState<"ymd" | "ym" | "y">("ymd");
  const [border, setBorder] = useState<"less" | "round">();
  const hook = useDatePicker();

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
            { value: "ymd", label: "YMD" },
            { value: "ym", label: "YM" },
            { value: "y", label: "Y" },
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
        <Button $click={() => setBind({ value: "2022-04-03" })} >set</Button>
        <Button $click={() => console.log(bind)}>show</Button>
      </Caption>
      <Caption $label="state">
        <Button $click={() => setValue("1992-12-06")}>set</Button>
      </Caption>
      <Caption $label="hook">
        <Button $click={() => {
          hook.focus();
        }}>focus</Button>
        <Button $click={() => {
          console.log(hook.getValue());
        }}>get</Button>
        <Button $click={() => {
          hook.setValue("2002-06-30");
        }}>set</Button>
      </Caption>
      <Button $click={() => console.log(ref.current)}>ref</Button>
    </Row>
    <Caption $label="DatePicker" $width={100}>
      <DatePicker
        ref={ref}
        $hook={hook}
        $mode={mode}
        $value={value}
        $dispatch={setValue}
        $bind={bind}
        $name="value"
        $readOnly={readOnly}
        $disabled={disabled}
        $changed={(ctx) => {
          console.log(ctx)
        }}
        $placeholder="date picker"
        $rangeFrom="2000-01-01"
        $rangeTo="2020-12-31"
        $border={border}
      />
    </Caption>
    <Caption $label="Value" $width={100}>
      <Label>{value}</Label>
    </Caption>
    <Row $fill>
      {signalIterator(s => {
        return (
          <DatePicker
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

export default DatePickerPage;