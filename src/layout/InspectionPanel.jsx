import {
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function InspectionPanel() {
  const [openMenu, setOpenMenu] = useState(null);
  const [selected, setSelected] = useState([]);
  const [viewArchive, setViewArchive] = useState(false);

  // Active inspections (stateful so we can restore into it)
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
    },
  ]);

  // Archived inspections (stateful so we can restore out of it)
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
    },
  ]);

  // Pick which list to show
  const inspections = viewArchive ? archivedInspections : activeInspections;

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
      setArchivedInspections(archivedInspections.filter((i) => !selected.includes(i.id)));
    } else {
      setActiveInspections(activeInspections.filter((i) => !selected.includes(i.id)));
    }
    setSelected([]);
  };

  const archiveSelected = () => {
    const toArchive = activeInspections.filter((i) => selected.includes(i.id));
    setArchivedInspections([...archivedInspections, ...toArchive]);
    setActiveInspections(activeInspections.filter((i) => !selected.includes(i.id)));
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

  return (
    <section className="rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => alert("Navigating to Inspections")}
          className="text-2xl font-bold text-gray-900 hover:text-teal-600 transition"
        >
          Inspections
        </button>

        <div className="flex gap-3">
          {/* Toggle Archive / Active */}
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

          {/* Start Inspection (only in active view) */}
          {!viewArchive && (
            <button className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition">
              <ClipboardDocumentCheckIcon className="h-6 w-6 text-white" />
              <span className="font-medium">Start Inspection</span>
            </button>
          )}

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

      {/* Filter Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-full max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${viewArchive ? "archived" : "active"} inspections...`}
            className="w-full pl-10 pr-4 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
          />
        </div>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition text-sm font-medium">
          Add Filter
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
                  checked={selected.length === inspections.length && inspections.length > 0}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-teal-500 border-gray-300 rounded"
                />
              </th>
              <th className="px-6 py-3 text-left font-semibold">Inspection</th>
              <th className="px-6 py-3 text-left font-semibold">Doc Number</th>
              <th className="px-6 py-3 text-left font-semibold">Score</th>
              <th className="px-6 py-3 text-left font-semibold">Conducted</th>
              <th className="px-6 py-3 text-left font-semibold">Completed</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
              <th className="px-6 py-3 text-left font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((item, idx) => (
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
                      onClick={() => setOpenMenu(openMenu === idx ? null : idx)}
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
  );
}
