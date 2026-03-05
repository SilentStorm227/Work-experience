const dueBonuses = [
  {
    id: 1,
    employee: "Sofia Bennett",
    reason: "Q1 delivery target exceeded",
    amount: 1200,
    dueDate: "2026-03-15",
    status: "Due this week"
  },
  {
    id: 2,
    employee: "Leo Martins",
    reason: "Architecture lead contribution",
    amount: 900,
    dueDate: "2026-03-18",
    status: "Due this month"
  },
  {
    id: 3,
    employee: "Amira Patel",
    reason: "Design system rollout milestone",
    amount: 750,
    dueDate: "2026-03-21",
    status: "Approved"
  },
  {
    id: 4,
    employee: "Daniel Cole",
    reason: "Reporting automation improvement",
    amount: 500,
    dueDate: "2026-03-25",
    status: "Pending finance confirmation"
  }
];

function formatMoney(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(value);
}

function DueBonus() {
  return (
    <section className="page-shell">
      <h1 className="page-title">Due bonus</h1>
      <p className="muted">Outgoing bonus payments awaiting processing.</p>

      <div className="bonus-grid">
        {dueBonuses.map((item) => (
          <article key={item.id} className="bonus-card">
            <h3>{item.employee}</h3>
            <p className="bonus-amount">{formatMoney(item.amount)}</p>
            <p className="muted compact">{item.reason}</p>
            <p className="bonus-meta">
              <strong>Due:</strong> {item.dueDate}
            </p>
            <p className="bonus-meta">
              <strong>Status:</strong> {item.status}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DueBonus;
