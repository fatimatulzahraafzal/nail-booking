import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Booking from './pages/Booking';
import ReviewForm from './pages/ReviewForm';
import WallOfLove from './pages/WallOfLove';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/review" element={<ReviewForm />} />
          <Route path="/wall-of-love" element={<WallOfLove />} />
        </Routes>
      </div>
    </Router>
  );
}