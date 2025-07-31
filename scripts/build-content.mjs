#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDir = path.join(process.cwd(), 'src', 'content', 'articles');
const articlesJsonPath = path.join(process.cwd(), 'src', 'lib', 'articles.json');

function getArticlesData() {
  const fileNames = fs.readdirSync(articlesDir);
  const articles = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(articlesDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        ...matterResult.data,
        featuredImage: matterResult.data.featuredImage
          ? `/omnifeed1/images/articles/${matterResult.data.featuredImage}`
          : undefined,
        content: matterResult.content,
      };
    });
  return articles;
}

async function buildContent() {
  console.log('Starting content build...');
  try {
    const articles = getArticlesData();

    const articlesWithHtml = await Promise.all(
      articles.map(async article => {
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
    
    fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesWithHtml, null, 2));
    console.log(`Successfully built ${articlesWithHtml.length} articles to ${articlesJsonPath}`);
  } catch (error) {
    console.error('Error building content:', error);
  }
}

buildContent();
