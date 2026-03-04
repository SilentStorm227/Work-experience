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
  { id: "ts", label: "Technical skills" },
  { id: "skills", label: "Soft Skills & People Development" },
  { id: "analysis", label: "Overall analysis" }
];
const profileQuickTabs = [
  { id: "pc", label: "Professional certificates" },
  { id: "tq", label: "Technical qualifications" },
  { id: "training", label: "Personal training dashboard" }
];

const APP_STATE_KEY = "__employee_tracker_state__";
const APP_STORAGE_KEY = "__employee_tracker_state_snapshot__";

function buildState(activePage, selectedEmployee) {
  return {
    activePage,
    selectedEmployee
  };
}

function resolveEmployee(employeeId) {
  return employees.find((employee) => employee.id === employeeId) || employees[0];
}

function extractAppState(state) {
  if (!state || !state[APP_STATE_KEY]) return null;
  return buildState(state.activePage || "home", resolveEmployee(state.selectedEmployeeId));
}

function getInitialAppState() {
  if (typeof window === "undefined") {
    return buildState("home", employees[0]);
  }

  const fromHistory = extractAppState(window.history.state);
  if (fromHistory) return fromHistory;

  try {
    const raw = window.sessionStorage.getItem(APP_STORAGE_KEY);
    if (!raw) return buildState("home", employees[0]);
    const parsed = JSON.parse(raw);
    return buildState(parsed.activePage || "home", resolveEmployee(parsed.selectedEmployeeId));
  } catch {
    return buildState("home", employees[0]);
  }
}

function toHistoryPayload(activePage, selectedEmployee) {
  return {
    [APP_STATE_KEY]: true,
    activePage,
    selectedEmployeeId: selectedEmployee.id
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

  function applyState(nextState) {
    setActivePage(nextState.activePage);
    setSelectedEmployee(nextState.selectedEmployee);
  }

  function resolveState(partial) {
    const nextPage = partial.activePage ?? activePage;
    const nextEmployee = partial.selectedEmployee ?? selectedEmployee;
    return {
      activePage: nextPage,
      selectedEmployee: nextEmployee
    };
  }

  function commitNavigation(partial, push = true) {
    const resolved = resolveState(partial);
    applyState(resolved);

    if (push) {
      window.history.pushState(toHistoryPayload(resolved.activePage, resolved.selectedEmployee), "");
    }
  }

  useEffect(() => {
    function onPopState(event) {
      const restored = extractAppState(event.state);
      if (!restored) {
        applyState({
          activePage: "home",
          selectedEmployee: employees[0]
        });
        return;
      }
      applyState(restored);
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const payload = toHistoryPayload(activePage, selectedEmployee);
    window.history.replaceState(payload, "");
    window.sessionStorage.setItem(APP_STORAGE_KEY, JSON.stringify(payload));
  }, [activePage, selectedEmployee]);

  const pageNode = useMemo(() => {
    if (activePage === "home") {
      return (
        <Home
          employees={employees}
          onSelectProfile={(employee) => {
            commitNavigation({
              activePage: "profile",
              selectedEmployee: employee
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
          onNavigateMainTab={(tabId) =>
            commitNavigation({
              activePage: tabId
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
  }, [activePage, selectedEmployee]);

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

      {(activePage === "pc" || activePage === "tq" || activePage === "training") && (
        <div className="global-profile-shortcuts">
          <div className="profile-sub-nav profile-sub-nav-main">
            {profileQuickTabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                className={`profile-sub-tab profile-sub-tab-main ${activePage === tab.id ? "active" : ""}`}
                onClick={() =>
                  commitNavigation({
                    activePage: tab.id
                  })
                }
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
