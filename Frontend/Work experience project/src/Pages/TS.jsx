const ratingRows = [
  { label: "Programming languages", key: "programmingLanguages" },
  { label: "Systems knowledge", key: "systemsKnowledge" },
  { label: "Software tools", key: "softwareTools" },
  { label: "Industry knowledge", key: "industryKnowledge" }
];

function TS({ employees }) {
  const people = employees;

  return (
    <section className="page-shell">
      <h1 className="page-title">Technical skills</h1>
      <p className="muted">Scored by current performance and peer review (1-5 scale). Placeholder but realistic values.</p>

      <div className="table-scroll">
        <table className="matrix-table matrix-five">
          <thead>
            <tr>
              <th>Skill</th>
              {people.map((member) => (
                <th key={member.id}>{member.name.split(" ")[0]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ratingRows.map((row) => (
              <tr key={row.key}>
                <td>{row.label}</td>
                {people.map((member) => (
                  <td key={member.id + row.key}>{member.technicalRatings[row.key]}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td>Overall</td>
              {people.map((member) => {
                const values = Object.values(member.technicalRatings);
                const avg = (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1);
                return <td key={member.id + "overall-tech"}>{avg}</td>;
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="scale-note">1 - No competence | 2 - Low competence | 3 - Some competence | 4 - High competence | 5 - Expert</p>
    </section>
  );
}

export default TS;
