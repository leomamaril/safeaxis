export default function AgendaItem({
  type,
  description,
  date,
  priority,
  id,
  status,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-lg shadow-sm p-4 flex flex-col gap-1 border-l-4 border-teal-500 hover:shadow-md transition"
    >
      <span className="text-xs font-bold text-teal-600 uppercase">{type}</span>
      <p className="text-sm font-medium text-gray-800">{description}</p>
      <div className="text-xs text-gray-500 flex justify-between">
        <span>
          {date} - {priority}
        </span>
        <span>{id}</span>
      </div>
      <span className="text-xs font-semibold text-orange-600">{status}</span>
    </div>
  );
}
