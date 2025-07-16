// Type definitions based on the database schema
export interface Category {
  category_id: number;
  category_name: string;
  description: string;
}
export interface Subcategory {
  subcategory_id: number;
  category_id: number;
  subcategory_name: string;
  description: string;
}
export interface Item {
  item_id: number;
  item_name: string;
  item_code: string;
  barcode: string;
  subcategory_id: number;
  description: string;
  unit_of_measure: string;
  unit_cost: number;
  minimum_stock_level: number;
  maximum_stock_level: number;
  location: string;
  image_url?: string;
}
export interface InventoryItem {
  inventory_id: number;
  item_id: number;
  current_stock: number;
  reserved_stock: number;
}
export interface InventoryItemWithDetails extends InventoryItem {
  item_name: string;
  item_code: string;
  subcategory_name: string;
  category_name: string;
  minimum_stock_level: number;
  maximum_stock_level: number;
  unit_cost: number;
  unit_of_measure: string;
  location: string;
  low_stock: boolean;
}
export interface Employee {
  employee_id: number;
  badge_id: string;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  position: string;
}
export interface Supplier {
  supplier_id: number;
  supplier_name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
}
export interface PurchaseOrder {
  po_id: number;
  po_number: string;
  supplier_id: number;
  order_date: string;
  expected_delivery_date: string;
  actual_delivery_date: string | null;
  status: 'pending' | 'ordered' | 'received' | 'cancelled';
  total_amount: number;
  notes: string;
  created_by: number;
}
export interface PurchaseOrderItem {
  po_item_id: number;
  po_id: number;
  item_id: number;
  quantity_ordered: number;
  quantity_received: number;
  unit_cost: number;
}
export interface PurchaseOrderItemWithDetails extends PurchaseOrderItem {
  item_name: string;
  total_cost: number;
}
export interface PurchaseOrderWithDetails extends PurchaseOrder {
  supplier_name: string;
  created_by_name: string;
  items: PurchaseOrderItemWithDetails[];
}
export interface Transaction {
  transaction_id: number;
  transaction_number: string;
  employee_id: number;
  transaction_date: string;
  total_items: number;
  status: 'completed' | 'pending' | 'cancelled';
  notes: string;
}
export interface TransactionItem {
  transaction_item_id: number;
  transaction_id: number;
  item_id: number;
  quantity: number;
  unit_cost: number;
}
export interface TransactionItemWithDetails extends TransactionItem {
  item_name: string;
  total_cost: number;
}
export interface TransactionWithDetails extends Transaction {
  employee_name: string;
  employee_department: string;
  items: TransactionItemWithDetails[];
}
export interface CartItem {
  item_id: number;
  item_name: string;
  quantity: number;
  unit_cost: number;
  unit_of_measure: string;
}