import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowPopup(false);

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      setPopupMessage('Your message has been sent successfully!');
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      setPopupMessage('Failed to send message. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Contact <span className="text-blue-600">Us</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            We're here to help and answer any questions you might have
          </p>
        </div>

        {/* Contact Details and Form */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div>
            <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900">Get in Touch</h2>
              <div className="mt-8 space-y-6">
                {[ // Contact details array
                  { icon: <Mail className="h-6 w-6 text-white" />, text: 'support@healthhub.com' },
                  { icon: <Phone className="h-6 w-6 text-white" />, text: '+1 (555) 123-4567' },
                  { icon: <MapPin className="h-6 w-6 text-white" />, text: '123 Health Street, Medical District, NY 10001' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 bg-gradient-to-r from-blue-500 to-teal-500 p-4 rounded-lg text-white shadow-md"
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl p-8 shadow-lg"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-md hover:bg-gradient-to-l transition-all duration-300 flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div className="fixed bottom-4 right-4">
          <div
            className={`p-4 rounded-lg shadow-lg ${
              isSuccess ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            {popupMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
