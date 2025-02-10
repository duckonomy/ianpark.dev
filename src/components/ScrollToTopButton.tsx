import React, { useEffect, useState } from "react";

const ScrollToTopButton: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const targetHeader = document.getElementById("blog-hero");
		if (!targetHeader) {
			console.log("Blog hero element not found");
			return;
		}

		const callback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry: IntersectionObserverEntry) => {
				setIsVisible(!entry.isIntersecting);
			});
		};

		const observer = new IntersectionObserver(callback, {
			threshold: 0,
			rootMargin: "0px",
		});

		observer.observe(targetHeader);

		return () => {
			observer.disconnect();
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (!isVisible) return null;

	return (
		<button
			onClick={scrollToTop}
			className={`mr-1 h-10 w-9 rounded-md bg-logo p-2 text-base text-logo-foreground transition sm:text-logo-accent-foreground sm:hover:bg-logo-accent ${isVisible ? "block" : "hidden"}`}
			aria-label="Scroll to top"
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 15 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<text
					x="2.5"
					y="15.0"
					fill="currentColor"
					style={{
						fontFamily: "Playfair Display Variable",
						fontSize: "1.125rem",
						fontWeight: "700",
					}}
				>
					^
				</text>
			</svg>
		</button>
	);
};

export default ScrollToTopButton;
