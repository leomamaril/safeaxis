// src/layout/SettingsPanel.jsx
import { useState } from "react";
import Sidebar from "../component/Sidebar/Sidebar";
import Header from "../component/Header";
import {
  Cog6ToothIcon,
  BellIcon,
  MoonIcon,
  GlobeAltIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function SettingsPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Example settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");

  // Profile state
  const [profile, setProfile] = useState({
    fullName: "Leonardo",
    email: "leonardo.medical@example.com",
    password: "",
    idNumber: "EMP400",
    birthday: "",
    position: "Medical Technologist",
    department: "Laboratory",
    age: "",
    citizen: "Filipino",
    address: "",
    civilStatus: "Single",
    mobileNumber: "09123456789",
    emergencyName: "",
    emergencyContact: "",
    emergencyAddress: "",
    emergencyRelation: "",
  });

  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setShowEditProfile(false);
    // In a real app, you’d also persist changes to backend here
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

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          <section className="bg-white rounded-xl shadow-lg p-8">
            {/* Title */}
            <div className="flex items-center gap-2 mb-6">
              <Cog6ToothIcon className="h-7 w-7 text-teal-500" />
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            </div>

            {/* Settings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Notifications */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <BellIcon className="h-6 w-6 text-teal-500" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Notifications
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Enable or disable system notifications.
                </p>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={() =>
                      setNotificationsEnabled(!notificationsEnabled)
                    }
                    className="h-4 w-4 text-teal-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    {notificationsEnabled ? "Enabled" : "Disabled"}
                  </span>
                </label>
              </div>

              {/* Dark Mode */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <MoonIcon className="h-6 w-6 text-teal-500" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Appearance
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Switch between light and dark themes.
                </p>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    className="h-4 w-4 text-teal-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    {darkMode ? "Dark Mode" : "Light Mode"}
                  </span>
                </label>
              </div>

              {/* Language */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <GlobeAltIcon className="h-6 w-6 text-teal-500" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Language
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Select your preferred language.
                </p>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option>English</option>
                  <option>Filipino</option>
                  <option>Spanish</option>
                  <option>Chinese</option>
                </select>
              </div>

              {/* Profile */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-6 w-6 text-teal-500" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Profile
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Manage your account information.
                </p>
                <button
                  onClick={() => setShowEditProfile(true)}
                  className="px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition text-sm font-medium"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b px-6 py-4 sticky top-0 bg-white rounded-t-2xl">
        <h3 className="text-xl font-semibold text-gray-900">Edit Profile</h3>
        <button
          onClick={() => setShowEditProfile(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✖
        </button>
      </div>

      {/* Form */}
      <form id="edit-profile-form" onSubmit={handleProfileUpdate} className="flex-1 overflow-y-auto px-6 py-6 space-y-10">
        
        {/* User Details */}
        <section>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">User Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Full Name", "text", "fullName"],
              ["Email", "email", "email"],
              ["ID Number", "text", "idNumber"],
              ["Birthday", "date", "birthday"],
              ["Age", "number", "age"],
              ["Citizenship", "text", "citizen"],
              ["Address", "text", "address"],
              ["Civil Status", "text", "civilStatus"],
              ["Mobile Number", "text", "mobileNumber"],
              ["Department", "text", "department"],
              ["Position", "text", "position"],
            ].map(([label, type, key]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  value={profile[key] || ""}
                  onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Preferences</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Language", "text", "language"],
              ["Time Zone", "text", "timezone"],
              ["Date Format", "text", "dateFormat"],
              ["Time Format", "text", "timeFormat"],
              ["Temperature Metric", "text", "temperatureMetric"],
              ["Distance Metric", "text", "distanceMetric"],
              ["Display Theme", "text", "theme"],
            ].map(([label, type, key]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  value={profile[key] || ""}
                  onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contact */}
        <section>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Emergency Contact</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Name", "text", "emergencyName"],
              ["Contact Number", "text", "emergencyContact"],
              ["Address", "text", "emergencyAddress"],
              ["Relation", "text", "emergencyRelation"],
            ].map(([label, type, key]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  value={profile[key] || ""}
                  onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </section>
      </form>

      {/* Footer */}
      <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 sticky bottom-0 rounded-b-2xl">
        <button
          type="button"
          onClick={() => setShowEditProfile(false)}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="edit-profile-form"
          className="px-5 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
