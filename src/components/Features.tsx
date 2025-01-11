import { FileText, Calendar, MapPin, ClipboardCheck, Microscope, Truck } from 'lucide-react';

const features = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Document Access',
    description: 'Secure storage for all your medical documents',
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Doctor Appointments',
    description: 'Book appointments with verified doctors',
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Find Nearby Services',
    description: 'Locate medical shops and hospitals',
  },
  {
    icon: <ClipboardCheck className="h-6 w-6" />,
    title: 'Mediclaim Verification',
    description: 'Get documents verified for medical claims',
  },
  {
    icon: <Microscope className="h-6 w-6" />,
    title: 'Lab Bookings',
    description: 'Schedule lab tests and services',
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: 'Medicine Delivery',
    description: 'Coming Soon: Online medicine ordering',
  },
];

const Features = () => {
  return (
    <div className="py-16 bg-gray-50">
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
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-600 ring-4 ring-white">
                  {feature.icon}
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;