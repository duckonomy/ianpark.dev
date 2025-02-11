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
	return (
		<DropdownMenu>
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
						<a
							className="block w-full px-3 py-2"
							href={menuItem.url}
							onClick={(e) => {
								e.preventDefault();
								window.location.href = menuItem.url;
							}}
							onTouchEnd={(e) => {
								e.preventDefault();
								window.location.href = menuItem.url;
							}}
						>
							{menuItem.text}
						</a>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default NavDropdown;
