import React, { useEffect, useState } from 'react';
import { SearchIcon, FilterIcon, PlusIcon, EditIcon, PackageIcon } from 'lucide-react';
import { getInventoryWithDetails, categories, subcategories } from '../../utils/mockData';
import { InventoryItemWithDetails } from '../../utils/types';
const InventoryManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [inventoryItems, setInventoryItems] = useState<InventoryItemWithDetails[]>([]);
  const [filteredItems, setFilteredItems] = useState<InventoryItemWithDetails[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItemWithDetails | null>(null);
  const [editStock, setEditStock] = useState(0);
  useEffect(() => {
    // Get inventory data with item details
    const items = getInventoryWithDetails();
    setInventoryItems(items);
    setFilteredItems(items);
  }, []);
  useEffect(() => {
    let filtered = [...inventoryItems];
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(item => item.item_name.toLowerCase().includes(search) || item.item_code.toLowerCase().includes(search) || item.category_name.toLowerCase().includes(search) || item.subcategory_name.toLowerCase().includes(search));
    }
    if (selectedCategory !== null) {
      filtered = filtered.filter(item => subcategories.find(s => s.subcategory_id === item.subcategory_id)?.category_id === selectedCategory);
    }
    if (selectedSubcategory !== null) {
      filtered = filtered.filter(item => item.subcategory_id === selectedSubcategory);
    }
    if (showLowStockOnly) {
      filtered = filtered.filter(item => item.low_stock);
    }
    setFilteredItems(filtered);
  }, [inventoryItems, searchTerm, selectedCategory, selectedSubcategory, showLowStockOnly]);
  const handleEditItem = (item: InventoryItemWithDetails) => {
    setCurrentItem(item);
    setEditStock(item.current_stock);
    setShowEditModal(true);
  };
  const handleSaveEdit = () => {
    if (!currentItem) return;
    // Update the inventory item in our state
    const updatedItems = inventoryItems.map(item => {
      if (item.inventory_id === currentItem.inventory_id) {
        return {
          ...item,
          current_stock: editStock
        };
      }
      return item;
    });
    setInventoryItems(updatedItems);
    setShowEditModal(false);
    setCurrentItem(null);
  };
  const getStockStatusClass = (item: InventoryItemWithDetails) => {
    if (item.current_stock <= 0) {
      return 'bg-red-100 text-red-800';
    } else if (item.low_stock) {
      return 'bg-amber-100 text-amber-800';
    } else if (item.current_stock >= item.maximum_stock_level) {
      return 'bg-blue-100 text-blue-800';
    } else {
      return 'bg-green-100 text-green-800';
    }
  };
  return <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">庫存管理</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
          <PlusIcon className="h-4 w-4 mr-1" />
          新增物品
        </button>
      </div>
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[240px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              搜尋
            </label>
            <div className="relative">
              <input type="text" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Search by name, code, category..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <SearchIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              類別
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500" value={selectedCategory === null ? '' : selectedCategory} onChange={e => {
            const value = e.target.value ? parseInt(e.target.value) : null;
            setSelectedCategory(value);
            setSelectedSubcategory(null);
          }}>
              <option value="">All Categories</option>
              {categories.map(category => <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>)}
            </select>
          </div>
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              子類別
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500" value={selectedSubcategory === null ? '' : selectedSubcategory} onChange={e => {
            const value = e.target.value ? parseInt(e.target.value) : null;
            setSelectedSubcategory(value);
          }} disabled={selectedCategory === null}>
              <option value="">All Subcategories</option>
              {subcategories.filter(sub => selectedCategory === null || sub.category_id === selectedCategory).map(subcategory => <option key={subcategory.subcategory_id} value={subcategory.subcategory_id}>
                    {subcategory.subcategory_name}
                  </option>)}
            </select>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="lowStockOnly" checked={showLowStockOnly} onChange={() => setShowLowStockOnly(!showLowStockOnly)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label htmlFor="lowStockOnly" className="ml-2 block text-sm text-gray-900">
              只顯示低庫存物品
            </label>
          </div>
        </div>
      </div>
      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  物品
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  類別
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  位置
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  庫存
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  最低/最高庫存
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  價值
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map(item => <tr key={item.inventory_id} className="hover:bg-gray-50">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockStatusClass(item)}`}>
                      {item.current_stock} {item.unit_of_measure}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.minimum_stock_level} / {item.maximum_stock_level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${(item.current_stock * item.unit_cost).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEditItem(item)} className="text-blue-600 hover:text-blue-900 flex items-center justify-end w-full">
                      <EditIcon className="h-4 w-4 mr-1" />
                      編輯
                    </button>
                  </td>
                </tr>)}
              {filteredItems.length === 0 && <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    找不到符合條件的物品。
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
      {/* Edit Modal */}
      {showEditModal && currentItem && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">編輯庫存物品</h3>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  物品
                </label>
                <div className="text-gray-900">
                  {currentItem.item_name} ({currentItem.item_code})
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  庫存
                </label>
                <input type="number" value={editStock} onChange={e => setEditStock(parseInt(e.target.value) || 0)} min="0" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="flex justify-between text-sm mb-4">
                <div>
                  <span className="text-gray-500">最低庫存:</span>{' '}
                  {currentItem.minimum_stock_level}
                </div>
                <div>
                  <span className="text-gray-500">最高庫存:</span>{' '}
                  {currentItem.maximum_stock_level}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                取消
              </button>
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                儲存變更
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default InventoryManagement;