import GhostContentAPI from '@tryghost/content-api';

// Only create API instance if we have valid credentials
let api: GhostContentAPI | null = null;

if (process.env.GHOST_URL && process.env.GHOST_API_KEY && 
    process.env.GHOST_URL !== 'https://your-ghost-site.com' && 
    process.env.GHOST_API_KEY !== 'your-ghost-api-key' &&
    /^[0-9a-f]{26}$/i.test(process.env.GHOST_API_KEY)) {
  try {
    api = new GhostContentAPI({
      url: process.env.GHOST_URL,
      key: process.env.GHOST_API_KEY,
      version: 'v5.0'
    });
  } catch (error) {
    console.warn('Failed to initialize Ghost CMS API:', error);
    api = null;
  }
}

export default api;
