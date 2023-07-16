import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({ include: ['src/components/DataCreateForm.vue', 'src/components/DataUpdateForm.vue', 'src/factory/*.ts', 'src/types/index.ts', "src/FormkitBuilder.ts"], }),
    svgLoader()
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: ["./src/FormkitBuilder.ts", "./src/types/index.ts"],
      formats: ["es", "cjs"],
      name: "FormkitBuilder",
      fileName: (format, entry) => {
        // console.log(entry)
        return format === `es` ? `${entry}.js` : `${entry}.cjs`
      }
    },
    rollupOptions: {
      external: ["vue",
        "@formkit/icons",
        "@formkit/pro",
        "@formkit/vue",
        "@formkit/vue",
        "primevue",
        "vue-i18n",
        "vue-router"
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
