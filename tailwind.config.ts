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
		require("tailwindcss-animate"), // Add this for shadcn animations
		plugin(({ addComponents }) => {
			addComponents({
				".my-link": {
					"&:hover": {
						"@apply decoration-link decoration-2": {},
					},
					"@apply underline underline-offset-2": {},
				},
				".title": {
					"@apply text-2xl font-semibold text-accent-2": {},
				},
			});
		}),
	],
	theme: {
		// keyframes: {
		// },
		// animation: {
		//   slideIn: "slideIn .25s ease-in-out forwards var(--delay, 0)"
		// }

		extend: {
			keyframes: {
				slideDown: {
					from: {
						height: "0",
						opacity: "0",
					},
					to: { height: "var(--radix-collapsible-content-height)" },
				},
				slideUp: {
					from: { height: "var(--radix-collapsible-content-height)" },
					to: {
						height: "0",
						opacity: "0",
					},
				},
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
				slideiny: {
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
				// slidein: "slidein 1s ease 300ms",
				// slidein300: "slidein 1s ease 300ms forwards",
				// slidein500: "slidein 1s ease 500ms forwards",
				// slidein700: "slidein 1s ease 700ms forwards",
				// animation: {
				// fadeIn: "fadeIn 0.5s ease forwards var(--fade-delay, 0)",

				slideDown: "slideDown 300ms ease-out",
				slideUp: "slideUp 300ms ease-out",
				// slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
				// slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
				// slideIn: "slideIn 0.5s ease forwards var(--delay, 0)",
				// slideIn: "slideIn 1s ease forwards var(--slideIn-delay, 0)",
				// slideIn: "slideIn 1s ease-out forwards var(--slideIn-delay, 0)",
        slideIn: "slideIn 200ms cubic-bezier(0.2, 0, 0.2, 1) forwards var(--slideIn-delay, 0)",

				// slideInX: "slideInX 0.5s ease forwards var(--delay, 0)",
				slideiny: "slideiny 200ms ease var(--slideiny-delay, 0) forwards",
				// slideinx: "slideinx 1s ease var(--slideinx-delay, 0) forwards",
				// slideinxreverse: "slideinxreverse 1s ease var(--slideinxreverse-delay, 0) forwards",
				// "accordion-down": "accordion-down 0.2s ease-out",
				// "accordion-up": "accordion-up 0.2s ease-out",
			},
			colors: {
				accent: "hsl(var(--theme-accent) / <alpha-value>)",
				"accent-2": "hsl(var(--theme-accent-2) / <alpha-value>)",
				bgColor: "hsl(var(--theme-bg) / <alpha-value>)",
				link: "hsl(var(--theme-link) / <alpha-value>)",
				quote: "hsl(var(--theme-quote) / <alpha-value>)",
				textColor: "hsl(var(--theme-text) / <alpha-value>)",
				textColorFaded: "hsl(var(--theme-text-faded) / <alpha-value>)",
				textColorMoreFaded: "hsl(var(--theme-text-more-faded) / <alpha-value>)",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
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
				serif: ["Source Serif 4 Variable", ...fontFamily.serif],
				mono: ["JetBrains Mono Variable", ...fontFamily.mono],
			},
			// transitionProperty: {
			//   height: "height",
			// },
			// @ts-expect-error
			// Remove above once tailwindcss exposes theme type
			typography: (theme) => ({
				DEFAULT: {
					css: {
						// maxWidth: '0%', // add required value here
						a: {
							"@apply my-link": "",
						},
						blockquote: {
							borderLeftWidth: "0",
						},
						code: {
							border: "1px solid #666",
							borderRadius: "2px",
							"&::before": {
								content: '""',
							},
							"&::after": {
								content: '""',
							},
						},
						kbd: {
							"@apply dark:bg-textColor": "",
						},
						hr: {
							borderTopStyle: "solid",
						},
						strong: {
							fontWeight: "700",
						},
						sup: {
							"@apply ms-0.5": "",
							a: {
								"&:after": {
									content: "']'",
								},
								"&:before": {
									content: "'['",
								},
								"&:hover": {
									"@apply text-link no-underline bg-none": "",
								},
								"@apply bg-none": "",
							},
						},
						/* Table */
						"tbody tr": {
							borderBottomWidth: "none",
						},
						tfoot: {
							borderTop: "1px solid #666",
						},
						thead: {
							borderBottomWidth: "none",
						},
						"thead th": {
							borderBottom: "1px solid #666",
							fontWeight: "700",
						},
						'th[align="center"], td[align="center"]': {
							"text-align": "center",
						},
						'th[align="right"], td[align="right"]': {
							"text-align": "right",
						},
						'th[align="left"], td[align="left"]': {
							"text-align": "left",
						},
					},
				},
				baseProse: {
					css: {
						"--tw-prose-body": theme("colors.textColor / 1"),
						"--tw-prose-bold": theme("colors.textColor / 1"),
						"--tw-prose-bullets": theme("colors.textColor / 1"),
						"--tw-prose-code": theme("colors.textColor / 1"),
						"--tw-prose-headings": theme("colors.accent-2 / 1"),
						"--tw-prose-hr": "0.5px solid #666",
						"--tw-prose-links": theme("colors.textColor / 1"),
						"--tw-prose-quotes": theme("colors.quote / 1"),
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
