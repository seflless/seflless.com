import { useLayoutEffect, useState } from "react";
import { cursorToImageInfo, builtInCursors } from "./CursorList";

type CustomCursorProps = {
  cursorSize: number;
};

export function CustomCursor({ cursorSize }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentCursor, setCursor] = useState<string>("default");
  const [hasMoved, setHasMoved] = useState(false);

  useLayoutEffect(() => {
    const updatePosition = (e: PointerEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHasMoved(true);
    };

    window.addEventListener("pointermove", updatePosition);
    return () => window.removeEventListener("pointermove", updatePosition);
  }, []);

  useLayoutEffect(() => {
    const cursorUpdateIntervalToken = setInterval(() => {
      const element = document.elementFromPoint(position.x, position.y);
      const newCursorImage = element
        ? element.getAttribute("data-big-cursor")
        : null;
      const adjusted = newCursorImage || "default";
      setCursor(adjusted);
    }, 10);
    return () => {
      clearInterval(cursorUpdateIntervalToken);
    };
  }, [position]);

  const getCursorContent = (cursor: string, visible: boolean, key: number) => {
    if (currentCursor === "") {
      return null;
    }
    const scale = cursorSize / 200;
    const { url, x, y } = cursorToImageInfo(cursor);
    return (
      <img
        key={key}
        style={{
          marginLeft: -x * scale,
          marginTop: -y * scale,
          width: cursorSize,
          display: visible ? "inherit" : "none",
        }}
        src={url}
        alt=""
      />
    );
  };

  if (!hasMoved) {
    return null;
  }

  return (
    <div className="flex gap-4 pointer-events-none" style={{ pointerEvents: "none" }}>
      <div
        className="fixed pointer-events-none"
        style={{
          pointerEvents: "none",
          zIndex: 10000,
          left: position.x,
          top: position.y,
          width: 1000,
        }}
      >
        {builtInCursors.map(([name], index) => {
          return getCursorContent(name, name === currentCursor, index);
        })}
      </div>
    </div>
  );
}
