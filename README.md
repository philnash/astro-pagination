## 🚀 Astro Pagination

A flexible, accessible `<Pagination>` component for displaying links to next, previous, first, last and a window of pages in your Astro site.

## Installation

Install the component using npm:

```
npm install @philnash/astro-pagination
```

## Usage

If you are displaying a page that uses the `Page` type, you can pass that `Page` to this component and it will render a set of links to other pages.


```astro
---
type Props = {
  page: Page<CollectionEntry<"blog">>;
};

const { page } = Astro.props;
---

<Pagination page={page} urlPattern={"/blog/page/{}"}>
```

### Options and advanced usage

TODO