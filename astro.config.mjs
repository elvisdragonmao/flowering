// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	base: "",
	vite: {
		build: {
			chunkSizeWarningLimit: 700,
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes("/node_modules/") && id.includes("three")) {
							return "vendor-three";
						}

						if (id.includes("/node_modules/") && (id.includes("gsap") || id.includes("lenis"))) {
							return "vendor-animation";
						}
					}
				}
			}
		}
	}
});
