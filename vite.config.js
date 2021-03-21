import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    reactRefresh(),
    VitePWA({
      strategies: 'injectManifest',
      injectRegister: false,
      injectManifest: {
        swSrc: './src/sw.js',
        swDest: './dist/sw.js'
      },
      manifest: {
        name: "Memoryfruit",
        short_name: "MemoryFruit",
        start_url: "/",
        display: "standalone",
        background_color: "#fff",
        description: "Practica tu memoria descubriendo los pares de frutas",
        icons: [
          {
            sizes: "410x404",
            src: "/src/favicon.svg",
            type: "image/x-icon"
          }],
      },

    })
  ]
})

