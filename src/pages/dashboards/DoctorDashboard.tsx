import React, { useEffect, useState } from 'react';
import { Calendar, Users, ClipboardList, Clock, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Appointment {
  id: string;
  patient: string;
  time: string;
  type: string;
}

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [patientCount, setPatientCount] = useState<number | null>(null);
  const [pendingReports, setPendingReports] = useState<number | null>(null);
  const [averageWaitTime, setAverageWaitTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/doctor/${user?.id}/dashboard`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log("Dashboard Data:", data);
        setAppointments(data.appointments);
        setPatientCount(data.patientCount);
        setPendingReports(data.pendingReports);
        setAverageWaitTime(data.averageWaitTime);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
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
                <h3 className="text-gray-500 text-sm">Today's Appointments</h3>
                <p className="text-red-500">
  {appointments === null ? "Failed to load appointments. Please try again later." : null}
</p>

              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Total Patients</h3>
                <p className="text-2xl font-semibold">{patientCount ?? 'Loading...'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ClipboardList className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Pending Reports</h3>
                <p className="text-2xl font-semibold">{pendingReports ?? 'Loading...'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Average Wait Time</h3>
                <p className="text-2xl font-semibold">{averageWaitTime ? `${averageWaitTime} min` : 'Loading...'}</p>
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
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{appointment.patient}</p>
                        <p className="text-sm text-gray-500">{appointment.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                        <button className="mt-1 text-sm text-blue-600 hover:text-blue-500">View Details</button>
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
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <button className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
                  <Calendar className="h-6 w-6 mx-auto" />
                  <span className="mt-2 block text-sm">Schedule Appointment</span>
                </button>
                <button className="p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
                  <ClipboardList className="h-6 w-6 mx-auto" />
                  <span className="mt-2 block text-sm">Write Prescription</span>
                </button>
                <button className="p-4 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors">
                  <Users className="h-6 w-6 mx-auto" />
                  <span className="mt-2 block text-sm">Patient Records</span>
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
    </div>
  );
};

export default DoctorDashboard;