
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');
const outputJsonPath = path.join(process.cwd(), 'src/lib/articles.json');
const basePath = '/omnifeed1';

async function buildContent() {
  console.log('Starting content build...');
  const fileNames = fs.readdirSync(articlesDirectory);

  const allArticlesData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();

      return {
        slug,
        ...matterResult.data,
        featuredImage: matterResult.data.featuredImage
          ? `${basePath}/images/articles/${matterResult.data.featuredImage}`
          : `${basePath}/images/placeholder.png`,
        content: contentHtml,
      };
    })
  );

  fs.writeFileSync(outputJsonPath, JSON.stringify(allArticlesData, null, 2));
  console.log(`Successfully built ${allArticlesData.length} articles to ${outputJsonPath}`);
}


buildContent();
