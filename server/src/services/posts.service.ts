import axios from 'axios';
import * as cheerio from 'cheerio';
import { Post } from '../models/favourites.dto';

let linkedinArticles: Post[] = [];

export async function fetchRedditPosts(): Promise<Post[]> {
  const redditUrl = 'https://www.reddit.com';

  try {
    const { data } = await axios.get(redditUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RedditScraper/1.0)',
      },
    });

    const $ = cheerio.load(data);
    const posts: Post[] = [];

    $('shreddit-gallery-carousel faceplate-tracker > li').each((_, element) => {
      const linkElement = $(element).find('a.block');
      const imgElement = linkElement.find('img');
      const titleElement = linkElement.find('h2');
      const descriptionElement = linkElement.find('p');

      const title = titleElement.text().trim();
      const description = descriptionElement.text().trim();
      const link = linkElement.attr('href')
        ? 'https://www.reddit.com' + linkElement.attr('href')
        : '';
      const image = imgElement.attr('src') || '';

      if (title && link) {
        posts.push({ title, description, link, image });
      }
    });

    return posts;
  } catch (error) {
    console.error('Error fetching Reddit posts:', error);
    return [];
  }
}

export async function fetchLinkedInArticles(): Promise<Post[]> {
  const linkedInUrl =
    'https://www.linkedin.com/pulse/topics/home/?trk=guest_homepage-basic_guest_nav_menu_articles';

  try {
    const { data } = await axios.get(linkedInUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkedInScraper/1.0)',
      },
    });

    const $ = cheerio.load(data);
    const articles: Post[] = [];

    $('a.content-hub-entities').each((_, element) => {
      const linkElement = $(element);

      const link = linkElement.attr('href') ? linkElement.attr('href') : '';

      const imgElement = linkElement.find('img').first();
      const image =
        imgElement.attr('data-delayed-url') || imgElement.attr('src') || '';

      const parent = linkElement.parent();
      const descriptionElement = parent.find('p');
      const titleElement = parent.find('h2'); // directly get text inside the <a>
      const title = titleElement.text().trim();
      const description = descriptionElement.text().trim();
      // console.log({title, link, description, image})
      if (title && link && image) {
        articles.push({ title, description, link, image });
      }
    });
    linkedinArticles = articles;
    return articles;
  } catch (error) {
    console.error('Error fetching LinkedIn articles:', error);
    return linkedinArticles;
  }
}
