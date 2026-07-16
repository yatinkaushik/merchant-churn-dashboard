import { useMemo } from "react";

export default function DashboardStats({ merchants }) {
  const stats = useMemo(() => {
    const totalMerchants = merchants.length;

    const averageRisk =
      totalMerchants > 0
        ? Math.round(
            merchants.reduce((sum, merchant) => sum + merchant.risk.score, 0) /
              totalMerchants
          )
        : 0;

    const highRisk = merchants.filter(
      (merchant) => merchant.risk.category === "High"
    ).length;

    const mediumRisk = merchants.filter(
      (merchant) => merchant.risk.category === "Medium"
    ).length;

    return [
      {
        title: "Total Merchants",
        value: totalMerchants,
      },
      {
        title: "Average Risk Score",
        value: averageRisk,
      },
      {
        title: "High Risk",
        value: highRisk,
      },
      {
        title: "Medium Risk",
        value: mediumRisk,
      },
    ];
  }, [merchants]);

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">{stat.title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}