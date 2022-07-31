import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import { useEffect, useRef, useState } from "react";

const usePortalElement = (options?: {
  id?: string;
  mount?: (element: HTMLDivElement) => void;
  unmount?: (element: HTMLDivElement) => void;
}) => {
  const idRef = useRef(options?.id || StringUtils.generateUuidV4());
  const [element, setElement] = useState<HTMLDivElement>();

  useEffect(() => {
    let elem = document.getElementById(idRef.current) as HTMLDivElement;
    if (elem == null) {
      elem = document.createElement("div");
      elem.id = idRef.current;
      document.body.appendChild(elem);
      options?.mount?.(elem);
      setElement(elem);
    }
    return () => {
      try {
        options?.unmount?.(elem);
      } catch (e) {
        console.log(e);
      }
      try {
        document.body.removeChild(elem);
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  return element;
};

export default usePortalElement;