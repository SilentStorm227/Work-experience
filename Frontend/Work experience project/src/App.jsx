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

const APP_STATE_KEY = "__employee_tracker_state__";
const APP_STORAGE_KEY = "__employee_tracker_state_snapshot__";

function buildState(activePage, selectedEmployee, profileSubTab) {
  return {
    activePage,
    selectedEmployee,
    profileSubTab
  };
}

function resolveEmployee(employeeId) {
  return employees.find((employee) => employee.id === employeeId) || employees[0];
}

function extractAppState(state) {
  if (!state || !state[APP_STATE_KEY]) return null;
  return buildState(
    state.activePage || "home",
    resolveEmployee(state.selectedEmployeeId),
    state.profileSubTab || "pc"
  );
}

function getInitialAppState() {
  if (typeof window === "undefined") {
    return buildState("home", employees[0], "pc");
  }

  const fromHistory = extractAppState(window.history.state);
  if (fromHistory) return fromHistory;

  try {
    const raw = window.sessionStorage.getItem(APP_STORAGE_KEY);
    if (!raw) return buildState("home", employees[0], "pc");
    const parsed = JSON.parse(raw);
    return buildState(
      parsed.activePage || "home",
      resolveEmployee(parsed.selectedEmployeeId),
      parsed.profileSubTab || "pc"
    );
  } catch {
    return buildState("home", employees[0], "pc");
  }
}

function toHistoryPayload(activePage, selectedEmployee, profileSubTab) {
  return {
    [APP_STATE_KEY]: true,
    activePage,
    selectedEmployeeId: selectedEmployee.id,
    profileSubTab
  };
}

function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function App() {
  const initialAppState = getInitialAppState();
  const [activePage, setActivePage] = useState(initialAppState.activePage);
  const [selectedEmployee, setSelectedEmployee] = useState(initialAppState.selectedEmployee);
  const [profileSubTab, setProfileSubTab] = useState(initialAppState.profileSubTab);

  function applyState(nextState) {
    setActivePage(nextState.activePage);
    setSelectedEmployee(nextState.selectedEmployee);
    setProfileSubTab(nextState.profileSubTab);
  }

  function resolveState(partial) {
    const nextPage = partial.activePage ?? activePage;
    const nextEmployee = partial.selectedEmployee ?? selectedEmployee;
    const nextSubTab = partial.profileSubTab ?? profileSubTab;
    return {
      activePage: nextPage,
      selectedEmployee: nextEmployee,
      profileSubTab: nextSubTab
    };
  }

  function commitNavigation(partial, push = true) {
    const resolved = resolveState(partial);
    applyState(resolved);

    if (push) {
      window.history.pushState(toHistoryPayload(resolved.activePage, resolved.selectedEmployee, resolved.profileSubTab), "");
    }
  }

  useEffect(() => {
    function onPopState(event) {
      const restored = extractAppState(event.state);
      if (!restored) {
        applyState({
          activePage: "home",
          selectedEmployee: employees[0],
          profileSubTab: "pc"
        });
        return;
      }
      applyState(restored);
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const payload = toHistoryPayload(activePage, selectedEmployee, profileSubTab);
    window.history.replaceState(payload, "");
    window.sessionStorage.setItem(APP_STORAGE_KEY, JSON.stringify(payload));
  }, [activePage, profileSubTab, selectedEmployee]);

  const pageNode = useMemo(() => {
    if (activePage === "home") {
      return (
        <Home
          employees={employees}
          onSelectProfile={(employee) => {
            commitNavigation({
              activePage: "profile",
              selectedEmployee: employee,
              profileSubTab: "pc"
            });
          }}
        />
      );
    }

    if (activePage === "profile") {
      return (
        <ProfilePage
          employee={selectedEmployee}
          employees={employees}
          onSelectProfile={(employee) =>
            commitNavigation({
              activePage: "profile",
              selectedEmployee: employee
            })
          }
          profileSubTab={profileSubTab}
          onProfileSubTabChange={(tabId) =>
            commitNavigation({
              activePage: "profile",
              profileSubTab: tabId
            })
          }
        />
      );
    }

    if (activePage === "pc") return <PC employees={employees} />;
    if (activePage === "tq") return <TQ employees={employees} />;
    if (activePage === "ts") return <TS employees={employees} />;
    if (activePage === "skills") return <Skills employees={employees} />;
    if (activePage === "training") return <Training />;
    return <Analysis employees={employees} />;
  }, [activePage, profileSubTab, selectedEmployee]);

  return (
    <main className="app-shell">
      <header className="top-nav" aria-label="Pages">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`top-nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() =>
              commitNavigation({
                activePage: item.id
              })
            }
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
