# Vercel Deployment Setup

## Environment Variables

To deploy this blog to Vercel, you need to configure the following environment variables in your Vercel dashboard:

### Required Environment Variables

1. **GHOST_URL**
   - Your Ghost CMS URL (e.g., `https://your-blog.ghost.io`)
   - This should be the full URL to your Ghost site

2. **GHOST_API_KEY**
   - Your Ghost Content API key
   - This is a 26-character hexadecimal string
   - You can find this in your Ghost admin panel under Settings > Integrations > Add custom integration

### How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add the following variables:
   - `GHOST_URL` = `https://your-blog.ghost.io` (replace with your actual Ghost URL)
   - `GHOST_API_KEY` = `your-26-character-api-key` (replace with your actual API key)

### Getting Your Ghost API Key

1. Log into your Ghost admin panel
2. Go to Settings > Integrations
3. Click "Add custom integration"
4. Give it a name (e.g., "Next.js Blog")
5. Copy the Content API Key (26-character string)

### After Setting Environment Variables

1. Redeploy your Vercel project
2. The blog should now work properly and show your Ghost posts

### Troubleshooting

- If you still see 404 errors, check that your environment variables are correctly set
- Make sure your Ghost site is publicly accessible
- Verify that your API key has the correct permissions
