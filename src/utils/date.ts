import { siteConfig } from "@/site-config";

export function getFormattedDate(
  date: string | number | Date,
  options: Intl.DateTimeFormatOptions,
) {
    return new Date(date).toLocaleDateString(siteConfig.date.locale, {
    ...options,
  });
}
