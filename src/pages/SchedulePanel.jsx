// src/layout/SchedulePanel.jsx
import { useState } from "react";
import Sidebar from "../component/Sidebar/Sidebar";
import Header from "../component/Header"; // adjust path if needed
import {
  CalendarIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  EllipsisVerticalIcon,
  ArchiveBoxIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function SchedulePanel() {
  const [activeTab, setActiveTab] = useState("My Schedules");
  const [selected, setSelected] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [viewArchive, setViewArchive] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const tabs = ["My Schedules", "Manage Schedules", "Missed/Late Inspections"];

  // Active datasets
  const [dataSets, setDataSets] = useState({
    "My Schedules": [
      {
        id: 1,
        name: "Schedule #001 / John Doe",
        doc: "DOC-001",
        score: "85%",
        conducted: "20 Nov 2025",
        completed: "21 Nov 2025",
        status: "Continue",
        type: "continue",
      },
      {
        id: 2,
        name: "Schedule #002 / Jane Smith",
        doc: "DOC-002",
        score: "92%",
        conducted: "22 Nov 2025",
        completed: "23 Nov 2025",
        status: "View Report",
        type: "report",
      },
    ],
    "Manage Schedules": [
      {
        id: 3,
        name: "Schedule #003 / Hiro Tanaka",
        doc: "DOC-003",
        score: "78%",
        conducted: "25 Nov 2025",
        completed: "26 Nov 2025",
        status: "Continue",
        type: "continue",
      },
    ],
    "Missed/Late Inspections": [
      {
        id: 4,
        name: "Schedule #004 / Maria Lopez",
        doc: "DOC-004",
        score: "0%",
        conducted: "18 Nov 2025",
        completed: "—",
        status: "Missed",
        type: "report",
      },
    ],
  });

  // Archive dataset
  const [archiveData, setArchiveData] = useState([
    {
      id: 101,
      name: "Schedule #010 / Carlos Reyes",
      doc: "DOC-010",
      score: "88%",
      conducted: "10 Nov 2025",
      completed: "11 Nov 2025",
      status: "Archived",
      type: "report",
    },
    {
      id: 102,
      name: "Schedule #011 / Anna Kim",
      doc: "DOC-011",
      score: "95%",
      conducted: "12 Nov 2025",
      completed: "13 Nov 2025",
      status: "Archived",
      type: "continue",
    },
    {
      id: 103,
      name: "Schedule #012 / Liam Johnson",
      doc: "DOC-012",
      score: "76%",
      conducted: "15 Nov 2025",
      completed: "16 Nov 2025",
      status: "Archived",
      type: "report",
    },
  ]);

  const schedules = viewArchive ? archiveData : dataSets[activeTab];

  // Checkbox handlers
  const toggleSelectAll = () => {
    if (selected.length === schedules.length) {
      setSelected([]);
    } else {
      setSelected(schedules.map((s) => s.id));
    }
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    if (viewArchive) {
      setArchiveData(archiveData.filter((s) => !selected.includes(s.id)));
    } else {
      setDataSets({
        ...dataSets,
        [activeTab]: dataSets[activeTab].filter((s) => !selected.includes(s.id)),
      });
    }
    setSelected([]);
  };

  const archiveSelected = () => {
    const toArchive = dataSets[activeTab].filter((s) => selected.includes(s.id));
    setArchiveData([...archiveData, ...toArchive]);
    setDataSets({
      ...dataSets,
      [activeTab]: dataSets[activeTab].filter((s) => !selected.includes(s.id)),
    });
    setSelected([]);
  };

  const handleArchive = (id) => {
    const item = dataSets[activeTab].find((s) => s.id === id);
    if (item) {
      setArchiveData([...archiveData, item]);
      setDataSets({
        ...dataSets,
        [activeTab]: dataSets[activeTab].filter((s) => s.id !== id),
      });
    }
  };

  const handleRestore = (id) => {
    const item = archiveData.find((s) => s.id === id);
    if (item) {
      setDataSets({
        ...dataSets,
        "My Schedules": [...dataSets["My Schedules"], item], // restore to My Schedules by default
      });
      setArchiveData(archiveData.filter((s) => s.id !== id));
    }
  };

  const restoreSelected = () => {
    const toRestore = archiveData.filter((s) => selected.includes(s.id));
    setDataSets({
      ...dataSets,
      "My Schedules": [...dataSets["My Schedules"], ...toRestore],
    });
    setArchiveData(archiveData.filter((s) => !selected.includes(s.id)));
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
              <h2 className="text-2xl font-bold text-gray-900">Schedules</h2>

              <div className="flex gap-3">
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

                {!viewArchive && (
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition">
                    <ClipboardDocumentCheckIcon className="h-6 w-6 text-white" />
                    <span className="font-medium">Start Inspection</span>
                  </button>
                )}

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
                    {viewArchive && (
                      <button
                        onClick={restoreSelected}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition"
                      >
                        <ArchiveBoxIcon className="h-5 w-5 text-white" />
                        <span>Restore</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Tabs */}
            {!viewArchive && (
                            <div className="flex gap-4 mb-6 border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setSelected([]); // clear selection when switching
                    }}
                    className={`pb-2 text-sm font-medium transition ${
                      activeTab === tab
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}

            {/* Filter Bar */}
            <div className="flex items-center gap-4 mb-10">
              <div className="relative w-full max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${
                    viewArchive ? "archive" : activeTab.toLowerCase()
                  }...`}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition text-sm font-medium">
                + Add Filter
              </button>
            </div>

            {/* Table */}
            <div className="bg-white overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700 border rounded-lg overflow-hidden">
                <thead className="bg-teal-50 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">
                      <input
                        type="checkbox"
                        checked={
                          selected.length === schedules.length &&
                          schedules.length > 0
                        }
                        onChange={toggleSelectAll}
                        className="h-4 w-4 text-teal-500 border-gray-300 rounded"
                      />
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">Schedule</th>
                    <th className="px-6 py-3 text-left font-semibold">Doc Number</th>
                    <th className="px-6 py-3 text-left font-semibold">Score</th>
                    <th className="px-6 py-3 text-left font-semibold">Conducted</th>
                    <th className="px-6 py-3 text-left font-semibold">Completed</th>
                    <th className="px-6 py-3 text-left font-semibold">Actions</th>
                    <th className="px-6 py-3 text-left font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`border-b hover:bg-gray-50 transition ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selected.includes(item.id)}
                          onChange={() => toggleSelect(item.id)}
                          className="h-4 w-4 text-teal-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.doc}</td>
                      <td className="px-6 py-4">{item.score}</td>
                      <td className="px-6 py-4">{item.conducted}</td>
                      <td className="px-6 py-4">{item.completed}</td>
                      <td className="px-6 py-4">
                        {!viewArchive ? (
                          item.type === "continue" ? (
                            <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition">
                              <ClipboardDocumentCheckIcon className="h-5 w-5 text-white" />
                              <span>{item.status}</span>
                            </button>
                          ) : (
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition">
                              <DocumentTextIcon className="h-5 w-5 text-white" />
                              <span>{item.status}</span>
                            </button>
                          )
                        ) : (
                          <button
                            onClick={() => handleRestore(item.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition"
                          >
                            <ArchiveBoxIcon className="h-5 w-5 text-white" />
                            <span>Restore</span>
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        {!viewArchive && (
                          <button
                            onClick={() =>
                              setOpenMenu(openMenu === idx ? null : idx)
                            }
                            className="p-2 rounded-full hover:bg-gray-200 transition"
                          >
                            <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
                          </button>
                        )}

                        {/* Dropdown menu */}
                        {openMenu === idx && !viewArchive && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                              Edit
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                              Delete
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                              Details
                            </button>
                            <button
                              onClick={() => handleArchive(item.id)}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              Archive
                            </button>
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
