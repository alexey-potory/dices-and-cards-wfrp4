import { defineConfig } from 'vite';
import {copySrcFile, copySrcFolder, copyDistToWindowsAppdata} from "./utils/build-utils";

function fileMarkerPlugin() {
    return {
        name: 'file-marker-plugin',

        transform(code, id) {
            const path = require('path');

            const basePath = __dirname;
            const relative = path.relative(basePath + '/src', id);

            const comment = `/*! --- ${relative} --- */\n`;
            return {
                code: comment + code,
                map: null
            };
        }
    };
}

function moduleCopyPlugin() {
    return {
        name: 'copy-files',
        apply: 'build',

        buildEnd() {
            setTimeout(() => {
                const path = require('path');

                copySrcFile('src/module.json');

                copySrcFolder('src/art');
                copySrcFolder('src/templates');
                copySrcFolder('src/styles');
                copySrcFolder('src/lang');

                // Uncomment the next line if you want Vite to 
                // automatically copy the built module to your Foundry appdata directory.
                
                // copyDistToWindowsAppdata('dices-and-cards-wfrp4');
            }, 1000)
        }
    }
}

export default defineConfig({
    plugins: [
        fileMarkerPlugin(),
        moduleCopyPlugin()
    ],
    build: {
        minify: false,
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
