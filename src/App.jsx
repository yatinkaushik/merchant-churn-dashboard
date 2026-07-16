import { useEffect, useMemo, useState } from "react";
import merchants from "./data/merchants.json";

import { calculateRisk } from "./utils/riskEngine";
import { getRecommendation } from "./utils/recommendations";

import DashboardStats from "./components/DashboardStats";
import MerchantTable from "./components/MerchantTable";
import MerchantDetails from "./components/MerchantDetails";
import Toolbar from "./components/Toolbar";

function App() {
  const merchantData = useMemo(() => {
    return merchants.map((merchant) => {
      const risk = calculateRisk(merchant);
      const recommendation = getRecommendation(merchant, risk);

      return {
        ...merchant,
        risk,
        recommendation,
      };
    });
  }, []);

  const [selectedMerchant, setSelectedMerchant] = useState(
    merchantData[0] || null
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");

  const filteredMerchants = useMemo(() => {
    return merchantData.filter((merchant) => {
      const matchesSearch = merchant.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesRisk =
        riskFilter === "All" || merchant.risk.category === riskFilter;

      return matchesSearch && matchesRisk;
    });
  }, [merchantData, searchTerm, riskFilter]);

  // Keep selected merchant in sync with filtered list
  useEffect(() => {
    if (filteredMerchants.length === 0) {
      setSelectedMerchant(null);
      return;
    }

    const stillVisible = filteredMerchants.some(
      (merchant) => merchant.id === selectedMerchant?.id
    );

    if (!stillVisible) {
      setSelectedMerchant(filteredMerchants[0]);
    }
  }, [filteredMerchants, selectedMerchant]);

  return (
    <div className="min-h-screen bg-slate-100 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          Merchant Churn Risk Dashboard
        </h1>

        <p className="mb-8 text-slate-600">
          Rule-based merchant churn assessment with explainable risk scoring.
        </p>

        <DashboardStats merchants={merchantData} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Toolbar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              riskFilter={riskFilter}
              onRiskFilterChange={setRiskFilter}
            />

            <MerchantTable
              merchants={filteredMerchants}
              selectedMerchant={selectedMerchant}
              onSelectMerchant={setSelectedMerchant}
            />
          </div>

          <div>
            <MerchantDetails merchant={selectedMerchant} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;