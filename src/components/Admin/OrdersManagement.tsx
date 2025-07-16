import React, { useEffect, useState } from "react";
import {
  PlusIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import {
  getPurchaseOrdersWithDetails,
  suppliers,
  getInventoryWithDetails,
} from "../../utils/mockData";
import { PurchaseOrderWithDetails, Supplier } from "../../utils/types";
const OrdersManagement: React.FC = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<
    PurchaseOrderWithDetails[]
  >([]);
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [currentOrder, setCurrentOrder] =
    useState<PurchaseOrderWithDetails | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  useEffect(() => {
    // Get purchase orders with details
    const orders = getPurchaseOrdersWithDetails();
    setPurchaseOrders(orders);
  }, []);
  const filteredOrders = purchaseOrders.filter((order) => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });
  const toggleOrderExpand = (orderId: number) => {
    setExpandedOrders((prev) => {
      if (prev.includes(orderId)) {
        return prev.filter((id) => id !== orderId);
      } else {
        return [...prev, orderId];
      }
    });
  };
  const handleReceiveOrder = (order: PurchaseOrderWithDetails) => {
    setCurrentOrder(order);
    setShowReceiveModal(true);
  };
  const handleCompleteReceive = () => {
    if (!currentOrder) return;
    // Update the order status in our state
    const updatedOrders = purchaseOrders.map((order) => {
      if (order.po_id === currentOrder.po_id) {
        return {
          ...order,
          status: "received" as const,
          actual_delivery_date: new Date().toISOString().split("T")[0],
        };
      }
      return order;
    });
    setPurchaseOrders(updatedOrders);
    setShowReceiveModal(false);
    setCurrentOrder(null);
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            <ClockIcon className="h-3 w-3 mr-1" /> Pending
          </span>
        );
      case "ordered":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            <TruckIcon className="h-3 w-3 mr-1" /> Ordered
          </span>
        );
      case "received":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" /> Received
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            <XCircleIcon className="h-3 w-3 mr-1" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">採購單管理</h2>
        <button
          onClick={() => setShowNewOrderForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          新增採購單
        </button>
      </div>
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-sm font-medium text-gray-700">依狀態篩選:</div>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "all"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setFilterStatus("all")}
            >
              全部
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "pending"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setFilterStatus("pending")}
            >
              待辦中
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "ordered"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setFilterStatus("ordered")}
            >
              已下單
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "received"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setFilterStatus("received")}
            >
              已收貨
            </button>
          </div>
        </div>
      </div>
      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const isExpanded = expandedOrders.includes(order.po_id);
          return (
            <div
              key={order.po_id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div
                className="p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleOrderExpand(order.po_id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-blue-100">
                      <TruckIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{order.po_number}</h3>
                      <p className="text-sm text-gray-500">
                        {order.supplier_name} • Ordered:{" "}
                        {new Date(order.order_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(order.status)}
                    <div className="text-lg font-semibold">
                      ${order.total_amount.toFixed(2)}
                    </div>
                    <button className="text-gray-500">
                      {isExpanded ? (
                        <ChevronUpIcon className="h-5 w-5" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {isExpanded && (
                <div className="border-t border-gray-200 p-4">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">預計交貨日期</p>
                      <p>{order.expected_delivery_date}</p>
                    </div>
                    {order.actual_delivery_date && (
                      <div>
                        <p className="text-sm text-gray-500">實際交貨日期</p>
                        <p>{order.actual_delivery_date}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">建立者</p>
                      <p>{order.created_by_name}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">物品</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              物品
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              數量
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              單價
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              總計
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              狀態
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {order.items.map((item) => (
                            <tr key={item.po_item_id}>
                              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.item_name}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                {item.quantity_ordered}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                ${item.unit_cost.toFixed(2)}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                ${item.total_cost.toFixed(2)}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                {item.quantity_received > 0 ? (
                                  <span className="text-green-600">已收貨</span>
                                ) : (
                                  <span className="text-amber-600">待收貨</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {order.status === "ordered" && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReceiveOrder(order);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        標記為已收貨
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            找不到符合條件的採購單。
          </div>
        )}
      </div>
      {/* New Order Form Modal */}
      {showNewOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">新增採購單</h3>
              <button
                onClick={() => setShowNewOrderForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircleIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      供應商
                    </label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">選擇供應商</option>
                      {suppliers.map((supplier) => (
                        <option
                          key={supplier.supplier_id}
                          value={supplier.supplier_id}
                        >
                          {supplier.supplier_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      預計交貨日期
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    備註
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter any additional information about this order..."
                  />
                </div>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">物品</h4>
                  <div className="border border-gray-300 rounded-md">
                    <div className="p-4">
                      <p className="text-center text-gray-500">
                        點擊下方按鈕新增物品。
                      </p>
                      <div className="mt-4 flex justify-center">
                        <button
                          type="button"
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <PlusIcon className="h-4 w-4 mr-1" />
                          新增物品
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowNewOrderForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => setShowNewOrderForm(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                建立採購單
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Receive Order Modal */}
      {showReceiveModal && currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">
                Receive Order: {currentOrder.po_number}
              </h3>
            </div>
            <div className="p-4">
              <p className="mb-4">
                Confirm receipt of all items in this purchase order? This will
                update your inventory levels.
              </p>
              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Supplier:</span>
                  <span className="font-medium">
                    {currentOrder.supplier_name}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Order Date:</span>
                  <span>
                    {new Date(currentOrder.order_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Amount:</span>
                  <span className="font-medium">
                    ${currentOrder.total_amount.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-md overflow-hidden mb-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentOrder.items.map((item) => (
                      <tr key={item.po_item_id}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.item_name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">
                          {item.quantity_ordered}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowReceiveModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteReceive}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Confirm Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrdersManagement;
