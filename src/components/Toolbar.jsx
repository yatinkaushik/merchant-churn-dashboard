export default function Toolbar({
  searchTerm,
  onSearchChange,
  riskFilter,
  onRiskFilterChange,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <input
        type="text"
        placeholder="Search merchants..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:max-w-sm"
      />

      <select
        value={riskFilter}
        onChange={(e) => onRiskFilterChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="All">All Risks</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
}