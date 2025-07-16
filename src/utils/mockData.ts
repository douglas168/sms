// Mock data based on the database schema provided
// Categories
export const categories = [
  {
    category_id: 1,
    category_name: "Writing Instruments",
    description: "Pens, pencils, markers, etc.",
  },
  {
    category_id: 2,
    category_name: "Paper Products",
    description: "Paper, notebooks, sticky notes, etc.",
  },
  {
    category_id: 3,
    category_name: "Office Supplies",
    description: "Staplers, clips, folders, etc.",
  },
  {
    category_id: 4,
    category_name: "Technology",
    description: "Batteries, cables, storage devices, etc.",
  },
  {
    category_id: 5,
    category_name: "Desk Accessories",
    description: "Organizers, holders, desk pads, etc.",
  },
];
// Subcategories
export const subcategories = [
  {
    subcategory_id: 1,
    category_id: 1,
    subcategory_name: "Ballpoint Pens",
    description: "Regular ballpoint pens",
  },
  {
    subcategory_id: 2,
    category_id: 1,
    subcategory_name: "Gel Pens",
    description: "Smooth gel ink pens",
  },
  {
    subcategory_id: 5,
    category_id: 1,
    subcategory_name: "Highlighters",
    description: "Text highlighting markers",
  },
  {
    subcategory_id: 6,
    category_id: 2,
    subcategory_name: "Copy Paper",
    description: "Standard printing and copying paper",
  },
  {
    subcategory_id: 7,
    category_id: 2,
    subcategory_name: "Notebooks",
    description: "Spiral and bound notebooks",
  },
  {
    subcategory_id: 8,
    category_id: 2,
    subcategory_name: "Sticky Notes",
    description: "Post-it notes and adhesive pads",
  },
  {
    subcategory_id: 11,
    category_id: 3,
    subcategory_name: "Binding Supplies",
    description: "Staplers, staples, paper clips",
  },
  {
    subcategory_id: 21,
    category_id: 4,
    subcategory_name: "Batteries",
    description: "AA, AAA, and other battery types",
  },
];
// Items
export const items = [
  {
    item_id: 1,
    item_name: "Blue Ballpoint Pen",
    item_code: "PEN001",
    barcode: "1234567890123",
    subcategory_id: 1,
    description: "Standard blue ballpoint pen",
    unit_of_measure: "piece",
    unit_cost: 0.0,
    minimum_stock_level: 20,
    maximum_stock_level: 200,
    location: "Storage Room A - Shelf 1",
    image_url:
      "https://images.unsplash.com/photo-1583485088034-697b5bc1b72e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    item_id: 2,
    item_name: "A4 Copy Paper (Ream)",
    item_code: "PAP001",
    barcode: "1234567890124",
    subcategory_id: 6,
    description: "500 sheets of standard A4 copy paper",
    unit_of_measure: "ream",
    unit_cost: 0.0,
    minimum_stock_level: 10,
    maximum_stock_level: 100,
    location: "Storage Room A - Shelf 3",
    image_url:
      "https://images.unsplash.com/photo-1596443686812-2f45229eebc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    item_id: 3,
    item_name: "Standard Stapler",
    item_code: "STA001",
    barcode: "1234567890125",
    subcategory_id: 11,
    description: "Desktop stapler, 20 sheet capacity",
    unit_of_measure: "piece",
    unit_cost: 0.0,
    minimum_stock_level: 5,
    maximum_stock_level: 50,
    location: "Storage Room B - Shelf 2",
    image_url:
      "https://images.unsplash.com/photo-1612968658710-5697b1d7d053?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    item_id: 4,
    item_name: "AA Batteries (Pack of 4)",
    item_code: "BAT001",
    barcode: "1234567890126",
    subcategory_id: 21,
    description: "Alkaline AA batteries, pack of 4",
    unit_of_measure: "pack",
    unit_cost: 0.0,
    minimum_stock_level: 10,
    maximum_stock_level: 100,
    location: "Storage Room B - Shelf 1",
    image_url:
      "https://images.unsplash.com/photo-1619641554018-8351f85d3e20?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    item_id: 5,
    item_name: "Red Gel Pen",
    item_code: "PEN002",
    barcode: "1234567890127",
    subcategory_id: 2,
    description: "Smooth writing red gel pen",
    unit_of_measure: "piece",
    unit_cost: 0.0,
    minimum_stock_level: 15,
    maximum_stock_level: 150,
    location: "Storage Room A - Shelf 1",
    image_url:
      "https://images.unsplash.com/photo-1595590424283-b8f17842773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    item_id: 6,
    item_name: "Yellow Highlighter",
    item_code: "HIGH001",
    barcode: "1234567890128",
    subcategory_id: 5,
    description: "Fluorescent yellow highlighter",
    unit_of_measure: "piece",
    unit_cost: 0.0,
    minimum_stock_level: 25,
    maximum_stock_level: 250,
    location: "Storage Room A - Shelf 2",
    image_url:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    item_id: 7,
    item_name: "Spiral Notebook A5",
    item_code: "NOTE001",
    barcode: "1234567890129",
    subcategory_id: 7,
    description: "80 pages spiral bound notebook",
    unit_of_measure: "piece",
    unit_cost: 0.0,
    minimum_stock_level: 20,
    maximum_stock_level: 200,
    location: "Storage Room B - Shelf 3",
    image_url:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    item_id: 8,
    item_name: "Sticky Notes 3x3",
    item_code: "STICK001",
    barcode: "1234567890130",
    subcategory_id: 8,
    description: "Pack of 5 colors, 100 sheets each",
    unit_of_measure: "pack",
    unit_cost: 0.0,
    minimum_stock_level: 30,
    maximum_stock_level: 300,
    location: "Storage Room A - Shelf 2",
    image_url:
      "https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
];
// Inventory
export const inventory = [
  {
    inventory_id: 1,
    item_id: 1,
    current_stock: 150,
    reserved_stock: 0,
  },
  {
    inventory_id: 2,
    item_id: 2,
    current_stock: 75,
    reserved_stock: 0,
  },
  {
    inventory_id: 3,
    item_id: 3,
    current_stock: 25,
    reserved_stock: 0,
  },
  {
    inventory_id: 4,
    item_id: 4,
    current_stock: 60,
    reserved_stock: 0,
  },
  {
    inventory_id: 5,
    item_id: 5,
    current_stock: 10,
    reserved_stock: 0,
  },
  // Low stock
  {
    inventory_id: 6,
    item_id: 6,
    current_stock: 200,
    reserved_stock: 0,
  },
  {
    inventory_id: 7,
    item_id: 7,
    current_stock: 5,
    reserved_stock: 0,
  },
  // Low stock
  {
    inventory_id: 8,
    item_id: 8,
    current_stock: 250,
    reserved_stock: 0,
  },
];
// Employees
export const employees = [
  {
    employee_id: 1,
    badge_id: "A1234",
    first_name: "見A",
    last_name: "釋",
    email: "A1234@mail.ctcm.org.tw",
    department: "寺務處",
    position: "監院",
  },
  {
    employee_id: 2,
    badge_id: "B1234",
    first_name: "見B",
    last_name: "釋",
    email: "B1234@mail.ctcm.org.tw",
    department: "資訊系統中心",
    position: "專員",
  },
  {
    employee_id: 3,
    badge_id: "B1999",
    first_name: "見C",
    last_name: "釋",
    email: "B5678@mail.ctcm.org.tw",
    department: "文教中心",
    position: "幹事",
  },
];
// Suppliers
export const suppliers = [
  {
    supplier_id: 1,
    supplier_name: "Office Supplies Inc.",
    contact_person: "Mike Johnson",
    email: "mike@officesupplies.com",
    phone: "555-0123",
    address: "123 Business Ave",
  },
  {
    supplier_id: 2,
    supplier_name: "Stationery World",
    contact_person: "Sarah Wilson",
    email: "sarah@stationeryworld.com",
    phone: "555-0456",
    address: "456 Commerce St",
  },
];
// Purchase orders
export const purchaseOrders = [
  {
    po_id: 1,
    po_number: "PO-2023-001",
    supplier_id: 1,
    order_date: "2023-10-15",
    expected_delivery_date: "2023-10-22",
    actual_delivery_date: null,
    status: "ordered",
    total_amount: 250.0,
    notes: "Regular monthly order",
    created_by: 3,
  },
  {
    po_id: 2,
    po_number: "PO-2023-002",
    supplier_id: 2,
    order_date: "2023-10-18",
    expected_delivery_date: "2023-10-25",
    actual_delivery_date: "2023-10-24",
    status: "received",
    total_amount: 180.5,
    notes: "Emergency order for notebooks",
    created_by: 3,
  },
];
// Purchase order items
export const purchaseOrderItems = [
  {
    po_item_id: 1,
    po_id: 1,
    item_id: 5,
    quantity_ordered: 100,
    quantity_received: 0,
    unit_cost: 0.75,
  },
  {
    po_item_id: 2,
    po_id: 1,
    item_id: 7,
    quantity_ordered: 50,
    quantity_received: 0,
    unit_cost: 3.5,
  },
  {
    po_item_id: 3,
    po_id: 2,
    item_id: 2,
    quantity_ordered: 20,
    quantity_received: 20,
    unit_cost: 5.0,
  },
  {
    po_item_id: 4,
    po_id: 2,
    item_id: 8,
    quantity_ordered: 25,
    quantity_received: 25,
    unit_cost: 2.0,
  },
];
// Transactions
export const transactions = [
  {
    transaction_id: 1,
    transaction_number: "TXN-2023-001",
    employee_id: 1,
    transaction_date: "2023-10-10",
    total_items: 3,
    status: "completed",
    notes: "",
  },
  {
    transaction_id: 2,
    transaction_number: "TXN-2023-002",
    employee_id: 2,
    transaction_date: "2023-10-12",
    total_items: 2,
    status: "completed",
    notes: "",
  },
];
// Transaction items
export const transactionItems = [
  {
    transaction_item_id: 1,
    transaction_id: 1,
    item_id: 1,
    quantity: 2,
    unit_cost: 0.5,
  },
  {
    transaction_item_id: 2,
    transaction_id: 1,
    item_id: 6,
    quantity: 1,
    unit_cost: 1.25,
  },
  {
    transaction_item_id: 3,
    transaction_id: 2,
    item_id: 2,
    quantity: 1,
    unit_cost: 5.0,
  },
  {
    transaction_item_id: 4,
    transaction_id: 2,
    item_id: 3,
    quantity: 1,
    unit_cost: 12.5,
  },
];
// Helper function to get inventory with item details
export const getInventoryWithDetails = () => {
  return inventory.map((inv) => {
    const item = items.find((i) => i.item_id === inv.item_id);
    const subcategory = subcategories.find(
      (s) => s.subcategory_id === item?.subcategory_id
    );
    const category = categories.find(
      (c) => c.category_id === subcategory?.category_id
    );
    return {
      ...inv,
      item_name: item?.item_name || "",
      item_code: item?.item_code || "",
      subcategory_name: subcategory?.subcategory_name || "",
      category_name: category?.category_name || "",
      minimum_stock_level: item?.minimum_stock_level || 0,
      maximum_stock_level: item?.maximum_stock_level || 0,
      unit_cost: item?.unit_cost || 0,
      unit_of_measure: item?.unit_of_measure || "",
      location: item?.location || "",
      low_stock: inv.current_stock <= (item?.minimum_stock_level || 0),
    };
  });
};
// Helper function to get purchase orders with details
export const getPurchaseOrdersWithDetails = () => {
  return purchaseOrders.map((po) => {
    const supplier = suppliers.find((s) => s.supplier_id === po.supplier_id);
    const creator = employees.find((e) => e.employee_id === po.created_by);
    const poItems = purchaseOrderItems.filter((poi) => poi.po_id === po.po_id);
    return {
      ...po,
      supplier_name: supplier?.supplier_name || "",
      created_by_name: creator
        ? `${creator.first_name} ${creator.last_name}`
        : "",
      items: poItems.map((poi) => {
        const item = items.find((i) => i.item_id === poi.item_id);
        return {
          ...poi,
          item_name: item?.item_name || "",
          total_cost: poi.quantity_ordered * poi.unit_cost,
        };
      }),
    };
  });
};
// Helper function to get transactions with details
export const getTransactionsWithDetails = () => {
  return transactions.map((tx) => {
    const employee = employees.find((e) => e.employee_id === tx.employee_id);
    const txItems = transactionItems.filter(
      (ti) => ti.transaction_id === tx.transaction_id
    );
    return {
      ...tx,
      employee_name: employee
        ? `${employee.first_name} ${employee.last_name}`
        : "",
      employee_department: employee?.department || "",
      items: txItems.map((ti) => {
        const item = items.find((i) => i.item_id === ti.item_id);
        return {
          ...ti,
          item_name: item?.item_name || "",
          total_cost: ti.quantity * ti.unit_cost,
        };
      }),
    };
  });
};
