import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import KioskView from './components/Kiosk/KioskView';
import AdminDashboard from './components/Admin/AdminDashboard';
import Layout from './components/Layout';
import LoginPage from './components/Auth/LoginPage';
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleLogin = (username: string, password: string) => {
    // In a real app, this would validate against a backend
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setIsAdmin(true);
    } else if (username === 'kiosk' && password === 'kiosk') {
      setIsAuthenticated(true);
      setIsAdmin(false);
    }
  };
  return <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to={isAdmin ? '/admin' : '/kiosk'} /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/admin/*" element={isAuthenticated && isAdmin ? <Layout>
                <AdminDashboard />
              </Layout> : <Navigate to="/login" />} />
        <Route path="/kiosk" element={isAuthenticated ? <Layout>
                <KioskView />
              </Layout> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>;
}