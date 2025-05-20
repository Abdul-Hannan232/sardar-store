import { useEffect, useState, type FC } from 'react';
import ReviewCard from '@components/cards/review-card';
import ReviewForm from '@components/common/form/review-form';
import http from '@framework/utils/http';

interface Review {
  id: number;
  title: string;
  message: string;
  user: { name: string };
  ratings: number;
  createdAt: string;
}
const data = [
  {
    id: 1,
    rating: 4,
    title: 'Amazing Service & Packaging',
    description:
      'Go sporty this summer with this vintage navy and white striped v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing with denim and white kicks for a stylish sporty vibe. Will fit a UK 8-10, model shown Go sporty this summer with this vintage navy and white striped v-neck t-shirt.',
    author: 'Kavin Dustin',
  },
  {
    id: 2,
    rating: 5,
    title: 'Promising Quality & Fast Delivery',
    description:
      'Go sporty this summer with this vintage navy and white striped v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing with denim and white kicks for a stylish sporty vibe. Will fit a UK 8-10, model shown Go sporty this summer with this vintage navy and white striped v-neck t-shirt.',
    author: 'Milly Jacsion',
  },
  {
    id: 3,
    rating: 3,
    title: 'Late Delivery service',
    description:
      'Go sporty this summer with this vintage navy and white striped v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing with denim and white kicks for a stylish sporty vibe. Will fit a UK 8-10, model shown Go sporty this summer with this vintage navy and white striped v-neck t-shirt.',
    author: 'Kavin Dustin',
  },
];

const ProductReviewRating = ({
  productId,
}: {
  productId: number | string | undefined;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getReviews = async () => {
    try {
      const response = await http.get(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/reviews/${productId}`,
      );
      // console.log(">>>>>>>>>> ",response);

      return response.data;
    } catch (error: any) {
      console.error(
        'Error fetching reviews:',
        error.response?.data || error.message,
      );
      throw error;
    }
  };
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(
          data.filter((review: any) => {
            return review?.status === 'unblock';
          }),
        );
      } catch (err: any) {
        setError(err.message || 'Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);
  //  console.log(">>>>>>>>>> ",reviews);
  if (loading) return <p>Loading reviews...</p>;
  if (error) console.log(`Error: ${error}`);

  return (
    <div className="lg:flex">
      <div className="pt-2 flex-grow">
        {reviews && reviews.length > 0 ? (
          reviews?.map((item) => (
            <ReviewCard item={item} key={`review-key-${item.id}`} />
          ))
        ) : (
          <p>This product has no reviews yet!</p>
        )}
      </div>
      <ReviewForm
        setReviews={setReviews}
        reviews={reviews || []}
        productId={productId}
        className="flex-grow lg:w-[500px] xl:w-[540px] 2xl:w-[600px] 3xl:w-[730px] lg:ltr:pl-10 lg:rtl:pr-10 xl:ltr:pl-14 xl:rtl:pr-14 3xl:ltr:pl-20 3xl:rtl:pr-20 shrink-0 pt-10"
      />
    </div>
  );
};

export default ProductReviewRating;
