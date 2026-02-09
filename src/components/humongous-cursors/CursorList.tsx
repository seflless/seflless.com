type CursorInfoEntry = [name: string, imagePath: string, x: number, y: number];
type CursorInfo = {
  url: string;
  x: number;
  y: number;
};

// Maps cursor name to MDN image filename and hotspot coordinates
// Hotspot coordinates are for the SVG cursors (used by CustomCursor)
export const builtInCursors: CursorInfoEntry[] = [
  ["default", "left_ptr", 51, 7],
  ["context-menu", "context-menu", 27, 22],
  ["help", "question_arrow", 100, 84],
  ["pointer", "hand2", 65, 26],
  ["progress", "left_ptr_watch", 53, 8],
  ["wait", "left_ptr_watch", 53, 8],
  ["cell", "cross", 100, 100],
  ["crosshair", "cross", 100, 100],
  ["text", "xterm", 100, 103],
  ["vertical-text", "vertical-text", 104, 100],
  ["alias", "link", 148, 31],
  ["copy", "copy", 53, 8],
  ["move", "all-scroll", 100, 100],
  ["no-drop", "dnd_no_drop", 100, 100],
  ["not-allowed", "X_cursor", 100, 100],
  ["grab", "hand1", 100, 49],
  ["grabbing", "move", 104, 49],
  ["all-scroll", "all-scroll", 99, 99],
  ["col-resize", "sb_h_double_arrow", 100, 100],
  ["row-resize", "sb_v_double_arrow", 100, 100],
  ["n-resize", "sb_up_arrow", 100, 100],
  ["e-resize", "sb_right_arrow", 100, 100],
  ["s-resize", "sb_down_arrow", 100, 100],
  ["w-resize", "sb_left_arrow", 100, 100],
  ["ne-resize", "ur_angle", 100, 100],
  ["nw-resize", "ul_angle", 100, 100],
  ["se-resize", "lr_angle", 100, 100],
  ["sw-resize", "ll_angle", 100, 100],
  ["ew-resize", "left_side", 100, 100],
  ["ns-resize", "top_side", 100, 100],
  ["nesw-resize", "bottom_left_corner", 100, 100],
  ["nwse-resize", "bottom_right_corner", 100, 100],
  ["zoom-in", "zoom-in", 78, 77],
  ["zoom-out", "zoom-out", 78, 77],
];

export function cursorToImageInfo(builtInCursorName: string): CursorInfo {
  const infoEntry = builtInCursors.find(
    (cursor) => cursor[0] === builtInCursorName
  );
  if (!infoEntry) {
    return cursorToImageInfo("default");
  }
  const [, url, x, y] = infoEntry;

  return {
    url: `/cursors/${url}.svg`,
    x,
    y,
  };
}

// Maps cursor names to MDN image filenames
function getMdnCursorImage(cursorName: string): string {
  const remaps: Record<string, string> = {
    "ew-resize": "3-resize",
    "ns-resize": "6-resize",
    "nesw-resize": "1-resize",
    "nwse-resize": "4-resize",
  };
  const filename = remaps[cursorName] || cursorName;
  const extension = cursorName === "context-menu" ? "png" : "gif";
  return `/mdn-cursors/${filename}.${extension}`;
}

export function CursorList() {
  return (
    <div className="w-full max-w-sm text-left">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-black/10 dark:border-white/10">
            <th className="py-2 px-3 text-left text-sm font-medium text-black/60 dark:text-white/60">Name</th>
            <th className="py-2 px-3 text-center text-sm font-medium text-black/60 dark:text-white/60">Icon</th>
          </tr>
        </thead>
        <tbody>
          {builtInCursors.map(([cursor]) => (
            <tr
              key={cursor}
              data-big-cursor={cursor}
              className="border-b border-black/5 dark:border-white/5"
            >
              <td className="py-2 px-3" data-big-cursor={cursor}>
                <code className="text-sm bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded" data-big-cursor={cursor}>
                  {cursor}
                </code>
              </td>
              <td className="py-2 px-3 text-center" data-big-cursor={cursor}>
                <img
                  data-big-cursor={cursor}
                  className="w-auto h-6 inline-block"
                  src={getMdnCursorImage(cursor)}
                  alt={cursor}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
