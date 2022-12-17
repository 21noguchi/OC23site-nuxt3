// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head: {
      title: "2023年度オリエンテーション委員会",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ],
      link: [
        { rel: "icon", type: "image/ico", href: "/favicon.ico" }
      ],
    },
    baseURL: "/ori/2023/visitor"
  },
  typescript: {
    strict: true
  },
  imports: {
    dirs: [
      'composables/**'
    ]
  },
  css: ["assets/styles/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: [
            '@use "assets/styles/_devices.scss" as *; @use "assets/styles/_colors.scss" as *;',
          ]
        }
      }
    }
  }
})
