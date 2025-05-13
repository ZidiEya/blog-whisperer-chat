
import React from 'react';
import CategoryTags from './CategoryTags';
import { format } from 'date-fns';

interface ArticleContentProps {
  article: {
    id: string;
    title: string;
    content: string;
    author: string;
    date: string;
    readTime: string;
    categories: string[];
    image?: string;
  };
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const formattedDate = format(new Date(article.date), 'MMMM dd, yyyy');
  
  return (
    <article className="blog-container py-8">
      <CategoryTags categories={article.categories} className="mb-4" />
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
      
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <span>{article.author}</span>
        <span className="mx-2">•</span>
        <span>{formattedDate}</span>
        <span className="mx-2">•</span>
        <span>{article.readTime}</span>
      </div>

      {article.image && (
        <div className="mb-8">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-auto rounded-lg object-cover max-h-[500px]"
          />
        </div>
      )}

      <div 
        className="prose prose-lg mx-auto"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
};

export default ArticleContent;
