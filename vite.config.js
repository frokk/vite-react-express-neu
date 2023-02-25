import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	base: './',
	root: './react/',
	build: {
		lib: {
			entry: 'main.jsx',
			name: 'App',
			fileName: 'app'
		},
		minify: 'esbuild',
		ssr: false,
		target: 'es6',
		reportCompressedSize: true,
		outDir: '../www/build/', // relative from ./react directory
		emptyOutDir: true
	},
	plugins: [
		react({
			//include: "./react/src/**/*.jsx", // This won't work since the root is already set to
			// ./react insead we will remove the ./react and just use a relative path to the root
			include: '**/*.jsx', // This includes all the .jsx files under src correctly
		}),
	],
});


