
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface CategoryTagsProps {
  categories: string[];
  className?: string;
}

const CategoryTags: React.FC<CategoryTagsProps> = ({ categories, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {categories.map((category) => (
        <Link key={category} to={`/articles?category=${category.toLowerCase()}`}>
          <Badge variant="secondary" className="hover:bg-secondary/80">
            {category}
          </Badge>
        </Link>
      ))}
    </div>
  );
};

export default CategoryTags;
