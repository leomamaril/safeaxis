import { useState } from "react";
import {
  DocumentIcon,
  VideoCameraIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

export default function TrainingGrounds() {
  const [trainings, setTrainings] = useState([
    {
      title: "Workplace Safety Guidelines",
      type: "PDF",
      fileUrl: "#",
      description: "Learn the essential safety protocols for the workplace.",
      uploadedBy: "HR Department",
      date: "Nov 25, 2025",
      image: "https://via.placeholder.com/400x200?text=Safety+Training",
    },
    {
      title: "Fire Drill Training Video",
      type: "Video",
      fileUrl: "#",
      description: "Step-by-step fire drill procedures for employees.",
      uploadedBy: "Safety Officer",
      date: "Nov 28, 2025",
      image: "https://via.placeholder.com/400x200?text=Fire+Drill",
    },
  ]);

  const [newTraining, setNewTraining] = useState({
    title: "",
    type: "PDF",
    fileUrl: "",
    description: "",
    image: "",
  });

  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUpload = () => {
    if (newTraining.title && newTraining.fileUrl) {
      setTrainings([
        ...trainings,
        {
          ...newTraining,
          uploadedBy: "Admin",
          date: new Date().toLocaleDateString(),
        },
      ]);
      setNewTraining({ title: "", type: "PDF", fileUrl: "", description: "", image: "" });
      setShowUploadModal(false);
    }
  };

  return (
    <section className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Training Grounds</h2>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
        >
          + Upload Training
        </button>
      </div>

      {/* Training Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainings.map((training, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Thumbnail */}
            <img
              src={training.image}
              alt={training.title}
              className="w-full h-40 object-cover"
            />
            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {training.type === "PDF" ? (
                  <DocumentIcon className="h-5 w-5 text-red-500" />
                ) : training.type === "Video" ? (
                  <VideoCameraIcon className="h-5 w-5 text-blue-500" />
                ) : (
                  <ArrowUpTrayIcon className="h-5 w-5 text-gray-500" />
                )}
                <h3 className="font-semibold text-gray-800">{training.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{training.description}</p>
              <p className="text-xs text-gray-500 mb-3">
                Uploaded by {training.uploadedBy} · {training.date}
              </p>
              <a
                href={training.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
              >
                View Training
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Training</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Training Title"
                value={newTraining.title}
                onChange={(e) => setNewTraining({ ...newTraining, title: e.target.value })}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newTraining.type}
                onChange={(e) => setNewTraining({ ...newTraining, type: e.target.value })}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="PDF">PDF</option>
                <option value="Video">Video</option>
                <option value="Document">Document</option>
              </select>
              <input
                type="text"
                placeholder="File URL (e.g. link to PDF/video)"
                value={newTraining.fileUrl}
                onChange={(e) => setNewTraining({ ...newTraining, fileUrl: e.target.value })}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Thumbnail Image URL"
                value={newTraining.image}
                onChange={(e) => setNewTraining({ ...newTraining, image: e.target.value })}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Description"
                value={newTraining.description}
                onChange={(e) => setNewTraining({ ...newTraining, description: e.target.value })}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
