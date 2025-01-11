import React from 'react';
import { Users, Award, Shield } from 'lucide-react';

const About = () => {
  function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
  }
  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">About HealthHub</h1>
          <p className="mt-4 text-xl text-gray-600">Revolutionizing healthcare access for everyone</p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Our Mission</h3>
              <p className="mt-2 text-gray-600">To make healthcare accessible, efficient, and user-friendly for everyone.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Award className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Quality First</h3>
              <p className="mt-2 text-gray-600">We partner with verified healthcare providers to ensure the highest standards.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Secure & Private</h3>
              <p className="mt-2 text-gray-600">Your health data is protected with enterprise-grade security.</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="bg-blue-50 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-center text-gray-900">Our Story</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Founded in 2024, HealthHub emerged from a simple yet powerful idea: healthcare should be easily accessible to everyone. 
              We've built a platform that connects patients with healthcare providers, simplifies medical document management, 
              and makes booking appointments as easy as ordering food online.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Today, we serve thousands of users, partner with hundreds of healthcare providers, and continue to innovate 
              in the digital healthcare space. Our commitment to improving healthcare access drives everything we do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;