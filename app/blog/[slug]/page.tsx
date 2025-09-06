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
