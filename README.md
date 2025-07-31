# OmniFeed - A Modern Blog Platform

This repository contains the source code for OmniFeed, a responsive and high-performance blog platform built with Next.js, Tailwind CSS, and ShadCN UI. The site is statically generated for optimal speed and SEO.

## How to Add a New Post

All content for this website is managed in a single file: `src/lib/articles.json`. To add a new post, you need to add a new JSON object to the array in this file.

### Step 1: Open the JSON File

Navigate to and open `src/lib/articles.json` in your editor.

### Step 2: Add a New Article Object

The file contains a JSON array `[...]`. Each element in the array is an object that represents a single article. To add a new post, copy the structure of an existing article object and add it to the array.

Here is the template for a single article object. Add a new one of these inside the `[` and `]` of the file, separating it from other articles with a comma.

```json
{
  "slug": "your-unique-article-slug",
  "title": "Your Article Title",
  "description": "A short, one-sentence summary of your article.",
  "content": "<h1>Your Article Content</h1><p>This field accepts full HTML for formatting.</p>",
  "author": "Your Name",
  "publishedAt": "2024-08-02T10:00:00Z",
  "featuredImage": "https://placehold.co/1200x600.png",
  "category": "tech",
  "tags": ["tag-one", "tag-two", "example"],
  "featured": false
}
```

### Field Explanations

-   **`slug`**: A unique, URL-friendly identifier for your post. Use lowercase letters and hyphens instead of spaces (e.g., `how-to-bake-a-cake`).
-   **`title`**: The main title of your article, displayed on the article page and cards.
-   **`description`**: A brief summary used for previews on the homepage and for SEO. Keep it concise.
-   **`content`**: The full body of your article. This field accepts **HTML markup**. You can use an online HTML editor to write your content and then paste the resulting HTML here.
-   **`author`**: The name of the article's author.
-   **`publishedAt`**: The publication date and time in `YYYY-MM-DDTHH:mm:ssZ` format. This is used to sort posts.
-   **`featuredImage`**: The URL for the article's main image. See the "Adding Images" section below for more details.
-   **`category`**: The slug of the category this article belongs to. The available categories are defined in `src/lib/mock-data.ts`. Current options are: `tech`, `food`, `world`, `business`, `lifestyle`, `jobs`.
-   **`tags`**: An array of strings for tagging your article.
-   **`featured`**: Set this to `true` to make the article appear as the main featured post on the homepage. Only one article should be featured at a time. Otherwise, set it to `false`.

---

## Adding Images

You have two options for handling images: using placeholder images or adding your own local images.

### 1. Placeholder Images (Easiest)

For quick and easy placeholders, you can use a service like `https://placehold.co`.

-   **Usage**: Simply construct a URL with your desired dimensions. For example: `https://placehold.co/1200x600.png` for an image 1200px wide and 600px high.
-   **When to use**: Great for testing layouts or for demo posts.

### 2. Local Images (Recommended)

To use your own images, you must add them to the project repository.

-   **Step 1: Naming Convention**: Name your image files using lowercase letters, numbers, and hyphens (e.g., `my-cool-post-thumbnail.jpg`).
-   **Step 2: Add Image to `public/images`**: The project is set up to serve static files from the `public` directory. Create a folder named `images` inside `public`. Place your image file there. The final path will be `public/images/your-image-name.jpg`.
-   **Step 3: Set the URL in `featuredImage`**: In your `articles.json` file, set the `featuredImage` value to `/omnifeed/images/your-image-name.jpg`.
    -   **Important**: The URL **must** start with `/omnifeed/images/`. This is because the site is hosted in a subdirectory on GitHub Pages. This prefix is required for the images to load correctly on the live website.
