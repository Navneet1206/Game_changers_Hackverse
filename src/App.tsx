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
import NotFound from './pages/NotFound'; // Import a new NotFound component
import { useAuth } from './contexts/AuthContext';
import Footer from './components/Footer';
import Ekyc from './pages/Ekyc';

// Protected Route Component
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Ensure no premature access to `user`
  }

  return user ? children : <Navigate to="/login" />;
}

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              user ? (
                <Navigate
                  to={`/dashboard/${user.userType.toLowerCase()}`}
                  replace
                />
              ) : (
                <Home />
              )
            }
          />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/ekyc" element={<Ekyc />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Semi-Protected Routes */}
          <Route
            path="/hospitals"
            element={
              <ProtectedRoute>
                <Hospitals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mediclaim"
            element={
              <ProtectedRoute>
                <MediClaim />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register-company"
            element={
              <ProtectedRoute>
                <CompanyRegistration />
              </ProtectedRoute>
            }
          />

          {/* Fully Protected Routes */}
          <Route
            path="/dashboard/doctor"
            element={
              <ProtectedRoute>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/patient"
            element={
              <ProtectedRoute>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/hospital"
            element={
              <ProtectedRoute>
                <HospitalDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/lab"
            element={
              <ProtectedRoute>
                <LabDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/store"
            element={
              <ProtectedRoute>
                <StoreDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Catch-All Route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
