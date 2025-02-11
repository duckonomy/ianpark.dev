import React, { useRef, useState, useEffect } from "react";
import type { MarkdownHeading } from "astro";

// interface TocItem {
// 	depth: number;
// 	slug: string;
// 	text: string;
// 	children: TocItem[];
// }

interface TOCProps {
	headings?: MarkdownHeading[] | undefined;
}

const TOCHeading = ({ heading, index }: { heading: MarkdownHeading; index: number }) => {
	return (
		<li
			className="transform animate-slideIn opacity-0 transition-all duration-300"
			style={{ "--slideIn-delay": `${(index + 1) * 100}ms` } as React.CSSProperties}
		>
			<a
				aria-label={`Scroll to section: ${heading.text}`}
				className="toc-link break-word mt-3 line-clamp-2 block origin-left transform text-[0.8rem] text-muted-foreground underline decoration-ring decoration-1 underline-offset-4 transition-all duration-200 hover:text-accent-foreground"
				href={`#${heading.slug}`}
			>
				{heading.text}
			</a>
		</li>
	);
};

const TableOfContents = ({ headings }: TOCProps) => {
	const filteredHeadings = headings?.filter((heading) => heading.depth === 1);
	const tocRef = useRef<HTMLUListElement>(null);
	const [topOffset, setTopOffset] = useState<number>(0);

	useEffect(() => {
		const calculatePosition = () => {
			if (tocRef.current) {
				const tocHeight = tocRef.current.getBoundingClientRect().height;
				const viewportMiddle = window.innerHeight / 2;
				const newTopOffset = viewportMiddle - tocHeight / 2;
				setTopOffset(newTopOffset);
			}
		};

		// Calculate initial position
		calculatePosition();

		// Only recalculate on window resize
		window.addEventListener("resize", calculatePosition);

		return () => {
			window.removeEventListener("resize", calculatePosition);
		};
	}, [filteredHeadings]);

	useEffect(() => {
		const setActiveHeading = () => {
			const headingElements = Array.from(document.querySelectorAll("h1:not(#blog-hero>h1)"));
			const tocLinks = document.querySelectorAll(".toc-link");

			const headingPositions = headingElements.map((heading) => {
				const rect = heading.getBoundingClientRect();
				return { id: heading.id, top: rect.top + window.scrollY };
			});

			const scrollPosition = window.scrollY + 100;
			let activeId = headingPositions[0]?.id;

			for (let i = 0; i < headingPositions.length; i++) {
				const heading = headingPositions[i]; // Ensure heading is defined
				if (heading && scrollPosition >= heading.top) {
					activeId = heading.id;
				}
			}

			tocLinks.forEach((link) => {
				if (link.getAttribute("href") === `#${activeId}`) {
					link.classList.add("text-accent-foreground", "font-medium", "scale-110");
					link.classList.remove("text-muted-foreground", "scale-100");
				} else {
					link.classList.remove("text-accent-foreground", "font-medium", "scale-110");
					link.classList.add("text-muted-foreground", "scale-100");
				}
			});
		};

		setActiveHeading();
		window.addEventListener("scroll", setActiveHeading, { passive: true });

		return () => {
			window.removeEventListener("scroll", setActiveHeading);
		};
	}, []);

	if (filteredHeadings?.length === 0) return null;

	return (
		<div
			className="2xl:32 min-[1500px]-left-32 absolute left-0 min-[1255px]:left-12 min-[1340px]:left-24 min-[1450px]:left-32"
			style={{ top: `${topOffset}px` }}
		>
			<aside className="fixed">
				<ul ref={tocRef} className="mt-4 max-w-64">
					{filteredHeadings?.map((heading, i) => (
						<TOCHeading key={heading.slug} heading={heading} index={i} />
					))}
				</ul>
			</aside>
		</div>
	);
};

export default TableOfContents;
