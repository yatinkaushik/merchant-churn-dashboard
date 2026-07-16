export function getRecommendation(merchant, risk) {
  const actions = [];

  // Business Performance
  if (merchant.revenueTrend <= -15) {
    actions.push(
      "Review declining revenue trends with the merchant and identify opportunities to improve business performance."
    );
  }

  if (merchant.ordersTrend <= -15) {
    actions.push(
      "Investigate the recent drop in order volume and discuss potential causes."
    );
  }

  // Engagement
  if (merchant.daysSinceLastLogin >= 14) {
    actions.push(
      "Reach out to re-engage the merchant and encourage regular platform usage."
    );
  }

  // Product Adoption
  if (merchant.featureAdoption < 50) {
    actions.push(
      "Schedule a product walkthrough to improve feature adoption and help the merchant realize more value."
    );
  }

  // Support
  if (merchant.openSupportTickets >= 3) {
    actions.push(
      "Resolve outstanding support issues before discussing account growth or renewal."
    );
  }

  // Healthy merchant
  if (actions.length === 0) {
    actions.push(
      "Maintain regular engagement and continue monitoring account health."
    );
  }

  let description = actions.slice(1).join(" ");

  // Renewal affects urgency, not risk
  if (
    merchant.daysUntilRenewal <= 7 &&
    (risk.category === "Medium" || risk.category === "High")
  ) {
    description += `${
      description ? " " : ""
    }Renewal is due in ${merchant.daysUntilRenewal} days, so these actions should be prioritized before the renewal date.`;
  }

  return {
    priority: risk.category,
    title: actions[0],
    description,
  };
}