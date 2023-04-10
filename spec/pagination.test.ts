import { describe, it } from "node:test";
import assert from "assert";

import type { Page } from "astro";
import { getPageNumbers, urlPatternToUrl } from "../src/pagination.js";

function getPage(options: Partial<Page> = {}): Page {
  const page: Page = {
    currentPage: 1,
    lastPage: 10,
    total: 1,
    data: [],
    start: 1,
    end: 1,
    size: 1,
    url: {
      current: "/blog",
      prev: undefined,
      next: undefined,
    },
  };
  return Object.assign({}, page, options);
}

describe("getting the page numbers", () => {
  describe("when there is only one page", () => {
    const page = getPage({
      currentPage: 1,
      lastPage: 1,
    });
    it("returns an array of 1", () => {
      const pageNumbers = getPageNumbers(page, 1);
      assert.deepStrictEqual(pageNumbers, [1]);
    });

    it("returns an array of 1 even if the windowSize is higher", () => {
      const pageNumbers = getPageNumbers(page, 10);
      assert.deepStrictEqual(pageNumbers, [1]);
    });
  });

  describe("when there are ten pages", () => {
    describe("when the windowSize is 1", () => {
      it("returns just the current page", () => {
        const page = getPage({});
        const pageNumbers = getPageNumbers(page, 1);
        assert.deepStrictEqual(pageNumbers, [1]);
        const page2 = getPage({
          currentPage: 5,
          lastPage: 10,
        });
        const page2Numbers = getPageNumbers(page2, 1);
        assert.deepStrictEqual(page2Numbers, [5]);
      });
    });
    describe("when the windowSize is 3", () => {
      it("returns the first 3 pages, when the current page is 1", () => {
        const page = getPage({
          currentPage: 1,
          lastPage: 10,
        });

        const pageNumbers = getPageNumbers(page, 3);
        assert.deepStrictEqual(pageNumbers, [1, 2, 3]);
      });

      it("returns the first 3 pages, when the current page is 2", () => {
        const page = getPage({
          currentPage: 2,
          lastPage: 10,
        });

        const pageNumbers = getPageNumbers(page, 3);
        assert.deepStrictEqual(pageNumbers, [1, 2, 3]);
      });

      it("returns pages 2, 3 and 4 when the current page is 3", () => {
        const page = getPage({
          currentPage: 3,
          lastPage: 10,
        });

        const pageNumbers = getPageNumbers(page, 3);
        assert.deepStrictEqual(pageNumbers, [2, 3, 4]);
      });

      it("returns the last 3 pages when the current page is the last page", () => {
        const page = getPage({
          currentPage: 10,
          lastPage: 10,
        });

        const pageNumbers = getPageNumbers(page, 3);
        assert.deepStrictEqual(pageNumbers, [8, 9, 10]);
      });

      it("returns the last 3 pages when the current page is the second to last page", () => {
        const page = getPage({
          currentPage: 9,
          lastPage: 10,
        });

        const pageNumbers = getPageNumbers(page, 3);
        assert.deepStrictEqual(pageNumbers, [8, 9, 10]);
      });

      it("returns 7, 8, 9 when the current page is 8", () => {
        const page = getPage({
          currentPage: 8,
          lastPage: 10,
        });

        const pageNumbers = getPageNumbers(page, 3);
        assert.deepStrictEqual(pageNumbers, [7, 8, 9]);
      });
    });
  });
});

describe("urlPatternToUrl", () => {
  describe("with just a pattern", () => {
    it("removes the pattern for the first page", () => {
      assert.strictEqual(urlPatternToUrl("/blog/page/{}", 1), "/blog/page/");
    });

    it("replaces the pattern with the current page, beyond page 1", () => {
      assert.strictEqual(urlPatternToUrl("/blog/page/{}", 2), "/blog/page/2");
      assert.strictEqual(
        urlPatternToUrl("/blog/page/{}", 150),
        "/blog/page/150"
      );
    });
  });

  describe("with a different first URL", () => {
    it("uses the first URL for the first page", () => {
      assert.strictEqual(
        urlPatternToUrl("/blog/page/{}", 1, "/blog/"),
        "/blog/"
      );
    });

    it("replaces the pattern with the current page, beyond page 1", () => {
      assert.strictEqual(
        urlPatternToUrl("/blog/page/{}", 2, "/blog/"),
        "/blog/page/2"
      );
      assert.strictEqual(
        urlPatternToUrl("/blog/page/{}", 150, "/blog/"),
        "/blog/page/150"
      );
    });
  });
});
