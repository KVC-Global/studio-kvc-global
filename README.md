# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

## Online program content

In each OTHM, QUALIFI or Wolverhampton language document, open the content tab and the programs section. `Subjects heading (Tiêu đề môn học)` and `Entry requirements heading (Tiêu đề điều kiện đầu vào)` set the two headings for every program in that section. Leave either blank to use the website's language-specific default. Edit the actual subject list and admission requirements inside each item in `Programs`; these existing fields are separate from the headings. The generic online program schema shares these fields.

After schema changes, run `pnpm exec sanity schema extract --force --enforce-required-fields` and `pnpm exec sanity typegen generate`, then include `schema.json` and the website's generated types with the corresponding code changes. Required-field enforcement preserves the website's existing shared-content contracts. If typegen cannot resolve the website's Prettier plugin from the Studio directory, format `sanity.types.ts` from `kvc-website` with `pnpm exec prettier --write sanity.types.ts`. Deploy the Studio and website before expecting new fields to be editable and visible on the hosted sites.
