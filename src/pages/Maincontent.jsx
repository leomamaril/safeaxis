// src/layout/MainContent.jsx
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import AgendaItem from "../component/AgendaItem";
import Card from "../component/Cards";
import Sidebar from "../component/Sidebar/Sidebar";
import Header from "../component/Header"; // adjust path if needed
import {
  ClipboardDocumentListIcon,
  CalendarIcon,
  EyeIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MainContent() {
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // Chart data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Completed Tasks",
        data: [5, 8, 6, 10, 12, 15],
        borderColor: "rgba(20, 184, 166, 1)",
        backgroundColor: "rgba(20, 184, 166, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Pending Tasks",
        data: [10, 12, 9, 14, 11, 13],
        borderColor: "rgba(239, 68, 68, 1)",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#374151" } },
      title: { display: true, text: "Task Progress Over Time", color: "#111827" },
    },
    scales: {
      x: { ticks: { color: "#6B7280" } },
      y: { ticks: { color: "#6B7280" } },
    },
  };

  // Agenda items
  const agendaItems = [
    { type: "ACTION", description: "Obstructions/tripping hazards", date: "07.03.2024", priority: "Medium", id: "AC-1742", status: "To do" },
    { type: "ACTION", description: "No fire extinguisher's available", date: "07.03.2024", priority: "Medium", id: "AC-1743", status: "To do" },
    { type: "ISSUE", description: "Broken emergency light", date: "07.03.2024", priority: "High", id: "IS-1745", status: "To do" },
    { type: "TRAINING", description: "CPR refresher course", date: "07.03.2024", priority: "Low", id: "TR-1746", status: "Scheduled" },
  ];

  const filteredItems =
    filter === "All" ? agendaItems : agendaItems.filter((item) => item.type === filter.toUpperCase());

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
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Overview Section */}
          <section>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card title="Inspection" icon={ClipboardDocumentListIcon} onClick={() => navigate("/inspection")}>
                <p>Go to Inspection Panel</p>
              </Card>
              <Card title="Schedule" icon={CalendarIcon} onClick={() => navigate("/schedules")}>
                <p>Go to Schedule Panel</p>
              </Card>
              <Card title="Heads Up" icon={EyeIcon} onClick={() => navigate("/heads-up")}>
                <p>Go to Heads Up Panel</p>
              </Card>
              <Card title="Actions" icon={BoltIcon} onClick={() => navigate("/actions")}>
                <p>Go to Actions Panel</p>
              </Card>
              <Card title="Issues" icon={ExclamationTriangleIcon} onClick={() => navigate("/issues")}>
                <p>Go to Issues Panel</p>
              </Card>
               <Card title="Training" icon={AcademicCapIcon} onClick={() => navigate("/training")}>
                <p>Go to Analytics Panel</p>
              </Card>
            </div>
          </section>

          {/* In Progress Section */}
          <section>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">In progress</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {["All", "Action", "Issue", "Training"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    filter === tab ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto pb-4">
              <div className="flex gap-6 w-max">
                {filteredItems.map((item) => (
                  <div key={item.id} className="min-w-[250px]">
                    <AgendaItem {...item} onClick={() => setSelectedItem(item)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Modal for details */}
            {selectedItem && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-[500px] p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">{selectedItem.type} Details</h2>
                  <p className="text-gray-700 mb-2"><strong>Description:</strong> {selectedItem.description}</p>
                  <p className="text-gray-700 mb-2"><strong>Date:</strong> {selectedItem.date}</p>
                  <p className="text-gray-700 mb-2"><strong>Priority:</strong> {selectedItem.priority}</p>
                  <p className="text-gray-700 mb-2"><strong>Status:</strong> {selectedItem.status}</p>
                  <div className="flex justify-end gap-3 mt-6">
                    <button onClick={() => setSelectedItem(null)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Close</button>
                    <button onClick={() => alert(`Performing action on ${selectedItem.id}`)} className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">Take Action</button>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Analytics Section */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h3>
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col lg:flex-row gap-8">
              <div className="flex-1 h-[300px] sm:h-[400px]">
                <Line data={chartData} options={chartOptions} />
              </div>
              <div className="w-full lg:w-1/4 bg-gradient-to-br from-teal-50 to-white border border-teal-100 rounded-xl p-6 flex flex-col">
                <h4 className="text-lg font-semibold text-teal-700 mb-5">Summary Overview</h4>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-gray-700">
                      <CheckCircleIcon className="h-5 w-5 text-teal-500" />
                      Completed Tasks
                    </span>
                    <span className="font-semibold text-teal-700 bg-teal-100 px-3 py-1 rounded-full">
                      56
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-700">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                      Pending Tasks
                    </span>
                    <span className="font-semibold text-red-700 bg-red-100 px-3 py-1 rounded-full">
                      69
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-700">
                      <ChartBarIcon className="h-5 w-5 text-gray-500" />
                      Highest Month
                    </span>
                    <span className="font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">
                      June
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-700">
                      <ArrowTrendingUpIcon className="h-5 w-5 text-teal-600" />
                      Trend
                    </span>
                    <span className="font-semibold text-teal-700 bg-teal-100 px-3 py-1 rounded-full">
                      Upward 📈
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
