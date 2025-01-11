import React from 'react';
import { TestTube2, FileText, Clock, Users, Activity, Calendar, Settings, Search } from 'lucide-react';

const LabDashboard = () => {
  const pendingTests = [
    { id: 1, patient: 'Alice Johnson', test: 'Blood Work', doctor: 'Dr. Wilson', time: '10:00 AM' },
    { id: 2, patient: 'Bob Smith', test: 'X-Ray', doctor: 'Dr. Brown', time: '11:30 AM' },
    { id: 3, patient: 'Carol White', test: 'MRI Scan', doctor: 'Dr. Davis', time: '02:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TestTube2 className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Pending Tests</h3>
                <p className="text-2xl font-semibold">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Reports Ready</h3>
                <p className="text-2xl font-semibold">8</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Average Processing Time</h3>
                <p className="text-2xl font-semibold">45 min</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Today's Patients</h3>
                <p className="text-2xl font-semibold">24</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Pending Tests</h2>
              <div className="mt-4 space-y-4">
                {pendingTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{test.patient}</p>
                      <p className="text-sm text-gray-500">{test.test} - Referred by {test.doctor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{test.time}</p>
                      <button className="mt-1 text-sm text-blue-600 hover:text-blue-500">Process Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <button className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
                  <Search className="h-6 w-6 mx-auto" />
                  <span className="mt-2 block text-sm">Search Records</span>
                </button>
                <button className="p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
                  <Calendar className="h-6 w-6 mx-auto" />
                  <span className="mt-2 block text-sm">Schedule Tests</span>
                </button>
                <button className="p-4 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors">
                  <Activity className="h-6 w-6 mx-auto" />
                  <span className="mt-2 block text-sm">Equipment Status</span>
                </button>
                <button className="p-4 bg-yellow-50 rounded-lg text-yellow-700 hover:bg-yellow-100 transition-colors">
                  <Settings className="h-6 w-6 mx-auto" />
                  <span className="mt-2 block text-sm">Lab Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900">Equipment Status</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">MRI Scanner</span>
                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    Operational
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Next maintenance: 5 days</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">X-Ray Machine</span>
                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    Operational
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Next maintenance: 12 days</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">CT Scanner</span>
                  <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
                    Maintenance
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Available in: 2 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDashboard;