// @ts-check
import { defineConfig, envField } from "astro/config";
import storyblok from "@storyblok/astro";
// https://astro.build/config
import { loadEnv } from "vite";

import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

const { STORYBLOK_TOKEN } = loadEnv(
  process.env.NODE_ENV ?? "",
  process.cwd(),
  ""
);

export default defineConfig({
  integrations: [storyblok({
    accessToken: STORYBLOK_TOKEN,
    components: {
      page: "storyblok/Page",
      hero: "storyblok/Hero",
    },
    enableFallbackComponent: true,
    apiOptions: {
      region: "eu",
    },
  }), tailwind()],

  env: {
    schema: {
      STORYBLOK_TOKEN: envField.number({
        context: "server",
        access: "secret",
        optional: false,
      }),
    },
  },

  adapter: cloudflare(),
});