import { useState } from 'react';
import { Search, MapPin, Star, Phone, Clock, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';

interface Hospital {
  id: number;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  phone: string;
  hours: string;
  specialties: string[];
  screeningServices: string[];
  image: string;
}

const mockHospitals: Hospital[] = [
  {
    id: 1,
    name: "City General Hospital",
    address: "456 Healthcare Ave, Medical District",
    coordinates: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates
    rating: 4.5,
    phone: "+1 (555) 234-5678",
    hours: "24/7",
    specialties: ["Emergency Care", "Surgery", "Pediatrics"],
    screeningServices: ["X-Ray", "MRI", "Blood Tests", "CT Scan"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Memorial Medical Center",
    address: "789 Wellness Blvd, Health Valley",
    coordinates: { lat: 34.0522, lng: -118.2437 }, // LA coordinates
    rating: 4.8,
    phone: "+1 (555) 345-6789",
    hours: "24/7",
    specialties: ["Cardiology", "Oncology", "Neurology"],
    screeningServices: ["Mammography", "Ultrasound", "ECG", "Bone Density"],
    image: "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Community Health Center",
    address: "321 Care Lane, Healing District",
    coordinates: { lat: 41.8781, lng: -87.6298 }, // Chicago coordinates
    rating: 4.3,
    phone: "+1 (555) 456-7890",
    hours: "8:00 AM - 8:00 PM",
    specialties: ["Family Medicine", "Dental Care", "Mental Health"],
    screeningServices: ["Dental X-Ray", "Vision Test", "Mental Health Screening", "Physical Exam"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const Hospitals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const filteredHospitals = mockHospitals.filter(hospital =>
    (hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )) &&
    (!selectedService || hospital.screeningServices.includes(selectedService))
  );

  const openInGoogleMaps = (coordinates: { lat: number; lng: number }) => {
    const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const allScreeningServices = Array.from(
    new Set(mockHospitals.flatMap(hospital => hospital.screeningServices))
  ).sort();

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Find Hospitals</h1>
          <p className="mt-4 text-xl text-gray-600">Discover quality healthcare facilities near you</p>
        </motion.div>

        <div className="mt-8 max-w-xl mx-auto space-y-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by hospital name or specialty..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative"
          >
            <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">All Screening Services</option>
              {allScreeningServices.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredHospitals.map(hospital => (
            <motion.div
              key={hospital.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <img src={hospital.image} alt={hospital.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 
                  className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer"
                  onClick={() => openInGoogleMaps(hospital.coordinates)}
                >
                  {hospital.name}
                </h3>
                <div className="mt-2 flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-600">{hospital.address}</span>
                </div>
                <div className="mt-2 flex items-center">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="ml-2 text-sm text-gray-600">{hospital.rating} / 5.0</span>
                </div>
                <div className="mt-2 flex items-center">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-600">{hospital.phone}</span>
                </div>
                <div className="mt-2 flex items-center">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-600">{hospital.hours}</span>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Specialties:</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {hospital.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Screening Services:</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {hospital.screeningServices.map((service, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Book Appointment
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hospitals;