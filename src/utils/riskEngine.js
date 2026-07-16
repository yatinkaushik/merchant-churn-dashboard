export function calculateRisk(merchant) {
  let score = 0;
  const reasons = [];

  // Revenue Trend (Max 25)
  if (merchant.revenueTrend <= -30) {
    score += 25;
    reasons.push(`Revenue declined by ${Math.abs(merchant.revenueTrend)}%`);
  } else if (merchant.revenueTrend <= -15) {
    score += 15;
    reasons.push(`Revenue declined by ${Math.abs(merchant.revenueTrend)}%`);
  } else if (merchant.revenueTrend < 0) {
    score += 8;
    reasons.push("Revenue is slightly declining");
  }

  // Orders Trend (Max 20)
  if (merchant.ordersTrend <= -30) {
    score += 20;
    reasons.push(`Orders declined by ${Math.abs(merchant.ordersTrend)}%`);
  } else if (merchant.ordersTrend <= -15) {
    score += 12;
    reasons.push(`Orders declined by ${Math.abs(merchant.ordersTrend)}%`);
  } else if (merchant.ordersTrend < 0) {
    score += 6;
    reasons.push("Orders are slightly declining");
  }

  // Login Activity (Max 20)
  if (merchant.daysSinceLastLogin >= 21) {
    score += 20;
    reasons.push(`No login for ${merchant.daysSinceLastLogin} days`);
  } else if (merchant.daysSinceLastLogin >= 14) {
    score += 15;
    reasons.push(`No login for ${merchant.daysSinceLastLogin} days`);
  } else if (merchant.daysSinceLastLogin >= 7) {
    score += 8;
    reasons.push("Reduced login activity");
  }

  // Feature Adoption (Max 20)
  if (merchant.featureAdoption < 30) {
    score += 20;
    reasons.push(`Feature adoption is only ${merchant.featureAdoption}%`);
  } else if (merchant.featureAdoption < 50) {
    score += 12;
    reasons.push(`Low feature adoption (${merchant.featureAdoption}%)`);
  } else if (merchant.featureAdoption < 70) {
    score += 6;
    reasons.push("Moderate feature adoption");
  }

  // Support Tickets (Max 15)
  if (merchant.openSupportTickets >= 5) {
    score += 15;
    reasons.push(`${merchant.openSupportTickets} open support tickets`);
  } else if (merchant.openSupportTickets >= 3) {
    score += 10;
    reasons.push(`${merchant.openSupportTickets} open support tickets`);
  } else if (merchant.openSupportTickets >= 1) {
    score += 5;
    reasons.push("Outstanding support issue");
  }

  score = Math.min(score, 100);

  let category = "Low";

  if (score >= 70) {
    category = "High";
  } else if (score >= 40) {
    category = "Medium";
  }

  return {
    score,
    category,
    reasons,
  };
}