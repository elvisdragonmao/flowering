// @ts-check
import { defineConfig } from "astro/config";

const [githubOwner, githubRepo] = process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const isGitHubPagesRoot = githubOwner && githubRepo === `${githubOwner}.github.io`;

// https://astro.build/config
export default defineConfig({
	site: githubOwner ? `https://${githubOwner}.github.io` : undefined,
	base: githubOwner && githubRepo && !isGitHubPagesRoot ? `/${githubRepo}` : undefined,
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
