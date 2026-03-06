<<<<<<< HEAD
=======
// import { useEffect, useMemo, useState } from "react";
// import "./App.css";
// import Home from "./Pages/Home";
// import PC from "./Pages/PC";
// import TQ from "./Pages/TQ";
// import TS from "./Pages/TS";
// import Skills from "./Pages/Skills";
// import Training from "./Pages/Training";
// import Analysis from "./Pages/Analysis";
// import ProfilePage from "./Pages/ProfilePage";
// // import { employees } from "./Pages/data";
// const [employees, setEmployees] = useState([]);
// const [loadingEmployees, setLoadingEmployees] = useState(true);

// useEffect(() => {
//   fetch("http://localhost:5000/api/profile") // your API returns all profiles
//   .then((res) => {
//     if (!res.ok) throw new Error (`HTTP error ${res.ststus}`);
//     return res.json();
//   })
//   .then((data) => {
//     setEmployees(data);
//     setLoadingEmployees(false);

//      // If no selectedEmployee yet, pick the first one
//      if(!selectedEmployee && data.length > 0){
//       setSelectedEmployee(data[0]);
//      }
//   })
//   .catch((err) => {
//     console.error("Failed to fetch employees", err);
//     setLoadingEmployees(false);
//   });
// }, []);

// const navItems = [
//   { id: "home", label: "Profiles" },
//   { id: "ts", label: "Technical skills" },
//   { id: "skills", label: "Soft Skills & People Development" },
//   { id: "analysis", label: "Overall analysis" }
// ];
// const profileQuickTabs = [
//   { id: "pc", label: "Professional certificates" },
//   { id: "tq", label: "Technical qualifications" },
//   { id: "training", label: "Personal training dashboard" }
// ];

// const APP_STATE_KEY = "__employee_tracker_state__";
// const APP_STORAGE_KEY = "__employee_tracker_state_snapshot__";

// function buildState(activePage, selectedEmployee) {
//   return {
//     activePage,
//     selectedEmployee
//   };
// }

// function resolveEmployee(employeeId) {
//   return employees.find((employee) => employee.id === employeeId) || employees[0];
// }

// function extractAppState(employeeId) {
//   return employees.find((employee) => employee.userId === employeeId) || employees[0];
// }

// function getInitialAppState() {
//   if (typeof window === "undefined") {
//     return buildState("home", employees[0] || null2);
//   }

//   const fromHistory = extractAppState(window.history.state);
//   if (fromHistory) return fromHistory;

//   try {
//     const raw = window.sessionStorage.getItem(APP_STORAGE_KEY);
//     if (!raw) return buildState("home", employees[0] || null);
//     const parsed = JSON.parse(raw);
//     return buildState(parsed.activePage || "home", resolveEmployee(parsed.selectedEmployeeId));
//   } catch {
//     return buildState("home", employees[0] || null);
//   }
// }

// function toHistoryPayload(activePage, selectedEmployee) {
//   return {
//     [APP_STATE_KEY]: true,
//     activePage,
//     selectedEmployeeId: selectedEmployee.id
//   };
// }

// function initials(name) {
//   return name
//     .split(" ")
//     .slice(0, 2)
//     .map((part) => part[0])
//     .join("");
// }

// function App() {
//   const initialAppState = getInitialAppState();
//   const [activePage, setActivePage] = useState(initialAppState.activePage);
//   const [selectedEmployee, setSelectedEmployee] = useState(initialAppState.selectedEmployee);

//   function applyState(nextState) {
//     setActivePage(nextState.activePage);
//     setSelectedEmployee(nextState.selectedEmployee);
//   }

//   function resolveState(partial) {
//     const nextPage = partial.activePage ?? activePage;
//     const nextEmployee = partial.selectedEmployee ?? selectedEmployee;
//     return {
//       activePage: nextPage,
//       selectedEmployee: nextEmployee
//     };
//   }

//   function commitNavigation(partial, push = true) {
//     const resolved = resolveState(partial);
//     applyState(resolved);

//     if (push) {
//       window.history.pushState(toHistoryPayload(resolved.activePage, resolved.selectedEmployee), "");
//     }
//   }

