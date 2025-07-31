
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');
const outputJsonPath = path.join(process.cwd(), 'src/lib/articles.json');
const publicImagesPath = '/images/articles';

async function getArticlesData() {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = await Promise.all(fileNames.map(async (fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Construct the featured image path
    const featuredImage = `${publicImagesPath}/${matterResult.data.featuredImage}`;

    return {
      slug,
      content: contentHtml,
      ...matterResult.data,
      featuredImage
    };
  }));

  return allArticlesData.sort((a, b) => {
    if (new Date(a.publishedAt) < new Date(b.publishedAt)) {
      return 1;
    } else {
      return -1;
    }
  });
}

async function buildContent() {
  try {
    console.log('Starting content build...');
    const articles = await getArticlesData();
    fs.writeFileSync(outputJsonPath, JSON.stringify(articles, null, 2));
    console.log(`Successfully built ${articles.length} articles to ${outputJsonPath}`);
  } catch (error) {
    console.error('Error building content:', error);
    process.exit(1);
  }
}

buildContent();
