
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDir = path.join(process.cwd(), 'src/content/articles');
const outputDir = path.join(process.cwd(), 'src/lib');
const outputFile = path.join(outputDir, 'articles.json');

const getArticlesData = () => {
  const fileNames = fs.readdirSync(articlesDir);
  const articles = fileNames
    .filter(fileName => {
      const fullPath = path.join(articlesDir, fileName);
      // Ensure we are only reading files and they are markdown files.
      return fs.statSync(fullPath).isFile() && fileName.endsWith('.md');
    })
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(articlesDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      const processedContent = remark()
        .use(html)
        .processSync(matterResult.content);
      const contentHtml = processedContent.toString();

      return {
        slug,
        content: contentHtml,
        ...matterResult.data,
      };
    });

  // Sort articles by date
  return articles.sort((a, b) => {
    if (a.publishedAt < b.publishedAt) {
      return 1;
    } else {
      return -1;
    }
  });
};

const buildContent = () => {
  console.log('Starting content build...');
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const articles = getArticlesData();
    fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
    console.log(`Successfully built ${articles.length} articles to ${outputFile}`);
  } catch (error) {
    console.error('Error building content:', error);
    process.exit(1);
  }
};

buildContent();
