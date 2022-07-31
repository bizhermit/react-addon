import { NextPage } from "next";
import { createRef, useState } from "react";
import SelectBox, { useSelectBox } from "../../../react-addon/dist/elements/inputs/select-box";
import { signalIterator } from "../../../react-addon/dist/styles/css-var";
import Button from "../../../react-addon/dist/elements/button";
import Caption from "../../../react-addon/dist/elements/caption";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";
import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import { InputBorder } from "../../../react-addon/dist/styles/input-style";

const SelectBoxPage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const [value, setValue] = useState(1);
  const [bind, setBind] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [resize, setResize] = useState(false);
  const [notInputText, setNotInputText] = useState(false);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">();
  const [border, setBorder] = useState<InputBorder>();
  const hook = useSelectBox();

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
      <Caption $label="not input text">
        <ToggleBox $value={notInputText} $dispatch={setNotInputText} />
      </Caption>
      <Caption $label="text align">
        <RadioButtons
          $value={textAlign}
          $dispatch={setTextAlign}
          $source={[
            { value: null, label: "unset" },
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
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
        <Button $click={() => setBind({ value: 1 })} >set</Button>
        <Button $click={() => console.log(bind)}>show</Button>
      </Caption>
      <Caption $label="state">
        <Button $click={() => setValue(99)}>set</Button>
      </Caption>
      <Caption $label="hook">
        <Button $click={() => {
          hook.focus();
        }}>focus</Button>
        <Button $click={() => {
          console.log(hook.getValue());
        }}>get</Button>
        <Button $click={() => {
          hook.setValue(3);
        }}>set</Button>
      </Caption>
      <Button $click={() => console.log(ref.current)}>ref</Button>
    </Row>
    <Caption $label="SelectBox" $width={100}>
      <SelectBox
        ref={ref}
        $hook={hook}
        $placeholder="select box"
        $disabled={disabled}
        $readOnly={readOnly}
        $bind={bind}
        $name="value"
        $value={value}
        $dispatch={setValue}
        $changed={(ctx) => {
          console.log(ctx);
        }}
        $source={ArrayUtils.generateArray(100, (idx) => {
          return { value: idx, label: `item-${idx}` };
        })}
        $notInputText={notInputText}
        $resize={resize}
        $textAlign={textAlign}
        $border={border}
        // $preventSourceMemo
      />
      <SelectBox
        $placeholder="select box"
        $disabled={disabled}
        $readOnly={readOnly}
        $border={border}
        $textAlign={textAlign}
        $source={ArrayUtils.generateArray(100, (idx) => {
          return { value: idx, label: `item-${idx}` };
        })}
        $round
      />
    </Caption>
    <Caption $label="Value" $width={100}>
      <Label>{value}</Label>
    </Caption>
    {signalIterator(s => {
      return (
        <Row key={s}>
          <SelectBox
            $signal={s}
            $disabled={disabled}
            $readOnly={readOnly}
            $border={border}
            $placeholder={s}
            $source={() => {
              return s.split("").map(c => {
                return {
                  value: c,
                  label: `${s}-${c}`,
                };
              });
            }}
          />
        </Row>
      );
    })}
    </>
  )
};

export default SelectBoxPage;