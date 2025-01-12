import React from 'react';
import { Users, Award, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Heading Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            About <span className="text-blue-600">HealthHub</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Revolutionizing healthcare access for everyone
          </p>
        </div>

        {/* Mission, Quality, and Security Section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {[ // Information cards
              {
                icon: <Users className="h-12 w-12 text-white" />,
                title: 'Our Mission',
                description: 'To make healthcare accessible, efficient, and user-friendly for everyone.',
              },
              {
                icon: <Award className="h-12 w-12 text-white" />,
                title: 'Quality First',
                description: 'We partner with verified healthcare providers to ensure the highest standards.',
              },
              {
                icon: <Shield className="h-12 w-12 text-white" />,
                title: 'Secure & Private',
                description: 'Your health data is protected with enterprise-grade security.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="relative group bg-white bg-opacity-90 backdrop-blur-lg p-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 overflow-hidden"
              >
                <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-teal-500 rounded-full p-4 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Pop-Up */}
                <div className="absolute inset-0 bg-blue-50 bg-opacity-95 flex items-center justify-center p-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden pointer-events-none">
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-blue-900">
                      {feature.title}
                    </h4>
                    <p className="mt-2 text-sm text-gray-700">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mt-20">
          <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl p-8 lg:p-12 shadow-lg">
            <h2 className="text-3xl font-extrabold text-center text-gray-900">
              Our Story
            </h2>
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
