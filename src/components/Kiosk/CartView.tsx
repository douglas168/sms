import React from 'react';
import { ShoppingCartIcon, TrashIcon, PlusIcon, MinusIcon, UserIcon } from 'lucide-react';
import { CartItem, Employee } from '../../utils/types';
interface CartViewProps {
  cartItems: CartItem[];
  employee: Employee | null;
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
  onCheckout: () => void;
}
const CartView: React.FC<CartViewProps> = ({
  cartItems,
  employee,
  onUpdateQuantity,
  onCheckout
}) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.unit_cost, 0);
  };
  if (!employee) return null;
  return <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sticky top-4">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
          <UserIcon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium">
            {employee.first_name} {employee.last_name}
          </h3>
          <p className="text-sm text-gray-500">{employee.department}</p>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <ShoppingCartIcon className="h-5 w-5 mr-2 text-gray-500" />
        <h3 className="text-lg font-medium">Your Cart</h3>
      </div>
      {cartItems.length === 0 ? <div className="text-center py-8 text-gray-500">
          <p>Your cart is empty</p>
          <p className="text-sm mt-1">Add items to get started</p>
        </div> : <>
          <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
            {cartItems.map(item => <div key={item.item_id} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
                <div className="flex-1">
                  <h4 className="font-medium">{item.item_name}</h4>
                  <p className="text-sm text-gray-500">
                    ${item.unit_cost.toFixed(2)} × {item.quantity}{' '}
                    {item.unit_of_measure}
                  </p>
                </div>
                <div className="flex items-center">
                  <button type="button" className="p-1 text-gray-500 hover:text-red-500" onClick={() => onUpdateQuantity(item.item_id, 0)}>
                    <TrashIcon className="h-4 w-4" />
                  </button>
                  <div className="flex items-center ml-2 border border-gray-300 rounded-md">
                    <button type="button" className="px-1 py-0.5 text-gray-600 hover:bg-gray-100" onClick={() => onUpdateQuantity(item.item_id, item.quantity - 1)}>
                      <MinusIcon className="h-3 w-3" />
                    </button>
                    <span className="px-2 py-0.5 text-sm">{item.quantity}</span>
                    <button type="button" className="px-1 py-0.5 text-gray-600 hover:bg-gray-100" onClick={() => onUpdateQuantity(item.item_id, item.quantity + 1)}>
                      <PlusIcon className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
          <div className="border-t border-gray-200 pt-3 mb-4">
            <div className="flex justify-between font-medium">
              <span>Total Items:</span>
              <span>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-semibold mt-1">
              <span>Total Cost:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          <button type="button" className="w-full py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={onCheckout}>
            Complete Checkout
          </button>
        </>}
    </div>;
};
export default CartView;