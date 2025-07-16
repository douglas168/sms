import React, { useEffect, useState } from 'react';
import { SearchIcon, FilterIcon, PlusIcon, MinusIcon, BarChartIcon } from 'lucide-react';
import { items, categories, subcategories, inventory } from '../../utils/mockData';
import { CartItem, Item } from '../../utils/types';
interface ItemSelectorProps {
  onAddToCart: (item: CartItem) => void;
}
const ItemSelector: React.FC<ItemSelectorProps> = ({
  onAddToCart
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [itemQuantities, setItemQuantities] = useState<Record<number, number>>({});
  // Initialize all items with quantity 1
  useEffect(() => {
    const initialQuantities: Record<number, number> = {};
    items.forEach(item => {
      initialQuantities[item.item_id] = 1;
    });
    setItemQuantities(initialQuantities);
  }, []);
  // Filter items based on search and category/subcategory filters
  useEffect(() => {
    let filtered = [...items];
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(item => item.item_name.toLowerCase().includes(search) || item.item_code.toLowerCase().includes(search) || item.barcode.includes(search));
    }
    if (selectedCategory !== null) {
      const subcategoryIds = subcategories.filter(sub => sub.category_id === selectedCategory).map(sub => sub.subcategory_id);
      filtered = filtered.filter(item => subcategoryIds.includes(item.subcategory_id));
    }
    if (selectedSubcategory !== null) {
      filtered = filtered.filter(item => item.subcategory_id === selectedSubcategory);
    }
    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, selectedSubcategory]);
  const handleQuantityChange = (itemId: number, delta: number) => {
    setItemQuantities(prev => {
      const newQuantity = Math.max(1, (prev[itemId] || 1) + delta);
      return {
        ...prev,
        [itemId]: newQuantity
      };
    });
  };
  const handleAddToCart = (item: Item) => {
    const quantity = itemQuantities[item.item_id] || 1;
    onAddToCart({
      item_id: item.item_id,
      item_name: item.item_name,
      quantity,
      unit_cost: item.unit_cost,
      unit_of_measure: item.unit_of_measure
    });
    // Reset quantity to 1 after adding to cart
    setItemQuantities(prev => ({
      ...prev,
      [item.item_id]: 1
    }));
  };
  const getStockLevel = (itemId: number) => {
    const inventoryItem = inventory.find(inv => inv.item_id === itemId);
    return inventoryItem ? inventoryItem.current_stock : 0;
  };
  return <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Items</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <input type="text" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Search by name, code or scan barcode..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <SearchIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500" value={selectedCategory === null ? '' : selectedCategory} onChange={e => {
            const value = e.target.value ? parseInt(e.target.value) : null;
            setSelectedCategory(value);
            setSelectedSubcategory(null);
          }}>
              <option value="">All Categories</option>
              {categories.map(category => <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>)}
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500" value={selectedSubcategory === null ? '' : selectedSubcategory} onChange={e => {
            const value = e.target.value ? parseInt(e.target.value) : null;
            setSelectedSubcategory(value);
          }} disabled={selectedCategory === null}>
              <option value="">All Subcategories</option>
              {subcategories.filter(sub => selectedCategory === null || sub.category_id === selectedCategory).map(subcategory => <option key={subcategory.subcategory_id} value={subcategory.subcategory_id}>
                    {subcategory.subcategory_name}
                  </option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredItems.map(item => {
        const stock = getStockLevel(item.item_id);
        const isLowStock = stock <= item.minimum_stock_level;
        const isOutOfStock = stock === 0;
        return <div key={item.item_id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
              <div className="flex items-center h-32 bg-gray-100 p-4">
                <img src={item.image_url || 'https://via.placeholder.com/150'} alt={item.item_name} className="h-full w-auto mx-auto object-contain" />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{item.item_name}</h3>
                <p className="text-sm text-gray-500">Code: {item.item_code}</p>
                <div className="flex items-center mt-2">
                  <BarChartIcon className="h-4 w-4 mr-1 text-gray-500" />
                  <span className={`text-sm ${isLowStock ? 'text-amber-600' : 'text-green-600'}`}>
                    Stock: {stock} {item.unit_of_measure}
                    {isLowStock && !isOutOfStock && ' (Low)'}
                    {isOutOfStock && ' (Out of Stock)'}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button type="button" className="px-2 py-1 text-gray-600 hover:bg-gray-100" onClick={() => handleQuantityChange(item.item_id, -1)}>
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="px-3 py-1">
                      {itemQuantities[item.item_id] || 1}
                    </span>
                    <button type="button" className="px-2 py-1 text-gray-600 hover:bg-gray-100" onClick={() => handleQuantityChange(item.item_id, 1)}>
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <button type="button" className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleAddToCart(item)} disabled={isOutOfStock}>
                    Add
                  </button>
                </div>
              </div>
            </div>;
      })}
        {filteredItems.length === 0 && <div className="col-span-full py-8 text-center text-gray-500">
            No items found matching your criteria.
          </div>}
      </div>
    </div>;
};
export default ItemSelector;