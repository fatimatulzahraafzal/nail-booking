import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-[calc(100vh-64px)] bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop')" }}
    >
      <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl text-center shadow-xl max-w-md w-full">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Beautiful Nails Await</h2>
        <button 
          onClick={() => navigate('/book')}
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition shadow-md"
        >
          Book an Appointment
        </button>
      </div>
    </div>
  );
}