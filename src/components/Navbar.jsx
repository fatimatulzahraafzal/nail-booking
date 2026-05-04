import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-600">Nail Artistry</h1>
        
        <div className="flex gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-pink-600 transition-colors">Home</Link>
          <Link to="/book" className="hover:text-pink-600 transition-colors">Book Now</Link>
          <Link to="/review" className="hover:text-pink-600 transition-colors">Leave a Review</Link>
          <Link to="/wall-of-love" className="hover:text-pink-600 transition-colors">Wall of Love</Link>
        </div>
      </div>
    </nav>
  );
}