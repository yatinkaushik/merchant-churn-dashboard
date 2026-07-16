# Merchant Churn Risk Dashboard

A simple React dashboard that identifies merchants at risk of churning using a transparent, rule-based scoring system.

The goal of this project is to demonstrate clear problem framing, explainable business logic, and actionable recommendations rather than relying on machine learning.

---

## Problem

Customer Success teams often need to identify merchants that may be at risk of churning so they can intervene before losing the customer.

Since no historical data was provided, this project uses a rule-based risk engine instead of machine learning.

The dashboard displays:

- Merchant health
- Risk score
- Risk drivers
- Recommended next action

---

## Assumptions

The project assumes that merchant churn is influenced by observable engagement and business health signals.

The following merchant attributes are used:

- Revenue trend
- Orders trend
- Days since last login
- Feature adoption
- Open support tickets

Industry is treated as contextual information only.

Days until renewal influences recommendation urgency but **does not contribute to the risk score**, since renewal itself is not a churn indicator.

---

## Risk Score

Each merchant receives a score between **0 and 100**.

The score is calculated using weighted business rules.

Signals considered include:

- Revenue decline
- Order decline
- Login inactivity
- Low feature adoption
- Outstanding support issues

The final score is categorized as:

- Low
- Medium
- High

Every score includes a list of explainable risk drivers.

---

## Recommendations

Recommendations are generated from the merchant's actual business signals rather than only the final score.

Examples include:

- Re-engage inactive merchants
- Improve feature adoption
- Resolve support issues
- Review declining business performance

If a merchant has Medium or High risk and their renewal is within 7 days, the recommendation highlights the urgency of acting before renewal.

---

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- Static JSON dataset

---

## Run Locally

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Deploy to GitHub Pages

```bash
npm run deploy
```