function getCapabilityGrade(score) {
  if (score >= 85) return "A";
  if (score >= 75) return "B";
  if (score >= 65) return "C";
  if (score >= 55) return "D";
  if (score >= 45) return "E";
  return "F";
}

function getCapabilityMessage(grade) {
  if (grade === "A") return "Employee excels at team leading and project managing.";
  if (grade === "B") return "Employee is strong in project ownership and can lead most engagements.";
  if (grade === "C") return "Employee can manage smaller projects with occasional senior support.";
  if (grade === "D") return "Employee is developing leadership confidence and needs guided project exposure.";
  if (grade === "E") return "Employee currently needs close support before leading project work.";
  return "Employee is in early development stage for project leadership responsibilities.";
}

function getCapabilityDescription(employee, grade) {
  if (grade === "A" || grade === "B") {
    return `${employee.name} is trusted to lead delivery with minimal oversight.`;
  }
  if (grade === "C") {
    return `${employee.name} can lead smaller projects and scale with occasional support.`;
  }
  if (grade === "D") {
    return `${employee.name} is progressing, but still benefits from structured guidance.`;
  }
  return `${employee.name} should focus on foundational leadership development before owning projects.`;
}

const PROFILE_TABS = [
  { id: "pc", label: "Professional certificates" },
  { id: "tq", label: "Technical qualifications" },
  { id: "training", label: "Personal training dashboard" }
];

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function ProfilePage({
  employee,
  employees,
  onSelectProfile,
  profileSubTab,
  onProfileSubTabChange
}) {
  const techAvg = average(Object.values(employee.technicalRatings));
  const softAvg = average(Object.values(employee.softRatings));
  const completedTrainings = Math.max(1, Math.round((techAvg + softAvg) / 2));
  const inProgressTrainings = Math.max(1, employee.developmentFocus.length - 1);
  const notStartedTrainings = Math.max(1, 5 - completedTrainings - inProgressTrainings);
  const qualificationRows = Object.entries(employee.qualifications);

  function renderMainPanel() {
    if (profileSubTab === "pc") {
      return (
        <div className="profile-content-card">
          <h2 className="question">Professional certificates</h2>
          <p className="muted">Certifications currently held by {employee.name}.</p>
          <ul className="focus-list">
            {employee.certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>
      );
    }

    if (profileSubTab === "tq") {
      return (
        <div className="profile-content-card">
          <h2 className="question">Technical qualifications</h2>
          <p className="muted">Category-based technical profile for this employee.</p>
          <div className="table-scroll">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Qualifications</th>
                </tr>
              </thead>
              <tbody>
                {qualificationRows.map(([category, values]) => (
                  <tr key={category}>
                    <td>{category}</td>
                    <td>{values.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="profile-content-card">
        <h2 className="question">Personal training dashboard</h2>
        <p className="muted">Individual training view for {employee.name} (separate from team dashboard).</p>

        <div className="personal-train-grid">
          <article className="personal-stat completed">
            <h4>Completed</h4>
            <strong>{completedTrainings}</strong>
          </article>
          <article className="personal-stat progress">
            <h4>In progress</h4>
            <strong>{inProgressTrainings}</strong>
          </article>
          <article className="personal-stat not-started">
            <h4>Not started</h4>
            <strong>{notStartedTrainings}</strong>
          </article>
        </div>

        <h3 className="personal-subtitle">Planned development actions</h3>
        <ul className="focus-list">
          {employee.developmentFocus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

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

        <div className="profile-sub-nav profile-sub-nav-left">
          {PROFILE_TABS.map((tab) => (
            <button
              type="button"
              key={tab.id}
              className={`profile-sub-tab ${profileSubTab === tab.id ? "active" : ""}`}
              onClick={() => onProfileSubTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mini-chart capability-panel capability-panel-left">
          <h3>Capability to run projects</h3>
          <p className="muted compact">A is strongest readiness, F means heavy support needed.</p>
          <div className="capability-list">
            {(() => {
              const grade = getCapabilityGrade(employee.leadershipScore);
              return (
                <div className="capability-item active" key={employee.id}>
                  <div className={`capability-badge grade-${grade.toLowerCase()}`}>{grade}</div>
                  <div className="capability-meta">
                    <strong className="capability-grade-title">Rating {grade}</strong>
                    <span>{getCapabilityMessage(grade)}</span>
                  </div>
                </div>
              );
            })()}
          </div>
          <p className="muted compact personal-capability-desc">
            {getCapabilityDescription(employee, getCapabilityGrade(employee.leadershipScore))}
          </p>
        </div>
      </aside>

      <div className="profile-main">
        <h1 className="page-title">{employee.name}</h1>
        <p className="muted">
          {employee.role} | {employee.department}
        </p>
        <div className="chip-row profile-skill-row">
          {employee.skills.map((skill) => (
            <span key={skill} className="chip chip-tech">{skill}</span>
          ))}
          {employee.softSkills.map((skill) => (
            <span key={skill} className="chip chip-soft">{skill}</span>
          ))}
        </div>

        {renderMainPanel()}
      </div>

    </section>
  );
}

export default ProfilePage;
