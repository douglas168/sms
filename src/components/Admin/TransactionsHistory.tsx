import React, { useEffect, useState } from 'react';
import { ShoppingCartIcon, SearchIcon, CalendarIcon, ChevronDownIcon, ChevronUpIcon, UserIcon } from 'lucide-react';
import { getTransactionsWithDetails } from '../../utils/mockData';
import { TransactionWithDetails } from '../../utils/types';
const TransactionsHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionWithDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [expandedTransactions, setExpandedTransactions] = useState<number[]>([]);
  useEffect(() => {
    // Get transactions with details
    const txData = getTransactionsWithDetails();
    setTransactions(txData);
  }, []);
  const toggleTransactionExpand = (txId: number) => {
    setExpandedTransactions(prev => {
      if (prev.includes(txId)) {
        return prev.filter(id => id !== txId);
      } else {
        return [...prev, txId];
      }
    });
  };
  const filteredTransactions = transactions.filter(tx => {
    let matches = true;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchesTxNumber = tx.transaction_number.toLowerCase().includes(search);
      const matchesEmployee = tx.employee_name.toLowerCase().includes(search);
      const matchesDepartment = tx.employee_department.toLowerCase().includes(search);
      const matchesItems = tx.items.some(item => item.item_name.toLowerCase().includes(search));
      matches = matchesTxNumber || matchesEmployee || matchesDepartment || matchesItems;
    }
    if (startDate && new Date(tx.transaction_date) < new Date(startDate)) {
      matches = false;
    }
    if (endDate && new Date(tx.transaction_date) > new Date(endDate)) {
      matches = false;
    }
    return matches;
  });
  return <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transaction History</h2>
      </div>
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[240px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <input type="text" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Search by transaction #, employee, items..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <SearchIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <div className="relative">
              <input type="date" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" value={startDate} onChange={e => setStartDate(e.target.value)} />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <CalendarIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <div className="relative">
              <input type="date" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" value={endDate} onChange={e => setEndDate(e.target.value)} />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <CalendarIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.map(tx => {
        const isExpanded = expandedTransactions.includes(tx.transaction_id);
        const totalCost = tx.items.reduce((sum, item) => sum + item.total_cost, 0);
        return <div key={tx.transaction_id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => toggleTransactionExpand(tx.transaction_id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-blue-100">
                      <ShoppingCartIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">
                        {tx.transaction_number}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(tx.transaction_date).toLocaleDateString()} •{' '}
                        {tx.total_items} items
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                        <UserIcon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">
                        {tx.employee_name}
                      </span>
                    </div>
                    <div className="text-lg font-semibold">
                      ${totalCost.toFixed(2)}
                    </div>
                    <button className="text-gray-500">
                      {isExpanded ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
              {isExpanded && <div className="border-t border-gray-200 p-4">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Employee</p>
                      <p>{tx.employee_name}</p>
                      <p className="text-sm text-gray-500">
                        {tx.employee_department}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p>{new Date(tx.transaction_date).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="capitalize">{tx.status}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Transaction Items</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Item
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Unit Cost
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {tx.items.map(item => <tr key={item.transaction_item_id}>
                              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.item_name}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                {item.quantity}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                ${item.unit_cost.toFixed(2)}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                ${item.total_cost.toFixed(2)}
                              </td>
                            </tr>)}
                          <tr className="bg-gray-50">
                            <td colSpan={3} className="px-4 py-2 text-right text-sm font-medium">
                              Total:
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              ${totalCost.toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {tx.notes && <div className="mt-4">
                      <h4 className="font-medium mb-1">Notes</h4>
                      <p className="text-sm text-gray-700">{tx.notes}</p>
                    </div>}
                </div>}
            </div>;
      })}
        {filteredTransactions.length === 0 && <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No transactions found matching your search criteria.
          </div>}
      </div>
    </div>;
};
export default TransactionsHistory;