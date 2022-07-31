import DatetimeUtils from "@bizhermit/basic-utils/dist/datetime-utils";
import { NextPage } from "next";
import { createRef, useEffect, useState } from "react";
import { Signal, signalIterator } from "../../../react-addon/dist/styles/css-var";
import Button from "../../../react-addon/dist/elements/button";
import Calendar, { CalendarCellTemplate, useCalendar } from "../../../react-addon/dist/elements/calendar";
import Caption from "../../../react-addon/dist/elements/caption";
import FlexBox from "../../../react-addon/dist/elements/flex-box";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Label from "../../../react-addon/dist/elements/label";
import Row from "../../../react-addon/dist/elements/row";

const CalendarPage: NextPage = () => {
  const ref = createRef<HTMLDivElement>();
  const hook = useCalendar();
  const [disabled, setDsiabled] = useState(false);
  const [count, setCount] = useState(0);
  const [signal, setSignal] = useState<Signal>();

  return (
    <>
      <Row $fill>
        <Button $click={() => {
          console.log(ref.current);
        }}>ref</Button>
        <Button $click={() => {
          hook.setDate("2000-01-01");
        }}>2000/1</Button>
        <Button $click={() => {
          console.log(DatetimeUtils.format(hook.getDate()));
        }}>target</Button>
        <Button $click={() => {
          setCount(c => c+1);
        }}>{count}</Button>
        <Caption $label="disabled">
          <ToggleBox
            $value={disabled}
            $dispatch={setDsiabled}
          />
        </Caption>
      </Row>
      <Row>
        <Caption $label="signal">
          <RadioButtons
            $source={[{
              value: null,
              label: `unset`,
            }, ...(signalIterator(s => {
              return {
                value: s,
                label: s,
                signal: s,
              }
            }))]}
            $value={signal}
            $dispatch={setSignal}
          />
        </Caption>
      </Row>
      <FlexBox $fto="fy" $padding>
        <Calendar
          ref={ref}
          $fto="fy"
          $hook={hook}
          // $startWeek={0}
          $weekTexts="en"
          $changed={(ctx) => {
            console.log(DatetimeUtils.format(ctx.before), "->", DatetimeUtils.format(ctx.after));
          }}
          $disabled={disabled}
          $signal={signal}
        >
          <CalendarCell params={count} />
        </Calendar>
      </FlexBox>
    </>
  );
};

const CalendarCell: CalendarCellTemplate<{ params: number }> = ({ $$date, $$currentYM, params }) => {
  useEffect(() => {
    console.log("mount");
  }, []);

  return (
    <FlexBox $fto="f" style={{ opacity: $$currentYM ? 1 : 0.4 }}>
      <Label>{DatetimeUtils.format($$date, "d")}</Label>
      <Label>{params}</Label>
    </FlexBox>
  );
}

export default CalendarPage;