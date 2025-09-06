import api from './ghost';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  html: string;
  feature_image?: string;
  published_at: string;
  updated_at: string;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  authors: Array<{
    id: string;
    name: string;
    slug: string;
    profile_image?: string;
  }>;
}

export interface Settings {
  title: string;
  description: string;
  logo?: string;
  icon?: string;
}

// Fetch all posts
export async function getAllPosts(): Promise<Post[]> {
  if (!api) {
    console.warn('Ghost CMS API not configured. Please check your .env.local file.');
    return [];
  }
  
  try {
    const posts = await api.posts.browse({
      limit: 'all',
      include: ['tags', 'authors'],
      fields: ['id', 'title', 'slug', 'excerpt', 'feature_image', 'published_at', 'updated_at']
    });
    return posts as Post[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!api) {
    console.warn('Ghost CMS API not configured. Please check your .env.local file.');
    return null;
  }
  
  try {
    const post = await api.posts.read({
      slug
    });
    return post as Post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Fetch site settings
export async function getSettings(): Promise<Settings> {
  if (!api) {
    console.warn('Ghost CMS API not configured. Please check your .env.local file.');
    return {
      title: 'My Blog',
      description: 'A personal blog'
    };
  }
  
  try {
    const settings = await api.settings.browse();
    return {
      title: settings.title || 'My Blog',
      description: settings.description || 'A personal blog',
      logo: settings.logo,
      icon: settings.icon
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      title: 'My Blog',
      description: 'A personal blog'
    };
  }
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
