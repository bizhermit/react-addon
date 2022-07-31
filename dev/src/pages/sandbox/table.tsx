import ArrayUtils from "@bizhermit/basic-utils/dist/array-utils";
import { NextPage } from "next";
import { useState } from "react";
import { Signal, signalIterator } from "../../../react-addon/dist/styles/css-var";
import Caption from "../../../react-addon/dist/elements/caption";
import DateBox from "../../../react-addon/dist/elements/inputs/date-box";
import NumericBox from "../../../react-addon/dist/elements/inputs/numeric-box";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import SelectBox from "../../../react-addon/dist/elements/inputs/select-box";
import TextBox from "../../../react-addon/dist/elements/inputs/text-box";
import TimeBox from "../../../react-addon/dist/elements/inputs/time-box";
import ToggleBox from "../../../react-addon/dist/elements/inputs/toggle-box";
import Row from "../../../react-addon/dist/elements/row";
import Table from "../../../react-addon/dist/elements/table";

const TablePage: NextPage = () => {
  const [border, setBorder] = useState(false);
  const [oddEven, setOddEven] = useState(false);
  const [hover, setHover] = useState(false);
  const [signal, setSignal] = useState<Signal>();

  return (
    <>
    <Row $fill>
      <Caption $label="border">
        <ToggleBox $value={border} $dispatch={setBorder} />
      </Caption>
      <Caption $label="odd/even">
        <ToggleBox $value={oddEven} $dispatch={setOddEven} />
      </Caption>
      <Caption $label="hover">
        <ToggleBox $value={hover} $dispatch={setHover} />
      </Caption>
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
    </Row>
    <Table
      $border={border}
      $oddEven={oddEven}
      $hover={hover}
      $signal={signal}
    >
      <thead>
        <tr>
          <th rowSpan={2}></th>
          <th colSpan={5}>
            Inputs
          </th>
        </tr>
        <tr>
          <th>TextBox</th>
          <th>NumericBox</th>
          <th>SelectBox</th>
          <th>DateBox</th>
          <th>TimeBox</th>
        </tr>
      </thead>
      <tbody>
        {ArrayUtils.generateArray(10, idx => {
          return (
            <tr key={idx}>
              <td className="row-num" align="center" width={50}>{idx}</td>
              <td>
                <TextBox
                  // placeholder="text-box"
                />
              </td>
              <td>
                <NumericBox />
              </td>
              <td>
                <SelectBox />
              </td>
              <td>
                <DateBox />
              </td>
              <td>
                <TimeBox />
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <th>TextBox</th>
          <th>NumericBox</th>
          <th>SelectBox</th>
          <th>DateBox</th>
          <th>TimeBox</th>
        </tr>
      </tfoot>
    </Table>
    </>
  );
};

export default TablePage;