import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Hospitals from './pages/Hospitals';
import Login from './pages/Login';
import MediClaim from './pages/MediClaim';
import CompanyRegistration from './pages/CompanyRegistration'; 
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import HospitalDashboard from './pages/dashboards/HospitalDashboard';
import LabDashboard from './pages/dashboards/LabDashboard';
import StoreDashboard from './pages/dashboards/StoreDashboard';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mediclaim" element={<MediClaim />} />
          <Route path="/register-company" element={<CompanyRegistration />} /> 
          <Route path="/dashboard/doctor" element={user ? <DoctorDashboard /> : <Navigate to="/login" />} />
          <Route path="/dashboard/patient" element={user ? <PatientDashboard /> : <Navigate to="/login" />} />
          <Route path="/dashboard/hospital" element={user ? <HospitalDashboard /> : <Navigate to="/login" />} />
          <Route path="/dashboard/lab" element={user ? <LabDashboard /> : <Navigate to="/login" />} />
          <Route path="/dashboard/store" element={user ? <StoreDashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;