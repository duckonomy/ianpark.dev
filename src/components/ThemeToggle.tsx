import { useEffect, useState } from "react";
import { Moon, Sun, Laptop, Check } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ThemeToggle = () => {
	const [theme, setThemeState] = useState<"light" | "dark" | "system">("system");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		// Get theme from localStorage or default to system
		const storedTheme = localStorage.getItem("theme") as "light" | "dark" | "system";
		setThemeState(storedTheme || "system");
	}, []);

	const setTheme = (newTheme: "light" | "dark" | "system") => {
		setThemeState(newTheme);
		const themeChangeEvent = new CustomEvent("theme-change", {
			detail: {
				theme: newTheme,
			},
		});
		document.dispatchEvent(themeChangeEvent);
	};

	const getEffectiveTheme = () => {
		if (!mounted) return "system";

		if (theme === "system") {
			return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
		return theme;
	};

	if (!mounted) {
		return (
			<div className="h-9 w-9 p-0">
				<span className="sr-only">Toggle theme</span>
			</div>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md p-0 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
				<Sun
					className={`h-4 w-4 transition-all ${getEffectiveTheme() === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
				/>
				<Moon
					className={`absolute h-4 w-4 transition-all ${getEffectiveTheme() === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
				/>
				<span className="sr-only">Toggle theme</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="border-0">
				<DropdownMenuItem
					onClick={() => setTheme("light")}
					className="flex cursor-pointer items-center justify-between"
				>
					<div className="flex items-center">
						<Sun className="mr-2 h-4 w-4" />
						<span>Light</span>
					</div>
					{theme === "light" && <Check className="ml-2 h-4 w-4" />}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme("dark")}
					className="flex cursor-pointer items-center justify-between"
				>
					<div className="flex items-center">
						<Moon className="mr-2 h-4 w-4" />
						<span>Dark</span>
					</div>
					{theme === "dark" && <Check className="ml-2 h-4 w-4" />}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme("system")}
					className="flex cursor-pointer items-center justify-between"
				>
					<div className="flex items-center">
						<Laptop className="mr-2 h-4 w-4" />
						<span>System</span>
					</div>
					{theme === "system" && <Check className="ml-2 h-4 w-4" />}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ThemeToggle;
