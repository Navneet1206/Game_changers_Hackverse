import React from 'react';
import { Users, Activity, Bed, UserCheck, Clock, Calendar, AlertCircle, FileText } from 'lucide-react';

const HospitalDashboard = () => {
  const departments = [
    { name: 'Emergency', occupied: 15, total: 20, waitTime: '5 mins' },
    { name: 'ICU', occupied: 8, total: 10, waitTime: 'N/A' },
    { name: 'General Ward', occupied: 45, total: 60, waitTime: '20 mins' },
    { name: 'Pediatrics', occupied: 12, total: 15, waitTime: '15 mins' },
  ];

  const recentAlerts = [
    { id: 1, type: 'Emergency', message: 'New emergency case arrival in 5 minutes', time: '2 mins ago' },
    { id: 2, type: 'Staff', message: 'Dr. Smith requested additional nursing support', time: '15 mins ago' },
    { id: 3, type: 'Equipment', message: 'MRI machine maintenance required', time: '1 hour ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Total Patients</h3>
                <p className="text-2xl font-semibold">248</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Emergency Cases</h3>
                <p className="text-2xl font-semibold">15</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Bed className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Available Beds</h3>
                <p className="text-2xl font-semibold">42</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Staff on Duty</h3>
                <p className="text-2xl font-semibold">85</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Status</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {departments.map((dept) => (
              <div key={dept.name} className="bg-white rounded-lg shadow p-6">
                <h3 className="font-medium text-gray-900">{dept.name}</h3>
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Occupancy</p>
                    <p className="text-lg font-semibold">{dept.occupied}/{dept.total}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Wait Time</p>
                    <p className="text-lg font-semibold">{dept.waitTime}</p>
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(dept.occupied / dept.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
              <div className="mt-4 space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{alert.type}</p>
                      <p className="text-sm text-gray-500">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
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
                  <Calendar className="h-6 w-6 mx-auto" />
                  <span className="mt-2 block text-sm">Schedule Surgery</span>
                </button>
                <button className="p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
                  <Bed className="h-6 w-6 mx-auto" />
                  <span className="mt-2 block text-sm">Bed Management</span>
                </button>
                <button className="p-4 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors">
                  <FileText className="h-6 w-6 mx-auto" />
                  <span className="mt-2 block text-sm">View Reports</span>
                </button>
                <button className="p-4 bg-yellow-50 rounded-lg text-yellow-700 hover:bg-yellow-100 transition-colors">
                  <Clock className="h-6 w-6 mx-auto" />
                  <span className="mt-2 block text-sm">Staff Schedule</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;