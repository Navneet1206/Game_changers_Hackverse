import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

interface BookAppointmentPopupProps {
  onClose: () => void;
}

const BookAppointmentPopup: React.FC<BookAppointmentPopupProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/api/book-appointment', formData, {
        responseType: 'blob',
      });

      // Trigger PDF download
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'Appointment_Receipt.pdf';
      link.click();

      onClose(); // Close the popup after successful submission
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
      console.error('Error booking appointment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient Name</label>
              <input
                type="text"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
              <input
                type="text"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                value={formData.doctorName}
                onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
              <input
                type="date"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                value={formData.appointmentDate}
                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Appointment Time</label>
              <input
                type="time"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                value={formData.appointmentTime}
                onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reason for Visit</label>
              <textarea
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {isLoading ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookAppointmentPopup;