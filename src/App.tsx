import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Hospitals from './pages/Hospitals';
import Login from './pages/Login';
import MediClaim from './pages/MediClaim';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import HospitalDashboard from './pages/dashboards/HospitalDashboard';
import LabDashboard from './pages/dashboards/LabDashboard';
import StoreDashboard from './pages/dashboards/StoreDashboard';

function App() {
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
          <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
          <Route path="/dashboard/patient" element={<PatientDashboard />} />
          <Route path="/dashboard/hospital" element={<HospitalDashboard />} />
          <Route path="/dashboard/lab" element={<LabDashboard />} />
          <Route path="/dashboard/store" element={<StoreDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;