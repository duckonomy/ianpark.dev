// // TODO: Pick a day and handle all the friggin cases
// class PostTransitionManager {
// 	private lastPage: string = "/";
//
// 	private handleBeforeSwap = (): void => {
// 		this.lastPage = window.location.pathname;
// 	};
//
// 	private handleDOMElement = (element: Element): void => {
// 		if (element instanceof HTMLElement) {
// 			element.classList.remove("animate-slideIn");
// 			element.classList.remove("opacity-0");
// 		}
// 	};
//
// 	private handleTitleElement = (title: Element): void => {
// 		if (title instanceof HTMLElement) {
// 			const style = title.getAttribute("style");
// 			if (style) {
// 				title.dataset.originalStyle = style;
// 				title.removeAttribute("style");
// 			}
// 		}
// 	};
//
// 	private restoreTitleStyle = (title: Element): void => {
// 		if (title instanceof HTMLElement && title.dataset.originalStyle) {
// 			title.setAttribute("style", title.dataset.originalStyle);
// 		}
// 	};
//
// 	private handleAfterSwap = (): void => {
// 		// Only run this logic if we're on the /posts page
// 		const currentPath = window.location.pathname;
// 		if (currentPath !== "/posts") {
// 			return;
// 		}
//
// 		const isComingFromPost: boolean =
// 			this.lastPage.startsWith("/posts/") && this.lastPage.length > 7;
// 		const isComingFromHome: boolean = this.lastPage === "/" || this.lastPage === "/home";
// 		const items: NodeListOf<Element> = document.querySelectorAll(".animate-slideIn");
// 		const titles: NodeListOf<Element> = document.querySelectorAll(
// 			'[style*="view-transition-name: post-title-"]',
// 		);
//
//     // items.forEach(this.handleDOMElement);
// 		if (isComingFromPost) {
// 			items.forEach(this.handleDOMElement);
// 		} else if (isComingFromHome) {
// 			titles.forEach(this.handleTitleElement);
// 		} else {
// 			items.forEach(this.handleDOMElement);
// 		}
// 	};
//
// 	initialize(): void {
// 		document.addEventListener("astro:before-swap", this.handleBeforeSwap);
// 		document.addEventListener("astro:after-swap", this.handleAfterSwap);
// 	}
//
// 	cleanup(): void {
// 		document.removeEventListener("astro:before-swap", this.handleBeforeSwap);
// 		document.removeEventListener("astro:after-swap", this.handleAfterSwap);
// 	}
// }
//
// const transitionManager = new PostTransitionManager();
// transitionManager.initialize();
//
// window.addEventListener("unload", () => {
// 	transitionManager.cleanup();
// });

// Add a class to indicate initial page load
document.addEventListener("DOMContentLoaded", () => {
	document.body.classList.add("initial-load");
	// Remove it after animations complete
	setTimeout(() => {
		document.body.classList.remove("initial-load");
	}, 1000); // Adjust based on your longest animation duration
});
