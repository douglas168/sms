import React from "react";
import { CheckCircleIcon, UserIcon, PackageIcon } from "lucide-react";
import { CartItem, Employee } from "../../utils/types";
interface CheckoutConfirmationProps {
  cartItems: CartItem[];
  employee: Employee | null;
  onFinish: () => void;
}
const CheckoutConfirmation: React.FC<CheckoutConfirmationProps> = ({
  cartItems,
  employee,
  onFinish,
}) => {
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.unit_cost,
      0
    );
  };
  const transactionNumber = `TXN-${Date.now().toString().slice(-8)}`;
  const timestamp = new Date().toLocaleString();
  if (!employee) return null;
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircleIcon className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">結帳完成！</h2>
        <p className="text-gray-600">您的物品已成功結帳。</p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium">結帳收據</h3>
            <p className="text-sm text-gray-500">收據 #{transactionNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">{timestamp}</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-blue-50 rounded-md mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
            <UserIcon className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium">
              {employee.first_name} {employee.last_name}
            </h4>
            <p className="text-sm text-gray-500">
              Badge ID: {employee.badge_id} | {employee.department}
            </p>
          </div>
        </div>
        <div className="border-t border-b border-gray-200 py-4 mb-4">
          <h4 className="font-medium mb-3">物品:</h4>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.item_id} className="flex justify-between">
                <div className="flex items-start">
                  <PackageIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">{item.item_name}</p>
                    <p className="text-sm text-gray-500">
                      ${item.unit_cost.toFixed(2)} per {item.unit_of_measure}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p>
                    {item.quantity} × ${item.unit_cost.toFixed(2)}
                  </p>
                  <p className="font-medium">
                    ${(item.quantity * item.unit_cost).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>總計:</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>
      <div className="text-center">
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={onFinish}
        >
          開始新交易
        </button>
      </div>
    </div>
  );
};
export default CheckoutConfirmation;
