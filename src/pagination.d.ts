import type { Page } from "astro";
/**
 * Takes a page and returns the page numbers that should be rendered.
 *
 * @param page {Page} The current page
 * @param windowSize {number} The number of page numbers that will be shown. It's best to choose an odd number.
 * @returns number[]
 */
export declare function getPageNumbers(page: Page, windowSize?: number): number[];
export declare function urlPatternToUrl(pattern: string, pageNumber: number, firstPageUrl?: string): string;
