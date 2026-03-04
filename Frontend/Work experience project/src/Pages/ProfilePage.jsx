function getCapabilityGrade(score) {
  if (score >= 85) return "A";
  if (score >= 75) return "B";
  if (score >= 65) return "C";
  if (score >= 55) return "D";
  if (score >= 45) return "E";
  return "F";
}

function ProfilePage({ employee, employees, onSelectProfile }) {
  return (
    <section className="page-shell profile-layout">
      <aside className="employee-directory">
        <details open>
          <summary>Other employees</summary>
          <table className="directory-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((item) => (
                  <tr
                    key={item.id}
                    className={item.id === employee.id ? "directory-row-active" : ""}
                  >
                    <td>
                      <button
                        type="button"
                        className={`directory-button ${item.id === employee.id ? "active" : ""}`}
                        onClick={() => onSelectProfile(item)}
                      >
                        {item.name}
                      </button>
                    </td>
                    <td>{item.role}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </details>
      </aside>

      <div className="profile-main">
        <h1 className="page-title">{employee.name}</h1>
        <p className="muted">
          {employee.role} | {employee.department}
        </p>

        <h2 className="question">Core technical strengths</h2>
        <div className="chip-row">
          {employee.skills.map((skill) => (
            <span key={skill} className="chip chip-tech">{skill}</span>
          ))}
        </div>

        <h2 className="question">Soft skills profile</h2>
        <div className="chip-row">
          {employee.softSkills.map((skill) => (
            <span key={skill} className="chip chip-soft">{skill}</span>
          ))}
        </div>

        <h2 className="question">Development focus (next 90 days)</h2>
        <ul className="focus-list">
          {employee.developmentFocus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <aside className="mini-chart capability-panel">
        <h3>Capability to run projects</h3>
        <p className="muted compact">A is strongest readiness, F means heavy support needed.</p>
        <div className="capability-list">
          {employees.map((item) => {
            const grade = getCapabilityGrade(item.leadershipScore);
            return (
              <div
                className={`capability-item ${item.id === employee.id ? "active" : ""}`}
                key={item.id}
              >
                <div className={`capability-badge grade-${grade.toLowerCase()}`}>{grade}</div>
                <div className="capability-meta">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="muted compact">Selected profile is highlighted for quick comparison.</p>
      </aside>
    </section>
  );
}

export default ProfilePage;
