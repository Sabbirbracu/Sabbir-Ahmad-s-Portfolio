import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getArticleById } from "@/data/articles";
import { Button } from "@/components/ui/button";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = id ? getArticleById(id) : undefined;

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';

    lines.forEach((line, index) => {
      // Code block handling
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim();
          codeContent = '';
        } else {
          elements.push(
            <pre key={index} className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto my-6">
              <code className="text-sm font-mono text-foreground">{codeContent.trim()}</code>
            </pre>
          );
          inCodeBlock = false;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }

      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-3xl md:text-4xl font-bold font-heading mt-8 mb-6 text-foreground">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-bold font-heading mt-8 mb-4 text-foreground">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl font-bold font-heading mt-6 mb-3 text-foreground">
            {line.slice(4)}
          </h3>
        );
      }
      // Lists
      else if (line.startsWith('- **')) {
        const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          elements.push(
            <li key={index} className="text-muted-foreground ml-4 mb-2">
              <strong className="text-foreground">{match[1]}</strong>
              {match[2] && `: ${match[2]}`}
            </li>
          );
        }
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="text-muted-foreground ml-4 mb-2">{line.slice(2)}</li>
        );
      }
      // Paragraphs
      else if (line.trim()) {
        // Handle inline code
        const formattedLine = line.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-muted rounded text-sm font-mono text-primary">$1</code>');
        elements.push(
          <p 
            key={index} 
            className="text-muted-foreground leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        );
      }
    });

    return elements;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-6 left-6 z-10"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </motion.div>

        {/* Share Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-6 right-6 z-10"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={handleShare}
            className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="section-container relative -mt-32 z-10">
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-card border border-border/50 rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          {/* Category */}
          <span className="inline-block px-3 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/30 rounded-full mb-6">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6 text-foreground leading-tight">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border/50">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 italic border-l-4 border-primary/30 pl-6">
            {article.description}
          </p>

          {/* Article Content */}
          <div className="prose-custom">
            {renderContent(article.content)}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <Link to="/#knowledge">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Articles
              </Button>
            </Link>
          </div>
        </motion.article>
      </div>

      {/* Bottom Spacing */}
      <div className="h-24" />
    </div>
  );
};

export default ArticlePage;
