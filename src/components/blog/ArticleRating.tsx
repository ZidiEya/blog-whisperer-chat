
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface ArticleRatingProps {
  articleId: string;
}

const ArticleRating: React.FC<ArticleRatingProps> = ({ articleId }) => {
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(23);
  const [averageRating, setAverageRating] = useState(4.3);
  const [hasRated, setHasRated] = useState(false);

  const handleRating = (newRating: number) => {
    if (hasRated) {
      toast.error('You have already rated this article');
      return;
    }

    setUserRating(newRating);
    setHasRated(true);
    
    // Simulate updating average rating
    const newAverage = ((averageRating * totalRatings) + newRating) / (totalRatings + 1);
    setAverageRating(Number(newAverage.toFixed(1)));
    setTotalRatings(prev => prev + 1);
    
    toast.success('Thank you for rating this article!');
  };

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-4">Rate this Article</h4>
          
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                  onClick={() => handleRating(star)}
                  disabled={hasRated}
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (userRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    onMouseEnter={() => !hasRated && setRating(star)}
                    onMouseLeave={() => !hasRated && setRating(0)}
                  />
                </Button>
              ))}
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Average: {averageRating}/5 ({totalRatings} ratings)
          </div>
          
          {hasRated && (
            <p className="text-sm text-green-600 mt-2">You rated this article {userRating}/5 stars</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleRating;
