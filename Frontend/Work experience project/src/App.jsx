import { useMemo, useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import PC from "./Pages/PC";
import TQ from "./Pages/TQ";
import TS from "./Pages/TS";
import Skills from "./Pages/Skills";
import Training from "./Pages/Training";
import Analysis from "./Pages/Analysis";
import ProfilePage from "./Pages/ProfilePage";
import { employees } from "./Pages/data";

const navItems = [
  { id: "home", label: "Profiles" },
  { id: "pc", label: "Professional certificates" },
  { id: "tq", label: "Technical qualifications" },
  { id: "ts", label: "Technical skills" },
  { id: "skills", label: "Soft Skills & People Development" },
  { id: "training", label: "Training Dashboard" },
  { id: "analysis", label: "Overall analysis" }
];

function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function App() {
  const [activePage, setActivePage] = useState("home");
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

  const pageNode = useMemo(() => {
    if (activePage === "home") {
      return (
        <Home
          employees={employees}
          onSelectProfile={(employee) => {
            setSelectedEmployee(employee);
            setActivePage("profile");
          }}
        />
      );
    }

    if (activePage === "profile") {
      return (
        <ProfilePage
          employee={selectedEmployee}
          employees={employees}
          onSelectProfile={setSelectedEmployee}
        />
      );
    }

    if (activePage === "pc") return <PC employees={employees} />;
    if (activePage === "tq") return <TQ employees={employees} />;
    if (activePage === "ts") return <TS employees={employees} />;
    if (activePage === "skills") return <Skills employees={employees} />;
    if (activePage === "training") return <Training />;
    return <Analysis employees={employees} />;
  }, [activePage, selectedEmployee]);

  return (
    <main className="app-shell">
      <header className="top-nav" aria-label="Pages">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`top-nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => setActivePage(item.id)}
          >
            {item.label}
          </button>
        ))}
        {activePage === "profile" && (
          <div className="profile-top-tab" aria-label="Selected employee profile">
            <div className="profile-top-avatar">{initials(selectedEmployee.name)}</div>
            <div className="profile-top-name">{selectedEmployee.name}</div>
          </div>
        )}
      </header>

      {pageNode}
    </main>
  );
}

export default App;
