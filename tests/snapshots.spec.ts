import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SNAPSHOTS_DIR = path.join(__dirname, "../__snapshots__/html");

// Blog posts to snapshot - these should NOT change unless intentionally updated
// Add new posts here when they're "locked in" and shouldn't change
const POSTS_TO_SNAPSHOT = [
  "/blog/hello-world",
  "/blog/interactive-islands",
  "/blog/custom-styles",
];

// All pages to snapshot (for visual regression)
const PAGES_TO_SNAPSHOT = [
  "/",
  "/about",
  "/blog",
  "/projects",
  "/resume",
  ...POSTS_TO_SNAPSHOT,
];

function getSnapshotPath(url: string, type: "html" | "visual"): string {
  const filename = url === "/" ? "index" : url.replace(/\//g, "-").slice(1);
  const ext = type === "html" ? "html" : "png";
  return path.join(SNAPSHOTS_DIR, `${filename}.${ext}`);
}

function extractMainContent(html: string): string {
  // Extract just the main content, ignoring dynamic parts
  // Remove script tags, style tags with hashes, and other dynamic content
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/data-astro-[^=]*="[^"]*"/g, "")
    .replace(/data-vite-[^=]*="[^"]*"/g, "")
    .replace(/<style[^>]*data-vite[^>]*>[\s\S]*?<\/style>/gi, "")
    // Extract main content only
    .match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
}

test.describe("HTML Snapshots", () => {
  test.describe.configure({ mode: "serial" });

  for (const pageUrl of POSTS_TO_SNAPSHOT) {
    test(`snapshot: ${pageUrl}`, async ({ page }) => {
      await page.goto(pageUrl);
      await page.waitForLoadState("networkidle");

      const mainContent = await page.$eval("main", (el) => el.innerHTML);
      const snapshotPath = getSnapshotPath(pageUrl, "html");

      // Normalize the content for comparison
      const normalizedContent = extractMainContent(mainContent)
        .replace(/\s+/g, " ")
        .trim();

      if (process.env.UPDATE_SNAPSHOTS) {
        // Update mode: save new snapshot
        fs.mkdirSync(path.dirname(snapshotPath), { recursive: true });
        fs.writeFileSync(snapshotPath, normalizedContent);
        console.log(`Updated snapshot: ${snapshotPath}`);
      } else if (fs.existsSync(snapshotPath)) {
        // Compare mode: check against existing snapshot
        const existingSnapshot = fs.readFileSync(snapshotPath, "utf-8");

        if (normalizedContent !== existingSnapshot) {
          // Write diff file for debugging
          const diffPath = snapshotPath.replace(".html", ".diff.html");
          fs.writeFileSync(diffPath, `<!-- EXPECTED -->\n${existingSnapshot}\n\n<!-- ACTUAL -->\n${normalizedContent}`);

          expect(normalizedContent).toBe(existingSnapshot);
        }
      } else {
        // First run: create snapshot
        fs.mkdirSync(path.dirname(snapshotPath), { recursive: true });
        fs.writeFileSync(snapshotPath, normalizedContent);
        console.log(`Created snapshot: ${snapshotPath}`);
      }
    });
  }
});

test.describe("Visual Snapshots", () => {
  // Visual snapshots catch CSS/layout changes
  // These use Playwright's built-in screenshot comparison

  for (const pageUrl of PAGES_TO_SNAPSHOT) {
    test(`visual: ${pageUrl}`, async ({ page }) => {
      await page.goto(pageUrl);
      await page.waitForLoadState("networkidle");

      // Wait for fonts and images to load
      await page.waitForTimeout(500);

      const filename = pageUrl === "/" ? "index" : pageUrl.replace(/\//g, "-").slice(1);

      await expect(page).toHaveScreenshot(`${filename}.png`, {
        fullPage: true,
        // Allow small differences for anti-aliasing
        maxDiffPixelRatio: 0.01,
      });
    });
  }
});

test.describe("Post Content Integrity", () => {
  test("posts have required elements", async ({ page }) => {
    for (const postUrl of POSTS_TO_SNAPSHOT) {
      await page.goto(postUrl);

      // Check for required post elements
      await expect(page.locator("article h1")).toBeVisible();
      await expect(page.locator("article time")).toBeVisible();
      await expect(page.locator("a[href='/blog']")).toBeVisible(); // Back link
    }
  });

  test("posts content is preserved", async ({ page }) => {
    // Specific content checks for known posts
    // Add checks here as you "lock in" posts

    // Hello World post
    await page.goto("/blog/hello-world");
    await expect(page.locator("h1")).toContainText("Hello World");
    await expect(page.locator("article")).toContainText("Welcome");

    // Interactive Islands post
    await page.goto("/blog/interactive-islands");
    await expect(page.locator("h1")).toContainText("Interactive");
    // Check that the counter component is present
    await expect(page.locator("article button")).toBeVisible();

    // Custom Styles post
    await page.goto("/blog/custom-styles");
    await expect(page.locator("h1")).toContainText("Custom");
  });
});
