import { ThemeToggle } from "./ThemeToggle";

interface Props {
  className?: string;
}

export function ThemeRow({ className = "" }: Props) {
  return (
    <div
      className={`flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer ${className}`}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        const button = e.currentTarget.querySelector("button");
        if (button) button.click();
      }}
    >
      <span>Theme</span>
      <ThemeToggle />
    </div>
  );
}
