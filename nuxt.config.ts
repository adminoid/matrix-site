// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import getRuntimeConfig from './config/runtime'

export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  css: [
    '@/assets/sass/global.sass',
  ],

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  },

  runtimeConfig: getRuntimeConfig(),
  compatibilityDate: '2024-07-04',
})