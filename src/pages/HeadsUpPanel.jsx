import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import headsup from "../assets/headsup.png";
import { useState } from "react";
import Sidebar from "../component/Sidebar/Sidebar";
import Header from "../component/Header"; // adjust path if needed

export default function HeadsUpPanel() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [comments, setComments] = useState([
    { text: "Looks good, thanks for sharing!", author: "Jane Doe", timestamp: "Nov 30, 2025 · 10:45 PM" },
    { text: "Can we add more details about the checklist?", author: "Mark Smith", timestamp: "Nov 30, 2025 · 10:50 PM" },
    { text: "Acknowledged ✅", author: "Leonardo Cruz", timestamp: "Nov 30, 2025 · 10:55 PM" },
  ]);
  const [newComment, setNewComment] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [headsUpItems, setHeadsUpItems] = useState([
    {
      title: "iAuditor HSE Site Safety Inspection Checklist Template Tutorial (Desktop & Phone)",
      author: "Will Shultz",
      date: "6/15/23",
      status: "Unacknowledged", 
      image: headsup,
    },
    {
      title: "iAuditor HSSE Site Safety Inspection Checklist Template Tutorial (Desktop & Phone)",
      author: "Will Shultz",
      date: "6/15/23",
      status: "Acknowledged",
image: headsup,    },
  ]);

  // State for create modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newHeadsUp, setNewHeadsUp] = useState({
    title: "",
    author: "You",
    date: new Date().toLocaleDateString(),
    status: "Unacknowledged",
    image: "",
  });

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
      const newEntry = { text: newComment, author: "You", timestamp };
      setComments([...comments, newEntry]);
      setNewComment("");
    }
  };

  const handleCreateHeadsUp = () => {
    if (newHeadsUp.title.trim() !== "") {
      setHeadsUpItems([...headsUpItems, newHeadsUp]);
      setNewHeadsUp({
        title: "",
        author: "You",
        date: new Date().toLocaleDateString(),
        status: "Unacknowledged",
        image: "",
      });
      setShowCreateModal(false);
    }
  };

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} open={sidebarOpen} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          !sidebarOpen ? "ml-0" : sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-y-auto p-6">
          <section className="p-6 bg-white rounded-xl shadow-lg">
            {/* Header with Create button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Manage Heads Up</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
              >
                + Create Heads Up
              </button>
            </div>

            {/* Heads Up Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {headsUpItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedItem(item)}
                  className="cursor-pointer bg-white rounded-xl shadow border border-gray-200 hover:shadow-lg transition flex overflow-hidden"
                >
                  {item.image && (
                    <img src={item.image} alt={item.title} className="w-40 h-40 object-cover rounded-l-xl" />
                  )}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-md font-semibold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                      <div className="text-sm text-gray-600 mb-1">
                        Author: <span className="font-medium">{item.author}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Date: <span className="font-medium">{item.date}</span>
                      </div>
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

            {/* Create Heads Up Modal */}
            {showCreateModal && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  >
                    ✖
                  </button>

                  {/* Preview Card */}
                  <div className="flex bg-white rounded-xl shadow border border-gray-200 overflow-hidden mb-6">
                    {newHeadsUp.image && (
                      <img
                        src={newHeadsUp.image}
                        alt={newHeadsUp.title}
                        className="w-40 h-40 object-cover rounded-l-xl"
                      />
                    )}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-2 line-clamp-2">
                          {newHeadsUp.title || "Heads Up Title Preview"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Author: <span className="font-medium">{newHeadsUp.author}</span>
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          Date: <span className="font-medium">{newHeadsUp.date}</span>
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
                        {newHeadsUp.status}
                      </span>
                    </div>
                  </div>

                  {/* Form */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Create New Heads Up</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Heads Up Title"
                      value={newHeadsUp.title}
                      onChange={(e) => setNewHeadsUp({ ...newHeadsUp, title: e.target.value })}
                      className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Image URL (optional)"
                      value={newHeadsUp.image}
                      onChange={(e) => setNewHeadsUp({ ...newHeadsUp, image: e.target.value })}
                      className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleCreateHeadsUp}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
                    >
                      Submit Heads Up
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Popup Modal (IssuePanel-style) */}
            {selectedItem && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-2xl w-[900px] p-6 relative">
                  <button
                    onClick={() => setSelectedItem(null)}
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
                          {selectedItem.author}
                        </p>
                        <p className="text-xs text-gray-500">
                          {selectedItem.date}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <h4 className="text-lg font-bold text-gray-800">
                      {selectedItem.title}
                    </h4>
                    <p className="text-gray-600">
                      Description preview will appear here...
                    </p>
                    {selectedItem.image && (
                      <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={selectedItem.image}
                          alt={selectedItem.title}
                          className="object-cover w-full h-full rounded"
                        />
                      </div>
                    )}

                    {/* Footer actions */}
                    <div className="flex justify-between text-gray-500 text-sm pt-2 border-t">
                      <span>👍 Like</span>
                      <span>💬 Comment</span>
                      <span>↗ Share</span>
                      <button className="text-teal-600 font-medium hover:underline">
                        ✅ Acknowledge
                      </button>
                    </div>

                    {/* Likes counter */}
                    <div className="pt-2 text-sm text-gray-600">
                      👍 12 Likes • 💬 {comments.length} Comments
                    </div>

                    {/* Comments section */}
                    <div className="space-y-3 pt-3 border-t max-h-40 overflow-y-auto">
                      {comments.map((c, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                          <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700 w-full">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold text-gray-800">
                                {c.author}
                              </span>
                              <span className="text-xs text-gray-500">
                                {c.timestamp}
                              </span>
                            </div>
                            <p>{c.text}</p>
                          </div>
                        </div>
                      ))}
                      {/* Add new comment input */}
                      <div className="flex gap-3 items-center">
                        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Write a comment..."
                          className="flex-1 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
                        />
                        <button
                          onClick={handleAddComment}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                        >
                          Post
                        </button>
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
