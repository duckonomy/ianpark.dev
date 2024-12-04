import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}",
  ],
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
        slideIn: {
          from: {
            opacity: "0",
            transform: "translateY(100%)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideInX: {
          from: {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        slideiny: {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },

        },
        slideinx: {
          from: {
            opacity: "0",
            transform: "translateX(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },

        },
        slideinxreverse: {
          from: {
            opacity: "0",
            transform: "translateX(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },

        },
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },

        },
      },
      animation: {
        // slidein: "slidein 1s ease 300ms",
        // slidein300: "slidein 1s ease 300ms forwards",
        // slidein500: "slidein 1s ease 500ms forwards",
        // slidein700: "slidein 1s ease 700ms forwards",
        // animation: {
        fadeIn: "fadeIn 0.5s ease forwards var(--fade-delay, 0)",
        slideIn: "slideIn 0.5s ease forwards var(--delay, 0)",
        slideInX: "slideInX 0.5s ease forwards var(--delay, 0)",
        slideiny: "slideiny 1s ease var(--slideiny-delay, 0) forwards",
        slideinx: "slideinx 1s ease var(--slideinx-delay, 0) forwards",
        slideinxreverse: "slideinxreverse 1s ease var(--slideinxreverse-delay, 0) forwards",
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
      },
      fontFamily: {
	// Add any custom fonts here
	// sans: [...fontFamily.sans],
	sans: ['Inter Variable', ...fontFamily.sans],
	serif: ['Eb Garamond Variable', ...fontFamily.serif],
        mono: ['Iosevka', ...fontFamily.mono]
      },
      transitionProperty: {
	height: "height",
      },
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
              '&::before': {
                content: '""',
              },
              '&::after': {
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
