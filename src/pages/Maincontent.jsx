// src/layout/MainContent.jsx
import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import AgendaItem from "../component/AgendaItem";
import Card from "../component/Cards";
import Sidebar from "../component/Sidebar/Sidebar";
import Header from "../component/Header";
import {
  ClipboardDocumentListIcon,
  CalendarIcon,
  EyeIcon,
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
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MainContent() {
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const navigate = useNavigate();

  // Incident totals
  const incidentTotals = {
    housekeeping: 40,
    construction: 25,
    laboratory: 15,
    administration: 10,
  };

  const monthlyBreakdown = {
    housekeeping: [3, 4, 2, 5, 6, 4, 3, 2, 3, 4, 2, 2],
    construction: [2, 3, 1, 2, 3, 4, 2, 1, 2, 2, 1, 2],
    laboratory: [1, 1, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1],
    administration: [1, 0, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1],
  };

  const totalIncidents =
    incidentTotals.housekeeping +
    incidentTotals.construction +
    incidentTotals.laboratory +
    incidentTotals.administration;

  // Chart data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Incidents Reported",
        data: [5, 8, 6, 10, 12, 15, 20],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#374151" } },
      title: { display: true, text: "Incidents Trend", color: "#111827" },
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
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        open={sidebarOpen}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          !sidebarOpen ? "ml-0" : sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Overview Section */}
          <section>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card title="Inspection" icon={ClipboardDocumentListIcon} onClick={() => navigate("/inspection")}><p>Go to Inspection Panel</p></Card>
              <Card title="Schedule" icon={CalendarIcon} onClick={() => navigate("/schedules")}><p>Go to Schedule Panel</p></Card>
              <Card title="Heads Up" icon={EyeIcon} onClick={() => navigate("/heads-up")}><p>Go to Heads Up Panel</p></Card>
              <Card title="Actions" icon={BoltIcon} onClick={() => navigate("/actions")}><p>Go to Actions Panel</p></Card>
              <Card title="Issues" icon={ExclamationTriangleIcon} onClick={() => navigate("/issues")}><p>Go to Issues Panel</p></Card>
              <Card title="Training" icon={AcademicCapIcon} onClick={() => navigate("/training")}><p>Go to Training Panel</p></Card>
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
              {/* Line Chart for overall incident trend */}
              <div className="flex-1 h-[300px] sm:h-[400px]">
                <Line data={chartData} options={chartOptions} />
              </div>

              {/* Incident Overview Panel */}
              <div className="w-full lg:w-1/4 bg-gradient-to-br from-yellow-50 to-white border border-yellow-100 rounded-xl p-6 flex flex-col">
                <h4 className="text-lg font-semibold text-yellow-700 mb-5">
                  Incident Overview
                </h4>
                <ul className="space-y-4 text-sm">
                  {Object.keys(incidentTotals).map((key) => (
                    <li
                      key={key}
                      className="flex items-center justify-between cursor-pointer hover:bg-yellow-50 p-2 rounded"
                      onClick={() => setSelectedIncident(key)}
                    >
                      <span className="flex items-center gap-2 text-gray-700 capitalize">
                        {key}
                      </span>
                      <span className="font-semibold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
                        {incidentTotals[key]}
                      </span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between border-t pt-3">
                    <span className="flex items-center gap-2 text-gray-700 font-medium">
                      Total Incidents
                    </span>
                    <span className="font-semibold text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
                      {totalIncidents}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Incident Breakdown Modal */}
            {selectedIncident && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
                  <button
                    onClick={() => setSelectedIncident(null)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-sm"
                  >
                    ✖
                  </button>
                  <h3 className="text-lg font-bold mb-3 capitalize">
                    {selectedIncident} Incident Breakdown (Jan–Dec)
                  </h3>
                  <div className="h-[200px]">
                    <Bar
                      data={{
                        labels: [
                          "Jan","Feb","Mar","Apr","May","Jun",
                          "Jul","Aug","Sep","Oct","Nov","Dec",
                        ],
                        datasets: [
                          {
                            label: `${selectedIncident} Incidents`,
                            data: monthlyBreakdown[selectedIncident],
                            backgroundColor: "#f59e0b",
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: { legend: { display: false } },
                        scales: {
                          x: { ticks: { color: "#374151", font: { size: 10 } } },
                          y: { ticks: { color: "#374151", font: { size: 10 } } },
                        },
                      }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-gray-600">
                    Total reported:{" "}
                    <span className="font-semibold text-gray-800">
                      {incidentTotals[selectedIncident]}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Analytics Insights */}
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Analytics Insights
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                The site recorded a total of <strong>{totalIncidents}</strong> incidents this year. 
                Housekeeping accounted for the largest share with {incidentTotals.housekeeping} reports, 
                followed by Construction ({incidentTotals.construction}), Laboratory ({incidentTotals.laboratory}), 
                and Administration ({incidentTotals.administration}). Monthly breakdowns highlight spikes in 
                mid-year, helping managers identify workload surges and safety gaps. These insights guide 
                targeted interventions in high-incident areas to reduce risks and improve overall site safety.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
