import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, FileCheck, Building, Users, UploadCloud } from 'lucide-react';
import axios from 'axios';

const MediClaim = () => {
  const [showForm, setShowForm] = useState(false);

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const receiptData = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(
        'http://localhost:3000/api/submit-claim',
        receiptData,
        { responseType: 'blob' }
      );
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'MediClaim_Receipt.pdf';
      link.click();
    } catch (error) {
      console.error('Error submitting form:', error);
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
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
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
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Company
                  </label>
                  <select
                    name="company"
                    required
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
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
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
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
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
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
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
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
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Describe your health problem
                  </label>
                  <textarea
                    name="description"
                    required
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full bg-teal-800 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition"
                >
                  Submit Claim
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MediClaim;
