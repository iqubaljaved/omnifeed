
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDir = path.join(process.cwd(), 'src/content/articles');
const outputJsonPath = path.join(process.cwd(), 'src/lib/articles.json');
const publicImagesDir = path.join(process.cwd(), 'public/images/articles');

// Ensure the target directory for images exists
fs.mkdirSync(publicImagesDir, { recursive: true });

async function buildContent() {
  console.log('Starting content build...');
  const fileNames = fs.readdirSync(articlesDir);
  const allArticlesData = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(articlesDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();

      const slug = fileName.replace(/\.md$/, '');

      // Handle image path
      const assetPrefix = '/omnifeed1';
      let featuredImage = matterResult.data.featuredImage || '';
      if (featuredImage && !featuredImage.startsWith('http') && !featuredImage.startsWith('/')) {
         featuredImage = `${assetPrefix}/images/articles/${featuredImage}`;
      } else if (featuredImage && !featuredImage.startsWith(assetPrefix)) {
        featuredImage = `${assetPrefix}${featuredImage}`;
      }


      return {
        slug,
        content: contentHtml,
        ...matterResult.data,
        featuredImage,
      };
    })
  );

  fs.writeFileSync(outputJsonPath, JSON.stringify(allArticlesData, null, 2));
  console.log(`Successfully built ${allArticlesData.length} articles to ${outputJsonPath}`);
}

buildContent();
