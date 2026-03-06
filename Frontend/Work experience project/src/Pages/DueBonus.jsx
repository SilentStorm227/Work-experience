<<<<<<< HEAD
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
=======
import { useEffect, useState } from "react";
>>>>>>> 36cf12c (all commits)

function formatMoney(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(value);
}

function DueBonus() {
<<<<<<< HEAD
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
=======
  const [bonuses, setBonuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/bonus") // API endpoint
      .then((res) => res.json())
      .then((data) => {
        setBonuses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading bonuses…</p>;

  return (
    <section className="page-shell">
      <h1 className="page-title">Due Bonuses</h1>
      <p className="muted">Outgoing bonus payments awaiting processing.</p>

      <div className="bonus-grid">
        {bonuses.map((item) => (
          <article key={item._id} className="bonus-card">
            <h3>{item.employeeName}</h3>
            <p className="bonus-amount">{formatMoney(item.amount)}</p>
            <p className="muted compact">{item.reason}</p>
            <p className="bonus-meta"><strong>Due:</strong> {new Date(item.dueDate).toLocaleDateString()}</p>
            <p className="bonus-meta"><strong>Status:</strong> {item.status}</p>
>>>>>>> 36cf12c (all commits)
          </article>
        ))}
      </div>
    </section>
  );
}

<<<<<<< HEAD
export default DueBonus;
=======
export default DueBonus;
>>>>>>> 36cf12c (all commits)
