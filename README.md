# Daniel's Blog

A personal blog website built with Next.js and Ghost CMS.

## Features

- 🚀 **Next.js 15** with App Router
- 🎨 **Tailwind CSS** for styling
- 👻 **Ghost CMS** integration
- 📱 **Responsive design**
- ⚡ **Fast and modern**

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Ghost CMS:**
   - Update `.env.local` with your actual Ghost CMS details:
   ```bash
   # Your Ghost site URL (e.g., https://your-blog.ghost.io)
   GHOST_URL=https://your-ghost-site.com
   
   # Your Ghost Content API key (must be 26 hex characters)
   GHOST_API_KEY=your-26-character-hex-key
   ```

3. **Get your Ghost API key:**
   - Go to your Ghost admin panel
   - Navigate to Settings → Integrations
   - Click "Add custom integration"
   - Copy the Content API key (it should be 26 hexadecimal characters)
   - **Important:** The API key must be exactly 26 hex characters (0-9, a-f)

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Project Structure

```
├── app/
│   ├── blog/[slug]/     # Individual blog post pages
│   ├── globals.css      # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page with blog listing
├── lib/
│   ├── blog.ts         # Blog utility functions
│   └── ghost.ts        # Ghost CMS configuration
└── public/             # Static assets
```

## Customization

- **Site title and description:** Update `app/layout.tsx`
- **Styling:** Modify `app/globals.css` and Tailwind classes
- **Blog layout:** Customize components in `app/page.tsx` and `app/blog/[slug]/page.tsx`

## Deployment

This project is ready to deploy on Vercel, Netlify, or any platform that supports Next.js.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Ghost CMS](https://ghost.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)