import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { PackageIcon, ShoppingCartIcon, TruckIcon, AlertCircleIcon, BarChart2Icon } from 'lucide-react';
import InventoryManagement from './InventoryManagement';
import OrdersManagement from './OrdersManagement';
import TransactionsHistory from './TransactionsHistory';
import StockAlerts from './StockAlerts';
import DashboardOverview from './DashboardOverview';
const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = [{
    path: '/admin',
    name: 'Overview',
    icon: <BarChart2Icon className="h-5 w-5" />
  }, {
    path: '/admin/inventory',
    name: 'Inventory',
    icon: <PackageIcon className="h-5 w-5" />
  }, {
    path: '/admin/orders',
    name: 'Purchase Orders',
    icon: <TruckIcon className="h-5 w-5" />
  }, {
    path: '/admin/transactions',
    name: 'Transactions',
    icon: <ShoppingCartIcon className="h-5 w-5" />
  }, {
    path: '/admin/alerts',
    name: 'Stock Alerts',
    icon: <AlertCircleIcon className="h-5 w-5" />
  }];
  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/admin';
  };
  return <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-1">
              {navItems.map(item => <button key={item.path} onClick={() => navigate(item.path)} className={`
                    w-full flex items-center px-3 py-2 rounded-md text-left
                    ${isActive(item.path) ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}
                  `}>
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </button>)}
            </nav>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/inventory" element={<InventoryManagement />} />
              <Route path="/orders" element={<OrdersManagement />} />
              <Route path="/transactions" element={<TransactionsHistory />} />
              <Route path="/alerts" element={<StockAlerts />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>;
};
export default AdminDashboard;