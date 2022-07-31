import { useCallback, useEffect, useRef } from "react";

type Props = {
  callback?: () => (boolean | void);
  interval?: number;
};

const useTimer = (initProps?: Props) => {
  const timer = useRef<NodeJS.Timer>();
  const stop = useCallback(() => {
    if (timer.current == null) return;
    clearInterval(timer.current);
    timer.current = null;
  }, []);
  const start = useCallback((props?: Props) => {
    stop();
    const func = props?.callback ?? initProps?.callback;
    if (func == null) return;
    const interval = props?.interval ?? initProps?.interval ?? 0;
    timer.current = setInterval(() => {
      if (func() === false) stop();
    }, interval);
  }, []);
  useEffect(() => {
    return () => { stop(); };
  }, []);
  return { start, stop };
};
export default useTimer;