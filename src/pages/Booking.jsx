import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Booking() {
  const [date, setDate] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // Define all available time slots
  const allTimeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM'
  ];

  useEffect(() => {
    if (date) fetchBookedSlots();
  }, [date]);

  async function fetchBookedSlots() {
    if (!date) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('time_slot')
        .eq('date', date);
      
      if (error) throw error;
      
      // Extract just the time_slot values from booked appointments
      setBookedSlots(data.map(booking => booking.time_slot));
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setBookedSlots([]);
    } finally {
      setLoading(false);
    }
  }

  // Get available slots (all slots minus booked ones)
  const getAvailableSlots = () => {
    return allTimeSlots.filter(slot => !bookedSlots.includes(slot));
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!name || !selectedSlot) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .insert([{
          name: name,
          date: date,
          time_slot: selectedSlot
        }]);

      if (error) throw error;

      // Reset form and refresh slots
      setShowModal(false);
      setSelectedSlot(null);
      setName('');
      await fetchBookedSlots();
      alert('✅ Booking Confirmed!');
      
    } catch (err) {
      console.error('Booking error:', err);
      alert(`❌ Failed to complete booking: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const availableSlots = getAvailableSlots();

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Book Your Appointment
      </h2>
      
      <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-8">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Select Date
          </label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
            required
          />
        </div>

        {/* Available Slots */}
        {date && (
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-700">
              Available Time Slots
            </label>
            
            {loading ? (
              <div className="text-center py-8 text-gray-500">
                Loading available slots...
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => {
                        setSelectedSlot(slot);
                        setShowModal(true);
                      }}
                      className="p-4 border border-gray-200 rounded-xl hover:border-pink-400 
                               hover:bg-pink-50 transition text-sm font-medium text-gray-700
                               focus:outline-none focus:ring-2 focus:ring-pink-400"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                
                {availableSlots.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-2">
                      No slots available for this date.
                    </p>
                    <p className="text-sm text-gray-400">
                      Please try another date.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Booking Confirmation Modal */}
      {showModal && selectedSlot && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleBook} className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Confirm Your Booking
            </h3>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-600">
                <span className="font-medium">Date:</span> {date}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Time:</span> {selectedSlot}
              </p>
            </div>

            <input 
              type="text" 
              placeholder="Your full name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-xl mb-6 
                       focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
            />

            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 font-semibold 
                         rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}