import { FileText, Calendar, MapPin, ClipboardCheck, Microscope, Truck } from 'lucide-react';

const features = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Document Access',
    description: 'Secure storage for all your medical documents',
    data: 'Access your lab reports, prescriptions, and health records securely.',
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Doctor Appointments',
    description: 'Book appointments with verified doctors',
    data: 'Easily schedule appointments with leading healthcare professionals.',
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Find Nearby Services',
    description: 'Locate medical shops and hospitals',
    data: 'Find pharmacies, clinics, and hospitals within your vicinity.',
  },
  {
    icon: <ClipboardCheck className="h-6 w-6" />,
    title: 'Mediclaim Verification',
    description: 'Get documents verified for medical claims',
    data: 'Streamline your insurance claims with verified documentation.',
  },
  {
    icon: <Microscope className="h-6 w-6" />,
    title: 'Lab Bookings',
    description: 'Schedule lab tests and services',
    data: 'Book diagnostic tests and receive results online.',
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: 'Medicine Delivery',
    description: 'Coming Soon: Online medicine ordering',
    data: 'Order medicines and have them delivered to your doorstep.',
  },
];

const Features = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need for your healthcare journey in one place
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white bg-opacity-90 backdrop-blur-lg p-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 overflow-hidden"
            >
              {/* Icon and Title */}
              <div>
                <span className="rounded-lg inline-flex p-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white ring-4 ring-white shadow-lg">
                  {feature.icon}
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>

              {/* Pop-up on Hover */}
              <div className="absolute inset-0 bg-blue-50 bg-opacity-95 flex items-center justify-center p-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden pointer-events-none">
                <div className="text-center">
                  <h4 className="text-lg font-bold text-blue-900">{feature.title}</h4>
                  <p className="mt-2 text-sm text-gray-700">{feature.data}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
