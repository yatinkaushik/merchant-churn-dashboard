export default function MerchantDetails({ merchant }) {
  if (!merchant) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-500">
          Select a merchant to view details.
        </p>
      </div>
    );
  }

  const badgeStyles = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  const metrics = [
    {
      label: "Revenue Trend",
      value: `${merchant.revenueTrend}%`,
    },
    {
      label: "Orders Trend",
      value: `${merchant.ordersTrend}%`,
    },
    {
      label: "Feature Adoption",
      value: `${merchant.featureAdoption}%`,
    },
    {
      label: "Support Tickets",
      value: merchant.openSupportTickets,
    },
    {
      label: "Renewal",
      value: `${merchant.daysUntilRenewal} days`,
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {merchant.name}
          </h2>
          <p className="text-sm text-slate-500">
            {merchant.industry} • {merchant.accountAgeMonths} months
          </p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-slate-900">
            {merchant.risk.score}
          </p>

          <span
            className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              badgeStyles[merchant.risk.category]
            }`}
          >
            {merchant.risk.category}
          </span>
        </div>
      </div>

      {/* Risk Reasons */}
      <div className="mb-6 rounded-lg bg-slate-50 p-4">
        <h3 className="mb-3 font-semibold text-slate-900">
          Risk Drivers
        </h3>

        <ul className="space-y-2">
          {merchant.risk.reasons.map((reason, index) => (
            <li
              key={index}
              className="text-sm text-slate-700"
            >
              • {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendation */}
      <div className="mb-6 rounded-lg bg-slate-50 p-4">
        <h3 className="mb-2 font-semibold text-slate-900">
          Recommended Action
        </h3>

        <p className="font-medium text-slate-800">
          {merchant.recommendation.title}
        </p>

        {merchant.recommendation.description && (
          <p className="mt-2 text-sm text-slate-600">
            {merchant.recommendation.description}
          </p>
        )}
      </div>

      {/* Metrics */}
      <div>
        <h3 className="mb-3 font-semibold text-slate-900">
          Key Metrics
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-slate-200 p-3"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {metric.label}
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}