import { Globe, Check } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages, defaultLang, showDefaultLang } from "../i18n/ui";

const LanguageToggle = ({ type }: { type: string }) => {
	const getCurrentPath = () => {
		if (typeof window === "undefined") return "";
		const path = window.location.pathname;
		// Remove language prefix if it exists
		const segments = path.split("/").filter(Boolean);
		const firstSegment = segments[0];

		return typeof firstSegment === "string" && firstSegment in languages
			? "/" + segments.slice(1).join("/")
			: path;
	};

	const getCurrentLanguage = () => {
		if (typeof window === "undefined") return defaultLang;
		const firstSegment = window.location.pathname.split("/").filter(Boolean)[0];
		return typeof firstSegment === "string" && firstSegment in languages
			? firstSegment
			: defaultLang;
	};

	const getLanguagePath = (lang: string) => {
		const currentPath = getCurrentPath();
		// Handle root path specially
		if (currentPath === "/") {
			return lang === defaultLang && !showDefaultLang ? "/" : `/${lang}/`;
		}
		// For other paths
		if (lang === defaultLang && !showDefaultLang) {
			return currentPath;
		}
		return `/${lang}${currentPath}`;
	};

	const currentLang = getCurrentLanguage();

	return type === "post" ? null : (
		<DropdownMenu>
			<DropdownMenuTrigger className="hover:text-accent-foreground inline-flex h-9 w-9 items-center justify-center rounded-md p-0 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-zinc-800">
				<Globe className="h-4 w-4" />
				<span className="sr-only">Toggle language menu</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="border-0 dark:bg-zinc-800" align="end">
				{Object.entries(languages).map(([lang, label]) => (
					<DropdownMenuItem
						key={lang}
						asChild
						className="flex items-center justify-between dark:hover:bg-zinc-700"
					>
						<a
							href={getLanguagePath(lang)}
							className="flex w-full cursor-pointer items-center justify-between"
							hrefLang={lang}
						>
							{label}
							{currentLang === lang && <Check className="ml-2 h-4 w-4" />}
						</a>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LanguageToggle;
