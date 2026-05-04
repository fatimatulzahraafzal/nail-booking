import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function ReviewForm() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from('reviews').insert([{ 
      name, 
      rating, 
      review_text: reviewText 
    }]);
    navigate('/wall-of-love');
  };

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Leave a Review</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-pink-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <select 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-pink-400"
            >
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Review</label>
            <textarea 
              value={reviewText} 
              onChange={(e) => setReviewText(e.target.value)} 
              maxLength={150}
              required
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:border-pink-400"
            ></textarea>
            <p className="text-xs text-right text-gray-500 mt-1">
              {reviewText.length}/150
            </p>
          </div>

          <button 
            type="submit" 
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3.5 rounded-xl font-semibold transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}