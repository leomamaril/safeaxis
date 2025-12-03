// src/layout/TaskActionsPanel.jsx
import { useState } from "react";
import Sidebar from "../component/Sidebar/Sidebar";
import Header from "../component/Header"; // adjust path if needed
import {
  UserIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  ArchiveBoxIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function TaskActionsPanel() {
  const [openMenu, setOpenMenu] = useState(null);
  const [selected, setSelected] = useState([]);
  const [viewArchive, setViewArchive] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sample datasets
  const activeTasks = [
    {
      id: "AC-1749",
      title: "Housekeeping",
      priority: "Low",
      due: "7 Sep 2021",
      overdue: true,
      assignees: ["John Lloyd Misiong", "Alex Edriago"],
      status: "To Do",
      updated: "7 Sep 2021",
    },
    {
      id: "AC-1748",
      title: "Obstructions",
      priority: "Medium",
      due: "12 Nov 2021",
      overdue: false,
      assignees: ["John Lloyd Misiong", "Alex Edriago"],
      status: "Complete",
      updated: "12 Nov 2021",
    },
  ];

  const archivedTasks = [
    {
      id: "AC-1700",
      title: "Old Safety Drill",
      priority: "High",
      due: "1 Jan 2020",
      overdue: false,
      assignees: ["Archived User"],
      status: "Archived",
      updated: "1 Jan 2020",
    },
  ];

  const tasks = viewArchive ? archivedTasks : activeTasks;

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === tasks.length) {
      setSelected([]);
    } else {
      setSelected(tasks.map((t) => t.id));
    }
  };

  const deleteSelected = () => {
    alert(`Deleting tasks: ${selected.join(", ")}`);
    setSelected([]);
  };

  const archiveSelected = () => {
    alert(`Archiving tasks: ${selected.join(", ")}`);
    setSelected([]);
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
          <section className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Action Tasks</h2>
              <div className="flex gap-3">
                {/* View Archive Toggle */}
                <button
                  onClick={() => {
                    setSelected([]);
                    setViewArchive(!viewArchive);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                >
                  <ArchiveBoxIcon className="h-5 w-5 text-gray-700" />
                  <span>{viewArchive ? "View Active" : "View Archive"}</span>
                </button>

                {/* Bulk Actions */}
                {selected.length > 0 && (
                  <>
                    <button
                      onClick={deleteSelected}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
                    >
                      <TrashIcon className="h-5 w-5 text-white" />
                      <span>Delete</span>
                    </button>
                    {!viewArchive && (
                      <button
                        onClick={archiveSelected}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 transition"
                      >
                        <ArchiveBoxIcon className="h-5 w-5 text-white" />
                        <span>Archive</span>
                      </button>
                    )}
                  </>
                )}

                {/* Create Action */}
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition text-sm font-medium">
                  + Create Action
                </button>
              </div>
            </div>

            {/* Search + Filter Bar */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-full max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${
                    viewArchive ? "archived" : "active"
                  } actions...`}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition text-sm font-medium">
                + Add Filter
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700 border rounded-lg overflow-hidden">
                <thead className="bg-blue-50 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">
                      <input
                        type="checkbox"
                        checked={
                          selected.length === tasks.length && tasks.length > 0
                        }
                        onChange={toggleSelectAll}
                        className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                      />
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">Task</th>
                    <th className="px-6 py-3 text-left font-semibold">Priority</th>
                    <th className="px-6 py-3 text-left font-semibold">Due Date</th>
                    <th className="px-6 py-3 text-left font-semibold">Assignees</th>
                    <th className="px-6 py-3 text-left font-semibold">Status</th>
                    <th className="px-6 py-3 text-left font-semibold">Updated</th>
                    <th className="px-6 py-3 text-left font-semibold">Action Code</th>
                    <th className="px-6 py-3 text-left font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, idx) => (
                    <tr
                      key={task.id}
                      className={`border-b hover:bg-gray-50 transition ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selected.includes(task.id)}
                          onChange={() => toggleSelect(task.id)}
                          className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium">{task.title}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            task.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : task.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {task.overdue ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            Overdue (Due {task.due})
                          </span>
                        ) : (
                          <span className="text-gray-700 text-sm">{task.due}</span>
                        )}
                                            </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {task.assignees.map((name, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            >
                              <UserIcon className="h-4 w-4 text-gray-500" />
                              {name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            task.status === "Complete"
                              ? "bg-green-100 text-green-700"
                              : viewArchive
                              ? "bg-gray-200 text-gray-600"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{task.updated}</td>
                      <td className="px-6 py-4 font-mono text-xs text-gray-600">
                        {task.id}
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === idx ? null : idx)}
                          className="p-2 rounded-full hover:bg-gray-200 transition"
                        >
                          <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
                        </button>

                        {openMenu === idx && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                              View Details
                            </button>
                            {!viewArchive && (
                              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                                Edit
                              </button>
                            )}
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                              Delete
                            </button>
                            {!viewArchive && (
                              <button
                                onClick={() => alert(`Archiving ${task.id}`)}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              >
                                Archive
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
