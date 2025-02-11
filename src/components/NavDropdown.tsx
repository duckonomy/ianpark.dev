import { useState, useEffect } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface MenuItem {
	url: string;
	text: string;
}

interface NavDropdownProps {
	currentText: string;
	menuItems: MenuItem[];
	menuClassString: string;
}

const NavDropdown = ({ currentText, menuItems, menuClassString }: NavDropdownProps) => {
	// Add controlled state for dropdown
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		// Cleanup function to reset dropdown state
		return () => {
			setIsOpen(false);
		};
	}, []);

	const handleNavigation = (url: string) => {
		setIsOpen(false); // Close dropdown before navigation
		window.location.href = url;
	};

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger
				className={`${menuClassString} touch-manipulation`}
				aria-label="Navigation menu"
				role="button"
				tabIndex={0}
			>
				{currentText}
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="z-50 w-3 min-w-[8rem] origin-top-right overflow-hidden rounded-md border-none bg-logo shadow-md"
				align="start"
				sideOffset={8}
			>
				{menuItems.map((menuItem, index) => (
					<DropdownMenuItem
						key={index}
						className="p-0 font-logo text-lg font-bold text-logo-foreground hover:bg-inherit hover:text-inherit sm:hover:bg-logo-accent sm:hover:text-logo-accent-foreground"
					>
						<button
							className="w-full px-3 py-2 text-left"
							onClick={() => handleNavigation(menuItem.url)}
						>
							{menuItem.text}
						</button>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default NavDropdown;
