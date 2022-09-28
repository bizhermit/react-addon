import StringUtils from "@bizhermit/basic-utils/dist/string-utils";
import { codeCn } from "../../elements/code";

export const convertToTsCode = (code: Array<string> | string) => {
  let lines: Array<string> = [];
  if (StringUtils.isString(code)) {
    lines = code.split(/\r\n|\n/);
  } else {
    lines = [...code];
  }
  let str = lines.join("\n")
    .replace(/ /g, "&nbsp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // .replace(/(\')(.*)(\')/g, `<span class="${codeCn}-string">$1$2$3</span>`)
    // .replace(/(\")(.*)(\")/g, `<span class="${codeCn}-string">$1$2$3</span>`)
    .replace(/(\/\/.*)(\n)/g, `<span class="${codeCn}-comment">$1</span>$2`)
    .replace(/(\/*.*\*\/)/g, `<span class="${codeCn}-comment">$1</span>`)
    // .replace(/(&lt;[^\/])([a-zA-Z][a-zA-Z0-9]*)([^&gt;|^\/&gt;]*)(&gt;|\/&gt;|)/g, `<span class="${codeCn}-jsx">$1$2</span>$3<span class="${codeCn}-jsx">$4</span>`)
    // .replace(/(&lt;\/)([a-zA-Z][a-zA-Z0-9]*)(&gt;|\/&gt;|)(\n|&nbsp;|)/g, `<span class="${codeCn}-jsx">$1$2$3</span>$4`)
    .replace(/(import(.*)&nbsp;)(from)(&nbsp;)/g, `$1<span class="${codeCn}-import">$3</span>$4`)
    .replace(/(import)(&nbsp;)/g, `<span class="${codeCn}-import">$1</span>$2`)
    .replace(/(export&nbsp;default|export)(&nbsp;)/g, `<span class="${codeCn}-export">$1</span>$2`)
    .replace(/(return)(&nbsp;|;)/g, `<span class="${codeCn}-return">$1</span>$2`)
    .replace(/(const|let|var)(&nbsp;)/g, `<span class="${codeCn}-var">$1</span>$2`)
  return str.split("\n");
};