// plugins/remark-custom-links.ts
import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { Plugin } from "unified";

export const remarkCustomLinks: Plugin<[], Root> = () => {
	return (tree: Root) => {
		visit(tree, "link", (node) => {
			// @ts-expect-error: Adding custom type for MDX transformation
			node.type = "mdxJsxFlowElement";
			// @ts-expect-error: Adding custom properties for MDX
			node.name = "MyLink";
			// @ts-expect-error: Converting attributes to MDX props
			node.attributes = [
				{
					type: "mdxJsxAttribute",
					name: "href",
					value: node.url,
				},
			];

			node.children = [
				{
					type: "text",
					// @ts-expect-error: Setting children for MDX element
					value: node.children[0].value,
				},
			];
		});
	};
};
