// src/component/Header.jsx
import { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  BellIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function Header({ toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">SafeAxis</h1>

      <div className="flex items-center gap-3">
        {/* Search button */}
        <button
          onClick={() => setOpenSearch(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-white" />
        </button>

        {/* Search Modal */}
        {openSearch && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[600px] p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Search</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Enter keyword
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="Type to search..."
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOpenSearch(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Sidebar toggle (mobile) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ☰
        </button>

        {/* Create New Item button */}
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600"
        >
          <PlusIcon className="h-5 w-5 text-white" />
        </button>

        {/* Create Item Modal */}
        {openModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Create New Item
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="Enter title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="Enter description..."
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 relative"
          >
            <BellIcon className="h-5 w-5 text-gray-700" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-80 bg-white border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
              <button
                onClick={() => alert("View all notifications")}
                className="flex items-start gap-3 w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
              >
                <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">System Alert</p>
                  <p className="text-gray-500 text-xs">Nov 26, 2025 • 09:30 AM</p>
                </div>
              </button>

              <button
                onClick={() => alert("Mark as read")}
                className="flex items-start gap-3 w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
              >
                <CheckCircleIcon className="h-6 w-6 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">Task Completed</p>
                  <p className="text-gray-500 text-xs">Nov 25, 2025 • 04:15 PM</p>
                </div>
              </button>

              <button
                onClick={() => alert("Settings")}
                className="flex items-start gap-3 w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
              >
                <Cog6ToothIcon className="h-6 w-6 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">Notification Settings</p>
                  <p className="text-gray-500 text-xs">Updated recently</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
