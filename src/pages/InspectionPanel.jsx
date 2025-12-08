// src/layout/InspectionPanel.jsx
import { useState } from "react";
import Sidebar from "../component/Sidebar/Sidebar";
import Header from "../component/Header";
import {
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export default function InspectionPanel() {
  const [openMenu, setOpenMenu] = useState(null);
  const [selected, setSelected] = useState([]);
  const [viewArchive, setViewArchive] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Active inspections
  const [activeInspections, setActiveInspections] = useState([
    {
      id: 1,
      name: "000027 / John Lind / Misang",
      doc: "DOC-027",
      score: "0%",
      conducted: "5 Sep 2023",
      completed: "5 Sep 2023",
      status: "Continue",
      type: "continue",
      location: "Warehouse A",
    },
    {
      id: 2,
      name: "000026 / John Lind / Misang",
      doc: "DOC-026",
      score: "0%",
      conducted: "5 Sep 2023",
      completed: "5 Sep 2023",
      status: "Continue",
      type: "continue",
      location: "Warehouse A",
    },
  ]);

  // Archived inspections
  const [archivedInspections, setArchivedInspections] = useState([
    {
      id: 3,
      name: "000025 / Hiroyuki Yoshimi",
      doc: "DOC-025",
      score: "0%",
      conducted: "5 Sep 2023",
      completed: "5 Sep 2023",
      status: "View Report",
      type: "report",
      location: "Warehouse b",
    },
  ]);

  const inspections = viewArchive ? archivedInspections : activeInspections;

  // Template modal state
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateSearch, setTemplateSearch] = useState("");
  const [templates] = useState([
    { id: 1, name: "Warehouse Safety Checklist" },
    { id: 2, name: "Fire Drill Inspection" },
    { id: 3, name: "Equipment Maintenance Report" },
    { id: 4, name: "Food Hygiene Audit" },
  ]);

  const toggleSelectAll = () => {
    if (selected.length === inspections.length) {
      setSelected([]);
    } else {
      setSelected(inspections.map((i) => i.id));
    }
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    if (viewArchive) {
      setArchivedInspections(
        archivedInspections.filter((i) => !selected.includes(i.id))
      );
    } else {
      setActiveInspections(
        activeInspections.filter((i) => !selected.includes(i.id))
      );
    }
    setSelected([]);
  };

  const archiveSelected = () => {
    const toArchive = activeInspections.filter((i) => selected.includes(i.id));
    setArchivedInspections([...archivedInspections, ...toArchive]);
    setActiveInspections(
      activeInspections.filter((i) => !selected.includes(i.id))
    );
    setSelected([]);
  };

  const handleArchive = (id) => {
    const item = activeInspections.find((i) => i.id === id);
    if (item) {
      setArchivedInspections([...archivedInspections, item]);
      setActiveInspections(activeInspections.filter((i) => i.id !== id));
    }
  };

  const handleRestore = (id) => {
    const item = archivedInspections.find((i) => i.id === id);
    if (item) {
      setActiveInspections([...activeInspections, item]);
      setArchivedInspections(archivedInspections.filter((i) => i.id !== id));
    }
  };

  // Handle template selection
  const handleTemplateSelect = (template) => {
    // Example: add a new inspection using the selected template
    const newInspection = {
      id: Date.now(),
      name: `${template.name} / New Inspection`,
      doc: `DOC-${Date.now()}`,
      score: "0%",
      conducted: new Date().toLocaleDateString(),
      completed: "-",
      status: "Start",
      type: "continue",
      location: "Unassigned",
    };
    setActiveInspections([...activeInspections, newInspection]);
    setShowTemplateModal(false);
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
          <section className="rounded-xl shadow-lg p-8 bg-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Inspections</h2>

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
                  <button
                    onClick={() => setShowTemplateModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition"
                  >
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
                        onClick={() => {
                          selected.forEach((id) => handleRestore(id));
                          setSelected([]);
                        }}
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

            {/* Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inspections.map((item, idx) => (
                <div
      key={item.id}
      onClick={() => {
        console.log("Clicked card:", item);
        // setShowDetails(item); // if you want to open a modal
      }}
      className="cursor-pointer bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col gap-4 hover:shadow-lg hover:border-teal-400 transition"
    >
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.doc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="h-4 w-4 text-teal-500 border-gray-300 rounded"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Score:</span> {item.score}
                    </p>
                                        <p>
                      <span className="font-medium">Conducted:</span>{" "}
                      {item.conducted}
                    </p>
                    <p>
                      <span className="font-medium">Completed:</span>{" "}
                      {item.completed}
                    </p>
                    <p>
                      <span className="font-medium">Location:</span>{" "}
                      {item.location}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-2">
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

                    {!viewArchive && (
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenu(openMenu === idx ? null : idx)
                          }
                          className="p-2 rounded-full hover:bg-gray-200 transition"
                        >
                          <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
                        </button>
                        {openMenu === idx && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setActiveInspections(
                                  activeInspections.filter(
                                    (i) => i.id !== item.id
                                  )
                                );
                              }}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
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
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Select All Checkbox */}
            {inspections.length > 0 && (
              <div className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  checked={
                    selected.length === inspections.length &&
                    inspections.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-teal-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">Select All</span>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Template Modal */}
      {showTemplateModal && (
  <div
    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={() => {
      setShowTemplateModal(false);
      setTemplateSearch("");
    }}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl w-[900px] p-6"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Select Template</h2>

      {/* Search Input */}
      <input
        type="text"
        value={templateSearch}
        onChange={(e) => setTemplateSearch(e.target.value)}
        className="w-full border rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-teal-500 focus:outline-none"
        placeholder="Search templates..."
      />

      {/* Results Table */}
      <div className="max-h-[300px] overflow-y-auto border border-gray-200 rounded-md">
        <table className="w-full">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="text-left px-4 py-2 text-lg font-semibold text-gray-700">
                Template
              </th>
            </tr>
          </thead>
          <tbody>
            {templates.filter((t) =>
              t.name.toLowerCase().includes(templateSearch.toLowerCase())
            ).length > 0 ? (
              templates
                .filter((t) =>
                  t.name.toLowerCase().includes(templateSearch.toLowerCase())
                )
                .map((t) => (
                  <tr
                    key={t.id}
                    className="cursor-pointer hover:bg-teal-50 transition"
                    onClick={() => {
                      handleTemplateSelect(t);
                      setTemplateSearch("");
                    }}
                  >
                    <td className="px-4 py-3 text-gray-800 font-medium">
                      {t.name}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td className="px-4 py-3 text-gray-500 text-lg">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => {
            setShowTemplateModal(false);
            setTemplateSearch("");
          }}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

                    
