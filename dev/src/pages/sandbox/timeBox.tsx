import { NextPage } from "next";
import { createRef, useState } from "react";
import TimeBox, { useTimeBox } from "../../../react-addon/dist/elements/inputs/time-box";
import { colorIterator } from "../../../react-addon/dist/styles/css-var";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import { InputBorder } from "../../../react-addon/dist/styles/input-style";

const TimeBoxPage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const [value, setValue] = useState<string | number>();
  const [bind, setBind] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [mode, setMode] = useState<"hms" | "hm" | "h" | "ms">("hm");
  const [border, setBorder] = useState<InputBorder>();
  const hook = useTimeBox();

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
            { value: "under", label: "Under" },
            { value: "round", label: "Round" },
          ]}
        />
      </Caption>
    </Row>
    <Row>
      <Caption $label="bind">
        <Button $click={() => setBind({})}>clear</Button>
        <Button $click={() => setBind({ value: "7:36" })} >set</Button>
        <Button $click={() => console.log(bind)}>show</Button>
      </Caption>
      <Caption $label="state">
        <Button $click={() => setValue("8:25")}>set</Button>
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
    <Caption $label="TimeBox" $width={100}>
      <TimeBox
        ref={ref}
        $hook={hook}
        $mode={mode}
        // $dataType="string"
        $value={value}
        $dispatch={setValue}
        $bind={bind}
        $name="value"
        $changed={(ctx) => {
          console.log(ctx);
        }}
        $placeholder="time"
        $readOnly={readOnly}
        $disabled={disabled}
        $border={border}
      />
    </Caption>
    <Caption $label="Value" $width={100}>
      <Label>{value}</Label>
    </Caption>
    {colorIterator(s => {
      return (
        <Row key={s}>
          <TimeBox
            $color={s}
            $readOnly={readOnly}
            $disabled={disabled}
            $border={border}
            $placeholder={s}
          />
          <TimeBox
            $color={s}
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

export default TimeBoxPage;