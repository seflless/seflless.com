import { useState } from "react";
import { CustomCursor } from "./Cursor";
import { CursorList } from "./CursorList";
import "./humongous-cursors.css";

const MinCursorSize = 10;
const RegularSized = 50;
const MaxCursorSize = 150;
const SliderGranularity = 1000.0;

function scaleToCursorSize(scale: number) {
  if (scale < 0.5) {
    const adjustedScale = scale * 2;
    return MinCursorSize + (RegularSized - MinCursorSize) * adjustedScale;
  } else {
    const adjustedScale = (scale - 0.5) * 2;
    return RegularSized + (MaxCursorSize - RegularSized) * adjustedScale;
  }
}

export function HumongousCursors() {
  const [cursorScale, setCursorScale] = useState(0.65);

  return (
    <div className="humongous-cursors min-h-screen bg-[rgb(200,255,200)] dark:bg-[rgb(30,60,30)] flex justify-center">
      <CustomCursor cursorSize={scaleToCursorSize(cursorScale)} />
      <div className="p-5 text-center flex flex-col items-center max-w-[800px]">
        <h1 className="text-4xl font-semibold my-2" data-big-cursor="text">
          Humongous Cursors
        </h1>
        <p
          className="text-sm text-black/50 dark:text-white/50"
          data-big-cursor="text"
        >
          Cursor design from{" "}
          <a
            href="https://www.figma.com/community/file/1166285742532409787"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black/70 dark:hover:text-white/70"
            data-big-cursor="pointer"
          >
            Cursors
          </a>{" "}
          by{" "}
          <a
            href="https://www.figma.com/@antonkartashov"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black/70 dark:hover:text-white/70"
            data-big-cursor="pointer"
          >
            Anton Kartashov
          </a>{" "}
          (CC BY 4.0)
        </p>

        <div className="flex flex-row items-center justify-center my-6">
          <span className="mx-4 text-xl">Tiny</span>
          <input
            type="range"
            value={cursorScale * SliderGranularity}
            min={0}
            max={SliderGranularity}
            onChange={(e) =>
              setCursorScale(parseFloat(e.target.value) / SliderGranularity)
            }
            className="w-48 accent-blue-500"
            data-big-cursor="pointer"
          />
          <span className="mx-4 text-xl">Humongous</span>
        </div>

        <div className="my-8">
          <h2 className="text-2xl font-medium my-2" data-big-cursor="text">
            Interaction Tests
          </h2>
          <p className="py-4" data-big-cursor="text">
            Try selecting this text.
          </p>
          <button
            data-big-cursor="pointer"
            className="mx-2 border border-black/20 dark:border-white/20 px-4 py-2 rounded bg-white dark:bg-gray-800 active:bg-blue-50 dark:active:bg-blue-900"
          >
            Press this button
          </button>
        </div>

        <div className="mt-8 mb-4">
          <h2 className="text-2xl font-medium my-2" data-big-cursor="text">
            Built-in CSS Cursors
          </h2>
          <p
            className="text-black/60 dark:text-white/60"
            data-big-cursor="text"
          >
            Hover to humongify
          </p>
        </div>

        <CursorList />
      </div>
    </div>
  );
}
