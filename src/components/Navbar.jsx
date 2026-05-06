import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
          Nail Artistry
        </Link>
        
        <div className="flex gap-8 text-sm font-medium">
          <Link to="/book" className={`hover:text-pink-600 transition-colors ${location.pathname === '/book' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-700'}`}>Book Now</Link>
          <Link to="/review" className={`hover:text-pink-600 transition-colors ${location.pathname === '/review' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-700'}`}>Leave a Review</Link>
          <Link to="/wall-of-love" className={`hover:text-pink-600 transition-colors ${location.pathname === '/wall-of-love' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-700'}`}>Wall of Love</Link>
        </div>
      </div>
    </nav>
  );
}
