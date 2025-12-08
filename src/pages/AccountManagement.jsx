import { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Sidebar from "../component/Sidebar/Sidebar";
import Header from "../component/Header";

export default function AccountManagement() {
  const [accounts, setAccounts] = useState([
    {
      fullName: "Maria Santos",
      email: "maria.manager@example.com",
      phone: "09123450001",
      workId: "EMP100",
      position: "Manager",
      department: "Operations",
    },
    {
      fullName: "Juan Dela Cruz",
      email: "juan.subcontractor@example.com",
      phone: "09123450002",
      workId: "EMP200",
      position: "Sub Contractor",
      department: "Construction",
    },
    {
      fullName: "Leonardo Cruz",
      email: "leonardo.medical@example.com",
      phone: "09123450003",
      workId: "EMP300",
      position: "Medical Technologist",
      department: "Laboratory",
    },
    {
      fullName: "Ana Reyes",
      email: "ana.admin@example.com",
      phone: "09123450004",
      workId: "EMP400",
      position: "Admin Staff",
      department: "Administration",
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRows, setSelectedRows] = useState({});

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleAddAccount = (newAccount) => {
    setAccounts([...accounts, newAccount]);
    setShowPopup(false);
  };

  // Group accounts by department
  const groupedAccounts = accounts.reduce((groups, acc) => {
    if (!groups[acc.department]) {
      groups[acc.department] = [];
    }
    groups[acc.department].push(acc);
    return groups;
  }, {});

  // Toggle one row in a department
  const toggleRowSelection = (dept, idx) => {
    setSelectedRows((prev) => {
      const current = prev[dept] || [];
      return {
        ...prev,
        [dept]: current.includes(idx)
          ? current.filter((i) => i !== idx)
          : [...current, idx],
      };
    });
  };

  // Toggle all rows in a department
  const toggleSelectAll = (dept) => {
    const deptAccounts = groupedAccounts[dept] || [];
    setSelectedRows((prev) => {
      const current = prev[dept] || [];
      if (current.length === deptAccounts.length) {
        return { ...prev, [dept]: [] };
      } else {
        return { ...prev, [dept]: deptAccounts.map((_, idx) => idx) };
      }
    });
  };

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        open={sidebarOpen}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          !sidebarOpen ? "ml-0" : sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-y-auto p-6">
          <section className="p-8 bg-white rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Account Management</h2>
              <button
                onClick={() => setShowPopup(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
              >
                + Add Account
              </button>
            </div>

            {/* Department Dividers */}
            {Object.keys(groupedAccounts).map((dept) => (
              <div key={dept} className="mb-10">
                {/* Divider with Select All aligned right */}
                <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">{dept}</h3>
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={
                        (selectedRows[dept] || []).length === groupedAccounts[dept].length &&
                        groupedAccounts[dept].length > 0
                      }
                      onChange={() => toggleSelectAll(dept)}
                      className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                    />
                    Select All
                  </label>
                </div>

                {/* Card Layout for this department */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedAccounts[dept].map((acc, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col gap-4 hover:shadow-lg transition cursor-pointer"
                      onClick={() => setSelectedAccount(acc)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {acc.fullName}
                          </h3>
                          <p className="text-sm text-gray-500">{acc.workId}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={(selectedRows[dept] || []).includes(idx)}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => toggleRowSelection(dept, idx)}
                          className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                        />
                      </div>

                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Email:</span> {acc.email}</p>
                        <p><span className="font-medium">Phone:</span> {acc.phone}</p>
                        <p><span className="font-medium">Position:</span> {acc.position}</p>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Options for ${acc.fullName}`);
                          }}
                          className="p-2 rounded hover:bg-gray-200"
                        >
                          <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Popup Modals remain unchanged */}
            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  >
                    ✖
                  </button>
                  <CreateAccountPanel
                    onSubmit={(newAccount) => handleAddAccount(newAccount)}
                  />
                </div>
              </div>
            )}

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
                  <p><strong>Full Name:</strong> {selectedAccount.fullName}</p>
                  <p><strong>Email:</strong> {selectedAccount.email}</p>
                  <p><strong>Phone:</strong> {selectedAccount.phone}</p>
                  <p><strong>Work ID:</strong> {selectedAccount.workId}</p>
                  <p><strong>Position:</strong> {selectedAccount.position}</p>
                  <p><strong>Department:</strong> {selectedAccount.department}</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
