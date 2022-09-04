import { NextPage } from "next";
import { useState } from "react";
import useMessageBox from "../../../react-addon/dist/message/message-box";
import { Color, colorIterator, ColorType } from "../../../react-addon/dist/styles/css-var";
import Button from "../../../react-addon/dist/elements/button";
import RadioButtons from "../../../react-addon/dist/elements/inputs/radio-buttons";
import Row from "../../../react-addon/dist/elements/row";

const MessageBoxPage: NextPage = () => {
  const msgBox = useMessageBox();
  const [color, setColor] = useState<Color>();
  const [colorType, setColorType] = useState<ColorType>();

  return (
    <>
    <Row $fill>
      <RadioButtons
        $source={[{
          value: null,
          label: `unset`,
        }, {
          value: "base",
          label: "base",
        }, {
          value: "head",
          label: "head",
        }, {
          value: "nav",
          label: "nav",
        }]}
        $value={colorType}
        $dispatch={setColorType}
      />
      <RadioButtons
        $value={color}
        $dispatch={setColor}
        $source={[
          { value: null, label: "unset" },
          ...colorIterator((s) => {
            return { value: s, label: s };
          })
        ]}
      />
    </Row>
    <Row $fill>
      <Button $click={async (unlock) => {
        await msgBox.show({
          title: "Message Box",
          message: "Test",
          buttons: [{
            children: "close",
          }],
          color,
          colorType,
        });
        unlock();
      }}>show</Button>
      <Button $click={async (unlock) => {
        await msgBox.alert("alert");
        unlock();
      }}>alert</Button>
      <Button $click={async (unlock) => {
        const ret = await msgBox.confirm(<>登録します<br/>よろしいですか？</>, "確認");
        console.log(ret);
        unlock();
      }}>confirm</Button>
      <Button $click={async (unlock) => {
        const ret = await msgBox.text({
          message: "入力してください",
          title: "テキスト入力",
        });
        console.log(ret);
        unlock();
      }}>text</Button>
    </Row>
    </>
  );
};

export default MessageBoxPage;