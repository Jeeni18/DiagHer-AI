import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PatientRecordsPage from './pages/PatientRecordsPage';
import PatientProfilePage from './pages/PatientProfilePage';
import ClinicalDecisionPage from './pages/ClinicalDecisionPage';
import AIInsights from './pages/AIInsights';


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            

            <Route 
              path="/clinical-decision" 
              element={
                <ProtectedRoute>
                  <ClinicalDecisionPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/patients" 
              element={
                <ProtectedRoute>
                  <PatientRecordsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/patients/:patientId" 
              element={
                <ProtectedRoute>
                  <PatientProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/patients/:patientId/insights" 
              element={
                <ProtectedRoute>
                  <AIInsights />
                </ProtectedRoute>
            } 
/>

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;