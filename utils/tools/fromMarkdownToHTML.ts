import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export const fMtH = async (markdown: string) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify);

  const html = await processor.process(markdown).then((contents) => {
    const stringContents = String(contents);
    const atagUpdatedContents = stringContents.replace( '<a ', '<a target="_blank" ' );
    return atagUpdatedContents
  });
  
  return html
}