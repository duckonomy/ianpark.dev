import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import "@pagefind/default-ui/css/ui.css";

import type { PagefindUI as ImportedPagefindUI } from "@pagefind/default-ui";

declare global {
	interface Window {
		pagefindUI?: ImportedPagefindUI;
	}
}

const ElegantSearch = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleKeyPress = useCallback(
		(event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key === "k") {
				event.preventDefault();
				setIsOpen(true);
			}
			if (event.key === "/" && !isOpen) {
				event.preventDefault();
				setIsOpen(true);
			}
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		},
		[isOpen],
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);
		return () => document.removeEventListener("keydown", handleKeyPress);
	}, [handleKeyPress]);

	useEffect(() => {
		if (isOpen) {
			// Focus the search input when modal opens
			setTimeout(() => {
				const searchInput = document.querySelector(
					".pagefind-ui__search-input",
				) as HTMLInputElement;
				searchInput?.focus();
			}, 100);

			if (!window.pagefindUI) {
				const onIdle =
					window.requestIdleCallback ||
					((cb: IdleRequestCallback) =>
						setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 }), 1));

				onIdle(async () => {
					try {
						const { PagefindUI } = await import("@pagefind/default-ui");
						window.pagefindUI = new PagefindUI({
							element: "#search-content",
							baseUrl: import.meta.env.BASE_URL,
							bundlePath: import.meta.env.BASE_URL.replace(/\/$/, "") + "/pagefind/",
							showImages: false,
							showSubResults: true,
						});
					} catch (error) {
						console.error("Error initializing Pagefind:", error);
					}
				});
			}
		}
	}, [isOpen]);

	return (
		<div className="font-serif">
			<button
				onClick={() => setIsOpen(true)}
				className="flex h-9 w-9 items-center justify-center rounded-md transition-all hover:bg-accent"
				aria-label="Open search"
			>
				<Search className="h-4 w-4" />
			</button>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24">
					<div
						className="fixed inset-0 bg-zinc-950/50 backdrop-blur-sm"
						onClick={() => setIsOpen(false)}
					/>

					<div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900 sm:p-8">
						<div id="search-content" />
					</div>
				</div>
			)}

			<style>{`
        /* Custom Pagefind Styles */
        .pagefind-ui {
          --pagefind-ui-scale: 0.8;
          --pagefind-ui-primary: var(--color-accent, #228be6);
          --pagefind-ui-text: var(--color-text, #4b5563);
          --pagefind-ui-background: var(--color-bg, #ffffff);
          --pagefind-ui-border: #e5e7eb;
          --pagefind-ui-border-width: 1px;
          --pagefind-ui-font: inherit;
        }

        .dark .pagefind-ui {
          --pagefind-ui-text: #e5e7eb;
          --pagefind-ui-background: #111827;
          --pagefind-ui-border: #374151;
        }

        .pagefind-ui .pagefind-ui__search-input {
          font-size: 1rem;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border-radius: 0.5rem;
          border: 1px solid var(--pagefind-ui-border);
          width: 100%;
          background-color: var(--pagefind-ui-background);
          color: var(--pagefind-ui-text);
        }

        .pagefind-ui .pagefind-ui__search-clear {
          padding: 0;
          width: 2.5rem;
          color: var(--pagefind-ui-text);
          opacity: 0.7;
        }

        .pagefind-ui .pagefind-ui__results-area {
          margin-top: 1rem;
        }

        .pagefind-ui .pagefind-ui__result {
          padding: 1rem;
          border: 1px solid var(--pagefind-ui-border);
          border-radius: 0.5rem;
          margin-top: 0.5rem;
        }

        .pagefind-ui .pagefind-ui__result:hover {
          border-color: var(--pagefind-ui-primary);
        }

        .pagefind-ui .pagefind-ui__result-title {
          color: var(--pagefind-ui-primary);
          font-weight: 600;
        }

        .pagefind-ui .pagefind-ui__result-excerpt {
          color: var(--pagefind-ui-text);
          font-size: 0.875rem;
        }

        .pagefind-ui .pagefind-ui__message {
          color: var(--pagefind-ui-text);
          font-size: 0.875rem;
        }

        .pagefind-ui mark {
          background-color: transparent;
          color: var(--pagefind-ui-primary);
          font-weight: 600;
        }

        .pagefind-ui .pagefind-ui__search-input:focus {
          outline: none;
          border-color: var(--pagefind-ui-border);
        }
      `}</style>
		</div>
	);
};

export default ElegantSearch;
