import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
  href: string;
  label: string;
}

interface Props {
  items: NavItem[];
  currentPath: string;
}

export function MobileNav({ items, currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) =>
    currentPath === href || (href !== "/" && currentPath.startsWith(href));

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 -mr-2 text-foreground"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 min-w-[120px] rounded-lg border border-border bg-background p-2 shadow-lg space-y-1">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive(item.href)
                    ? "text-foreground font-medium bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div
              className="px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent flex items-center justify-between cursor-pointer"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("button")) return;
                const button = e.currentTarget.querySelector("button");
                if (button) button.click();
              }}
            >
              <span>Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
