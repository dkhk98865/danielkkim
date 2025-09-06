import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, formatDate } from '../../../lib/blog';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    // Check if this is due to missing Ghost API configuration
    const api = await import('../../../lib/ghost').then(m => m.default);
    if (!api) {
      // Ghost API not configured - show configuration message instead of 404
      return (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <div className="text-yellow-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-yellow-800 mb-4">Ghost CMS Not Configured</h1>
            <p className="text-yellow-700 mb-6">
              This blog requires Ghost CMS to be configured with proper environment variables.
            </p>
            <div className="bg-yellow-100 rounded-lg p-4 text-left">
              <h3 className="font-semibold text-yellow-800 mb-2">Required Environment Variables:</h3>
              <ul className="text-yellow-700 space-y-1">
                <li><code className="bg-yellow-200 px-2 py-1 rounded">GHOST_URL</code> - Your Ghost CMS URL</li>
                <li><code className="bg-yellow-200 px-2 py-1 rounded">GHOST_API_KEY</code> - Your Ghost Content API key</li>
              </ul>
            </div>
            <div className="mt-6">
              <Link 
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }
    
    // Post not found - show 404
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back to blog link */}
      <Link 
        href="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to blog
      </Link>

      {/* Article */}
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Featured Image */}
        {post.feature_image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.feature_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="p-8">
          {/* Meta information */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <time dateTime={post.published_at}>
              {formatDate(post.published_at)}
            </time>
            {post.tags.length > 0 && (
              <>
                <span className="mx-2">•</span>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag.id} className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Author */}
          {post.authors.length > 0 && (
            <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-lg">
              {post.authors[0].profile_image && (
                <img
                  src={post.authors[0].profile_image}
                  alt={post.authors[0].name}
                  className="w-12 h-12 rounded-full mr-4"
                />
              )}
              <div>
                <p className="font-medium text-gray-900">{post.authors[0].name}</p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </article>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
        <p>&copy; 2024 Daniel&apos;s Blog. Built with Next.js and Ghost CMS.</p>
      </footer>
    </div>
  );
}
