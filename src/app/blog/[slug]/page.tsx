import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getBlogPostBySlug, blogPosts } from "@/data/blog-posts";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { SITE_CONFIG } from "@/lib/constants";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${SITE_CONFIG.name}`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

/**
 * Sanitize a string to prevent XSS when used with dangerouslySetInnerHTML.
 * Strips all HTML tags except explicitly allowed inline formatting.
 */
function sanitizeHtml(html: string): string {
  // First, escape all HTML entities
  const escaped = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
  return escaped;
}

function formatInline(text: string): string {
  // Sanitize first, then apply safe markdown formatting
  const safe = sanitizeHtml(text);
  return safe
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-walnut font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

// Simple Markdown renderer for headings, lists, bold, italic, etc.
function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul
          key={`list-${elements.length}`}
          className="list-disc list-inside space-y-1 text-walnut-light"
        >
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushList();
      continue;
    }

    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3
          key={i}
          className="text-lg font-semibold text-walnut mt-6 mb-2"
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={i}
          className="font-handwritten text-2xl text-walnut mt-8 mb-3"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (/^\d+\.\s/.test(line)) {
      // Numbered list item
      if (!inList) flushList();
      listItems.push(line.replace(/^\d+\.\s/, ""));
      inList = true;
    } else if (line.startsWith("- ")) {
      if (!inList) flushList();
      listItems.push(line.slice(2));
      inList = true;
    } else {
      flushList();
      elements.push(
        <p
          key={i}
          className="text-walnut-light leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
    }
  }
  flushList();

  return <div className="space-y-4">{elements}</div>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
  };

  return (
    <>
      <article className="section-padding bg-cream">
        <div className="container-narrow mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-walnut-light hover:text-terracotta transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 text-sm text-walnut-light mb-3">
              <span className="bg-sage-light/30 text-sage-dark px-2.5 py-0.5 rounded-full text-xs">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-handwritten text-3xl sm:text-4xl lg:text-5xl text-walnut leading-tight">
              {post.title}
            </h1>

            <p className="mt-4 text-lg text-walnut-light leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Cover placeholder */}
          <div
            className={`aspect-[21/9] rounded-2xl bg-gradient-to-br ${post.coverColor} mb-10`}
          />

          {/* Content */}
          <div className="prose-walnut">{renderMarkdown(post.content)}</div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-10 border-t border-sage-light/30">
              <h2 className="font-handwritten text-2xl text-walnut mb-6">
                Keep Reading
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
                  >
                    <span className="text-xs text-sage-dark bg-sage-light/30 px-2 py-0.5 rounded-full">
                      {p.category}
                    </span>
                    <h3 className="mt-2 font-semibold text-walnut group-hover:text-terracotta transition-colors text-sm leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-xs text-walnut-light line-clamp-2">
                      {p.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </div>
      </article>

      <NewsletterSection />
    </>
  );
}
