import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: true,
		port: 5173,
	},
	define: {
		"process.env": {
			VITE_SECURE_LOCAL_STORAGE_HASH_KEY:"966485331a538d4c07ab0a43ea646f030f18fbeb"
		}
	}
});
 