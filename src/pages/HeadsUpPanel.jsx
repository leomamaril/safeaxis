import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Sidebar from "../component/Sidebar/Sidebar";
import Header from "../component/Header"; // adjust path if needed

export default function HeadsUpPanel() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [comments, setComments] = useState([
    {
      text: "Looks good, thanks for sharing!",
      author: "Jane Doe",
      timestamp: "Nov 30, 2025 · 10:45 PM",
    },
    {
      text: "Can we add more details about the checklist?",
      author: "Mark Smith",
      timestamp: "Nov 30, 2025 · 10:50 PM",
    },
    {
      text: "Acknowledged ✅",
      author: "Leonardo Cruz",
      timestamp: "Nov 30, 2025 · 10:55 PM",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const headsUpItems = [
    {
      title:
        "iAuditor HSE Site Safety Inspection Checklist Template Tutorial (Desktop & Phone)",
      author: "Will Shultz",
      date: "6/15/23",
      status: "Unacknowledged",
      image: "https://via.placeholder.com/600x300?text=HSE+Inspection+Tutorial",
    },
    {
      title:
        "iAuditor HSSE Site Safety Inspection Checklist Template Tutorial (Desktop & Phone)",
      author: "Will Shultz",
      date: "6/15/23",
      status: "Acknowledged",
      image:
        "https://via.placeholder.com/600x300?text=HSSE+Inspection+Tutorial",
    },
  ];

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const now = new Date();
      const timestamp = now.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
      const newEntry = {
        text: newComment,
        author: "You",
        timestamp,
      };
      setComments([...comments, newEntry]);
      setNewComment("");
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
              <h2 className="text-2xl font-bold text-gray-900">Manage Heads Up</h2>
            </div>

            {/* Filter + Tabs */}
            <div className="flex justify-between items-center mb-4">
              <button className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300">
                Add Filter
              </button>
              <span className="text-sm font-medium text-gray-600">Completed</span>
            </div>

            {/* Heads Up Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {headsUpItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedItem(item)}
                  className="cursor-pointer bg-white rounded-xl shadow border border-gray-200 hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-md font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <div className="text-sm text-gray-600 mb-1">
                      Author: <span className="font-medium">{item.author}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      Date: <span className="font-medium">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.status === "Acknowledged" ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                      )}
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          item.status === "Acknowledged"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal with Right-side Comment Section */}
            {selectedItem && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl min-h-[500px] p-8 relative flex flex-col lg:flex-row gap-8">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  >
                    ✖
                  </button>

                  {/* Left Panel: Item Details */}
                  <div className="flex-1">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="w-full h-56 object-cover rounded mb-6"
                    />
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {selectedItem.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      Author: <span className="font-medium">{selectedItem.author}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      Date: <span className="font-medium">{selectedItem.date}</span>
                    </p>
                    <p className="text-sm font-semibold">
                      Status:{" "}
                      <span
                        className={`px-2 py-1 rounded ${
                          selectedItem.status === "Acknowledged"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {selectedItem.status}
                      </span>
                    </p>
                  </div>

                  {/* Right Panel: Comments */}
                  <div className="w-full lg:w-1/2 border-l pl-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Comments</h4>
                    <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
                      {comments.map((c, i) => (
                        <div
                          key={i}
                          className="bg-gray-100 px-4 py-3 rounded-md text-sm text-gray-700"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-gray-800">{c.author}</span>
                            <span className="text-xs text-gray-500">{c.timestamp}</span>
                          </div>
                          <p>{c.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleAddComment}
                        className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                      >
                        Post
                      </button>
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
