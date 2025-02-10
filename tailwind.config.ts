import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	safelist: ["animate-expand", "animate-collapse"], // Ensure these classes aren’t purged
	corePlugins: {
		// disable some core plugins as they are included in the css, even when unused
		borderOpacity: false,
		fontVariantNumeric: false,
		ringOffsetColor: false,
		ringOffsetWidth: false,
		scrollSnapType: false,
		textOpacity: false,
		touchAction: false,
	},
	darkMode: ["class", '[data-theme="dark"]'],
	// darkMode: ['selector', '[data-theme="dark"]'],
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-animate"),
		plugin(({ addComponents }) => {
			addComponents({
				".my-link": {
					"&[href^='http']::after": {
						content: '""',
						"@apply ml-0.5 inline-block h-3 w-3 bg-current": {},
						"mask-image":
							"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='7' y1='17' x2='17' y2='7'%3E%3C/line%3E%3Cpolyline points='7 7 17 7 17 17'%3E%3C/polyline%3E%3C/svg%3E\")",
					},
					"&:hover": {
						"@apply decoration-secondary bg-secondary text-secondary-foreground": {},
					},
					"@apply underline decoration-1 leading-none align-baseline font-normal text-foreground decoration-ring underline-offset-4 transition-all -mx-1 -my-1 rounded-md p-1":
						{},
				},
				".my-link-no-icon": {
					"&:hover": {
						"@apply decoration-secondary bg-secondary text-secondary-foreground": {},
					},
					"@apply underline leading-none decoration-1 align-baseline font-normal text-foreground -mx-1 -my-1 decoration-ring underline-offset-4 transition-all -mx-1 rounded-md p-1":
						{},
				},
				".title": {
					"@apply text-2xl font-semibold text-accent-foreground": {},
				},
			});
		}),
	],
	theme: {
		extend: {
			keyframes: {
				slideIn: {
					from: {
						opacity: "0",
						transform: "translateY(10px)",
					},
					to: {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
			},
			animation: {
				slideIn: "slideIn 300ms cubic-bezier(0.2, 0, 0.2, 1) forwards var(--slideIn-delay, 0)",
			},
			colors: {
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				faded: {
					DEFAULT: "hsl(var(--faded))",
					foreground: "hsl(var(--faded-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				logo: {
					DEFAULT: "hsl(var(--logo))",
					foreground: "hsl(var(--logo-foreground))",
					accent: {
						DEFAULT: "hsl(var(--logo-accent))",
						foreground: "hsl(var(--logo-accent-foreground))",
					},
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				// Add any custom fonts here
				// sans: [...fontFamily.sans],
				sans: ["Inter Variable", ...fontFamily.sans],
				serif: ['"Source Serif 4 Variable"', ...fontFamily.serif], // Note the extra quotes
				mono: ["JetBrains Mono Variable", ...fontFamily.mono],
				fun: ["Alice", ...fontFamily.serif],
				logo: ["Playfair Display Variable", ...fontFamily.serif],
				italic: ["Newsreader", ...fontFamily.serif],
			},
			// transitionProperty: {
			//   height: "height",
			// },
			// @ts-expect-error
			// Remove above once tailwindcss exposes theme type
			typography: (theme) => ({
				DEFAULT: {
					css: {
						"h1, h2, h3, h4, h5, h6": {
							"@apply mt-12": {},
							fontFamily: '"Source Serif 4 Variable", serif',
						},

						h1: {
							"@apply text-xl font-normal": {},
						},
						h2: {
							"@apply text-lg font-normal": {},
						},
						h3: {
							"@apply text-lg font-normal": {},
						},
						h4: {
							"@apply text-lg font-normal": {},
						},
						h5: {
							"@apply text-lg font-normal": {},
						},
						h6: {
							"@apply text-lg font-normal": {},
						},
						a: {
							"@apply my-link": {},
						},
						em: {
							"@apply font-italic italic text-[1.1rem]": {},
						},
						"blockquote > p::before": {
							content: '""',
						},
						"blockquote > p::after": {
							content: '""',
						},
						"blockquote > p:nth-of-type(2)": {
							"@apply text-right": {},
						},
						blockquote: {
							"@apply border-l font-normal font-light": {},
						},
						code: {
							"@apply border-ring rounded border p-1 font-normal": {},
							"&::before": {
								"@apply hidden": {},
								content: '""',
							},
							"&::after": {
								"@apply hidden": {},
								content: '""',
							},
						},
						":not(pre) > code": {
							"@apply align-baseline relative -top-[0.05em] px-1 py-0.5 text-sm font-semibold": {},
						},
						"pre code": {
							"@apply font-mono text-sm leading-relaxed": {},
						},
						kbd: {
							"@apply dark:bg-foreground px-2 py-0.5": {},
						},
						".footnotes": {
							"@apply text-sm": {},
							"&:before": {
								"@apply block mx-auto border-t border-gray-500": {},
								content: '""',
								width: "50%", // Changed from w-1/2
								margin: "4.5rem auto 4rem auto", // Keeping as raw CSS since it's a complex value
							},
							"& > ol > li": {
								"@apply my-0": {},
							},
						},
						strong: {
							"@apply font-[550] text-accent-foreground": {},
						},
						sup: {
							"@apply ms-0.5": {},
							a: {
								"@apply bg-none": {},
								"&:after": {
									content: "']'",
								},
								"&:before": {
									content: "'['",
								},
								"&:hover": {
									"@apply text-accent-foreground": {},
								},
							},
						},
						/* Table */
						"tbody tr": {
							"@apply border-b-0": {},
						},
						tfoot: {
							"@apply border-t border-[#666]": {},
						},
						thead: {
							"@apply border-b-0": {},
						},
						"thead th": {
							"@apply border-b border-[#666] font-semibold": {},
						},
						'th[align="center"], td[align="center"]': {
							"@apply text-center": {},
						},
						'th[align="right"], td[align="right"]': {
							"@apply text-right": {},
						},
						'th[align="left"], td[align="left"]': {
							"@apply text-left": {},
						},
					},
				},
				baseProse: {
					css: {
						"--tw-prose-body": theme("colors.foreground / 1"),
						"--tw-prose-bold": theme("colors.accent.foreground / 1"),
						"--tw-prose-bullets": theme("colors.ring / 1"),
						"--tw-prose-counters": theme("colors.ring / 1"),
						"--tw-prose-code": theme("colors.foreground / 1"),
						"--tw-prose-headings": theme("colors.accent.foreground / 1"),
						"--tw-prose-hr": "0.5px solid #666",
						"--tw-prose-links": theme("colors.foreground / 1"),
						"--tw-prose-quotes": theme("colors.muted.foreground / 1"),
						"--tw-prose-th-borders": "#666",
					},
				},
				sm: {
					css: {
						code: {
							fontSize: theme("fontSize.sm")[0],
							fontWeight: "400",
						},
					},
				},
			}),
		},
	},
} satisfies Config;
