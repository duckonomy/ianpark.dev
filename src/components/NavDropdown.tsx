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
			<DropdownMenuTrigger className={menuClassString}>{currentText}</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-3 origin-top-right border-none bg-logo"
				align="start"
				sideOffset={8}
			>
				{menuItems.map((menuItem, index) => (
					<DropdownMenuItem
						key={index}
						className="font-logo text-lg font-bold text-logo-foreground hover:bg-inherit hover:text-inherit sm:hover:bg-logo-accent sm:hover:text-logo-accent-foreground"
					>
						<a className="w-full" href={menuItem.url}>
							{menuItem.text}
						</a>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default NavDropdown;
