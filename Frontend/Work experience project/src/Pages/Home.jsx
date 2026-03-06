import { useEffect, useState } from "react";

function initials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function formatName(userId) {
  if (!userId) return "";
  return userId.replace("-", " ");
}

function Home({ onSelectProfile }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/profile")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profiles");
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading profiles...</p>;

  return (
    <section className="page-shell">
      <h1 className="page-title">Skills matrices and training dashboards.</h1>
      <p className="page-subtitle">
        Select a profile to open employee details and development focus.
      </p>

      <div className="profile-grid">
        {employees.map((employee) => {
          const name = formatName(employee.userId);

          return (
            <button
              type="button"
              className="profile-card"
              key={employee.userId}
              onClick={() => onSelectProfile(employee)}
            >
              <div className="profile-avatar">
                {initials(name)}
              </div>

              <div className="profile-name">{name}</div>

              <div className="profile-role">
                {employee.role || "Employee"}
              </div>

              <div className="profile-skills-preview">
                {(employee.skills || []).slice(0, 3).map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Home;