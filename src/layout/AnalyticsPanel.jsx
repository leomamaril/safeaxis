// src/component/AnalyticsPanel.jsx
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function AnalyticsPanel() {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [12, 19, 25, 32, 40, 56, 62],
        borderColor: "#14b8a6",
        backgroundColor: "rgba(20, 184, 166, 0.2)",
        tension: 0.4,
      },
      {
        label: "Pending Tasks",
        data: [20, 18, 15, 22, 30, 69, 50],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
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

  return (
    <section>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h3>
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col lg:flex-row gap-8">
        {/* Chart */}
        <div className="flex-1 h-[300px] sm:h-[400px]">
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Summary Panel */}
        <div className="w-full lg:w-1/4 bg-gradient-to-br from-teal-50 to-white border border-teal-100 rounded-xl p-6 flex flex-col">
          <h4 className="text-lg font-semibold text-teal-700 mb-5">
            Summary Overview
          </h4>
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

      {/* Extra Details */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Analytics Insights</h4>
        <p className="text-sm text-gray-700 leading-relaxed">
          The analytics dashboard provides a clear view of task performance across months. 
          June recorded the highest activity, with a significant increase in completed tasks. 
          Pending tasks spiked during the same period, suggesting workload challenges that 
          need to be addressed. The overall trend remains positive, showing consistent growth 
          in task completion and an upward trajectory 📈. These insights can help managers 
          allocate resources more effectively and identify bottlenecks in workflows.
        </p>
      </div>
    </section>
  );
}
