
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');
const outputFilePath = path.join(process.cwd(), 'src/lib/articles.json');

function getArticlesData() {
  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const matterResult = matter(fileContents);

      return {
        slug,
        ...matterResult.data,
        featuredImage: matterResult.data.featuredImage ? `/images/articles/${matterResult.data.featuredImage}` : '',
        content: matterResult.content,
      };
    });

  return Promise.all(articles.map(async (article) => {
    const processedContent = await remark()
      .use(html)
      .process(article.content);
    const contentHtml = processedContent.toString();

    // The 'content' property for the final JSON is the HTML,
    // we remove the original markdown content.
    const { content, ...rest } = article;

    return {
      ...rest,
      content: contentHtml,
    };
  }));
}

async function buildContent() {
  console.log('Starting content build...');
  try {
    const articles = await getArticlesData();
    // Sort articles by date in descending order
    articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    fs.writeFileSync(outputFilePath, JSON.stringify(articles, null, 2));
    console.log(`Successfully built ${articles.length} articles to ${outputFilePath}`);
  } catch (error) {
    console.error('Error building content:', error);
    process.exit(1); // Exit with an error code
  }
}

buildContent();
