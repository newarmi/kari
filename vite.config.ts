import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import svgLoader from "vite-plugin-vue-svg"


export default defineConfig({
    plugins: [
        vue(),
        svgLoader({
            defaultImport: 'component', // Импорт SVG как компонента
        }),
    ],
})
