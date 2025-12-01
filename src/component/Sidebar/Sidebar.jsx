// src/component/Sidebar/Sidebar.jsx
import "./Sidebar.css";
import {
  HomeIcon,
  BellIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  BoltIcon,
  AcademicCapIcon,
  CubeIcon,
  BookOpenIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassCircleIcon,
  UserGroupIcon,
  EyeIcon,
  CpuChipIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar({ active, setActive, collapsed, setCollapsed, open }) {
   const navItems = [
  { name: "Home", icon: HomeIcon },
  { name: "Inspection", icon: ClipboardDocumentListIcon },
  { name: "Schedules", icon: CalendarIcon },
  { name: "Actions", icon: BoltIcon },
  { name: "Training", icon: AcademicCapIcon },
  { name: "Issues", icon: ExclamationTriangleIcon },
  { name: "Documents", icon: DocumentTextIcon },
  { name: "Heads Up", icon: EyeIcon },
  { name: "Analytics", icon: ChartBarIcon },
  { name: "Create Account", icon: UserGroupIcon }, // ✅ new item
];


  if (!open) return null;

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-900 text-gray-300 flex flex-col transition-all duration-300 z-50 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Collapse Toggle */}
<div className={`p-3 ${collapsed ? "flex justify-center" : ""}`}>
  <button
    onClick={() => setCollapsed(!collapsed)}
    className="text-gray-400 hover:text-teal-400 focus:outline-none"
  >
    {collapsed ? "➡️" : "⬅️"}
  </button>
</div>


      {/* Navigation */}
<div className="flex-1 overflow-y-auto space-y-1 px-2 custom-scrollbar">
  {navItems.map((item) => (
    <button
      key={item.name}
      onClick={() => setActive(item.name)}
      className={`group w-full px-3 py-2 rounded-md hover:bg-gray-800 transition
        ${active === item.name ? "text-teal-400 bg-gray-800 font-semibold" : ""}
        ${collapsed ? "flex justify-center" : "flex items-center justify-between"}
      `}
    >
      <div className={`flex ${collapsed ? "justify-center" : "items-center"}`}>
        <item.icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
        {!collapsed && <span>{item.name}</span>}
      </div>
      {!collapsed && item.badge && (
        <span className="text-xs bg-teal-400 text-black font-bold px-2 py-0.5 rounded-full">
          {item.badge}
        </span>
      )}
    </button>
  ))}
</div>


      {/* Footer */}
      <div className="border-t border-gray-700 p-4">
        {!collapsed && (
          <div className="mb-3 space-y-1 text-sm text-gray-400">
            <div>Vena Energy</div>
            <div>Help</div>
          </div>
        )}
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-teal-400 mr-3"
          />
          {!collapsed && (
            <div>
              <p className="text-white font-bold leading-tight">Leonardo</p>
              <p className="text-xs text-gray-400">Medical Technologist</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
