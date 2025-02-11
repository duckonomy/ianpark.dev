import { type CollectionEntry, getCollection } from "astro:content";
import { siteConfig } from "@/site.config";

export async function getAllPosts(lang: string) {
	try {
		const posts = await getCollection("post", (post) => {
			const [postLang] = post.id.split("/");

			const isKorean = (postLang === "ko" || postLang === "kr") && lang === "ko";
			const isEnglish = postLang === "en" && lang === "en";
			const matchesLanguage = isKorean || isEnglish;

			return matchesLanguage && (!post.data.draft || import.meta.env.DEV);
		});

		return posts;
	} catch (error) {
		return [];
	}
}

export function getPostSortDate(post: CollectionEntry<"post">) {
	return siteConfig.sortPostsByUpdatedDate && post.data.updatedDate !== undefined
		? new Date(post.data.updatedDate)
		: new Date(post.data.publishDate);
}

/** sort post by date (by siteConfig.sortPostsByUpdatedDate), desc.*/
export function sortMDByDate(posts: CollectionEntry<"post">[]) {
	return posts.sort((a, b) => {
		const aDate = getPostSortDate(a).valueOf();
		const bDate = getPostSortDate(b).valueOf();
		return bDate - aDate;
	});
}

/** groups posts by year (based on option siteConfig.sortPostsByUpdatedDate), using the year as the key
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 */
export function groupPostsByYear(posts: CollectionEntry<"post">[]) {
	return posts.reduce<Record<string, CollectionEntry<"post">[]>>((acc, post) => {
		const year = getPostSortDate(post).getFullYear();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year]?.push(post);
		return acc;
	}, {});
}

/** returns all tags created from posts (inc duplicate tags)
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
// export function getAllTags(posts: CollectionEntry<"post">[]) {
// 	return posts.flatMap((post) => [...post.data.tags]);
// }

/** returns all unique tags created from posts
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
// export function getUniqueTags(posts: CollectionEntry<"post">[]) {
// 	return [...new Set(getAllTags(posts))];
// }

/** returns a count of each unique tag - [[tagName, count], ...]
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
// export function getUniqueTagsWithCount(posts: CollectionEntry<"post">[]): [string, number][] {
// 	return [
// 		...getAllTags(posts).reduce(
// 			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
// 			new Map<string, number>(),
// 		),
// 	].sort((a, b) => b[1] - a[1]);
// }
