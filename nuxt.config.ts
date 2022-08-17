import { defineNuxtConfig } from "nuxt";

const processEnv = {
  define: {
    "process.env.DEBUG": false,
  },
};
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["vuetify/lib/styles/main.sass", "mdi/css/materialdesignicons.min.css"],
  build: {
    transpile: ["vuetify"],
  },
  vite: processEnv,
  buildModules: ["@nuxtjs/strapi"],
  strapi: {
    // Options
    url: process.env.STRAPI_URL || "https://strapi.toccatech.com", // http://localhost:1337
    prefix: "/api",
    version: "v4",
    cookie: {},
  },
});
