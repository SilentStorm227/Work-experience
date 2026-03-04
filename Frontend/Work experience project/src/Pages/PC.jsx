import { useEffect, useState } from "react";

function PC() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/profile/certificates")
    .then((res) => res.json())
    .then((data) => {
      setCertificates(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch error", err);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading certificates…</p>;

  return (
    <section className="page-shell">
      <h1 className="page-title">Professional certificates</h1>
      <p className="muted">Quick reference of active certifications per team member. Placeholder data can be replaced with real records.</p>

      <div className="cards-grid">
        {certificates.map((cert, index) => (
          <article key={cert._id} className="cert-card">
            <h3>{cert.title}</h3>
            <p>{cert.organisation}</p>
            <small>{cert.year}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PC;