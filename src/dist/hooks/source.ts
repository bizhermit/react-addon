import { useEffect, useState } from "react";

export type SourceArray<T> = Array<T> | (() => Array<T> | Promise<Array<T>>);

const useSource = <T,>(src: SourceArray<T>, opts?: { preventSourceMemo?: boolean; changeSource?: (source: Array<T>) => void; }) => {
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<Array<T>>(() => {
    if (Array.isArray(src)) return src ?? [];
    return [];
  });

  useEffect(() => {
    if (!opts?.preventSourceMemo && !loading) {
      setLoading(false);
      return;
    }
    if (src == null) {
      const s = [];
      opts?.changeSource?.(s);
      setSource(s);
      setLoading(false);
      return;
    }
    if (Array.isArray(src)) {
      opts?.changeSource?.(src);
      setSource(src);
      setLoading(false);
      return;
    }
    setLoading(true);
    const ret = (src as () => Promise<Array<T>>)();
    if (Array.isArray(ret)) {
      setSource(ret);
      setLoading(false);
    } else {
      ret.then((s) => {
        const rs = s ?? [];
        opts?.changeSource?.(rs);
        setSource(rs);
        setLoading(false);
      }).catch((e) => {
        console.trace(e);
        setLoading(false);
      });
    }
  }, [src]);

  return { loading, source };
};

export default useSource;