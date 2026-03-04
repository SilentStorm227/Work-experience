function PC({ employees }) {
  return (
    <section className="page-shell">
      <h1 className="page-title">Professional certificates</h1>
      <p className="muted">Quick reference of active certifications per team member. Placeholder data can be replaced with real records.</p>

      <div className="cards-grid">
        {employees.map((employee) => (
          <article key={employee.id} className="cert-card">
            <h3>{employee.name}</h3>
            <p>{employee.role}</p>
            <ul>
              {employee.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PC;