// src/component/AnalyticsPanel.jsx
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import Sidebar from "../component/Sidebar/Sidebar";
import Header from "../component/Header";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function AnalyticsPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Example incident totals for the year
  const incidentTotals = {
    housekeeping: 40,
    construction: 25,
    laboratory: 15,
    administration: 10,
  };

  // Monthly breakdown per category (example data)
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
      legend: {
        position: "top",
        labels: { color: "#374151" },
      },
    },
    scales: {
      x: { ticks: { color: "#374151" } },
      y: { ticks: { color: "#374151" } },
    },
  };

  // State for selected incident category
  const [selectedIncident, setSelectedIncident] = useState(null);

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

        <div className="flex-1 overflow-y-auto p-6">
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h3>
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col lg:flex-row gap-8">
              {/* Chart */}
              <div className="flex-1 h-[300px] sm:h-[400px]">
                <Line data={chartData} options={chartOptions} />
              </div>

              {/* Summary Panel */}
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

            {/* Incident Summary Modal */}
            {selectedIncident && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button
                    onClick={() => setSelectedIncident(null)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  >
                    ✖
                  </button>
                  <h3 className="text-xl font-bold mb-4 capitalize">
                    {selectedIncident} Incident Breakdown (Jan–Dec)
                  </h3>
                  <div className="h-[250px] sm:h-[300px]">
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
                  <p className="mt-4 text-sm text-gray-600">
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
                and Administration ({incidentTotals.administration}). Monthly breakdowns show where spikes occur, 
                helping managers identify seasonal workload surges and safety gaps. These insights highlight the need 
                for targeted interventions in high-incident areas to reduce risks and improve overall site safety.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
