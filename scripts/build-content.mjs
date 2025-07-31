
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');
const outputFilePath = path.join(process.cwd(), 'src/lib/articles.json');
const imageBasePath = '/images/articles/';
const assetPrefix = '/omnifeed1';

function getArticlesData() {
  const fileNames = fs.readdirSync(articlesDirectory);
  const articlesData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const featuredImage = data.featuredImage 
        ? `${assetPrefix}${imageBasePath}${data.featuredImage}`
        : `${assetPrefix}${imageBasePath}default.png`;

      return {
        slug,
        ...data,
        featuredImage,
        content,
      };
    });
  return articlesData;
}

async function buildContent() {
  try {
    console.log('Starting content build...');
    const articlesData = getArticlesData();

    const articlesWithHtml = await Promise.all(
      articlesData.map(async (article) => {
        const processedContent = await remark()
          .use(html)
          .process(article.content);
        const contentHtml = processedContent.toString();
        return {
          ...article,
          content: contentHtml,
        };
      })
    );
    
    fs.writeFileSync(outputFilePath, JSON.stringify(articlesWithHtml, null, 2));
    console.log(`Successfully built ${articlesWithHtml.length} articles to ${outputFilePath}`);
  } catch (error) {
    console.error('Error building content:', error);
    process.exit(1);
  }
}

buildContent();
