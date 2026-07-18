import { defineCliConfig } from "sanity/cli"

export default defineCliConfig({
  api: {
    projectId: "eh8b0fvx",
    dataset: "production",
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  typegen: {
    path: "../kvc-website/sanity/**/*.{ts,tsx,js,jsx}",
    schema: "schema.json",
    generates: "../kvc-website/sanity.types.ts",
    overloadClientMethods: true,
  },
})
