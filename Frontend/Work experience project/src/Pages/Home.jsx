function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function Home({ employees, onSelectProfile }) {
  return (
    <section className="page-shell">
      <h1 className="page-title">Skills matrices and training dashboards.</h1>
      <p className="page-subtitle">Select a profile to open employee details and development focus.</p>

      <div className="profile-grid">
        {employees.map((employee) => (
          <button
            type="button"
            className="profile-card"
            key={employee.id}
            onClick={() => onSelectProfile(employee)}
          >
            <div className="profile-avatar" aria-hidden="true">
              {initials(employee.name)}
            </div>
            <div className="profile-name">{employee.name}</div>
            <div className="profile-role">{employee.role}</div>
            <div className="profile-skills-preview">
              {employee.skills.slice(0, 3).map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Home;