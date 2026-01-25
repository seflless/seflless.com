import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LINK_REGISTRY_PATH = path.join(__dirname, "../__snapshots__/links.json");

interface LinkRegistry {
  pages: {
    [url: string]: {
      internalLinks: string[];
      externalLinks: string[];
      lastChecked: string;
    };
  };
}

function loadRegistry(): LinkRegistry {
  if (fs.existsSync(LINK_REGISTRY_PATH)) {
    return JSON.parse(fs.readFileSync(LINK_REGISTRY_PATH, "utf-8"));
  }
  return { pages: {} };
}

function saveRegistry(registry: LinkRegistry) {
  fs.mkdirSync(path.dirname(LINK_REGISTRY_PATH), { recursive: true });
  fs.writeFileSync(LINK_REGISTRY_PATH, JSON.stringify(registry, null, 2));
}

// Pages to check - add new pages here as they're created
const PAGES_TO_CHECK = [
  "/",
  "/about",
  "/blog",
  "/projects",
  "/resume",
  "/blog/hello-world",
  "/blog/interactive-islands",
  "/blog/custom-styles",
];

test.describe("Link Validation", () => {
  test("all internal links return 200", async ({ page, request }) => {
    const registry = loadRegistry();
    const checkedLinks = new Set<string>();
    const brokenLinks: { page: string; link: string; status: number }[] = [];

    for (const pageUrl of PAGES_TO_CHECK) {
      await page.goto(pageUrl);

      // Get all internal links on the page
      const links = await page.$$eval("a[href]", (anchors) =>
        anchors
          .map((a) => a.getAttribute("href"))
          .filter(
            (href): href is string =>
              href !== null &&
              !href.startsWith("http") &&
              !href.startsWith("mailto:") &&
              !href.startsWith("#")
          )
      );

      // Update registry
      registry.pages[pageUrl] = {
        internalLinks: links,
        externalLinks: await page.$$eval("a[href]", (anchors) =>
          anchors
            .map((a) => a.getAttribute("href"))
            .filter(
              (href): href is string =>
                href !== null && href.startsWith("http")
            )
        ),
        lastChecked: new Date().toISOString(),
      };

      // Check each internal link
      for (const link of links) {
        if (checkedLinks.has(link)) continue;
        checkedLinks.add(link);

        const response = await request.get(link);
        if (response.status() !== 200) {
          brokenLinks.push({
            page: pageUrl,
            link,
            status: response.status(),
          });
        }
      }
    }

    saveRegistry(registry);

    if (brokenLinks.length > 0) {
      console.error("Broken links found:");
      brokenLinks.forEach(({ page, link, status }) => {
        console.error(`  ${page} -> ${link} (${status})`);
      });
    }

    expect(brokenLinks).toHaveLength(0);
  });

  test("navigation links are consistent across pages", async ({ page }) => {
    const navLinks: { [pageUrl: string]: string[] } = {};

    for (const pageUrl of PAGES_TO_CHECK) {
      await page.goto(pageUrl);
      navLinks[pageUrl] = await page.$$eval("nav a[href]", (anchors) =>
        anchors.map((a) => a.getAttribute("href")).filter(Boolean) as string[]
      );
    }

    // All pages should have the same nav links
    const firstPageLinks = navLinks[PAGES_TO_CHECK[0]];
    for (const pageUrl of PAGES_TO_CHECK) {
      expect(navLinks[pageUrl]).toEqual(firstPageLinks);
    }
  });
});

test.describe("External Link Validation", () => {
  test.skip("external links are reachable", async ({ page, request }) => {
    // Skip in CI to avoid flaky tests from external services
    // Run manually: npx playwright test --grep "external links"
    const externalLinks = new Set<string>();

    for (const pageUrl of PAGES_TO_CHECK) {
      await page.goto(pageUrl);
      const links = await page.$$eval("a[href^='http']", (anchors) =>
        anchors.map((a) => a.getAttribute("href")).filter(Boolean) as string[]
      );
      links.forEach((link) => externalLinks.add(link));
    }

    const brokenExternal: { link: string; error: string }[] = [];

    for (const link of externalLinks) {
      try {
        const response = await request.head(link, { timeout: 10000 });
        if (response.status() >= 400) {
          brokenExternal.push({ link, error: `Status ${response.status()}` });
        }
      } catch (e) {
        brokenExternal.push({ link, error: String(e) });
      }
    }

    if (brokenExternal.length > 0) {
      console.warn("External link issues:");
      brokenExternal.forEach(({ link, error }) => {
        console.warn(`  ${link}: ${error}`);
      });
    }
  });
});
