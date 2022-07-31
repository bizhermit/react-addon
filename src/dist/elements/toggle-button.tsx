import React, { FC, MouseEvent, useEffect, useState } from "react";
import Button, { ButtonAttributes } from "./button";

type ToggleButtonProps = Omit<ButtonAttributes, "$click"> & {
  key?: string;
  $click?: (unlock: (preventFocus?: boolean) => void, event: MouseEvent<HTMLButtonElement>) => (void | string | Promise<void | string>);
};

const ToggleButton: FC<{
  children: Array<ToggleButtonProps>;
  defaultKey?: string;
}> = (attrs) => {
  const [btn, setBtn] = useState<ToggleButtonProps>(() => {
    if (attrs.defaultKey == null) return attrs.children[0];
    return attrs.children.find(i => i.key === attrs.defaultKey) ?? attrs.children[0];
  });

  const setNext = () => {
    setBtn(attrs.children[(attrs.children.findIndex(i => i === btn) + attrs.children.length + 1) % attrs.children.length]);
  };
  const setKey = (key: string) => {
    const nextItem = attrs.children.find(i => i.key === key);
    if (nextItem == null) return;
    setBtn(nextItem);
  };

  const click = async (unlock: (preventFocus?: boolean) => void, event: MouseEvent<HTMLButtonElement>) => {
    (async () => {
      const ret = btn.$click?.((preventFocus) => unlock(preventFocus), event);
      if (ret == null) {
        unlock();
        setNext();
        return;
      }
      if (typeof ret === "string") {
        unlock();
        setKey(ret);
        return;
      }
      if (typeof ret["then"] === "function") {
        (ret as any).then((r: string | void) => {
          if (r != null && typeof r === "string") {
            setKey(r);
            return;
          }
          setNext();
        });
        return;
      }
      setNext();
    })();
  };

  useEffect(() => {
    const key = btn.key;
    if (key == null) {
      const newItem = attrs.children.find(i => i.key === key);
      if (newItem != null) setBtn(newItem);
    }
  }, [attrs.children]);

  return <Button {...btn} $click={click} />;
};

export default ToggleButton;