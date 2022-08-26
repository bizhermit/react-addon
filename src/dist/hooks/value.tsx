import { Dispatch, useEffect, useRef, useState } from "react";
import { Color } from "../styles/css-var";

export const equalValue = (v1: any, v2: any) => {
  if (v1 == null && v2 == null) return true;
  return v1 === v2;
};

type ChangeEventContext<T, U extends { [key: string]: any } = {}> = { after: T; before: T; } & U;
export type InputAttributes<T, U extends { [key: string]: any } = {}> = {
  $name?: string;
  $bind?: { [key: string]: any };
  $disabled?: boolean;
  $readOnly?: boolean;
  $defaultValue?: T;
  $value?: T;
  $placeholder?: string;
  $dispatch?: Dispatch<T>;
  $change?: (ctx: ChangeEventContext<T, U>) => (boolean | void);
  $changed?: (ctx: ChangeEventContext<T, U>) => void;
  $color?: Color;
};
export type InputAttributesWithoutDispatch<T, U extends { [key: string]: any } = {}> = Omit<InputAttributes<T, U>, "$dispatch">;


type Options<T, U extends { [key: string]: any } = {}> = {
  effect?: (val: T) => void;
  mountEffect?: (val: T) => void;
  bindEffect?: (val: T) => void;
  stateEffect?: (val: T) => void;
  validation?: (val: T) => boolean;
  setChangeCtx?: (ctx: ChangeEventContext<T>) => ChangeEventContext<T, U>;
}

const useValue = <T, U extends { [key: string]: any } = {}>(attrs: InputAttributes<T, U>, opts?: Options<T, U>) => {
  const { $name, $bind, $defaultValue, $value, $dispatch, $change, $changed } = attrs;
  const isValidBind = $bind != null && "$bind" in attrs && $name?.length;

  const init = useRef(false);
  const buf = useRef<T>((() => {
    if ("$value" in attrs) return $value;
    if (isValidBind) return $bind[$name];
    if ("$defaultValue" in attrs) return $defaultValue;
    return undefined;
  })());
  const [val, setCurrent] = useState<T>(buf.current);

  const set = useRef<(v: T) =>T>(() => undefined);
  set.current = (v: T) => {
    let after = v, before = buf.current;
    if (equalValue(after, before)) return after;
    const valid = opts?.validation?.(after) ?? $change?.(opts?.setChangeCtx == null ? { after, before } as ChangeEventContext<T, U> : opts?.setChangeCtx({ after, before }));
    if (valid === false) after = buf.current;
    if (isValidBind) $bind[$name] = after;
    buf.current = after;
    setCurrent(after);
    opts?.effect?.(after);
    $dispatch?.(after);
    $changed?.(opts?.setChangeCtx == null ? { after, before } as ChangeEventContext<T, U> : opts?.setChangeCtx({ after, before }));
    return after;
  };

  useEffect(() => {
    if (init.current && isValidBind) {
      const v = set.current($bind[$name]);
      opts?.bindEffect?.(v);
    }
  }, [$bind]);

  useEffect(() => {
    if (init.current && "$value" in attrs) {
      set.current($value);
      opts?.stateEffect?.($value);
    }
  }, [$value]);

  useEffect(() => {
    if (!init.current) {
      opts?.effect?.(val);
      opts?.mountEffect?.(val);
      init.current = true;
    }
  }, []);

  return { val, set, buf };
};

export default useValue;