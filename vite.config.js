import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import vitePluginSvgr from 'vite-plugin-svgr';

dotenv.config(); // load env vars from .env

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        sourcemap: true,
    },
    plugins: [react(), vitePluginSvgr()],
    server: {
        host: true,
        port: 5173,
    },
    define: {
        'process.env': {
            VITE_SECURE_LOCAL_STORAGE_HASH_KEY: '966485331a538d4c07ab0a43ea646f030f18fbeb',
        },
    },
    hmr: {
        host: 'localhost',
    },
});
