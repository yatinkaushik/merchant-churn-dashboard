export default function MerchantTable({
  merchants,
  selectedMerchant,
  onSelectMerchant,
}) {
  const badgeStyles = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Merchant
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Industry
            </th>
            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              Risk Score
            </th>
            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Top Risk Driver
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Recommended Action
            </th>
          </tr>
        </thead>

        <tbody>
          {merchants.map((merchant) => (
            <tr
              key={merchant.id}
              onClick={() => onSelectMerchant(merchant)}
              className={`cursor-pointer border-b transition-all duration-150 hover:bg-slate-50 ${
                selectedMerchant?.id === merchant.id
                  ? "border-l-4 border-l-blue-600 bg-blue-50"
                  : "border-slate-100 bg-white"
              }`}
            >
              <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">
                {merchant.name}
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                {merchant.industry}
              </td>

              <td className="px-6 py-4 text-center">
                <span className="text-lg font-bold text-slate-900">
                  {merchant.risk.score}
                </span>
              </td>

              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    badgeStyles[merchant.risk.category]
                  }`}
                >
                  {merchant.risk.category}
                </span>
              </td>

              <td
                className="max-w-xs truncate px-6 py-4 text-sm text-slate-600"
                title={merchant.risk.reasons[0]}
              >
                {merchant.risk.reasons[0] || "No significant risk detected"}
              </td>

              <td
                className="max-w-sm truncate px-6 py-4 text-sm font-medium text-slate-800"
                title={merchant.recommendation.title}
              >
                {merchant.recommendation.title}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}