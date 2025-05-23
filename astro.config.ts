import fs from "node:fs";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
// import expressiveCode from "astro-expressive-code";
// import shiki from "@astrojs/markdown-remark";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import webmanifest from "astro-webmanifest";
import { defineConfig } from "astro/config";
import { siteConfig } from "./src/site.config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { transformerCopyButton } from "@rehype-pretty/transformers";
// import pdf from "astro-pdf";

// Remark plugins
import remarkDirective from "remark-directive"; /* Handle ::: directives as nodes */
import remarkUnwrapImages from "remark-unwrap-images";
import { remarkReadingTime } from "./src/plugins/remark-reading-time";
// import { rehypeCustomLinks } from "./src/plugins/rehype-custom-links";

import rehypePrettyCode from "rehype-pretty-code";

// Rehype plugins
// import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeExternalLinks from "rehype-external-links";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

// import { remarkCustomLinks } from "./src/plugins/remark-custom-links";

const monochromeThemes = {
	dark: {
		name: "monochrome-dark",
		type: "dark",
		colors: {
			"editor.background": "#27272a", // zinc-800
			"editor.foreground": "#d4d4d4",
		},
		tokenColors: [
			{
				scope: ["comment"],
				settings: { foreground: "#71717a" }, // zinc-500
			},
			{
				scope: ["string", "constant.numeric"],
				settings: { foreground: "#e4e4e7" }, // zinc-200
			},
			{
				scope: ["keyword", "storage.type", "storage.modifier"],
				settings: { foreground: "#d4d4d4" },
			},
			{
				scope: ["entity.name.function", "support.function"],
				settings: { foreground: "#f4f4f5" }, // zinc-100
			},
			{
				scope: ["variable", "support.variable"],
				settings: { foreground: "#d4d4d4" },
			},
		],
	},
	light: {
		name: "monochrome-light",
		type: "light",
		colors: {
			"editor.background": "#ffffff",
			"editor.foreground": "#525252", // neutral-600
		},
		tokenColors: [
			{
				scope: ["comment"],
				settings: { foreground: "#737373" }, // neutral-500
			},
			{
				scope: ["string", "constant.numeric"],
				settings: { foreground: "#404040" }, // neutral-700
			},
			{
				scope: ["keyword", "storage.type", "storage.modifier"],
				settings: { foreground: "#525252" }, // neutral-600
			},
			{
				scope: ["entity.name.function", "support.function"],
				settings: { foreground: "#262626" }, // neutral-800
			},
			{
				scope: ["variable", "support.variable"],
				settings: { foreground: "#525252" }, // neutral-600
			},
		],
	},
};

// https://astro.build/config
export default defineConfig({
	base: "/",
	i18n: {
		defaultLocale: "en",
		locales: ["en", "ko"],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [
		// pdf({
		// 	pages: {
		// 		"/about": true,
		// 	},
		// }),
		react({
			include: ["**/react/*"],
			experimentalReactChildren: true,
		}),
		// expressiveCode(expressiveCodeOptions),
		icon(),
		tailwind({
			applyBaseStyles: false,
			nesting: true,
		}),
		sitemap(),
		mdx(),
		robotsTxt(),
		webmanifest({
			// See: https://github.com/alextim/astro-lib/blob/main/packages/astro-webmanifest/README.md
			/**
			 * required
			 **/
			name: siteConfig.title,
			/**
			 * optional
			 **/
			short_name: "Ian's Blog",
			description: siteConfig.description,
			lang: siteConfig.lang,
			icon: "public/icon.png", // the source for generating favicon & icons
			icons: [
				{
					src: "icons/apple-touch-icon.png", // used in src/components/BaseHead.astro L:26
					sizes: "180x180",
					type: "image/png",
				},
				{
					src: "icons/icon-192.png",
					sizes: "192x192",
					type: "image/png",
				},
				{
					src: "icons/icon-512.png",
					sizes: "512x512",
					type: "image/png",
				},
			],
			start_url: "/",
			background_color: "#000000",
			theme_color: "#2bbc8a",
			display: "standalone",
			config: {
				insertFaviconLinks: false,
				insertThemeColorMeta: false,
				insertManifestLink: false,
			},
		}),
	],
	markdown: {
		syntaxHighlight: false,
		rehypePlugins: [
			[
				rehypePrettyCode,
				{
					theme: monochromeThemes.dark,
					keepBackground: true,
					transformers: [
						// Line diff annotations
						transformerCopyButton({
							feedbackDuration: 3_000,
						}),
					],
					onVisitLine(node: any) {
						if (node.children.length === 0) {
							node.children = [{ type: "text", value: " " }];
						}
					},
					onVisitHighlightedLine(node: any) {
						node.properties.className.push("highlighted");
					},
					onVisitHighlightedWord(node: any) {
						node.properties.className = ["word"];
					},
				},
			],
			[
				rehypeExternalLinks,
				{
					rel: ["nofollow, noreferrer"],
					target: "_blank",
				},
			],
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					content: {
						type: "raw",
						value:
							'<svg class="h-2 w-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>',
					},
					headingProperties: {
						className: ["anchor"],
					},
					properties: {
						className: ["anchor-link"],
					},
				},
			],
		],
		remarkPlugins: [remarkUnwrapImages, remarkReadingTime, remarkDirective],
		remarkRehype: {
			footnoteLabel: "",
			allowDangerousHtml: true,
			footnoteBackContent: "↩\u{FE0E}",
			footnoteLabelProperties: {
				className: [""],
			},
		},
	},

	// https://docs.astro.build/en/guides/prefetch/
	prefetch: true,
	site: "https://ianpark.dev/",
	vite: {
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
		plugins: [rawFonts([".ttf", ".woff"])],
	},
});

function rawFonts(ext: string[]) {
	return {
		name: "vite-plugin-raw-fonts",
		// @ts-expect-error:next-line
		transform(_, id) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null,
				};
			}
		},
	};
}
