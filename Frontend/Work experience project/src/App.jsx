import { useEffect, useMemo, useState } from "react";
import "./App.css";

import Home from "./Pages/Home";
import PC from "./Pages/PC";
import TQ from "./Pages/TQ";
import TS from "./Pages/TS";
import Skills from "./Pages/Skills";
import Training from "./Pages/Training";
import Analysis from "./Pages/Analysis";
import ProfilePage from "./Pages/ProfilePage";
import Bonus from "./Pages/DueBonus";

const navItems = [
  { id: "home", label: "Profiles" },
  { id: "ts", label: "Technical skills" },
  { id: "skills", label: "Soft Skills & People Development" },
  { id: "analysis", label: "Overall analysis" },
  { id: "Bonus", label: "Bonus" }
];

const profileQuickTabs = [
  { id: "pc", label: "Professional certificates" },
  { id: "tq", label: "Technical qualifications" },
  { id: "training", label: "Personal training dashboard" }
];

function initials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [activePage, setActivePage] = useState("home");
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/profile")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setEmployees(list);
        setLoadingEmployees(false);

        if (list.length > 0) {
          setSelectedEmployee(list[0]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch employees", err);
        setLoadingEmployees(false);
      });
  }, []);

  const navigate = (page, employee = selectedEmployee) => {
    setActivePage(page);
    setSelectedEmployee(employee);
  };

  const pageNode = useMemo(() => {
    if (loadingEmployees) return <p>Loading employees...</p>;
    if (!selectedEmployee) return <p>No employee selected</p>;

    switch (activePage) {
      case "home":
        return (
          <Home
            employees={employees}
            onSelectProfile={(emp) => navigate("profile", emp)}
          />
        );

      case "profile":
        return (
          <ProfilePage
            employee={selectedEmployee}
            employees={employees}
            onSelectProfile={(emp) => navigate("profile", emp)}
            onNavigateMainTab={(tab) => navigate(tab)}
          />
        );

      case "pc":
        return <PC employee={selectedEmployee} />;

      case "tq":
        return <TQ employee={selectedEmployee} />;

      case "training":
        return <Training employee={selectedEmployee} />;

      case "ts":
        return <TS employees={employees} />;

      case "Bonus":
        return <Bonus employees={employees} />;

      case "skills":
        return <Skills employees={employees} />;

      case "analysis":
        return <Analysis employees={employees} />;

      default:
        return <p>Page not found</p>;
    }
  }, [activePage, selectedEmployee, employees, loadingEmployees]);

  return (
    <main className="app-shell">
      <header className="top-nav">

        {navItems.map((item) => (
          <button
            key={item.id}
            className={`top-nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => navigate(item.id)}
          >
            {item.label}
          </button>
        ))}

        {activePage === "profile" && selectedEmployee && (
          <div className="profile-top-tab">
            <div className="profile-top-avatar">
              {initials(selectedEmployee.name)}
            </div>
            <div className="profile-top-name">
              {selectedEmployee.name}
            </div>
          </div>
        )}

      </header>

      {(activePage === "pc" ||
        activePage === "tq" ||
        activePage === "training") && (
        <div className="global-profile-shortcuts">
          <div className="profile-sub-nav profile-sub-nav-main">
            {profileQuickTabs.map((tab) => (
              <button
                key={tab.id}
                className={`profile-sub-tab profile-sub-tab-main ${
                  activePage === tab.id ? "active" : ""
                }`}
                onClick={() => navigate(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {pageNode}

    </main>
  );
}

export default App;