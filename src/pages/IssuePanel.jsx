import { useState } from "react";
import Sidebar from "../component/Sidebar/Sidebar";
import Header from "../component/Header"; // adjust path if needed
import issue from "../assets/issue.png";
import {
  ExclamationTriangleIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

export default function IssuePanel() {
  const [issues, setIssues] = useState([
    {
      title: "Solar Inverter Malfunction",
      description: "The inverter at Site A is not converting properly.",
      category: "Equipment",
      status: "Open",
      uploadedBy: "Employee 1",
      date: "Nov 25, 2025",
      attachment: issue,
    },
    {
      title: "Loose Wiring",
      description: "Detected loose wiring in Panel B during inspection.",
      category: "Safety",
      status: "In Progress",
      uploadedBy: "Employee 2",
      date: "Nov 28, 2025",
      attachment: issue,
    },
  ]);

  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
    category: "General",
    attachment: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleCreateIssue = () => {
    if (newIssue.title && newIssue.description) {
      const created = {
        ...newIssue,
        status: "Open",
        uploadedBy: "You",
        date: new Date().toLocaleDateString(),
      };
      setIssues([...issues, created]);
      setNewIssue({
        title: "",
        description: "",
        category: "General",
        attachment: "",
      });
      setShowModal(false);
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
          <section className="p-6 bg-white rounded-xl shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Issue Panel</h2>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 flex items-center gap-2"
              >
                <ArrowUpTrayIcon className="h-5 w-5" />
                Create Issue
              </button>
            </div>

            {/* Issue Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issues.map((issue, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedIssue(issue)}
                  className="cursor-pointer bg-white rounded-xl shadow border border-gray-200 hover:shadow-lg transition flex overflow-hidden"
                >
                  {issue.attachment && (
                    <img
                      src={issue.attachment}
                      alt={issue.title}
                      className="w-40 h-40 object-cover rounded-l-xl"
                    />
                  )}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                        <h3 className="font-semibold text-gray-800 line-clamp-2">
                          {issue.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {issue.description}
                      </p>
                      <p className="text-xs text-gray-500 mb-2">
                        Category: {issue.category} · Uploaded by{" "}
                        {issue.uploadedBy} · {issue.date}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        issue.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : issue.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Create Issue Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  >
                    ✖
                  </button>

                  {/* Preview Card */}
                  <div className="flex bg-white rounded-xl shadow border border-gray-200 overflow-hidden mb-6">
                    {newIssue.attachment && (
                      <img
                        src={newIssue.attachment}
                        alt={newIssue.title}
                        className="w-40 h-40 object-cover rounded-l-xl"
                      />
                    )}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-2 line-clamp-2">
                          {newIssue.title || "Issue Title Preview"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {newIssue.description ||
                            "Description preview will appear here..."}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                          Category: {newIssue.category}
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
                        Open
                      </span>
                    </div>
                  </div>

                  {/* Form */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Report New Issue
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Issue Title"
                      value={newIssue.title}
                      onChange={(e) =>
                        setNewIssue({ ...newIssue, title: e.target.value })
                      }
                      className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500"
                    />
                    <textarea
                      placeholder="Issue Description"
                      value={newIssue.description}
                      onChange={(e) =>
                        setNewIssue({
                          ...newIssue,
                          description: e.target.value,
                        })
                      }
                      className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500"
                    />
                    <select
                      value={newIssue.category}
                      onChange={(e) =>
                        setNewIssue({ ...newIssue, category: e.target.value })
                      }
                      className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500"
                    >
                      <option value="General">General</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Safety">Safety</option>
                      <option value="Compliance">Compliance</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Attachment URL (optional)"
                      value={newIssue.attachment}
                      onChange={(e) =>
                        setNewIssue({ ...newIssue, attachment: e.target.value })
                      }
                      className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      onClick={handleCreateIssue}
                      className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
                    >
                      Submit Issue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Issue Popup (Heads Up style) */}
            {selectedIssue && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-2xl w-[900px] p-6 relative">
                                    <button
                    onClick={() => setSelectedIssue(null)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  >
                    ✖
                  </button>

                  {/* Preview Card */}
                  <div className="bg-white rounded-lg shadow p-4 space-y-3">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {selectedIssue.uploadedBy}
                        </p>
                        <p className="text-xs text-gray-500">
                          {selectedIssue.date}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <h4 className="text-lg font-bold text-gray-800">
                      {selectedIssue.title}
                    </h4>
                    <p className="text-gray-600">{selectedIssue.description}</p>
                    {selectedIssue.attachment && (
                      <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={selectedIssue.attachment}
                          alt={selectedIssue.title}
                          className="object-cover w-full h-full rounded"
                        />
                      </div>
                    )}

                    {/* Footer actions */}
                    <div className="flex justify-between text-gray-500 text-sm pt-2 border-t">
                      <span>⚠️ {selectedIssue.category}</span>
                      <span>💬 Comment</span>
                      <span>↗ Share</span>
                      <span
                        className={`px-2 py-1 rounded font-semibold ${
                          selectedIssue.status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : selectedIssue.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {selectedIssue.status}
                      </span>
                    </div>

                    {/* Engagement counters */}
                    <div className="pt-2 text-sm text-gray-600">
                      👍 8 Likes • 💬 2 Comments
                    </div>

                    {/* Example comments */}
                    <div className="space-y-3 pt-3 border-t">
                      <div className="flex gap-3">
                        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                        <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700">
                          Please resolve this ASAP.
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                        <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700">
                          Acknowledged, working on it.
                        </div>
                      </div>
                      {/* Add new comment input */}
                      <div className="flex gap-3 items-center">
                        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          className="flex-1 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
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