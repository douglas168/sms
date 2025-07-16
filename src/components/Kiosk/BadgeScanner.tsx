import React, { useState } from "react";
import { UserIcon } from "lucide-react";
import { employees } from "../../utils/mockData";
interface BadgeScannerProps {
  onScanComplete: (badgeId: string) => void;
}
const BadgeScanner: React.FC<BadgeScannerProps> = ({ onScanComplete }) => {
  const [badgeId, setBadgeId] = useState("");
  const [error, setError] = useState("");
  const handleScanBadge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!badgeId.trim()) {
      setError("Please enter a badge ID");
      return;
    }
    const employee = employees.find((e) => e.badge_id === badgeId);
    if (employee) {
      onScanComplete(badgeId);
      setBadgeId("");
      setError("");
    } else {
      setError("Invalid badge ID. Please try again.");
    }
  };
  const handleDemoEmployeeSelect = (badgeId: string) => {
    onScanComplete(badgeId);
  };
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto text-blue-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">掃描識別卡</h2>
        <p className="text-gray-600">請掃描您的識別卡或輸入衣編</p>
      </div>
      <form onSubmit={handleScanBadge} className="w-full max-w-md">
        <div className="mb-4">
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
              <UserIcon className="h-5 w-5" />
            </span>
            <input
              type="text"
              value={badgeId}
              onChange={(e) => setBadgeId(e.target.value)}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              placeholder="輸入衣編"
            />
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            繼續
          </button>
        </div>
      </form>
      <div className="mt-12 border-t border-gray-200 pt-8 w-full max-w-md">
        <h3 className="text-lg font-medium mb-4 text-center">人員</h3>
        <div className="space-y-3">
          {employees.map((employee) => (
            <button
              key={employee.employee_id}
              onClick={() => handleDemoEmployeeSelect(employee.badge_id)}
              className="w-full flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                {employee.first_name.charAt(0)}
                {employee.first_name.charAt(1)}
                {/* {employee.last_name.charAt(0)} */}
              </div>
              <div className="text-left">
                <p className="font-medium">
                  {employee.last_name} {employee.first_name}
                </p>
                <p className="text-sm text-gray-500">
                  衣編 : {employee.badge_id} | {employee.department}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BadgeScanner;
