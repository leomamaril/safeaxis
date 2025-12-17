import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  BoltIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  EyeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase"; // ✅ import supabase client

export default function Sidebar({ collapsed, setCollapsed, open }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

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

  // Sidebar.jsx
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchProfile(userId);
    }
  }, []);

  async function fetchProfile(userId) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error.message);
    } else {
      setProfile(data); // only the logged-in user
    }
  }

  if (!open) return null;

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-900 text-gray-300 flex flex-col transition-all duration-300 z-50 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Collapse toggle */}
      <div className={`p-3 ${collapsed ? "flex justify-center" : ""}`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-teal-400 focus:outline-none"
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* Navigation items */}
      <div className="flex-1 overflow-y-auto space-y-1 px-2 custom-scrollbar">
        {navItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            end={name === "Home"}
            className={({ isActive }) =>
              `group w-full px-3 py-2 rounded-md transition ${
                isActive
                  ? "text-teal-400 bg-gray-800 font-semibold"
                  : "hover:bg-gray-800"
              } ${
                collapsed
                  ? "flex justify-center"
                  : "flex items-center justify-between"
              }`
            }
          >
            <div
              className={`flex ${
                collapsed ? "justify-center" : "items-center"
              }`}
            >
              <Icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
              {!collapsed && <span>{name}</span>}
            </div>
          </NavLink>
        ))}
      </div>

      {/* Footer with settings/profile */}
<div className="border-t border-gray-700 p-4">
  {!collapsed && (
    <div className="mb-3 space-y-1 text-sm text-gray-400">
      <div>SUMEC Philippines</div>
    </div>
  )}
  <button
    onClick={() => navigate("/settings")}
    className={`flex items-center w-full text-left focus:outline-none hover:bg-gray-800 p-2 rounded-md transition ${
      collapsed ? "justify-center" : ""
    }`}
  >
    <Cog6ToothIcon className="w-5 h-5 text-teal-400 mr-3" />

    {/* Show profile details only when expanded */}
    {!collapsed && profile && (
      <div>
        <p className="text-white font-bold">
          {profile.fname} {profile.lname}
        </p>
        <p className="text-xs text-gray-400">{profile.position}</p>
        <p className="text-xs text-gray-400">{profile.department}</p>
      </div>
    )}

    {!collapsed && (
      <ChevronRightIcon className="w-5 h-5 text-gray-400 ml-auto" />
    )}
  </button>
</div>

    </div>
  );
}
