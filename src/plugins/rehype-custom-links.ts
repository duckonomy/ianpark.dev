import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';
import type { Plugin } from 'unified';

export const rehypeCustomLinks: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'a') {
        const { href, ...props } = node.properties || {};

        // Set data-mdx-component to ensure proper casing in MDX
        node.properties = {
          ...props,
          href: href || '',
          'data-mdx-component': 'MyLink',
        };
      }
    });
  };
};
