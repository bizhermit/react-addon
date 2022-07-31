import { NextPage } from "next";
import { createRef, useState } from "react";
import DateBox, { useDateBox } from "../../../react-addon/dist/elements/inputs/date-box";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import { signalIterator } from "../../../react-addon/dist/styles/css-var";
import { InputBorder } from "../../../react-addon/dist/styles/input-style";

const DateBoxPage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const [value, setValue] = useState<string | number | Date>();
  const [bind, setBind] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [mode, setMode] = useState<"ymd" | "ym" | "y">("ymd");
  const [border, setBorder] = useState<InputBorder>();
  const hook = useDateBox();

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
            { value: "under", label: "Under" },
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
    <Caption $label="DateBox" $width={100}>
      <DateBox
        ref={ref}
        $hook={hook}
        $mode={mode}
        $value={value}
        $dispatch={setValue}
        $bind={bind}
        $name="value"
        $placeholder="date box"
        $readOnly={readOnly}
        $disabled={disabled}
        $border={border}
        $changed={(ctx) => {
          console.log(ctx);
        }}
        // $rangeFrom="2000-01-01"
        // $rangeTo="2020-12-31"
      />
    </Caption>
    <Caption $label="Value" $width={100}>
      <Label>{String(value)}</Label>
    </Caption>
    {signalIterator(s => {
      return (
        <Row key={s}>
          <DateBox
            $signal={s}
            $placeholder={s}
            $readOnly={readOnly}
            $disabled={disabled}
            $border={border}
          />
          <DateBox
            $signal={s}
            $readOnly={readOnly}
            $disabled={disabled}
            $border={border}
          />
        </Row>
      );
    })}
    </>
  )
};

export default DateBoxPage;