import { useState } from "react";
import Sidebar from "../component/Sidebar/Sidebar";
import AgendaItem from "../component/AgendaItem";
import InspectionPanel from "../layout/InspectionPanel";
import Card from "../component/Cards"; // adjust path if needed
import AnalyticsPanel from "../layout/AnalyticsPanel"; // adjust path if needed
import ActionsPanel from "../layout/ActionsPanel"; // adjust path if needed
import HeadsUpPanel from "../layout/HeadsUpPanel";
import CreateAccountPanel from "../layout/AccountManagement"; // adjust path if needed

import { Line } from "react-chartjs-2";
import SchedulePanel from "../layout/SchedulePanel"; // adjust path if needed

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
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

import {
  BellIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  ExclamationCircleIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import AccountManagement from "../layout/AccountManagement";
import TrainingPanel from "./TrainingPanel";
import { Document } from "postcss";
import DocumentPanel from "./DocumentPanel";
import IssuePanel from "./IssuePanel";

function Header({ toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">SafeAxis</h1>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpenSearch(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-white" />
        </button>

        {/* Popup Panel (Modal) */}
        {openSearch && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[600px] p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Search</h2>

              {/* Search Form */}
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Enter keyword
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="Type to search..."
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOpenSearch(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Sidebar toggle */}
        <button
          onClick={toggleSidebar}
          className="md:hidden px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ☰
        </button>

        {/* Action button → opens modal */}
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600"
        >
          <PlusIcon className="h-5 w-5 text-white" />
        </button>

        {/* Popup Panel (Modal) */}
        {openModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Create New Item
              </h2>

              {/* Example form */}
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="Enter title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="Enter description..."
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* 🔔 Notification button with dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 relative"
          >
            <BellIcon className="h-5 w-5 text-gray-700" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-80 bg-white border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
              {/* Notification Item */}
              <button
                onClick={() => alert("View all notifications")}
                className="flex items-start gap-3 w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
              >
                <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">System Alert</p>
                  <p className="text-gray-500 text-xs">
                    Nov 26, 2025 • 09:30 AM
                  </p>
                </div>
              </button>

              <button
                onClick={() => alert("Mark as read")}
                className="flex items-start gap-3 w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
              >
                <CheckCircleIcon className="h-6 w-6 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">Task Completed</p>
                  <p className="text-gray-500 text-xs">
                    Nov 25, 2025 • 04:15 PM
                  </p>
                </div>
              </button>

              <button
                onClick={() => alert("Settings")}
                className="flex items-start gap-3 w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
              >
                <Cog6ToothIcon className="h-6 w-6 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">
                    Notification Settings
                  </p>
                  <p className="text-gray-500 text-xs">Updated recently</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      " Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Completed Tasks",
        data: [5, 8, 6, 10, 12, 15],
        borderColor: "rgba(20, 184, 166, 1)", // teal-500
        backgroundColor: "rgba(20, 184, 166, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Pending Tasks",
        data: [10, 12, 9, 14, 11, 13],
        borderColor: "rgba(239, 68, 68, 1)", // red-500
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#374151" }, // gray-700
      },
      title: {
        display: true,
        text: "Task Progress Over Time",
        color: "#111827", // gray-900
      },
    },
    scales: {
      x: {
        ticks: { color: "#6B7280" }, // gray-500
      },
      y: {
        ticks: { color: "#6B7280" },
      },
    },
  };

  const agendaItems = [
    {
      type: "ACTION",
      description: "Obstructions/tripping hazards",
      date: "07.03.2024",
      priority: "Medium",
      id: "AC-1742",
      status: "To do",
    },
    {
      type: "ACTION",
      description: "No fire extinguisher's available",
      date: "07.03.2024",
      priority: "Medium",
      id: "AC-1743",
      status: "To do",
    },
    {
      type: "ISSUE",
      description: "Broken emergency light",
      date: "07.03.2024",
      priority: "High",
      id: "IS-1745",
      status: "To do",
    },
    {
      type: "TRAINING",
      description: "CPR refresher course",
      date: "07.03.2024",
      priority: "Low",
      id: "TR-1746",
      status: "Scheduled",
    },
  ];

  const filteredItems =
    filter === "All"
      ? agendaItems
      : agendaItems.filter((item) => item.type === filter.toUpperCase());

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Overview Section */}
      <section>
        <div>
          {" "}
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Overview
          </h3>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {" "}
            <Card title="Card 1" icon={CubeIcon}>
              {" "}
              <p>This is the content for Card 1.</p>{" "}
            </Card>{" "}
            <Card title="Card 2" icon={ClipboardDocumentListIcon}>
              {" "}
              <p>This is the content for Card 2.</p>{" "}
            </Card>{" "}
            <Card title="Card 3" icon={ChartBarIcon}>
              {" "}
              <p>This is the content for Card 3.</p>{" "}
            </Card>{" "}
          </div>{" "}
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">In progress</h3>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {["All", "Action", "Issue", "Training"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === tab
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Agenda Items */}
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
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {selectedItem.type} Details
              </h2>
              <p className="text-gray-700 mb-2">
                <strong>Description:</strong> {selectedItem.description}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Date:</strong> {selectedItem.date}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Priority:</strong> {selectedItem.priority}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Status:</strong> {selectedItem.status}
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Close
                </button>
                <button
                  onClick={() =>
                    alert(`Performing action on ${selectedItem.id}`)
                  }
                  className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                >
                  Take Action
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

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
      </section>
    </div>
  );
}

export default function DashboardLayout() {
  const [active, setActive] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      <Sidebar
        active={active}
        setActive={setActive}
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
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Scrollable main content */}
        <div className="flex-1 overflow-y-auto">
          {active === "Home" && <MainContent />}
          {active === "Inspection" && <InspectionPanel />}
          {active === "Schedules" && <SchedulePanel />}
          {active === "Actions" && <ActionsPanel />}
          {active === "Create Account" && <AccountManagement />}
          {active === "Analytics" && <AnalyticsPanel />}
          {active === "Heads Up" && <HeadsUpPanel />}
           {active === "Training" && <TrainingPanel />}
            {active === "Documents" && <DocumentPanel />}
             {active === "Issues" && <IssuePanel />}
          {/* ✅ new panel */}
        </div>
      </div>
    </div>
  );
}
