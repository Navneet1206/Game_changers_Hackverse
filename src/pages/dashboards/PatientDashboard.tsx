import React, { useEffect, useState } from 'react';
import { Calendar, HeartPulse, ClipboardList, Clock, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Appointment {
  id: string;
  doctor: string;
  time: string;
  type: string;
}

interface HealthRecord {
  id: string;
  date: string;
  description: string;
}

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[] | null>(null);
  const [pendingPrescriptions, setPendingPrescriptions] = useState<number | null>(null);
  const [averageWaitTime, setAverageWaitTime] = useState<number | null>(null);

  // Dummy data for development or fallback
  const mockData = {
    appointments: [
      { id: '1', doctor: 'Dr. John Doe', time: '10:00 AM', type: 'Routine Checkup' },
      { id: '2', doctor: 'Dr. Jane Smith', time: '11:00 AM', type: 'Follow-up' },
    ],
    healthRecords: [
      { id: '1', date: '2023-10-01', description: 'Annual Physical Exam' },
      { id: '2', date: '2023-09-15', description: 'Blood Test Results' },
    ],
    pendingPrescriptions: 2,
    averageWaitTime: 10,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Uncomment the following lines to use real API data
        // const response = await fetch(`/api/patient/${user?.id}/dashboard`);
        // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        // const data = await response.json();

        // For now, use mock data
        const data = mockData;

        setAppointments(data.appointments);
        setHealthRecords(data.healthRecords);
        setPendingPrescriptions(data.pendingPrescriptions);
        setAverageWaitTime(data.averageWaitTime);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to mock data if API fails
        setAppointments(mockData.appointments);
        setHealthRecords(mockData.healthRecords);
        setPendingPrescriptions(mockData.pendingPrescriptions);
        setAverageWaitTime(mockData.averageWaitTime);
      }
    };

    if (user?.id) fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Upcoming Appointments</h3>
                <p className="text-2xl font-semibold">
                  {appointments ? appointments.length : 'Loading...'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <HeartPulse className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Health Records</h3>
                <p className="text-2xl font-semibold">
                  {healthRecords ? healthRecords.length : 'Loading...'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ClipboardList className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Pending Prescriptions</h3>
                <p className="text-2xl font-semibold">
                  {pendingPrescriptions ?? 'Loading...'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Average Wait Time</h3>
                <p className="text-2xl font-semibold">
                  {averageWaitTime ? `${averageWaitTime} min` : 'Loading...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
              <div className="mt-4 space-y-4">
                {appointments ? (
                  appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{appointment.doctor}</p>
                        <p className="text-sm text-gray-500">{appointment.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                        <button className="mt-1 text-sm text-blue-600 hover:text-blue-500">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading appointments...</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">Health Records</h2>
              <div className="mt-4 space-y-4">
                {healthRecords ? (
                  healthRecords.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{record.date}</p>
                        <p className="text-sm text-gray-500">{record.description}</p>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-500">
                        View Details
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Loading health records...</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
                <Calendar className="h-6 w-6 mx-auto" />
                <span className="mt-2 block text-sm">Book Appointment</span>
              </button>
              <button className="p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
                <HeartPulse className="h-6 w-6 mx-auto" />
                <span className="mt-2 block text-sm">View Health Records</span>
              </button>
              <button className="p-4 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors">
                <ClipboardList className="h-6 w-6 mx-auto" />
                <span className="mt-2 block text-sm">Request Prescription</span>
              </button>
              <button className="p-4 bg-yellow-50 rounded-lg text-yellow-700 hover:bg-yellow-100 transition-colors">
                <Settings className="h-6 w-6 mx-auto" />
                <span className="mt-2 block text-sm">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;