import { useState, useEffect } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Sidebar from "../component/Sidebar/Sidebar";
import Header from "../component/Header";
import { supabase } from "../lib/supabase"; // ✅ Supabase client
import sumecLogo from "../assets/sumec-icon.png";
export default function AccountManagement() {
  const [accounts, setAccounts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
const [editMode, setEditMode] = useState(false);
const [editData, setEditData] = useState(null);

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
      setAccounts(
        accounts.map((acc) => (acc.id === id ? { ...acc, ...updates } : acc))
      );
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
            {!selectedAccount ? (
              <>
                {/* List View */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Account Management
                  </h2>
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
                      <h3 className="text-lg font-semibold text-gray-700">
                        {dept}
                      </h3>
                     
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
                              <p className="text-sm text-gray-500">
                                {acc.work_id_number}
                              </p>
                            </div>
                            
                          </div>

                          <div className="space-y-1 text-sm text-gray-600">
                            <p>
                              <span className="font-medium">Username:</span>{" "}
                              {acc.username}
                            </p>
                            <p>
                              <span className="font-medium">Phone:</span>{" "}
                              {acc.contact_number}
                            </p>
                            <p>
                              <span className="font-medium">Position:</span>{" "}
                              {acc.position}
                            </p>
                          </div>

                          {/* 3-dot menu */}
                          <div className="flex justify-end relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setMenuOpen(
                                  menuOpen === acc.id ? null : acc.id
                                );
                              }}
                              className="p-2 rounded hover:bg-gray-100"
                            >
                              ⋮
                            </button>

                            {menuOpen === acc.id && (
                              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateAccount(acc.id, {
                                      position: "Updated Position",
                                    });
                                    setMenuOpen(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteAccount(acc.id);
                                    setMenuOpen(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
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
                        onClose={() => setShowPopup(false)}
                        onSubmit={(newAccount) => handleAddAccount(newAccount)}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
    {/* Detail View */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">
        {selectedAccount.fname} {selectedAccount.lname}
      </h2>
      <button
        onClick={() => setSelectedAccount(null)}
        className="px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 transition"
      >
        ← Back
      </button>
    </div>

    {!editMode ? (
      <div className="space-y-8 text-gray-700">
  {/* Work Information */}
  <div>
    <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">
      Work Information
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-500">Work ID</label>
        <p className="text-base font-semibold text-gray-900">{selectedAccount.work_id_number}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-500">Position</label>
        <p className="text-base font-semibold text-gray-900">{selectedAccount.position}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-500">Department</label>
        <p className="text-base font-semibold text-gray-900">{selectedAccount.department}</p>
      </div>
    </div>
  </div>

  {/* Personal Information */}
  <div>
    <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">
      Personal Information
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-500">Email</label>
        <p className="text-base font-semibold text-gray-900">{selectedAccount.username}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-500">Phone</label>
        <p className="text-base font-semibold text-gray-900">{selectedAccount.contact_number}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-500">Age</label>
        <p className="text-base font-semibold text-gray-900">{selectedAccount.age}</p>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-500">Address</label>
        <p className="text-base font-semibold text-gray-900">{selectedAccount.address}</p>
      </div>
    </div>
  </div>

  {/* Emergency Contact */}
  <div>
    <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">
      Emergency Contact
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-500">Emergency Name</label>
        <p className="text-base font-semibold text-gray-900">{selectedAccount.e_name}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-500">Relation</label>
        <p className="text-base font-semibold text-gray-900">{selectedAccount.e_relation}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-500">Emergency Contact</label>
        <p className="text-base font-semibold text-gray-900">{selectedAccount.e_contact}</p>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-500">Emergency Address</label>
        <p className="text-base font-semibold text-gray-900">{selectedAccount.e_address}</p>
      </div>
    </div>
  </div>
</div>


    ) : (
      <div className="space-y-8 text-gray-700">
  {/* Work Information */}
  <div>
    <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">
      Work Information
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-500">Work ID</label>
        <input
          type="text"
          value={editData?.work_id_number || ""}
          onChange={(e) => setEditData({ ...editData, work_id_number: e.target.value })}
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-500">Position</label>
        <input
          type="text"
          value={editData?.position || ""}
          onChange={(e) => setEditData({ ...editData, position: e.target.value })}
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-500">Department</label>
        <input
          type="text"
          value={editData?.department || ""}
          onChange={(e) => setEditData({ ...editData, department: e.target.value })}
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>
    </div>
  </div>

  {/* Personal Information */}
  <div>
    <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">
      Personal Information
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-500">Email</label>
        <input
          type="text"
          value={editData?.username || ""}
          onChange={(e) => setEditData({ ...editData, username: e.target.value })}
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-500">Phone</label>
        <input
          type="text"
          value={editData?.contact_number || ""}
          onChange={(e) => setEditData({ ...editData, contact_number: e.target.value })}
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-500">Age</label>
        <input
          type="number"
          value={editData?.age || ""}
          onChange={(e) => setEditData({ ...editData, age: e.target.value })}
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-500">Address</label>
        <input
          type="text"
          value={editData?.address || ""}
          onChange={(e) => setEditData({ ...editData, address: e.target.value })}
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>
    </div>
  </div>

  {/* Emergency Contact */}
  <div>
    <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">
      Emergency Contact
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-500">Emergency Name</label>
        <input
          type="text"
          value={editData?.e_name || ""}
          onChange={(e) => setEditData({ ...editData, e_name: e.target.value })}
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-500">Relation</label>
        <input
          type="text"
          value={editData?.e_relation || ""}
          onChange={(e) => setEditData({ ...editData, e_relation: e.target.value })}
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-500">Emergency Contact</label>
        <input
          type="text"
          value={editData?.e_contact || ""}
          onChange={(e) => setEditData({ ...editData, e_contact: e.target.value })}
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-500">Emergency Address</label>
        <input
          type="text"
          value={editData?.e_address || ""}
          onChange={(e) => setEditData({ ...editData, e_address: e.target.value })}
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>
    </div>
  </div>
</div>

    )}

    <div className="flex justify-end space-x-3 mt-6">
      {!editMode ? (
        <>
          <button
            onClick={() => {
              setEditMode(true);
              setEditData(selectedAccount); // preload current values
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Update
          </button>
          <button
            onClick={() => handleDeleteAccount(selectedAccount.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              handleUpdateAccount(selectedAccount.id, editData);
              setEditMode(false);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function CreateAccountPanel({ onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const [formData, setFormData] = useState({
    department: "",
    work_id_number: "",
    position: "",
    username: "",
    password: "",
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

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  // Handle clicking outside modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowConfirmExit(true);
    }
  };

  return (
    <div
      className="fixed bg-fit bg-center bg-no-repeat inset-0 bg-white flex items-center justify-center z-50 backdrop-blur-sm"
      style={{ backgroundImage: `url(${sumecLogo})` }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white/60 rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
        <button
          onClick={() => setShowConfirmExit(true)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {/* Steps content here (same as before) */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">
              Select Department
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["HSSE", "HSSF", "HSSG"].map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setFormData({ ...formData, department: dept })}
                  className={`px-4 py-3 rounded-md shadow text-white font-semibold ${
                    formData.department === dept
                      ? "bg-blue-600"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={!formData.department}
                className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Work Information */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">
              Work Information
            </h3>

            {/* Grid layout for inputs */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="work_id_number"
                placeholder="Work ID Number"
                value={formData.work_id_number}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
                required
              />

              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
                required
              >
                <option value="">-- Select Position --</option>
                <option value="Manager">Manager</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Staff">Staff</option>
              </select>

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
                required
              />
            </div>

            {/* Action buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleBack}
                type="button"
                className="bg-gray-500 text-white px-6 py-2 rounded-md shadow hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={
                  !formData.position ||
                  !formData.work_id_number ||
                  !formData.username ||
                  !formData.password
                }
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Personal Information */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                value={formData.fname}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
                required
              />
              <input
                type="text"
                name="lname"
                placeholder="Last Name"
                value={formData.lname}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
                required
              />
              <input
                type="text"
                name="mname"
                placeholder="Middle Name"
                value={formData.mname}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
                required
              />
              <input
                type="text"
                name="suffix"
                placeholder="Suffix"
                value={formData.suffix}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
                required
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-500 text-white px-6 py-2 rounded-md shadow hover:bg-gray-600"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={
                  !formData.fname ||
                  !formData.lname ||
                  !formData.mname ||
                  !formData.suffix ||
                  !formData.age ||
                  !formData.address
                }
                className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Emergency Contact */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">
              Emergency Contact
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="contact_number"
                placeholder="Contact Number"
                value={formData.contact_number}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
                required
              />
              <input
                type="text"
                name="e_name"
                placeholder="Emergency Name"
                value={formData.e_name}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
                required
              />
              <input
                type="text"
                name="e_relation"
                placeholder="Relation"
                value={formData.e_relation}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
                required
              />
              <input
                type="text"
                name="e_contact"
                placeholder="Emergency Contact"
                value={formData.e_contact}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
                required
              />
              <input
                type="text"
                name="e_address"
                placeholder="Emergency Address"
                value={formData.e_address}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
                required
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-500 text-white px-6 py-2 rounded-md shadow hover:bg-gray-600"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={
                  !formData.contact_number ||
                  !formData.e_name ||
                  !formData.e_relation ||
                  !formData.e_contact ||
                  !formData.e_address
                }
                className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 disabled:opacity-50"
              >
                Save Account
              </button>
            </div>
          </form>
        )}

        {/* Exit Confirmation Modal */}

        {showConfirmExit && (
          <div
            className="fixed bg-fit bg-center bg-no-repeat inset-0 bg-white flex items-center justify-center z-50 backdrop-blur-sm"
            style={{ backgroundImage: `url(${sumecLogo})` }}
            onClick={handleOverlayClick}
          >
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Discard Account Creation?
              </h3>
              <p className="text-gray-600 mb-6">
                All entered information will be lost if you exit.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirmExit(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowConfirmExit(false);
                    onClose(); // ✅ closes modal and returns to main
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
