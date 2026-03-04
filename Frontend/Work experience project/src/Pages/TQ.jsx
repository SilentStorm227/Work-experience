function TQ({ employees }) {
  const categories = ["Programming", "Backend", "Databases", "Tools", "Web"];

  return (
    <section className="page-shell">
      <h1 className="page-title">Technical qualifications</h1>
      <p className="muted">Baseline qualifications by category. Pulls directly from employee profile data.</p>

      <table className="matrix-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Technical Qualifications</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            const uniqueItems = [...new Set(employees.flatMap((employee) => employee.qualifications[category] || []))];
            return (
              <tr key={category}>
                <td>{category}</td>
                <td>{uniqueItems.join(", ")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default TQ;