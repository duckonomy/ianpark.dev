import React from "react";
import { ArrowUpRight } from "lucide-react";

interface MyLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	children: React.ReactNode;
	showExternalIcon?: boolean;
	className?: string;
}

const MyLink: React.FC<MyLinkProps> = ({
	href,
	children,
	showExternalIcon = false,
	className = "",
	...props
}) => {
	// Check if the link is external
	const isExternal = href.startsWith("http") || href.startsWith("https");

	// For internal links, prevent default and use window.location
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (!isExternal) {
			e.preventDefault();
			window.location.href = href;
		}

		// Call the original onClick if it exists
		if (props.onClick) {
			props.onClick(e);
		}
	};

	return (
		<a
			href={href}
			onClick={handleClick}
			className={`-mx-1 inline-flex items-center dark:text-zinc-400 rounded-md px-1 py-1 underline decoration-neutral-200 underline-offset-4 grayscale transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-600 hover:filter-none dark:decoration-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-200 focus-visible:outline-none ${className} `}
			{...props}
			{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
		>
			{children}
			{(showExternalIcon || isExternal) && <ArrowUpRight className="ml-0.5 inline-block" size={16} />}
		</a>
	);
};

export default MyLink;
