export default function Card({ title, children, icon: Icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-lg shadow p-6 flex flex-col 
                 transition transform hover:scale-105 hover:shadow-lg"
    >
      {/* Optional icon + title */}
      {title && (
        <div className="flex items-center mb-4">
          {Icon && <Icon className="h-10 w-10 text-teal-500 mr-3" />}
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
      )}

      {/* Card content */}
      <div className="text-gray-600 flex-1">{children}</div>
    </div>
  );
}
