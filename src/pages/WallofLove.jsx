import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function WallOfLove() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    setReviews(data || []);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-12 text-pink-600">Wall of Love</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg text-gray-800">{review.name}</h3>
              <div className="text-yellow-400 text-xl">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">"{review.review_text}"</p>
          </div>
        ))}

        {reviews.length === 0 && (
          <p className="col-span-3 text-center py-20 text-gray-500 text-lg">
            No reviews yet. Be the first to leave one!
          </p>
        )}
      </div>
    </div>
  );
}