import { useEffect, useState } from "react";

function formatMoney(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(value);
}

function DueBonus() {
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
          </article>
        ))}
      </div>
    </section>
  );
}

export default DueBonus;