import { Globe, Check } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages, defaultLang, showDefaultLang } from "../i18n/ui";
import type { CollectionEntry } from "astro:content";

type LanguageSelectorProps = {
	type: string;
	post?: CollectionEntry<"post"> | undefined;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ type, post }) => {
	const getCurrentPath = () => {
		if (typeof window === "undefined") return "";
		const path = window.location.pathname;
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

	if (type === "post" && !post?.data.hasTranslation) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="inline-flex h-9 w-9 items-center justify-center rounded-md p-0 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
				aria-label="Toggle language menu"
				role="button"
				tabIndex={0}
			>
				<Globe className="h-4 w-4" />
				<span className="sr-only">Toggle language menu</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="z-50 min-w-[8rem] overflow-hidden rounded-md border-0 bg-popover p-1 text-popover-foreground shadow-md"
			>
				{Object.entries(languages).map(([lang, label]) => (
					<DropdownMenuItem key={lang} className="flex items-center justify-between p-0">
						<a
							href={getLanguagePath(lang)}
							className="flex w-full cursor-pointer items-center justify-between px-2 py-1.5"
							hrefLang={lang}
							onClick={(e) => {
								// Prevent immediate closing on iOS
								e.preventDefault();
								window.location.href = getLanguagePath(lang);
							}}
							onTouchEnd={(e) => {
								e.preventDefault();
								window.location.href = getLanguagePath(lang);
							}}
						>
							<span>{label}</span>
							{currentLang === lang && <Check className="ml-2 h-4 w-4" />}
						</a>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LanguageSelector;
