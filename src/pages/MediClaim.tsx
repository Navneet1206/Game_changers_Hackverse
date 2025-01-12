import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, FileCheck, Building, Users, UploadCloud, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

// Validation function
const validateForm = (formData) => {
  const errors = [];

  // Required fields
  const requiredFields = ['fullName', 'employeeId', 'company', 'email', 'phoneNumber', 'description'];
  requiredFields.forEach(field => {
    if (!formData.get(field)) {
      errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
    }
  });

  // Email validation
  const email = formData.get('email');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Invalid email format');
  }

  // Phone validation
  const phone = formData.get('phoneNumber');
  if (phone && !/^\d{10}$/.test(phone.replace(/[-\s]/g, ''))) {
    errors.push('Phone number must be 10 digits');
  }

  // File validation
  const healthHubDoc = formData.get('healthHubDocument');
  const doctorReceipt = formData.get('doctorReceipt');

  if (healthHubDoc && !['image/jpeg', 'image/png', 'application/pdf'].includes(healthHubDoc.type)) {
    errors.push('Health Hub Document must be JPG, PNG, or PDF');
  }

  if (doctorReceipt && !['image/jpeg', 'image/png', 'application/pdf'].includes(doctorReceipt.type)) {
    errors.push('Doctor Receipt must be JPG, PNG, or PDF');
  }

  return errors;
};

const MediClaim = () => {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const formVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setPopup(null);
    setValidationErrors([]);
  
    // Capture the form element
    const formElement = event.currentTarget;
  
    const formData = new FormData(formElement);
  
    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
      setValidationErrors(errors);
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:3000/api/submit-claim',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          responseType: 'blob',
        }
      );
  
      // Trigger PDF download
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'MediClaim_Receipt.pdf';
      link.click();
  
      // Show success popup
      setPopup({ type: 'success', message: 'Claim submitted successfully! Receipt downloaded.' });
  
      // Reset the form
      formElement.reset();
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
  
      if (error.response) {
        console.log('Server Response:', error.response.data);
        console.log('Status:', error.response.status);
      } else if (error.request) {
        console.log('No response received from server:', error.request);
      } else {
        console.log('Error setting up the request:', error.message);
      }
  
      setPopup({ type: 'error', message: 'Failed to submit claim. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen p-14 bg-gradient-to-br from-blue-900 via-teal-400 to-blue-300 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ y: -20, opacity: 0.2 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold sm:text-5xl">
            Authorized MediClaim Services
          </h1>
          <p className="mt-4 text-xl">
            Trusted verification for corporate healthcare claims
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              Icon: ShieldCheck,
              title: 'Verified Authentication',
              description: 'Advanced verification for authentic medical claims.',
            },
            {
              Icon: FileCheck,
              title: 'Digital Documentation',
              description: 'Secure storage and easy document access.',
            },
            {
              Icon: Building,
              title: 'Corporate Integration',
              description: 'Seamless insurance and policy integration.',
            },
          ].map(({ Icon, title, description }, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-100 via-teal-4 to-blue-3 text-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:scale-105"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-teal-600 rounded-full">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">{title}</h3>
              <p className="mt-2 text-gray-600">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          onClick={() => setShowForm(!showForm)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 w-full bg-teal-800 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition-colors text-lg font-semibold"
        >
          {showForm ? 'Close Form' : 'Submit a Medical Claim'}
        </motion.button>

        <AnimatePresence>
          {showForm && (
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mt-8 bg-white p-8 rounded-lg shadow-lg border border-gray-200"
            >
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-black"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    required
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-black"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Company
                  </label>
                  <select
                    name="company"
                    required
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-black"
                  >
                    <option value="Tata Consultancy Services">
                      Tata Consultancy Services
                    </option>
                    <option value="Infosys">Infosys</option>
                    <option value="Wipro">Wipro</option>
                    <option value="HCL Technologies">HCL Technologies</option>
                    <option value="Tech Mahindra">Tech Mahindra</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    HealthHub Verified Document
                  </label>
                  <input
                    type="file"
                    name="healthHubDocument"
                    required
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-black"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Doctor's Cost Receipt
                  </label>
                  <input
                    type="file"
                    name="doctorReceipt"
                    required
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-black"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-black"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    required
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-black"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Describe your health problem
                  </label>
                  <textarea
                    name="description"
                    required
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-black"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full bg-teal-800 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    'Submit Claim'
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Validation Errors */}
        <AnimatePresence>
          {validationErrors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-4 right-4 p-4 bg-red-500 rounded-lg shadow-lg max-w-md z-50"
            >
              <h3 className="font-bold text-white mb-2">Please fix the following errors:</h3>
              <ul className="list-disc list-inside text-white">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success/Error Popup */}
        <AnimatePresence>
          {popup && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center space-x-2 z-50 ${
                popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {popup.type === 'success' ? (
                <CheckCircle className="h-6 w-6 text-white" />
              ) : (
                <XCircle className="h-6 w-6 text-white" />
              )}
              <span className="text-white">{popup.message}</span>
              <button
                onClick={() => setPopup(null)}
                className="ml-2 text-white hover:text-gray-200"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MediClaim;