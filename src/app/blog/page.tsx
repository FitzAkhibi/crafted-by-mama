import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { blogPosts, getBlogCategories } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Crafting tutorials, parenting tips, and behind-the-scenes stories from Crafted By Mama.",
};

export default function BlogPage() {
  const categories = getBlogCategories();

  return (
    <div className="section-padding bg-cream texture-paper">
      <div className="container-wide mx-auto">
        <SectionHeading
          title="The Mama Blog"
          subtitle="Tutorials, tips, and stories from the craft table"
        />

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <span className="text-sm px-4 py-1.5 rounded-full bg-terracotta text-white">
            All
          </span>
          {categories.map((cat) => (
            <span
              key={cat}
              className="text-sm px-4 py-1.5 rounded-full bg-white text-walnut-light border border-sage-light/50"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              {/* Cover placeholder */}
              <div
                className={`aspect-[16/10] bg-gradient-to-br ${post.coverColor}`}
              />

              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-walnut-light mb-2">
                  <span className="bg-sage-light/30 text-sage-dark px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="font-semibold text-walnut group-hover:text-terracotta transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="mt-2 text-sm text-walnut-light line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                <p className="mt-3 text-xs text-walnut-light">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
