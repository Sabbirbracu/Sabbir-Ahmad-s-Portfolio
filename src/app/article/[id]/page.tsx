import ArticlePage from "@/components/pages/ArticlePage";
import type { Metadata } from "next";

const SITE = "https://www.bysabbir.com";
const API = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  image?: string;
  date?: string;
  category?: string;
}

// Fetched on the server so link previews (LinkedIn, X, Slack, search) see real titles and images.
// Next.js dedupes the identical request made by generateMetadata and the page below.
async function getArticle(slug: string): Promise<ArticleMeta | null> {
  if (!API) return null;
  try {
    const res = await fetch(`${API}/articles/${encodeURIComponent(slug)}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return ((await res.json()) as { data?: ArticleMeta }).data ?? null;
  } catch {
    return null;
  }
}

const absolute = (url?: string) => (url ? new URL(url, SITE).toString() : undefined);
const isoDate = (date?: string) => {
  const d = date ? new Date(date) : null;
  return d && !Number.isNaN(d.getTime()) ? d.toISOString() : undefined;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) return { title: "Article not found" };

  const image = absolute(article.image);
  return {
    title: `${article.title} | Sabbir Ahmad`,
    description: article.description,
    alternates: { canonical: `/article/${id}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `${SITE}/article/${id}`,
      authors: ["Sabbir Ahmad"],
      publishedTime: isoDate(article.date),
      images: image ? [{ url: image, width: 1200, height: 630, alt: article.title }] : undefined,
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, images: image ? [image] : undefined },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticle(id);

  const jsonLd = article && {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: absolute(article.image),
    datePublished: isoDate(article.date),
    author: { "@type": "Person", name: "Sabbir Ahmad", url: SITE },
    mainEntityOfPage: `${SITE}/article/${id}`,
  };

  return (
    <>
      {jsonLd && (
        // "<" is escaped so article text can never close the script tag.
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      )}
      <ArticlePage />
    </>
  );
}