//   useEffect(() => {
//     function onPopState(event) {
//       const restored = extractAppState(event.state);
//       if (!restored) {
//         applyState({
//           activePage: "home",
//           selectedEmployee: employees[0]
//         });
//         return;
//       }
//       applyState(restored);
//     }

//     window.addEventListener("popstate", onPopState);
//     return () => window.removeEventListener("popstate", onPopState);
//   }, []);

//   useEffect(() => {
//     const payload = toHistoryPayload(activePage, selectedEmployee);
//     window.history.replaceState(payload, "");
//     window.sessionStorage.setItem(APP_STORAGE_KEY, JSON.stringify(payload));
//   }, [activePage, selectedEmployee]);

//   const pageNode = useMemo(() => {
//     if (loadingEmployees) return <p>Loading employees...</p>;
//     if (!selectedEmployee) return <p>no employeee delected</p>;

//     if (activePage === "home") return(
//       <Home
//         employees={employees}
//         onSelectProfile={(employee) =>
//           commitNavigation({activePage: "profile", selectedEmployee:employee})
//         }
//         />
//     );

//     if (activePage === "profile") return (
//       <ProfilePage
//         employee={selectedEmployee}
//         employees={employees}
//         onSelectProfile={() =>
//           commitNavigation({ activePage: "profile", selectedEmployee: employee })
//         }
//         onNavigateMainTab={(tabId) => commitNavigation({ activePage: tabId })}
//     />
//     );

//   if (activePage === "pc") return <PC employee={selectedEmployee} />;
//   if (activePage === "tq") return <TQ employee={selectedEmployee} />;
//   if (activePage === "ts") return <TS employees={employees} />;
//   if (activePage === "skills") return <Skills employees={employees} />;
//   if (activePage === "training") return <Training employee={selectedEmployee} />;
//   return <Analysis employees={employees} />;
// }, [activePage, selectedEmployee, employees, loadingEmployees]);

//   return (
//     <main className="app-shell">
//       <header className="top-nav" aria-label="Pages">
//         {navItems.map((item) => (
//           <button
//             type="button"
//             key={item.id}
//             className={`top-nav-item ${activePage === item.id ? "active" : ""}`}
//             onClick={() =>
//               commitNavigation({
//                 activePage: item.id
//               })
//             }
//           >
//             {item.label}
//           </button>
//         ))}
//         {activePage === "profile" && (
//           <div className="profile-top-tab" aria-label="Selected employee profile">
//             <div className="profile-top-avatar">{initials(selectedEmployee.name)}</div>
//             <div className="profile-top-name">{selectedEmployee.name}</div>
//           </div>
//         )}
//       </header>

//       {(activePage === "pc" || activePage === "tq" || activePage === "training") && (
//         <div className="global-profile-shortcuts">
//           <div className="profile-sub-nav profile-sub-nav-main">
//             {profileQuickTabs.map((tab) => (
//               <button
//                 type="button"
//                 key={tab.id}
//                 className={`profile-sub-tab profile-sub-tab-main ${activePage === tab.id ? "active" : ""}`}
//                 onClick={() =>
//                   commitNavigation({
//                     activePage: tab.id
//                   })
//                 }
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {pageNode}
//     </main>
//   );
// }

// export default App;

>>>>>>> 36cf12c (all commits)
import { useEffect, useMemo, useState } from "react";
import "./App.css";

import Home from "./Pages/Home";
import PC from "./Pages/PC";
import TQ from "./Pages/TQ";
import TS from "./Pages/TS";
import Skills from "./Pages/Skills";
import Training from "./Pages/Training";
import Analysis from "./Pages/Analysis";
import DueBonus from "./Pages/DueBonus";
import ProfilePage from "./Pages/ProfilePage";
import Bonus from "./Pages/DueBonus"

