import React from 'react';
import { PackageIcon, AlertCircleIcon, ShoppingCartIcon, TruckIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import { inventory, items, purchaseOrders, transactions, getInventoryWithDetails } from '../../utils/mockData';
const DashboardOverview: React.FC = () => {
  const inventoryItems = getInventoryWithDetails();
  const lowStockItems = inventoryItems.filter(item => item.low_stock);
  const pendingOrders = purchaseOrders.filter(order => order.status === 'ordered');
  const recentTransactions = transactions.slice(0, 5);
  const totalItems = items.length;
  const totalValue = inventoryItems.reduce((sum, item) => {
    return sum + item.current_stock * item.unit_cost;
  }, 0);
  return <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100 mr-4">
              <PackageIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Inventory Items</p>
              <p className="text-xl font-semibold">{totalItems}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100 mr-4">
              <TrendingUpIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Inventory Value</p>
              <p className="text-xl font-semibold">${totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-amber-500">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-amber-100 mr-4">
              <AlertCircleIcon className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-xl font-semibold">{lowStockItems.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-purple-100 mr-4">
              <TruckIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Orders</p>
              <p className="text-xl font-semibold">{pendingOrders.length}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Low Stock Items */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <AlertCircleIcon className="h-5 w-5 text-amber-500 mr-2" />
          Low Stock Items
        </h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {lowStockItems.length > 0 ? <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Minimum Level
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lowStockItems.map(item => <tr key={item.inventory_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <PackageIcon className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.item_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.item_code}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.category_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.subcategory_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {item.current_stock} {item.unit_of_measure}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.minimum_stock_level} {item.unit_of_measure}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div> : <div className="p-6 text-center text-gray-500">
              No low stock items at the moment.
            </div>}
        </div>
      </div>
      {/* Recent Transactions */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <ShoppingCartIcon className="h-5 w-5 text-blue-500 mr-2" />
          Recent Transactions
        </h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {recentTransactions.length > 0 ? <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map(tx => {
                const employee = transactions.find(e => e.employee_id === tx.employee_id);
                return <tr key={tx.transaction_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {tx.transaction_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(tx.transaction_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            Employee #{tx.employee_id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {tx.total_items} items
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {tx.status}
                          </span>
                        </td>
                      </tr>;
              })}
                </tbody>
              </table>
            </div> : <div className="p-6 text-center text-gray-500">
              No transactions recorded yet.
            </div>}
        </div>
      </div>
    </div>;
};
export default DashboardOverview;