import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOutIcon, HomeIcon } from 'lucide-react';
interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    navigate('/login');
  };
  const isAdmin = location.pathname.includes('/admin');
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <HomeIcon className="h-6 w-6" />
            <h1 className="text-xl font-bold">
              {isAdmin ? 'Stationery Management System' : 'Stationery Kiosk'}
            </h1>
          </div>
          <button onClick={handleLogout} className="flex items-center space-x-1 bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-md transition-colors">
            <LogOutIcon className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-100 border-t border-gray-200 py-3">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Company Stationery Management System
        </div>
      </footer>
    </div>;
};
export default Layout;