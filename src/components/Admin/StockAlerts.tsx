import React from 'react';
import { AlertTriangleIcon, AlertCircleIcon, ShoppingCartIcon, TruckIcon } from 'lucide-react';
import { getInventoryWithDetails } from '../../utils/mockData';
const StockAlerts: React.FC = () => {
  const inventoryItems = getInventoryWithDetails();
  const lowStockItems = inventoryItems.filter(item => item.low_stock);
  const outOfStockItems = inventoryItems.filter(item => item.current_stock === 0);
  return <div>
      <h2 className="text-2xl font-bold mb-6">Stock Alerts</h2>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center">
          <div className="p-3 rounded-full bg-amber-100 mr-4">
            <AlertCircleIcon className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-medium text-amber-800">Low Stock Items</h3>
            <p className="text-2xl font-bold text-amber-900">
              {lowStockItems.length}
            </p>
            <p className="text-sm text-amber-700">
              Items below minimum stock level
            </p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <div className="p-3 rounded-full bg-red-100 mr-4">
            <AlertTriangleIcon className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-medium text-red-800">Out of Stock Items</h3>
            <p className="text-2xl font-bold text-red-900">
              {outOfStockItems.length}
            </p>
            <p className="text-sm text-red-700">Items with zero stock</p>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lowStockItems.map(item => <tr key={item.inventory_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.item_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.item_code}
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
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                          {item.current_stock} {item.unit_of_measure}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.minimum_stock_level} {item.unit_of_measure}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3 flex items-center justify-end">
                          <TruckIcon className="h-4 w-4 mr-1" />
                          Order
                        </button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div> : <div className="p-6 text-center text-gray-500">
              No low stock items at the moment.
            </div>}
        </div>
      </div>
      {/* Out of Stock Items */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <AlertTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
          Out of Stock Items
        </h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {outOfStockItems.length > 0 ? <div className="overflow-x-auto">
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
                      Minimum Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {outOfStockItems.map(item => <tr key={item.inventory_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.item_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.item_code}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.minimum_stock_level} {item.unit_of_measure}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-red-600 hover:text-red-900 mr-3 flex items-center justify-end">
                          <TruckIcon className="h-4 w-4 mr-1" />
                          Order Now
                        </button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div> : <div className="p-6 text-center text-gray-500">
              No out of stock items at the moment.
            </div>}
        </div>
      </div>
    </div>;
};
export default StockAlerts;