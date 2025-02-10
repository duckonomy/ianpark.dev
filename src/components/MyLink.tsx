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
	const isExternal = href.startsWith("http") || href.startsWith("https");

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (!isExternal) {
			e.preventDefault();
			window.location.href = href;
		}

		if (props.onClick) {
			props.onClick(e);
		}
	};

	return (
		<a
			href={href}
			onClick={handleClick}
			className={`my-link-no-icon ${className}`}
			{...props}
			{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
		>
			{children}
			{(showExternalIcon || isExternal) && (
				<ArrowUpRight className="ml-0.5 inline-block" size={16} />
			)}
		</a>
	);
};

export default MyLink;
