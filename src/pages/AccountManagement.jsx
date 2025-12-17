import { useState, useEffect } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Sidebar from "../component/Sidebar/Sidebar";
import Header from "../component/Header";
import { supabase } from "../lib/supabase"; // ✅ Supabase client

export default function AccountManagement() {
  const [accounts, setAccounts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRows, setSelectedRows] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 🔎 READ: fetch accounts from Supabase
  useEffect(() => {
    const fetchAccounts = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.error("Error fetching accounts:", error);
      } else {
        setAccounts(data);
      }
    };
    fetchAccounts();
  }, []);

  // ➕ CREATE
  const handleAddAccount = async (newAccount) => {
    const { data, error } = await supabase.from("users").insert([newAccount]);
    if (error) {
      console.error("Insert error:", error);
    } else {
      setAccounts([...accounts, ...data]);
      setShowPopup(false);
    }
  };

  // ✏️ UPDATE
  const handleUpdateAccount = async (id, updates) => {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", id);
    if (error) {
      console.error("Update error:", error);
    } else {
      setAccounts(accounts.map((acc) => (acc.id === id ? { ...acc, ...updates } : acc)));
      setSelectedAccount(null);
    }
  };

  // 🗑 DELETE
  const handleDeleteAccount = async (id) => {
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
    } else {
      setAccounts(accounts.filter((acc) => acc.id !== id));
      setSelectedAccount(null);
    }
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedAccounts[dept].map((acc, idx) => (
                    <div
                      key={acc.id || idx}
                      className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col gap-4 hover:shadow-lg transition cursor-pointer"
                      onClick={() => setSelectedAccount(acc)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {acc.fname} {acc.lname}
                          </h3>
                          <p className="text-sm text-gray-500">{acc.work_id_number}</p>
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
                        <p><span className="font-medium">Email:</span> {acc.username}</p>
                        <p><span className="font-medium">Phone:</span> {acc.contact_number}</p>
                        <p><span className="font-medium">Position:</span> {acc.position}</p>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateAccount(acc.id, { position: "Updated Position" });
                          }}
                          className="p-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAccount(acc.id);
                          }}
                          className="p-2 rounded bg-red-500 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Popup Modal for Create Account */}
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
                  <p><strong>Full Name:</strong> {selectedAccount.fname} {selectedAccount.lname}</p>
                  <p><strong>Email:</strong> {selectedAccount.username}</p>
                  <p><strong>Phone:</strong> {selectedAccount.contact_number}</p>
                                    <p><strong>Work ID:</strong> {selectedAccount.work_id_number}</p>
                  <p><strong>Position:</strong> {selectedAccount.position}</p>
                  <p><strong>Department:</strong> {selectedAccount.department}</p>
                  <p><strong>Age:</strong> {selectedAccount.age}</p>
                  <p><strong>Address:</strong> {selectedAccount.address}</p>
                  <p><strong>Contact Number:</strong> {selectedAccount.contact_number}</p>
                  <p><strong>Emergency Name:</strong> {selectedAccount.e_name}</p>
                  <p><strong>Emergency Relation:</strong> {selectedAccount.e_relation}</p>
                  <p><strong>Emergency Contact:</strong> {selectedAccount.e_contact}</p>
                  <p><strong>Emergency Address:</strong> {selectedAccount.e_address}</p>

                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() =>
                        handleUpdateAccount(selectedAccount.id, {
                          position: "Updated Position",
                        })
                      }
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteAccount(selectedAccount.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

// ✅ CreateAccountPanel for adding new users
function CreateAccountPanel({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    work_id_number: "",
    position: "",
    department: "",
    fname: "",
    lname: "",
    mname: "",
    suffix: "",
    age: "",
    address: "",
    contact_number: "",
    e_name: "",
    e_relation: "",
    e_contact: "",
    e_address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
  <h3 className="text-2xl font-bold mb-6 text-gray-800">Create New Account</h3>

  {/* Grid with 3 columns */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {Object.keys(formData).map((field) => (
      <div key={field} className="flex flex-col">
        <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
          {field.replace("_", " ")}
        </label>
        <input
          type="text"
          name={field}
          value={formData[field]}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required={["username", "password", "fname", "lname"].includes(field)}
        />
      </div>
    ))}
  </div>

  <div className="flex justify-end mt-6">
    <button
      type="submit"
      className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md shadow hover:bg-blue-700 transition"
    >
      Save Account
    </button>
  </div>
</form>

  );
}
