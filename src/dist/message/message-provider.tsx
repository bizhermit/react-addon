import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import React, { createContext, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import CssVar, { CssPV, Signal, signalIterator, switchDesign } from "../styles/css-var";
import JsxStyle from "../styles/jsx-style";
import Button from "../elements/button";
import Icon from "../elements/icon";
import Label, { labelCn } from "../elements/label";
import { sbCn } from "../styles/core-style";
import usePortalElement from "../hooks/portal-element";
import { createPortal } from "react-dom";

const cn = "bn-msg";

type MessageCounts = {
  total: number;
  info: number;
  warn: number;
  err: number;
  notVerified: number;
};
export type MessageContextProps = {
  show: () => void;
  close: () => void;
  clear: () => void;
  append: (messages: Array<Message>) => void;
  error: (e: any) => void;
  getCounts: () => MessageCounts;
};

export const MessageContext = createContext<MessageContextProps>({
  show: () => {},
  close: () => {},
  clear: () => {},
  append: () => {},
  error: () => {},
  getCounts: () => {
    return { total: 0, info: 0, warn: 0, err: 0, notVerified: 0 };
  }
});

export type MessageType = Signal | "info" | "error" | "";
export type Message = {
  title?: string;
  body?: string | Array<string>;
  type?: MessageType;
};
type _Message = {
  title?: string;
  body: Array<string>;
  type?: MessageType;
  verified: boolean;
  popuped: boolean;
  timestamp: number;
  key: number;
};
type MessageHistoryDispatch = {
  toggle: (showed: boolean) => void;
  refresh: () => void;
  popup: () => void;
};

type ErrorMessage = {
  title: string;
  body: string;
};

export const MessageProvider: FC<{
  id?: string;
  defaultShowed?: boolean;
  popupStayingTime?: number;
  popupClickAction?: "close" | "showHistory" | "none";
  historyShowAnimationDuration?: number;
  preventClickToHideHistory?: boolean;
  errorMessage?: ErrorMessage | ((e: any) => ErrorMessage);
  changed?: (messages: Array<_Message>) => void;
  children?: ReactNode;
}> = (props) => {
  const messages = useRef<Array<_Message>>([]);
  const dispatch = useRef<MessageHistoryDispatch>();
  const callbacks = useRef<{[key: string]: (msgs: Array<_Message>) => void}>({});
  const portal = usePortalElement({ id: props.id ?? cn, mount: (elem) => {
    elem.classList.add(`${cn}-root`);
  } });
  const msgIdCount = useRef(0);

  const append = useCallback((msgs: Array<Message>) => {
    if (msgs == null) return;
    const timestamp = Date.now();
    msgs.forEach(msg => {
      messages.current.push({
        title: msg.title,
        body: StringUtils.isString(msg.body) ? [msg.body] : msg.body,
        type: msg.type ?? "info",
        popuped: false,
        timestamp,
        verified: false,
        key: msgIdCount.current++,
      });
    });
    setTimeout(() => {
      dispatch.current?.popup();
      dispatch.current?.refresh();
    }, 0);
  }, []);

  const getCounts = () => {
    let info = 0, warn = 0, err = 0, notVerified = 0;
    messages.current.forEach(msg => {
      switch (msg.type) {
        case "danger":
        case "error":
          err++;
          break;
        case "warning":
          warn++;
          break;
        case "info":
          info++;
          break;
        default:
          info++;
          break;
      }
      if (!msg.verified) notVerified++;
    });
    return {
      total: messages.current.length,
      info,
      warn,
      err,
      notVerified
    };
  };

  return (
    <MessageContext.Provider value={useMemo(() => {
      return {
        show: () => dispatch.current.toggle(true),
        close: () => dispatch.current.toggle(false),
        clear: () => {
          messages.current?.splice(0, messages.current.length);
          dispatch.current?.refresh();
        },
        append,
        error: (e) => {
          if (e == null) return;
          let errMsg: ErrorMessage;
          if (typeof props.errorMessage === "function") {
            errMsg = props.errorMessage(e);
          } else {
            errMsg = props.errorMessage ?? {
              title: "システムエラー",
              body: "システムエラーが発生しました",
            };
          }
          append([{ ...errMsg, type: "error" }]);
        },
        getCounts,
        _setCallback: (callback: (msgs: Array<_Message>) => void) => {
          const id = StringUtils.generateUuidV4();
          callbacks.current[id] = callback;
          return id;
        },
        _unsetCallback: (id: string) => {
          delete callbacks.current[id];
        }
      };
    }, [])}>
      {props.children}
      {Style}
      {portal ? createPortal(
        <MessageHistory
          defaultShowed={props.defaultShowed ?? false}
          popupStayingTime={props.popupStayingTime || 5000}
          popupClickAction={props.popupClickAction ?? "close"}
          historyShowAnimationDuration={props.historyShowAnimationDuration || 200}
          preventClickToHideHistory={props.preventClickToHideHistory ?? false}
          messages={messages.current}
          dispatchSetter={(d) => {
            dispatch.current = d;
          }}
          dispatch={{
            changed: () => {
              props.changed?.(messages.current);
              Object.keys(callbacks.current).forEach(key => {
                callbacks.current[key](messages.current);
              });
            }
          }}
        />
      , portal) : <></>}
    </MessageContext.Provider>
  );
};

const useMessage = (callback?: (messages: Array<_Message>) => void) => {
  const ctx = useContext(MessageContext);
  useEffect(() => {
    if (callback) {
      const id = (ctx as any)._setCallback(callback);
      return () => {
        (ctx as any)._unsetCallback(id);
      };
    }
  }, []);
  return ctx;
};

const defaultAnimationInterval = 10;

const getTimeText = (timestamp: number) => {
  const date = new Date(timestamp);
  const datetime = `${("00" + date.getHours()).slice(-2)}:${("00" + date.getMinutes()).slice(-2)}:${("00" + date.getSeconds()).slice(-2)}`;
  const diff = Date.now() - timestamp;
  if (diff < 60000) return `${Math.floor(diff / 1000)}s (${datetime})`;
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m (${datetime})`;
  return datetime;
};

const MessageHistory: FC<{
  defaultShowed: boolean;
  popupStayingTime: number;
  popupClickAction: "close" | "showHistory" | "none";
  historyShowAnimationDuration: number;
  preventClickToHideHistory: boolean;
  messages: Array<_Message>;
  dispatchSetter: (dispatch: MessageHistoryDispatch) => void;
  dispatch: {
    changed: () => void;
  };
}> = (props) => {
  const histRef = useRef<HTMLDivElement>();
  const popupRef = useRef<HTMLDivElement>();
  const [histRev, setHistRev] = useState(0);
  const [showedHist, setShowedHist] = useState(props.defaultShowed ?? false);
  const [popupRev, setPopupRev] = useState(0);
  const animationDuration = useRef<number>();
  const animationOff = useRef(true);

  useEffect(() => {
    let actKey = true;
    const animationCount = Math.max(Math.floor(Math.max((animationDuration.current ?? props.historyShowAnimationDuration), 1) / defaultAnimationInterval), 1);
    if (showedHist) {
      histRef.current.style.visibility = "hidden";
      histRef.current.style.removeProperty("width");
      histRef.current.style.removeProperty("max-width");
      histRef.current.style.removeProperty("min-width");
      histRef.current.style.removeProperty("display");
      histRef.current.style.removeProperty("overflow");
      const s = "0px";
      const max = histRef.current.offsetWidth;
      histRef.current.style.width = histRef.current.style.maxWidth = histRef.current.style.minWidth = s;
      const min = histRef.current.offsetWidth;
      const interval = Math.max(1, Math.floor((max - min)/ animationCount));
      histRef.current.style.removeProperty("visibility");
      const ended = () => {
        histRef.current.style.removeProperty("width");
        histRef.current.style.removeProperty("max-width");
        histRef.current.style.removeProperty("min-width");
        props.messages.forEach(msg => msg.verified = true);
      };
      let w = min;
      const impl = async () => {
        if (!actKey) return;
        w += interval;
        if (w > max) {
          ended();
          return;
        }
        histRef.current.style.width = histRef.current.style.maxWidth = histRef.current.style.minWidth = `${w}px`;
        setTimeout(impl, defaultAnimationInterval);
      };
      if (animationOff.current) {
        ended();
      } else {
        impl();
      }
      if (!props.preventClickToHideHistory) {
        const clickWindow = () => {
          setShowedHist(false);
        }
        window.addEventListener("click", clickWindow);
        return () => {
          window.removeEventListener("click", clickWindow);
        }
      }
    } else {
      const s = "0px";
      const ended = () => {
        histRef.current.style.width = histRef.current.style.maxWidth = histRef.current.style.minWidth = s as string;
        histRef.current.style.removeProperty("hidden");
      };
      histRef.current.style.removeProperty("display");
      const max = histRef.current.offsetWidth;
      histRef.current.style.overflow = "hidden";
      histRef.current.style.removeProperty("visibility");
      histRef.current.style.width = histRef.current.style.maxWidth = histRef.current.style.minWidth = s;
      let min = histRef.current.offsetWidth;
      histRef.current.style.width = histRef.current.style.maxWidth = histRef.current.style.minWidth = `${max}px`;
      const interval = Math.max(1, Math.floor((max - min) / animationCount));
      let w = max;
      const impl = async () => {
        if (!actKey) return;
        w -= interval;
        if (w < min) {
          ended();
          return;
        }
        histRef.current.style.width = histRef.current.style.maxWidth = histRef.current.style.minWidth = `${w}px`;
        setTimeout(impl, defaultAnimationInterval);
      };
      if (animationOff.current) {
        ended();
      } else {
        impl();
      }
    }
  }, [showedHist]);

  useEffect(() => {
    animationOff.current = false;
    props.dispatchSetter({
      toggle: (s) => {
        setTimeout(() => {
          if (s) setHistRev(c => c+1);
          setShowedHist(s);
        }, 0);
      },
      refresh: () => { setHistRev(c => c+1) },
      popup: () => { setPopupRev(c => c+1) },
    });
  }, []);

  const ctx = useMemo(() => {
    if (!showedHist) return { info: 0, warn: 0, err: 0, nodes: [] };
    const msgs = props.messages;
    let info = 0, warn = 0, err = 0;
    const nodes = [];
    for (let i = msgs.length - 1; i >= 0; i--) {
      const msg = msgs[i];
      let signal: Signal;
      let icon: "information" | "error" | "warning";
      switch (msg.type) {
        case "danger":
        case "error":
          signal = "danger";
          icon = "error";
          err++;
          break;
        case "warning":
          signal = "warning";
          icon = "warning";
          warn++;
          break;
        case "info":
          signal = "default";
          icon = "information";
          info++;
          break;
        default:
          signal = msg.type || "default";
          icon = "information";
          info++;
          break;
      }
      nodes.push(
        <div
          key={msg.key}
          className={`${cn}-hist_item`}
          data-signal={signal}
          data-verified={msg.verified}
        >
          <div className={`${cn}-hist_item_header`}>
            <Icon $image={icon} $signal={signal} />
            <div className={`${cn}-hist_item_title`}>
              <Label $bold $type="h3">{msg.title}</Label>
            </div>
            <Button
              $transparent
              $icon="delete"
              $signal="danger"
              $click={() => {
                props.messages.splice(i, 1);
                setHistRev(c => c+1);
              }}
            />
          </div>
          <div className={`${cn}-hist_item_body`}>
            <div className={`${cn}-hist_item_timestamp`}>
              {getTimeText(msg.timestamp)}
            </div>
            <pre className={`${cn}-hist_item_texts`}>
              {msg.body.join("\n")}
            </pre>
          </div>
        </div>
      );
    }
    return {
      info,
      warn,
      err,
      nodes,
    };
  }, [histRev]);

  const { popupNodes, popupMessages } = useMemo(() => {
    const nodes = [];
    const msgs = props.messages.filter(msg => !msg.popuped);
    if (msgs.length === 0) {
      return {
        popupNodes: nodes,
        popupMessages: msgs,
      };
    }
    for (let i = 0, il = msgs.length; i < il; i++) {
      const msg = msgs[i];
      let signal: Signal;
      let icon: "information" | "error" | "warning";
      switch (msg.type) {
        case "danger":
        case "error":
          signal = "danger";
          icon = "error";
          break;
        case "warning":
          signal = "warning";
          icon = "warning";
          break;
        case "info":
          signal = "default";
          icon = "information";
          break;
        default:
          signal = msg.type || "default";
          icon = "information";
          break;
      }
      nodes.push(
        <div
          key={msg.key}
          className={`${cn}-popup_item`}
          data-signal={signal}
        >
          <Icon $image={icon} $signal={signal}/>
          <pre className={`${cn}-popup_item_texts`}>
            {msg.title ?? msg.body.join(" ")}
          </pre>
        </div>
      );
    };
    return {
      popupNodes: nodes,
      popupMessages: msgs,
    }
  }, [popupRev]);

  const clickPopup = () => {
    switch (props.popupClickAction) {
      case "showHistory":
        popupRef.current.style.display = "none";
        setShowedHist(true);
        break;
      case "close":
        popupRef.current.style.display = "none";
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (popupNodes.length === 0) return;
    let actKey = true;
    setTimeout(() => {
      popupMessages.forEach(msg => msg.popuped = true);
      if (!actKey) return;
      popupRef?.current.style.removeProperty("display");
      let rate = 100;
      popupRef?.current.style.removeProperty("width");
      const curWidth = popupRef.current?.getBoundingClientRect().width || 0;
      const func = () => {
        if (!actKey) return;
        rate -= 1;
        if (rate < 0) {
          if (popupRef.current) popupRef.current.style.display = "none";
          return;
        }
        if (popupRef.current) popupRef.current.style.width = Math.floor(curWidth * (rate / 100)) + "px";
        setTimeout(() => func(), 5);
      };
      setTimeout(() => func(), props.popupStayingTime);
    }, 10);
    return () => {
      actKey = false;
    };
  }, [popupRev]);

  useEffect(() => {
    props.dispatch.changed();
  }, [histRev]);

  return (
    <>
      <div
        ref={histRef}
        className={`${cn}-hist`}
        data-showed={showedHist}
        onClick={e => e.stopPropagation()}
      >
        <div className={`${cn}-hist_header`}>
          <Button
            $icon="reload"
            $transparent
            $click={() => {
              setHistRev(c => c+1);
            }}
          />
          <div className={`${cn}-hist_header_info`}>
            {ctx.info > 0 ?
              <>
                <Icon $image="information" />
                <Label>{ctx.info}</Label>
              </> : <></>
            }
            {ctx.warn > 0 ?
              <>
                <Icon $image="warning" $signal="warning" />
                <Label>{ctx.warn}</Label>
              </> : <></>
            }
            {ctx.err > 0 ?
              <>
                <Icon $image="error" $signal="danger" />
                <Label>{ctx.err}</Label>
              </> : <></>
            }
          </div>
          <div className={`${cn}-hist_header_r`}>
            <Button
              $icon="delete"
              $transparent
              $signal="danger"
              $click={() => {
                props.messages.splice(0, props.messages.length);
                setHistRev(c => c+1);
              }}
            />
            <Button
              $icon="cross"
              $transparent
              $click={() => {
                setShowedHist(false);
              }}
            />
          </div>
        </div>
        <div className={`${cn}-hist_body ${sbCn}`}>
          {ctx.nodes}
        </div>
      </div>
      <div
        ref={popupRef}
        className={`${cn}-popup ${sbCn}`}
        style={{ display: "none" }}
        onClick={clickPopup}
      >
        {popupNodes}
      </div>
    </>
  );
};

const Style = <JsxStyle id="bh-msg" depsDesign>{({ design }) => `
.${cn}-hist {
  box-sizing: border-box;
  position: fixed;
  z-index: 2100000000;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: none;
  top: 0px;
  right: 0px;
  height: 100%;
  overflow: hidden;
  background: ${CssVar.bgc};
  transition: width 0.3s;
  min-width: 25%;
  max-width: 40%;
${switchDesign(design, {
c: `opacity: 0.95;`,
flat: `box-shadow: 0 0 1px ${CssVar.sdw.c};`,
material: `box-shadow: 0 0 5px -1px ${CssVar.sdw.c};`,
neumorphism: `box-shadow: 0px 3px 4px -2px ${CssVar.sdw.d}, 0px -2.5px 1px -2px ${CssVar.sdw.d} inset;`
})}
}
.${cn}-hist_header {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  width: 100%;
  min-height: ${CssVar.size};
${switchDesign(design, {
flat: `
  box-shadow: 0 0 1px ${CssVar.sdw.c};
  margin-bottom: 1px;
`,
material: `
  box-shadow: 0 0 5px -1px ${CssVar.sdw.c};
  margin-bottom: 2px;
`,
neumorphism: `
  box-shadow: 0px 3px 4px -2px ${CssVar.sdw.d}, 0px -2.5px 1px -2px ${CssVar.sdw.d} inset;
  margin-bottom: 3px;
  padding: 3px;
`})}
}
.${cn}-hist_header_info {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  padding-left: 5px;
  padding-top: 2px;
}
.${cn}-hist_header_info > .${labelCn} {
  margin-right: 10px;
}
.${cn}-hist_header_r {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
}
.${cn}-hist_body {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  min-height: 0px;
  width: 100%;
  padding: 5px;
}
.${cn}-hist_item {
  ${CssPV.flex}
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  border-radius: ${CssVar.bdr};
  margin-bottom: 5px;
  padding: 5px;
${switchDesign(design, {
fm: `border: 1px solid ${CssVar.bdc};`,
neumorphism: `box-shadow: ${CssPV.cvxSd};`,
})}
}
${switchDesign(design, {
fm: `
.${cn}-hist_item[data-verified="true"] {
  border-style: dashed;
}`,
neumorphism: `
.${cn}-hist_item[data-verified="true"] {
  box-shadow: ${CssPV.ccvSdS};
}`
})}
.${cn}-hist_item_header {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.${cn}-hist_item_title {
  flex: 1;
  overflow: hidden;
}
.${cn}-hist_item_body {
  width: 100%;
}
.${cn}-hist_item_timestamp {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  font-size: 10px;
  width: 100%;
}
.${cn}-hist_item_texts {
  margin: 0px;
  padding: 5px;
}
.${cn}-popup {
  box-sizing: border-box;
  position: fixed;
  top: 5px;
  right: 5px;
  z-index: 2100000001;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  flex: none;
  max-height: 100%;
  max-width: 50%;
  filter: drop-shadow(0px 8px 5px ${CssVar.sdw.c});
}
.${cn}-popup_item {
  ${CssPV.flex}
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  flex: none;
  border-radius: ${CssVar.bdr};
  padding: 5px;
  margin-bottom: 5px;
${switchDesign(design, {
fm: `border: 3px double ${CssVar.bdc};`,
neumorphism: `box-shadow: ${CssPV.cvxSdS};`,
})}
}
.${cn}-popup_item_texts {
  margin: 0px;
  padding: 6px 5px 5px 5px;
}
${switchDesign(design, {
c: `
${signalIterator((_s, v, qs) => `
.${cn}-hist_item${qs} {
  border-color: ${v.bdc};
  background: ${CssVar.bgc};
}
.${cn}-hist_item${qs} .${cn}-hist_item_title {
  color: ${v.fc};
}
.${cn}-popup_item${qs} {
  background: ${v.bgc};
  border-color: ${v.bdc};
  color: ${v.fc};
}
`).join("")}
`})}
`}</JsxStyle>;

export default useMessage;