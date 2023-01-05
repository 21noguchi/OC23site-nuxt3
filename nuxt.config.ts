// https://nuxt.com/docs/api/configuration/nuxt-config
const nodeEnv = require(`./env/node.${process.env.NODE_ENV ? process.env.NODE_ENV : "development"}`);
const localEnv = require("./env/local");
export default defineNuxtConfig({
  devServer: {
    url: nodeEnv.BASE_URL
  },
  runtimeConfig: {
    public: {
      nodeEnv: nodeEnv,
      localEnv: localEnv
    }
  },
  app:{
    head: {
      title: "2023年度オリエンテーション委員会",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ],
      link: [
        { rel: "icon", type: "image/ico", href: `${nodeEnv.BASE_PATH}/favicon.ico` }
      ],
    },
    baseURL: nodeEnv.BASE_PATH
  },
  typescript: {
    strict: true
  },
  imports: {
    dirs: [
      'composables/**',
      'utils/**'
    ]
  },
  css: ["assets/styles/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: [
            '@use "assets/styles/_devices.scss" as *; @use "assets/styles/_colors.scss" as *; @use "assets/styles/_common.scss" as *;',
          ]
        }
      }
    }
  }
})
