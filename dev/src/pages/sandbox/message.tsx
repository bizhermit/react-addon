import { NextPage } from "next";
import { FC, useEffect } from "react";
import useMessage, { MessageProvider } from "../../../react-addon/dist/message/message-provider";
import Button from "../../../react-addon/dist/elements/button";
import Row from "../../../react-addon/dist/elements/row";

const MessagePage: NextPage = () => {
  return (
    <MessageProvider
      id="messageTest"
      popupStayingTime={3000}
      popupClickAction="showHistory"
      historyShowAnimationDuration={100}
      preventClickToHideHistory
    >
      <Component />
    </MessageProvider>
  );
};

const Component: FC = () => {
  const msg = useMessage((msgs) => {
    console.log(msgs);
  });

  useEffect(() => {
    msg.append([
      { title: "test info", messageTexts: "test info message", type: "info" },
      { title: "test warning", messageTexts: "test warn message", type: "warning" },
      { title: "test error", messageTexts: "test err message", type: "error" },
    ]);
  }, [msg]);

  return (
    <>
    <Row $fill>
      <Button $click={() => {
        msg.show();
      }}>show</Button>
      <Button $click={() => {
        msg.close();
      }}>close</Button>
      <Button $click={() => {
        msg.clear();
      }}>clear</Button>
    </Row>
    <Button $click={() => {
      msg.append([
        { messageTexts: "test info message", type: "info" },
        { title: "test warning", messageTexts: "test warn message", type: "warning" },
        { title: "test error", messageTexts: "test err message", type: "error" },
      ]);
    }}>info</Button>
    <Button $click={() => {
      msg.error("システムエラー");
    }}>error</Button>
    <Button $click={() => {
      console.log(msg.getCounts());
    }}>counts</Button>
    </>
  )
};

export default MessagePage;