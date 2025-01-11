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
    name: "Apollo Hospitals",
    address: "21 Greams Lane, Off Greams Road, Chennai, Tamil Nadu",
    coordinates: { lat: 13.067439, lng: 80.237617 },
    rating: 4.7,
    phone: "+91 44 2829 3333",
    hours: "24/7",
    specialties: ["Cardiology", "Orthopedics", "Neurology", "Oncology"],
    screeningServices: ["CT Scan", "MRI", "Blood Tests", "ECG"],
    image: "https://images.unsplash.com/photo-1584438784665-dfdb2c3f8bb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "AIIMS Delhi",
    address: "Ansari Nagar, New Delhi, Delhi 110029",
    coordinates: { lat: 28.5665, lng: 77.210 },
    rating: 4.8,
    phone: "+91 11 2658 8500",
    hours: "24/7",
    specialties: ["General Medicine", "Surgery", "Pediatrics", "Trauma Care"],
    screeningServices: ["X-Ray", "Ultrasound", "Blood Tests", "Physical Exam"],
    image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Fortis Hospital",
    address: "Sector B, Pocket 1, Aruna Asaf Ali Marg, Vasant Kunj, New Delhi, Delhi 110070",
    coordinates: { lat: 28.5245, lng: 77.1855 },
    rating: 4.6,
    phone: "+91 11 4277 6222",
    hours: "24/7",
    specialties: ["Cardiology", "Urology", "Neurology", "Orthopedics"],
    screeningServices: ["Bone Density Test", "Mammography", "ECG", "Blood Tests"],
    image: "https://images.unsplash.com/photo-1576765607927-917f30c0a365?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Narayana Health",
    address: "No. 258/A, Bommasandra Industrial Area, Bengaluru, Karnataka 560099",
    coordinates: { lat: 12.8342, lng: 77.6833 },
    rating: 4.5,
    phone: "+91 80 7122 2222",
    hours: "24/7",
    specialties: ["Cancer Care", "Cardiac Surgery", "Pediatrics", "Gastroenterology"],
    screeningServices: ["Endoscopy", "PET Scan", "CT Scan", "MRI"],
    image: "https://images.unsplash.com/photo-1576766562930-1168c11a3116?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Manipal Hospitals",
    address: "98, HAL Airport Road, Bengaluru, Karnataka 560017",
    coordinates: { lat: 12.9603, lng: 77.6486 },
    rating: 4.4,
    phone: "+91 80 2222 1111",
    hours: "24/7",
    specialties: ["Nephrology", "Gynecology", "Oncology", "Dermatology"],
    screeningServices: ["Skin Biopsy", "Blood Tests", "CT Scan", "Physical Exam"],
    image: "https://images.unsplash.com/photo-1576765607927-917f30c0a365?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
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