# Sanity Astro Template

A small customized Sanity + Astro starter with the following things out of the box:

- Type generation for queries, schemas, etc.
- Page editor support with the help of [`@tinloof/sanity-studio`](https://github.com/tinloof/sanity-kit/tree/main/packages/sanity-studio#tinloofsanity-studio) of the [`sanity-kit`](https://github.com/tinloof/sanity-kit) by [Tinloof](https://tinloof.com/)!
- Typed functions to handle loading queries with [`stega`](https://www.sanity.io/docs/visual-editing/stega) for the presentation tool.
- Typed GROQ queries with the help of [`groqd`](https://nearform.com/open-source/groqd/).
- Portable Text support via [`astro-portabletext`](https://github.com/theisel/astro-portabletext) and some custom block components to create aligned text and images / external images with alt text.
- [TailwindCSS](https://tailwindcss.com/) and [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography) (will be useful when rendering markdown or portable text).

Based on the Astro Basic Starter Template and the [Sanity Astro Integration guide](https://www.sanity.io/plugins/sanity-astro):

```sh
create astro@latest -- --template basics
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |
| `pnpm schema`          | Create Sanity Schemas                            |
| `pnpm typegen`         | Create Sanity Types                              |
| `pnpm gen`             | Alias for `pnpm schema && pnpm typegen`          |

## Configuration

Add your sanity variables into `sanity.env.ts`:

```ts
// These variables are safe to be public in case you push them
export const SANITY_ENV = {
  dataset: "", // Your dataset, usually `production` by default
  projectId: "", // Your sanity key
} as const;
```

and add your `.env` variables:

```env
SANITY_API_READ_TOKEN="" # Get it from your sanity project
SANITY_STUDIO_PREVIEW_URL="http://localhost:4321" # Override this on production to your site's URL.
PUBLIC_SANITY_VISUAL_EDITING_ENABLED="true" # Boolean to enable / disable visual editing
```

## Why?

This is an opinionated starter kit based / inspired on the [Tinloof Sanity Kit `with-sections` example](https://github.com/tinloof/sanity-kit/tree/main/examples/with-sections), but using Astro instead of Next.js.

This is done for better support for projects that are static webpages, on the lighter side of bundles or want to incorporate other frameworks instead of React.

## Caveats:

- You might need to refresh the page preview multiple times when switching pages on the studio.
- Why not follow the [types setup of the guide](https://www.sanity.io/plugins/sanity-astro#adding-types-for-sanityclient)? This is due to how the experimental type generation is setup, the types of the global client would not reference the correct package, so it basically reimplements the plugin's behavior.
- Due to how routing works in Astro and how the Sanity plugin is implemented, if you want the studio to live within your Astro site and use a catch all route for the pages, the workaround (that I found for now) is tying the studio into a subroute (see the default [config](astro.config.mjs) where the route is `/sanity/admin` and feel free to [check the source](https://github.com/sanity-io/sanity-astro/blob/main/packages/sanity-astro/src/vite-plugin-sanity-studio.ts) to understand why).
- You might see some images missing from the original repo, view the example to add them or feel free to add your own!
