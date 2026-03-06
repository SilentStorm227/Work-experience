import { useState, useEffect } from "react";

function TS() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/profile")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPeople(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error", err);
        setLoading(false);
      });
  }, []);

  const rows = [
    { key: "programmingLanguages", label: "Programming languages" },
    { key: "systemsKnowledge", label: "Systems knowledge" },
    { key: "softwareTools", label: "Software tools" },
    { key: "industryKnowledge", label: "Industry knowledge" }
  ];

  if (loading) return <p>Loading technical skills…</p>;

  return (
    <section className="page-shell">
      <h1 className="page-title">Technical skills</h1>

      <p className="muted">
        Scored by current performance and peer review (1–5 scale).
      </p>

      <div className="table-scroll">
        <table className="matrix-table matrix-five">

          <thead>
            <tr>
              <th>Skill</th>

              {people.map((person) => (
                <th key={person.userId}>
                  {person.userId?.split("-")[0] || "User"}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>

            {rows.map((row) => (
              <tr key={row.key}>
                <td>{row.label}</td>

                {people.map((person) => (
                  <td key={`${person.userId}-${row.key}`}>
                    {person.technicalSkills?.[row.key] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}

            <tr>
              <td><strong>Overall</strong></td>

              {people.map((person) => {
                const values = Object.values(person.technicalSkills || {});

                const avg =
                  values.length > 0
                    ? (
                        values.reduce((sum, value) => sum + value, 0) /
                        values.length
                      ).toFixed(1)
                    : "-";

                return (
                  <td key={`${person.userId}-overall`}>
                    <strong>{avg}</strong>
                  </td>
                );
              })}
            </tr>

          </tbody>

        </table>
      </div>

      <p className="scale-note">
        1 - No competence | 2 - Low competence | 3 - Some competence | 4 - High competence | 5 - Expert
      </p>

    </section>
  );
}

export default TS;