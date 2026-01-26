import { useState } from "react";
import { CustomCursor } from "./Cursor";
import { CursorList } from "./CursorList";

const MinCursorSize = 5;
const RegularSized = 20;
const MaxCursorSize = 250;
const ResizeGranularity = 1000.0;

function scaleToCursorSize(scale: number) {
  if (scale < 0.5) {
    const adjustedScale = scale * 2;
    return MinCursorSize + (RegularSized - MinCursorSize) * adjustedScale;
  } else {
    const adjustedScale = (scale - 0.5) * 2;
    return RegularSized + (MaxCursorSize - RegularSized) * adjustedScale;
  }
}

export function ResizableCursors() {
  const [cursorScale, setCursorScale] = useState(0.7);

  return (
    <div className="min-h-screen bg-[rgb(200,255,200)] dark:bg-[rgb(30,60,30)] flex justify-center">
      <CustomCursor cursorSize={scaleToCursorSize(cursorScale)} />
      <div className="p-5 text-center flex flex-col items-center max-w-[800px]">
        <h1
          className="text-4xl font-semibold my-2"
          data-big-cursor="text"
        >
          Resizable Cursors
        </h1>

        <div className="flex flex-row items-center justify-center my-6">
          <span className="mx-4 text-xl">Tiny</span>
          <input
            type="range"
            value={cursorScale * ResizeGranularity}
            min={0}
            max={ResizeGranularity}
            onChange={(e) =>
              setCursorScale(parseFloat(e.target.value) / ResizeGranularity)
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
          <p className="text-black/60 dark:text-white/60" data-big-cursor="text">
            Hover to humongify
          </p>
        </div>

        <CursorList />
      </div>
    </div>
  );
}
