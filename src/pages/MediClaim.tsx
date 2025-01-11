import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, FileCheck, Building2, Users, CheckCircle2 } from 'lucide-react';

const MediClaim = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Authorized MediClaim Services</h1>
          <p className="mt-4 text-xl text-gray-600">Trusted verification for corporate healthcare claims</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Verified Authentication</h3>
            <p className="mt-2 text-gray-600">
              Our platform uses advanced verification processes to ensure all medical claims are authentic and accurate.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
              <FileCheck className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Digital Documentation</h3>
            <p className="mt-2 text-gray-600">
              Secure digital storage of all claim-related documents with easy access for authorized personnel.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Corporate Integration</h3>
            <p className="mt-2 text-gray-600">
              Seamless integration with corporate healthcare policies and insurance providers.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold">For Employers</h2>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <p className="text-gray-600">Automated verification process for employee medical claims</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <p className="text-gray-600">Real-time tracking of claim status and processing</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <p className="text-gray-600">Secure access to employee medical records with proper authorization</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <p className="text-gray-600">Integration with existing HR and payroll systems</p>
              </div>
            </div>

            <Link to="/register-company">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Register Your Company
        
            </motion.button>
              </Link> {/* Add the new link */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MediClaim;