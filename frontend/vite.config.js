import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr(), tailwindcss()],
	server: {
		port: 5171,
		proxy: {
			'/api': 'http://localhost:3001',
			'/auth': 'http://localhost:3001',
			'/project': 'http://localhost:3001',
			'/time': 'http://localhost:3001',
			'/user': 'http://localhost:3001',
			'/uploads': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				secure: false,
			},

			// и другие, если нужно
		},
	},
});
