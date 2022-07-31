export const setCursor = (cursor: string) => {
  if (document?.body == null) return () => { };
  document.onselectstart = () => false;
  let elem = document.getElementById("bhCursorStyle") as HTMLStyleElement;
  if (elem == null) {
    elem = document.createElement("style");
    elem.id = "bhCursorStyle";
    elem.type = "text/css";
    document.head.appendChild(elem);
  }
  elem.textContent = `*,button,a{cursor:${cursor} !important;}`;
  return () => releaseCursor();
};

export const releaseCursor = () => {
  document.onselectstart = () => true;
  try {
    document.head.removeChild(document.getElementById("bhCursorStyle"));
  } catch { }
};