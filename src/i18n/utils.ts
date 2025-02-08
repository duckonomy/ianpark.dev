// // src/i18n/utils.ts
// import english from './en';
// import korean from './ko';
//
// export const languages = {
//   en: english,
//   ko: korean
// };
//
// export const defaultLang = 'en';
//
// export function getLangFromUrl(url: URL) {
//   const [, lang] = url.pathname.split('/');
//   if (lang in languages) return lang as keyof typeof languages;
//   return defaultLang;
// }
//
// export function useTranslations(lang: keyof typeof languages) {
//   return languages[lang];
// }

import { ui, defaultLang, showDefaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
    const [, lang = ""] = url.pathname.split("/");
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

export function useTranslatedPath(lang: keyof typeof ui) {
	return function translatePath(path: string, l: string = lang) {
		return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`;
	};
}