const navItems = [
  { id: "home", label: "Profiles" },
  { id: "ts", label: "Technical skills" },
  { id: "skills", label: "Soft Skills & People Development" },
  { id: "analysis", label: "Overall analysis" },
<<<<<<< HEAD
  { id: "bonus", label: "Due bonus" }
=======
  { id: "Bonus", label: "Bonus" }
>>>>>>> 36cf12c (all commits)
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

const profileQuickTabs = [
  { id: "pc", label: "Professional certificates" },
  { id: "tq", label: "Technical qualifications" },
  { id: "training", label: "Personal training dashboard" }
];

const APP_STATE_KEY = "__employee_tracker_state__";
const APP_STORAGE_KEY = "__employee_tracker_state_snapshot__";

function initials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function App() {
<<<<<<< HEAD
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
=======
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [activePage, setActivePage] = useState("home");
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/profile")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
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

  useEffect(() => {
    if (!selectedEmployee) return;

    const payload = {
      [APP_STATE_KEY]: true,
      activePage,
      selectedEmployeeId: selectedEmployee.userId
    };

    window.history.replaceState(payload, "");
    sessionStorage.setItem(APP_STORAGE_KEY, JSON.stringify(payload));
  }, [activePage, selectedEmployee]);

  useEffect(() => {
    function onPopState(event) {
      const state = event.state;

      if (state && state[APP_STATE_KEY] && employees.length > 0) {
        const employee =
          employees.find((e) => e.userId === state.selectedEmployeeId) ||
          employees[0];

        setSelectedEmployee(employee);
        setActivePage(state.activePage || "home");
      }
>>>>>>> 36cf12c (all commits)
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
<<<<<<< HEAD
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
    if (activePage === "bonus") return <DueBonus />;
    return <Analysis employees={employees} />;
  }, [activePage, selectedEmployee]);
=======
  }, [employees]);

  const commitNavigation = (nextState, push = true) => {
    const resolved = {
      activePage: nextState.activePage ?? activePage,
      selectedEmployee: nextState.selectedEmployee ?? selectedEmployee
    };

    setActivePage(resolved.activePage);
    setSelectedEmployee(resolved.selectedEmployee);

    if (push && resolved.selectedEmployee) {
      window.history.pushState(
        {
          [APP_STATE_KEY]: true,
          activePage: resolved.activePage,
          selectedEmployeeId: resolved.selectedEmployee.userId
        },
        ""
      );
    }
  };

  const pageNode = useMemo(() => {
    if (loadingEmployees) return <p>Loading employees...</p>;
    if (!selectedEmployee) return <p>No employee selected</p>;

    switch (activePage) {
      case "home":
        return (
          <Home
            employees={employees}
            onSelectProfile={(employee) =>
              commitNavigation({ activePage: "profile", selectedEmployee: employee })
            }
          />
        );

      case "profile":
        return (
          <ProfilePage
            employee={selectedEmployee}
            employees={employees}
            onSelectProfile={(employee) =>
              commitNavigation({ activePage: "profile", selectedEmployee: employee })
            }
            onNavigateMainTab={(tabId) =>
              commitNavigation({ activePage: tabId })
            }
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
>>>>>>> 36cf12c (all commits)

  return (
    <main className="app-shell">
      <header className="top-nav">

        {navItems.map((item) => (
          <button
            key={item.id}
            className={`top-nav-item ${activePage === item.id ? "active" : ""}`}
<<<<<<< HEAD
            onClick={() =>
              commitNavigation({
                activePage: item.id
              })
            }
=======
            onClick={() => commitNavigation({ activePage: item.id })}
>>>>>>> 36cf12c (all commits)
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

      {(activePage === "pc" || activePage === "tq" || activePage === "training") && (
        <div className="global-profile-shortcuts">
          <div className="profile-sub-nav profile-sub-nav-main">
            {profileQuickTabs.map((tab) => (
              <button
<<<<<<< HEAD
                type="button"
                key={tab.id}
                className={`profile-sub-tab profile-sub-tab-main ${activePage === tab.id ? "active" : ""}`}
                onClick={() =>
                  commitNavigation({
                    activePage: tab.id
                  })
                }
=======
                key={tab.id}
                className={`profile-sub-tab profile-sub-tab-main ${
                  activePage === tab.id ? "active" : ""
                }`}
                onClick={() => commitNavigation({ activePage: tab.id })}
>>>>>>> 36cf12c (all commits)
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