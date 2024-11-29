import { defineConfig } from 'vite';
import {copySrcFile, copySrcFolder} from "./utils/build-utils";

function moduleCopyPlugin() {
    return {
        name: 'copy-files',
        apply: 'build',

        buildEnd() {
            setTimeout(() => {
                copySrcFile('src/module.prod.json', 'module.json');
                copySrcFolder('src/art');
                copySrcFolder('src/templates');
                copySrcFolder('src/styles');
                copySrcFolder('src/lang');
            }, 1000)
        }
    }
}

export default defineConfig({
    plugins: [
        moduleCopyPlugin()
    ],
    build: {
        minify: 'terser',
        rollupOptions: {
            input: {
                common: './src/init.ts',
            },
            output: {
                entryFileNames: 'dices-and-cards-wfrp4.js'
            }
        },
        outDir: 'dist',
        emptyOutDir: false
    },
});
