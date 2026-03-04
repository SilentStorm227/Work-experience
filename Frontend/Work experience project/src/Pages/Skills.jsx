const skillRows = [
  { label: "Communication", key: "communication" },
  { label: "Presentation skills", key: "presentation" },
  { label: "Teamwork", key: "teamwork" },
  { label: "Leadership potential", key: "leadership" },
  { label: "Time management", key: "timeManagement" },
  { label: "Client confidence", key: "clientConfidence" },
  { label: "Problem solving", key: "problemSolving" }
];

function Skills({ employees }) {
  const people = employees;

  return (
    <section className="page-shell">
      <h1 className="page-title">Soft skills and people development</h1>
      <p className="muted">People capability ratings used for coaching plans and project role matching.</p>

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
            {skillRows.map((row) => (
              <tr key={row.key}>
                <td>{row.label}</td>
                {people.map((member) => (
                  <td key={member.id + row.key}>{member.softRatings[row.key]}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td>Overall</td>
              {people.map((member) => {
                const values = Object.values(member.softRatings);
                const avg = (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1);
                return <td key={member.id + "overall-soft"}>{avg}</td>;
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="scale-note">1 - No competence | 2 - Low competence | 3 - Some competence | 4 - High competence | 5 - Expert</p>
    </section>
  );
}

export default Skills;
