import { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Sidebar from "../component/Sidebar/Sidebar";
import Header from "../component/Header"; // adjust path if needed

export default function AccountManagement() {
  const [accounts, setAccounts] = useState([
    {
      fullName: "Leonardo Cruz",
      email: "leonardo@example.com",
      phone: "09123456789",
      workId: "EMP001",
      position: "Medical Technologist",
      department: "Laboratory",
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleAddAccount = (newAccount) => {
    setAccounts([...accounts, newAccount]);
    setShowPopup(false);
  };

  const toggleRowSelection = (idx) => {
    setSelectedRows((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === accounts.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(accounts.map((_, idx) => idx));
    }
  };

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        open={sidebarOpen}
      />

      {/* Main container */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          !sidebarOpen ? "ml-0" : sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Header */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Scrollable main content */}
        <div className="flex-1 overflow-y-auto p-6">
          <section className="p-8 bg-white rounded-xl shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Account Management</h2>
              <button
                onClick={() => setShowPopup(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
              >
                + Add Account
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === accounts.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Full Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Work ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Department
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {accounts.map((acc, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedAccount(acc)}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(idx)}
                          onChange={(e) => {
                            e.stopPropagation(); // prevent row click
                            toggleRowSelection(idx);
                          }}
                        />
                      </td>
                      <td className="px-6 py-3">{acc.fullName}</td>
                      <td className="px-6 py-3">{acc.email}</td>
                      <td className="px-6 py-3">{acc.phone}</td>
                      <td className="px-6 py-3">{acc.workId}</td>
                      <td className="px-6 py-3">{acc.position}</td>
                      <td className="px-6 py-3">{acc.department}</td>
                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // prevent row click
                            alert(`Options for ${acc.fullName}`);
                          }}
                          className="p-2 rounded hover:bg-gray-200"
                        >
                          <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Popup Modal for Add Account */}
            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
                  {/* Close Button */}
                  <button
                    onClick={() => setShowPopup(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  >
                    ✖
                  </button>

                  {/* Form Component */}
                  <CreateAccountPanel
                    onSubmit={(newAccount) => handleAddAccount(newAccount)}
                  />
                </div>
              </div>
            )}

            {/* Popup Modal for Viewing Account Info */}
            {selectedAccount && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button
                    onClick={() => setSelectedAccount(null)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  >
                    ✖
                  </button>
                  <h3 className="text-xl font-bold mb-4">Account Information</h3>
                  <p>
                    <strong>Full Name:</strong> {selectedAccount.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedAccount.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedAccount.phone}
                  </p>
                  <p>
                    <strong>Work ID:</strong> {selectedAccount.workId}
                  </p>
                  <p>
                    <strong>Position:</strong> {selectedAccount.position}
                  </p>
                  <p>
                    <strong>Department:</strong> {selectedAccount.department}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
