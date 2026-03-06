// function formatName(userId) {
//   if (!userId) return "Employee";
//   return userId.replace("-", " ");
// }

// function ProfilePage({ employee, onNavigateMainTab }) {
//   const name = formatName(employee.userId);
//   const leadershipScore = employee.leadershipScore || 0;
//   const grade = getCapabilityGrade(leadershipScore);

//   return (
//     <section className="page-shell profile-layout">
//       <aside className="employee-directory">
//         <div className="mini-chart capability-panel capability-panel-left">
//           <h3>Capability to run projects</h3>

//           <p className="muted compact">
//             A is strongest readiness, F means heavy support needed.
//           </p>

//           <div className="capability-list">
//             <div className="capability-item active">
//               <div className={`capability-badge grade-${grade.toLowerCase()}`}>
//                 {grade}
//               </div>

//               <div className="capability-meta">
//                 <strong className="capability-grade-title">
//                   Rating {grade}
//                 </strong>

//                 <span>{getCapabilityMessage(grade)}</span>
//               </div>
//             </div>
//           </div>

//           <p className="muted compact personal-capability-desc">
//             {getCapabilityDescription({ name }, grade)}
//           </p>
//         </div>
//       </aside>

//       <div className="profile-main">
//         <div className="profile-sub-nav profile-sub-nav-main">
//           {PROFILE_TABS.map((tab) => (
//             <button
//               type="button"
//               key={tab.id}
//               className="profile-sub-tab profile-sub-tab-main"
//               onClick={() => onNavigateMainTab(tab.id)}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         <h1 className="page-title">{name}</h1>

//         <p className="muted">
//           {employee.role || "Employee"} | {employee.department || "Department"}
//         </p>

//         <div className="chip-row profile-skill-row">

//           {(employee.skills || []).map((skill, i) => (
//             <span key={i} className="chip chip-tech">{skill}</span>
//           ))}

//           {(employee.softSkills || []).map((skill, i) => (
//             <span key={i} className="chip chip-soft">{skill}</span>
//           ))}

//         </div>

//         <div className="profile-content-card">
//           <h2 className="question">Profile summary</h2>

//           <p className="muted">
//             Use the shortcut tabs above to open this employee's certificates,
//             technical qualifications, and personal training dashboard.
//           </p>

//           <h3 className="personal-subtitle">Current development focus</h3>

//           <ul className="focus-list">
//             {(employee.developmentFocus || []).map((item, i) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ul>

//         </div>
//       </div>
//     </section>
//   );
// }

// export default ProfilePage;

const PROFILE_TABS = [
  { id: "pc", label: "Professional certificates" },
  { id: "tq", label: "Technical qualifications" },
  { id: "training", label: "Personal training dashboard" }
];

function formatName(userId) {
  if (!userId) return "Employee";
  return userId.replace("-", " ");
}

/* -------- Capability helpers -------- */

function getCapabilityGrade(score) {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
}

function getCapabilityMessage(grade) {
<<<<<<< HEAD
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

function ProfilePage({
  employee,
  onNavigateMainTab
}) {
=======
  const messages = {
    A: "Ready to independently lead projects.",
    B: "Strong capability with minimal guidance.",
    C: "Can contribute well but still developing leadership.",
    D: "Needs mentoring to manage delivery responsibilities.",
    F: "Focus on foundational skills before leading projects."
  };

  return messages[grade] || "";
}

function getCapabilityDescription(employee, grade) {
  const descriptions = {
    A: `${employee.name} is fully capable of running delivery with confidence and autonomy.`,
    B: `${employee.name} shows strong delivery potential and can manage projects with limited oversight.`,
    C: `${employee.name} contributes effectively but should build more ownership and leadership experience.`,
    D: `${employee.name} requires mentoring before handling project delivery responsibilities.`,
    F: `${employee.name} should focus on skill development and guided project exposure.`
  };

  return descriptions[grade] || "";
}

/* -------- Profile Page -------- */

function ProfilePage({ employee, onNavigateMainTab }) {

  if (!employee) {
    return <p>Loading profile...</p>;
  }

  const name = formatName(employee.userId);
  const leadershipScore = employee.leadershipScore || 0;
  const grade = getCapabilityGrade(leadershipScore);

>>>>>>> 36cf12c (all commits)
  return (
    <section className="page-shell profile-layout">
      <aside className="employee-directory">
        <div className="mini-chart capability-panel capability-panel-left">
<<<<<<< HEAD
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
=======

          <h3>Capability to run projects</h3>

          <p className="muted compact">
            A is strongest readiness, F means heavy support needed.
          </p>

          <div className="capability-list">
            <div className="capability-item active">

              <div className={`capability-badge grade-${grade.toLowerCase()}`}>
                {grade}
              </div>

              <div className="capability-meta">
                <strong className="capability-grade-title">
                  Rating {grade}
                </strong>

                <span>{getCapabilityMessage(grade)}</span>
              </div>

            </div>
          </div>

          <p className="muted compact personal-capability-desc">
            {getCapabilityDescription({ name }, grade)}
          </p>

>>>>>>> 36cf12c (all commits)
        </div>
      </aside>

      <div className="profile-main">
<<<<<<< HEAD
=======

>>>>>>> 36cf12c (all commits)
        <div className="profile-sub-nav profile-sub-nav-main">
          {PROFILE_TABS.map((tab) => (
            <button
              type="button"
              key={tab.id}
              className="profile-sub-tab profile-sub-tab-main"
              onClick={() => onNavigateMainTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

<<<<<<< HEAD
        <h1 className="page-title">{employee.name}</h1>
=======
        <h1 className="page-title">{name}</h1>

>>>>>>> 36cf12c (all commits)
        <p className="muted">
          {employee.role || "Employee"} | {employee.department || "Department"}
        </p>
<<<<<<< HEAD
        <div className="chip-row profile-skill-row">
          {employee.skills.map((skill) => (
            <span key={skill} className="chip chip-tech">{skill}</span>
          ))}
          {employee.softSkills.map((skill) => (
            <span key={skill} className="chip chip-soft">{skill}</span>
          ))}
        </div>
        <div className="profile-content-card">
          <h2 className="question">Profile summary</h2>
          <p className="muted">
            Use the shortcut tabs above to open this employee&apos;s certificates, technical qualifications,
            and personal training dashboard in the main view.
          </p>
          <h3 className="personal-subtitle">Current development focus</h3>
          <ul className="focus-list">
            {employee.developmentFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

=======

        <div className="chip-row profile-skill-row">

          {(employee.skills || []).map((skill, i) => (
            <span key={skill._id || i} className="chip chip-tech">
              {skill.skills}
            </span>
          ))}

          {(employee.softSkills || []).map((skill, i) => (
            <span key={skill._id || i} className="chip chip-soft">
              {skill.skills}
            </span>
          ))}

        </div>

        <div className="profile-content-card">

          <h2 className="question">Profile summary</h2>

          <p className="muted">
            Use the shortcut tabs above to open this employee's certificates,
            technical qualifications, and personal training dashboard.
          </p>

          <h3 className="personal-subtitle">
            Current development focus
          </h3>

          <ul className="focus-list">
            {(employee.developmentFocus || []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

        </div>

      </div>
>>>>>>> 36cf12c (all commits)
    </section>
  );
}

export default ProfilePage;