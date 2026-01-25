import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setCount((c) => c - 1)}
      >
        -
      </Button>
      <span className="text-2xl font-bold tabular-nums min-w-[3ch] text-center">
        {count}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setCount((c) => c + 1)}
      >
        +
      </Button>
    </div>
  );
}
