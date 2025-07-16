import React, { useState } from 'react';
import { ShoppingCartIcon, CheckCircleIcon } from 'lucide-react';
import BadgeScanner from './BadgeScanner';
import ItemSelector from './ItemSelector';
import CartView from './CartView';
import CheckoutConfirmation from './CheckoutConfirmation';
import { employees } from '../../utils/mockData';
import { CartItem, Employee } from '../../utils/types';
enum KioskStep {
  BADGE_SCAN,
  ITEM_SELECTION,
  CHECKOUT_CONFIRMATION,
}
const KioskView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<KioskStep>(KioskStep.BADGE_SCAN);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const handleBadgeScan = (badgeId: string) => {
    const employee = employees.find(e => e.badge_id === badgeId);
    if (employee) {
      setCurrentEmployee(employee);
      setCurrentStep(KioskStep.ITEM_SELECTION);
    }
  };
  const handleAddToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex(i => i.item_id === item.item_id);
    if (existingItemIndex >= 0) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += item.quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, item]);
    }
  };
  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.item_id !== itemId));
    } else {
      setCartItems(cartItems.map(item => item.item_id === itemId ? {
        ...item,
        quantity: newQuantity
      } : item));
    }
  };
  const handleCheckout = () => {
    setCurrentStep(KioskStep.CHECKOUT_CONFIRMATION);
  };
  const handleFinishTransaction = () => {
    setCurrentStep(KioskStep.BADGE_SCAN);
    setCurrentEmployee(null);
    setCartItems([]);
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case KioskStep.BADGE_SCAN:
        return <BadgeScanner onScanComplete={handleBadgeScan} />;
      case KioskStep.ITEM_SELECTION:
        return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ItemSelector onAddToCart={handleAddToCart} />
            </div>
            <div>
              <CartView cartItems={cartItems} employee={currentEmployee} onUpdateQuantity={handleUpdateQuantity} onCheckout={handleCheckout} />
            </div>
          </div>;
      case KioskStep.CHECKOUT_CONFIRMATION:
        return <CheckoutConfirmation cartItems={cartItems} employee={currentEmployee} onFinish={handleFinishTransaction} />;
    }
  };
  const renderProgressBar = () => {
    return <div className="w-full max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex flex-col items-center ${currentStep >= KioskStep.BADGE_SCAN ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= KioskStep.BADGE_SCAN ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <div className="w-5 h-5" />
            </div>
            <span className="text-sm mt-1">衣編掃描</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${currentStep >= KioskStep.ITEM_SELECTION ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex flex-col items-center ${currentStep >= KioskStep.ITEM_SELECTION ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= KioskStep.ITEM_SELECTION ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <ShoppingCartIcon className="w-5 h-5" />
            </div>
            <span className="text-sm mt-1">選擇物品</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${currentStep >= KioskStep.CHECKOUT_CONFIRMATION ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex flex-col items-center ${currentStep >= KioskStep.CHECKOUT_CONFIRMATION ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= KioskStep.CHECKOUT_CONFIRMATION ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <CheckCircleIcon className="w-5 h-5" />
            </div>
            <span className="text-sm mt-1">確認</span>
          </div>
        </div>
      </div>;
  };
  return <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        文具自助結帳機
      </h1>
      {renderProgressBar()}
      <div className="bg-white rounded-lg shadow-md p-6">
        {renderStepContent()}
      </div>
    </div>;
};
export default KioskView;