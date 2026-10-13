import ArticlesPage from "@/components/pages/ArticlesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | Sabbir Ahmad",
  description:
    "Practical articles on AI integration, SaaS architecture, web performance, and shipping software, written from real production work.",
  alternates: { canonical: "/articles" },
  openGraph: {
    type: "website",
    title: "Articles | Sabbir Ahmad",
    description: "Practical articles on AI integration, SaaS architecture, web performance, and shipping software.",
    url: "https://www.bysabbir.com/articles",
  },
};

export default function Page() {
  return <ArticlesPage />;
}
