// src/component/Header.jsx
import { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  BellIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  BoltIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  UserGroupIcon,
  EyeIcon,
  ChartBarIcon,
  TagIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import sumecicon from "../assets/sumec-icon.png";
export default function Header({ toggleSidebar }) {
  const [open, setOpen] = useState(false); // Notifications
  const [openSearch, setOpenSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCreate, setOpenCreate] = useState(false); // Create dropdown
  const [openActionModal, setOpenActionModal] = useState(false);
  const [openHeadsUp, setOpenHeadsUp] = useState(false);
  const [openIssue, setOpenIssue] = useState(false);
  const [openTraining, setOpenTraining] = useState(false);

  const navigate = useNavigate();

  // Refs for click-outside
  const createRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (createRef.current && !createRef.current.contains(event.target)) {
        setOpenCreate(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Navigation items
  const navItems = [
    { name: "Home", icon: HomeIcon, path: "/dashboard" },
    {
      name: "Inspection",
      icon: ClipboardDocumentListIcon,
      path: "/inspection",
    },
    { name: "Schedules", icon: CalendarIcon, path: "/schedules" },
    { name: "Actions", icon: BoltIcon, path: "/actions" },
    { name: "Training", icon: AcademicCapIcon, path: "/training" },
    { name: "Issues", icon: ExclamationTriangleIcon, path: "/issues" },
    { name: "Documents", icon: DocumentTextIcon, path: "/documents" },
    { name: "Heads Up", icon: EyeIcon, path: "/heads-up" },
    { name: "Analytics", icon: ChartBarIcon, path: "/analytics" },
    { name: "Create Account", icon: UserGroupIcon, path: "/create-account" },
  ];

  const filteredItems = navItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="flex items-center text-xl font-semibold text-gray-800">
  <img
    src={sumecicon}   
    alt="Sumec Icon"
    className="h-10 w-10 mr-2"
  />
  SUMEC Philippines - Safe Axis
</h1>

      <div className="flex items-center gap-3">
        {/* Search button */}
        <button
          onClick={() => setOpenSearch(true)}
          className="group flex items-center gap-2 bg-teal-500 text-white rounded-md shadow 
                     px-4 py-2 transition-all duration-300 overflow-hidden hover:px-6 hover:bg-teal-600"
        >
          <MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs">
            Search
          </span>
        </button>

        {/* Search Modal */}
        {openSearch && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => {
              setOpenSearch(false);
              setSearchTerm("");
            }}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-[900px] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Quick Navigation
              </h2>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="Search panels..."
              />
              <div className="max-h-[200px] overflow-y-auto border border-gray-200 rounded-md">
                <table className="w-full">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="text-left px-4 py-2 text-lg font-semibold text-gray-700">
                        Panel
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <tr
                          key={item.name}
                          className="cursor-pointer hover:bg-teal-50 transition"
                          onClick={() => {
                            setOpenSearch(false);
                            setSearchTerm("");
                            navigate(item.path);
                          }}
                        >
                          <td className="px-4 py-3 flex items-center gap-3 text-gray-800 font-medium">
                            <item.icon className="h-5 w-5 text-teal-600" />
                            {item.name}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-4 py-3 text-gray-500 text-lg">
                          No results found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setOpenSearch(false);
                    setSearchTerm("");
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Dropdown */}
        <div className="relative" ref={createRef}>
          <button
            onClick={() => setOpenCreate(!openCreate)}
            className="group flex items-center gap-2 bg-teal-500 text-white rounded-md shadow 
                       px-4 py-2 transition-all duration-300 overflow-hidden hover:px-6 hover:bg-teal-600"
          >
            <PlusIcon className="h-5 w-5 flex-shrink-0" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs">
              Create
            </span>
          </button>

          {openCreate && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <ul className="py-2">
                <li
                  className="flex items-center gap-2 px-4 py-2 hover:bg-teal-50 cursor-pointer text-gray-700"
                  onClick={() => {
                    setOpenCreate(false);
                    setOpenActionModal(true);
                  }}
                >
                  <BoltIcon className="h-5 w-5 text-teal-600" />
                  Create Action
                </li>
                <li
                  className="flex items-center gap-2 px-4 py-2 hover:bg-teal-50 cursor-pointer text-gray-700"
                  onClick={() => {
                    setOpenCreate(false);
                    setOpenHeadsUp(true); // open Heads Up modal
                  }}
                >
                  <EyeIcon className="h-5 w-5 text-teal-600" />
                  Create Heads Up
                </li>

                <li
                  className="flex items-center gap-2 px-4 py-2 hover:bg-teal-50 cursor-pointer text-gray-700"
                  onClick={() => {
                    setOpenCreate(false);
                    setOpenTraining(true); // open Training modal
                  }}
                >
                  <AcademicCapIcon className="h-5 w-5 text-teal-600" />
                  Create Training
                </li>

                <li
                  className="flex items-center gap-2 px-4 py-2 hover:bg-teal-50 cursor-pointer text-gray-700"
                  onClick={() => {
                    setOpenCreate(false);
                    setOpenIssue(true); // open Issue modal
                  }}
                >
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                  Create Issue
                </li>
              </ul>
            </div>
          )}
        </div>

        {openActionModal && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setOpenActionModal(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-[900px] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <BoltIcon className="h-6 w-6 text-teal-600" />
                  Create Action
                </h2>
                <button
                  onClick={() => setOpenActionModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <form className="space-y-8">
                {/* Row 1: Title, Description, Priority */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <DocumentTextIcon className="h-5 w-5 text-gray-500" />
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter action title"
                      className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <ClipboardDocumentListIcon className="h-5 w-5 text-gray-500" />
                      Description
                    </label>
                    <textarea
                      placeholder="Description..."
                      rows={2}
                      className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                      Priority
                    </label>
                    <select className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Due Date, Assignees, Site */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <CalendarIcon className="h-5 w-5 text-blue-500" />
                      Due Date
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <UserGroupIcon className="h-5 w-5 text-gray-500" />
                      Assignees
                    </label>
                    <select className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none">
                      <option>John Lloyd Mislang</option>
                      <option>Jane Doe</option>
                      <option>Team A</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <HomeIcon className="h-5 w-5 text-gray-500" />
                      Site
                    </label>
                    <select className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none">
                      <option>Head Office</option>
                      <option>Warehouse</option>
                      <option>Remote</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Asset, Repeat, Labels */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <ChartBarIcon className="h-5 w-5 text-gray-500" />
                      Asset
                    </label>
                    <select className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none">
                      <option>Forklift</option>
                      <option>Server</option>
                      <option>Vehicle</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                      Repeat
                    </label>
                    <select className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none">
                      <option>Does not repeat</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <TagIcon className="h-5 w-5 text-gray-500" />
                      Labels
                    </label>
                    <select className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none">
                      <option>Safety</option>
                      <option>Maintenance</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>

                {/* Visibility */}
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                  <EyeIcon className="h-4 w-4 text-gray-400" />
                  Visible to anyone in the organization
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setOpenActionModal(false)}
                    className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
                  >
                    Create Action
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {openHeadsUp && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setOpenHeadsUp(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-[1200px] max-h-[80vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <EyeIcon className="h-6 w-6 text-teal-600" />
                  Create Heads Up
                </h2>
                <button
                  onClick={() => setOpenHeadsUp(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  ✕
                </button>
              </div>

              {/* Form with Preview */}
              <div className="grid grid-cols-2 gap-8">
                {/* Left Side: Form */}
                <form className="space-y-6">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Image
                    </label>
                    <button
                      type="button"
                      className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-teal-500 hover:text-teal-600 transition"
                    >
                      <PlusIcon className="h-8 w-8" />
                    </button>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter title..."
                      className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      placeholder="Enter description..."
                      rows={3}
                      className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  {/* People Dropdown */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      People
                    </label>
                    <select className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none">
                      <optgroup label="Team A">
                        <option>All Team A</option>
                        <option>John Doe</option>
                        <option>Jane Smith</option>
                      </optgroup>
                      <optgroup label="Team B">
                        <option>All Team B</option>
                        <option>Michael</option>
                        <option>Sara</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Share Externally */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-teal-600 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Share Externally
                    </span>
                  </div>

                  {/* Settings with Toggles */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-700">
                      Settings
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Request Acknowledgement
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-teal-600 transition"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Comments Enabled
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-teal-600 transition"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Reactions Enabled
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-teal-600 transition"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></div>
                      </label>
                    </div>
                  </div>
                </form>

                {/* Right Side: Preview styled like Facebook post */}
                <div className="bg-gray-50 rounded-lg p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Preview
                    </h3>
                    <div className="bg-white rounded-lg shadow p-4 space-y-3">
                      {/* Header */}
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            User Name
                          </p>
                          <p className="text-xs text-gray-500">Just now</p>
                        </div>
                      </div>

                      {/* Content */}
                      <h4 className="text-lg font-bold text-gray-800">
                        Title Preview
                      </h4>
                      <p className="text-gray-600">
                        Description preview will appear here...
                      </p>
                      <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                        Image Preview
                      </div>

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
                        👍 12 Likes • 💬 3 Comments
                      </div>

                      {/* Comments section */}
                      <div className="space-y-3 pt-3 border-t">
                        <div className="flex gap-3">
                          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                          <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700">
                            Great update! Thanks for sharing.
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                          <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700">
                            Please acknowledge once read.
                          </div>
                        </div>
                        {/* Add new comment input */}
                        <div className="flex gap-3 items-center">
                          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                          <input
                            type="text"
                            placeholder="Write a comment..."
                            className="flex-1 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons moved here */}
                  <div className="flex justify-end gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setOpenHeadsUp(false)}
                      className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
                    >
                      Create Heads Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {openIssue && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setOpenIssue(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-[1200px] max-h-[80vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
                  Report Issue
                </h2>
                <button
                  onClick={() => setOpenIssue(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  ✕
                </button>
              </div>

              {/* Form with Preview */}
              <div className="grid grid-cols-2 gap-8">
                {/* Left Side: Form */}
                <form className="space-y-6">
                  {/* Date Today */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Date Today
                    </label>
                    <input
                      type="date"
                      value={new Date().toISOString().split("T")[0]}
                      readOnly
                      className="w-full rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
                    />
                  </div>

                  {/* Type of Issue */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      What type of issue?
                    </label>
                    <select className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-red-500 focus:outline-none">
                      <option>Safety</option>
                      <option>Maintenance</option>
                      <option>Compliance</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Title (required) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter issue title..."
                      required
                      className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  {/* Description (optional) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      placeholder="Enter description..."
                      rows={3}
                      className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  {/* Site (optional) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Site
                    </label>
                    <input
                      type="text"
                      placeholder="Enter site..."
                      className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  {/* Add images or video (optional) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Add images or video?
                    </label>
                    <button
                      type="button"
                      className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-red-500 hover:text-red-600 transition"
                    >
                      <PlusIcon className="h-8 w-8" />
                    </button>
                  </div>

                  {/* Date Occurred (required) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Date Occurred <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  {/* What needs to be done? (optional) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      What needs to be done?
                    </label>
                    <textarea
                      placeholder="Enter actions needed..."
                      rows={2}
                      className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  {/* What caused it? (optional) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      What caused it?
                    </label>
                    <textarea
                      placeholder="Enter cause..."
                      rows={2}
                      className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </form>

                {/* Right Side: Preview styled like Facebook post */}
                <div className="bg-gray-50 rounded-lg p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Preview
                    </h3>
                    <div className="bg-white rounded-lg shadow p-4 space-y-3">
                      {/* Header */}
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            User Name
                          </p>
                          <p className="text-xs text-gray-500">
                            Reported Today
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <h4 className="text-lg font-bold text-gray-800">
                        Issue Title Preview
                      </h4>
                      <p className="text-gray-600">
                        Description preview will appear here...
                      </p>
                      <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                        Image/Video Preview
                      </div>

                      {/* Footer actions */}
                      <div className="flex justify-between text-gray-500 text-sm pt-2 border-t">
                        <span>⚠️ Issue</span>
                        <span>💬 Comment</span>
                        <span>↗ Share</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setOpenIssue(false)}
                      className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                    >
                      Submit Issue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {openTraining && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setOpenTraining(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-[1200px] max-h-[80vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <AcademicCapIcon className="h-6 w-6 text-teal-600" />
                  Create Training
                </h2>
                <button
                  onClick={() => setOpenTraining(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  ✕
                </button>
              </div>

              {/* Form + Preview */}
              <div className="grid grid-cols-2 gap-8">
                {/* Left Side: Form */}
                <form className="space-y-6">
                  {/* File Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Upload Training Materials
                    </label>
                    <input
                      type="file"
                      multiple
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500">
                      You can upload PDFs, PPTs, or images.
                    </p>
                  </div>

                  {/* Training Title */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter training title..."
                      className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      placeholder="Enter training description..."
                      rows={3}
                      className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Schedule
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  {/* Trainer */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Trainer
                    </label>
                    <select className="w-full rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none">
                      <option>John Doe</option>
                      <option>Jane Smith</option>
                      <option>Team A</option>
                    </select>
                  </div>
                </form>

                {/* Right Side: Preview */}
                <div className="bg-gray-50 rounded-lg p-6 flex flex-col justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Preview
                  </h3>
                  <div className="bg-white rounded-lg shadow p-4 space-y-3">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          Trainer Name
                        </p>
                        <p className="text-xs text-gray-500">Scheduled Date</p>
                      </div>
                    </div>

                    {/* Content */}
                    <h4 className="text-lg font-bold text-gray-800">
                      Training Title Preview
                    </h4>
                    <p className="text-gray-600">
                      Description preview will appear here...
                    </p>
                    <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                      Uploaded Files Preview
                    </div>

                    {/* Footer actions */}
                    <div className="flex justify-between text-gray-500 text-sm pt-2 border-t">
                      <span>📂 Materials</span>
                      <span>📅 Schedule</span>
                      <span>↗ Share</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setOpenTraining(false)}
                      className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
                    >
                      Create Training
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setOpen(!open)}
            className="group flex items-center gap-2 bg-teal-500 text-white rounded-md shadow 
               px-4 py-2 transition-all duration-300 overflow-hidden hover:px-6 hover:bg-teal-600"
          >
            <BellIcon className="h-5 w-5 flex-shrink-0" />

            <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs">
              Notifications
            </span>
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg z-50">
              <ul className="py-2 max-h-80 overflow-y-auto">
                {/* Example Issue Notification */}
                <li
                  className="flex items-start gap-3 px-4 py-3 hover:bg-teal-50 cursor-pointer text-gray-700"
                  onClick={() => alert("Open Issue #INV-001")}
                >
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      INV-001 • Solar Inverter Malfunction
                    </p>
                    <p className="text-xs text-gray-500">
                      Nov 26, 2025 • 09:30 AM
                    </p>
                    <p className="text-sm text-gray-600 truncate max-w-xs">
                      The inverter at Site A is not converting properly
                      sdfsdfsdfsghrthrt
                    </p>
                  </div>
                </li>

                {/* Example Heads Up Notification */}
                <li
                  className="flex items-start gap-3 px-4 py-3 hover:bg-teal-50 cursor-pointer text-gray-700"
                  onClick={() => alert("Open Issue #INV-001")}
                >
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      INV-001 • Solar Inverter Malfunction
                    </p>
                    <p className="text-xs text-gray-500">
                      Nov 26, 2025 • 09:30 AM
                    </p>
                    <p className="text-sm text-gray-600 max-w-xs truncate">
                      The inverter at Site A is not converting properly asd asd
                      asd ad adas d
                    </p>
                  </div>
                </li>

                {/* Another Heads Up Notification */}
                <li
                  className="flex items-start gap-3 px-4 py-3 hover:bg-teal-50 cursor-pointer text-gray-700"
                  onClick={() => alert("Open Issue #INV-001")}
                >
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      INV-001 • Solar Inverter Malfunction
                    </p>
                    <p className="text-xs text-gray-500">
                      Nov 26, 2025 • 09:30 AM
                    </p>
                    <p className="text-sm text-gray-600 max-w-xs truncate">
                      The inverter at Site A is not converting properly asdada
                      asd asdasdasdasasdadsas asda dasd asd
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
