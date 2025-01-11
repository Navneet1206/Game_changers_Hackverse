import React from 'react';
import { Calendar, Pill, FileText, Activity, User, Clock } from 'lucide-react';

const PatientDashboard = () => {
  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Sarah Wilson', specialty: 'Cardiologist', date: '2024-03-15', time: '10:00 AM' },
    { id: 2, doctor: 'Dr. Michael Brown', specialty: 'Dentist', date: '2024-03-20', time: '02:30 PM' },
  ];

  const medications = [
    { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', remaining: 5 },
    { id: 2, name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', remaining: 10 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600">Here's an overview of your health status</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Next Appointment</p>
                <p className="mt-1 text-xl font-semibold">Mar 15, 10:00 AM</p>
                <p className="text-sm text-gray-500">Dr. Sarah Wilson</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Medications</p>
                <p className="mt-1 text-xl font-semibold">2 Prescriptions</p>
                <p className="text-sm text-gray-500">Next refill in 5 days</p>
              </div>
              <Pill className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Recent Reports</p>
                <p className="mt-1 text-xl font-semibold">3 New Results</p>
                <p className="text-sm text-gray-500">Updated 2 days ago</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
              <div className="mt-4 space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{appointment.doctor}</p>
                      <p className="text-sm text-gray-500">{appointment.specialty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{appointment.date}</p>
                      <p className="text-sm text-gray-500">{appointment.time}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Schedule New Appointment
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Current Medications</h2>
              <div className="mt-4 space-y-4">
                {medications.map((medication) => (
                  <div key={medication.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{medication.name}</p>
                      <p className="text-sm text-gray-500">{medication.dosage} - {medication.frequency}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{medication.remaining} days remaining</p>
                      <button className="mt-1 text-sm text-blue-600 hover:text-blue-500">Refill Request</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          <button className="p-6 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
            <User className="h-6 w-6 mx-auto" />
            <span className="mt-2 block text-sm font-medium">My Profile</span>
          </button>
          <button className="p-6 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
            <FileText className="h-6 w-6 mx-auto" />
            <span className="mt-2 block text-sm font-medium">Medical Records</span>
          </button>
          <button className="p-6 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors">
            <Activity className="h-6 w-6 mx-auto" />
            <span className="mt-2 block text-sm font-medium">Health Tracking</span>
          </button>
          <button className="p-6 bg-yellow-50 rounded-lg text-yellow-700 hover:bg-yellow-100 transition-colors">
            <Clock className="h-6 w-6 mx-auto" />
            <span className="mt-2 block text-sm font-medium">Visit History</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;