import { useState } from "react";
import {
  DocumentIcon,
  ArrowUpTrayIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function DocumentPanel() {
  const [documents, setDocuments] = useState([
    {
      title: "Installation Manual",
      type: "PDF",
      fileUrl: "#",
      uploadedBy: "Admin",
      date: "Nov 25, 2025",
      thumbnail: "https://via.placeholder.com/400x200?text=Installation+Manual",
    },
    {
      title: "Compliance Certificate",
      type: "PDF",
      fileUrl: "#",
      uploadedBy: "QA Team",
      date: "Nov 28, 2025",
      thumbnail: "https://via.placeholder.com/400x200?text=Compliance+Certificate",
    },
  ]);

  const [newDoc, setNewDoc] = useState({
    title: "",
    type: "PDF",
    fileUrl: "",
    thumbnail: "",
  });

  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUpload = () => {
    if (newDoc.title && newDoc.fileUrl) {
      setDocuments([
        ...documents,
        {
          ...newDoc,
          uploadedBy: "You",
          date: new Date().toLocaleDateString(),
        },
      ]);
      setNewDoc({ title: "", type: "PDF", fileUrl: "", thumbnail: "" });
      setShowUploadModal(false);
    }
  };

  const handleDelete = (title) => {
    setDocuments(documents.filter((doc) => doc.title !== title));
  };

  return (
    <section className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Document Panel</h2>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 flex items-center gap-2"
        >
          <ArrowUpTrayIcon className="h-5 w-5" />
          Upload Document
        </button>
      </div>

      {/* Document Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Thumbnail */}
            <img
              src={doc.thumbnail}
              alt={doc.title}
              className="w-full h-40 object-cover"
            />
            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DocumentIcon className="h-5 w-5 text-gray-500" />
                <h3 className="font-semibold text-gray-800">{doc.title}</h3>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                Uploaded by {doc.uploadedBy} · {doc.date}
              </p>
              <div className="flex justify-between items-center">
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                >
                  View
                </a>
                <button
                  onClick={() => handleDelete(doc.title)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                >
                  <TrashIcon className="h-4 w-4" /> Delete
                </button>
              </div>
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
            <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Document</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Document Title"
                value={newDoc.title}
                onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newDoc.type}
                onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="PDF">PDF</option>
                <option value="Word">Word</option>
                <option value="Excel">Excel</option>
              </select>
              <input
                type="text"
                placeholder="File URL (e.g. link to PDF)"
                value={newDoc.fileUrl}
                onChange={(e) => setNewDoc({ ...newDoc, fileUrl: e.target.value })}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Thumbnail Image URL"
                value={newDoc.thumbnail}
                onChange={(e) => setNewDoc({ ...newDoc, thumbnail: e.target.value })}
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
