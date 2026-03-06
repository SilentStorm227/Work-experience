<<<<<<< HEAD
function Training() {
  const months = [
    { month: "Jan", completed: 5, ongoing: 2 },
    { month: "Feb", completed: 3, ongoing: 2 },
    { month: "Mar", completed: 5, ongoing: 1 },
    { month: "Apr", completed: 4, ongoing: 2 },
    { month: "May", completed: 5, ongoing: 1 },
    { month: "Jun", completed: 4, ongoing: 2 },
    { month: "Jul", completed: 2, ongoing: 3 },
    { month: "Aug", completed: 5, ongoing: 2 },
    { month: "Sep", completed: 4, ongoing: 2 },
    { month: "Oct", completed: 6, ongoing: 1 },
    { month: "Nov", completed: 3, ongoing: 2 },
    { month: "Dec", completed: 2, ongoing: 3 }
  ];
  const statusData = [
    { label: "Completed", value: 19, css: "status-completed" },
    { label: "In progress", value: 8, css: "status-progress" },
    { label: "Not started", value: 21, css: "status-not-started" }
  ];
  const maxStatus = Math.max(...statusData.map((item) => item.value));
  const typeData = [
    { label: "Online", value: 28, css: "type-online", height: 90 },
    { label: "In-house", value: 16, css: "type-house", height: 65 },
    { label: "External", value: 4, css: "type-external", height: 20 }
  ];
=======
// import { useEffect, useState } from "react";

// const MONTH_LABELS = [
//   ["jan", "Jan"], ["feb", "Feb"], ["mar", "Mar"], ["apr", "Apr"],
//   ["may", "May"], ["jun", "Jun"], ["jul", "Jul"], ["aug", "Aug"],
//   ["sep", "Sep"], ["oct", "Oct"], ["nov", "Nov"], ["dec", "Dec"]
// ];

// function Training({employee}) {
//   const [dashboard, setDashboard] = useState(null);
//   const [status, setStatus] = useState(null);
//   const [type, setType] = useState(null);
//   const [months, setMonths] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/profile/${employee.userId}`)

//       .then((res) => {
//         if (!res.ok) throw new Error(`HTTP error ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         const monthlyData = data.trainingDashboard.monthly;

//         const formattedMonths = MONTH_LABELS.map(([key, label]) => {
//           const m = monthlyData[key] || { total: 0, completed: 0 };
//           return {
//             month: label,
//             completed: m.completed,
//             ongoing: m.total - m.completed
//           };
//         });

//         setDashboard(data.trainingDashboard);
//         setStatus(data.trainingStatus);
//         setType(data.trainingtype);
//         setMonths(formattedMonths);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("fetch error", err);
//         setLoading(false);
//       });
//   }, [employee]);

//   if (loading) return <p>Loading certificates…</p>;

//   return (
//     <section className="page-shell training-layout">
//       <aside className="stat-col">

//         <h3>Training Numbers</h3>
//         <div className="stat-box">{dashboard.totalTrainings}</div>

//         <h3>Hours</h3>
//         <div className="stat-box">{dashboard.totalHours} </div>

//         <p className="muted compact">Placeholder metrics based on one quarter of activity.</p>
//       </aside>

//       <div className="training-main">
//         <h2 className="section-title">Monthly Training Numbers</h2>
//         <p className="muted">Trend view of how many training sessions were delivered each month.</p>

//         {/* <div className="month-legend">
//           <span><i className="month-legend-box month-bar-completed" />Completed</span>
//           <span><i className="month-legend-box month-bar-ongoing" />Ongoing</span>
//         </div> */}

//         <div className="month-bars">
//           {months.map((item) => (
//             <div key={item.month} className="month-item">
//               <div className="month-bar-pair">
//                 <div className="month-bar-group">
//                   <span className="month-value">{item.completed}</span>
//                   <div style={{ height: `${item.completed * 12}px` }} className="month-bar month-bar-completed" />
//                 </div>
//                 <div className="month-bar-group">
//                   <span className="month-value">{item.ongoing}</span>
//                   <div style={{ height: `${item.ongoing * 12}px` }} className="month-bar month-bar-ongoing" />
//                 </div>
//               </div>
//               <small>{item.month}</small>
//             </div>
//           ))}
//         </div>

//         <div className="panel-box">
//           <h3>Training Status</h3>
//           <div className="h-bars">
//             <div><label>Completed</label><span style={{ width: `${status.completed}%` }} className="status-completed" /></div>
//             <div><label>In progress</label><span style={{ width: `${status.inProgress}%` }} className="status-progress" /></div>
//             <div><label>Not started</label><span style={{ width: `${status.NotStarted}%` }} className="status-not-started" /></div>
//             <div><label>Cancelled</label><span style={{ width: `${status.cancelled}%` }} className="status-not-started" /></div>
//           </div>
//         </div>

//         <div className="panel-box">
//           <h3>Training Types</h3>
//           <div className="type-bars">
//             <div><span className="type-online" style={{ height: `${type.online}px` }} />Online</div>
//             <div><span className="type-house" style={{ height: `${type.inHouse}px` }} />In-house</div>
//             <div><span className="type-external" style={{ height: `${type.External}px` }} />External</div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Training;

import { useEffect, useState } from "react";

const MONTH_LABELS = [
  ["jan", "Jan"], ["feb", "Feb"], ["mar", "Mar"], ["apr", "Apr"],
  ["may", "May"], ["jun", "Jun"], ["jul", "Jul"], ["aug", "Aug"],
  ["sep", "Sep"], ["oct", "Oct"], ["nov", "Nov"], ["dec", "Dec"]
];

function Training({ employee }) {
  const [dashboard, setDashboard] = useState(null);
  const [status, setStatus] = useState(null);
  const [type, setType] = useState(null);
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!employee || !employee.userId) {
      console.warn("No employee selected");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/profile/${employee.userId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {

        const monthlyData = data.trainingDashboard?.monthly || {};

        const formattedMonths = MONTH_LABELS.map(([key, label]) => {
          const m = monthlyData[key] || { total: 0, completed: 0 };

          return {
            month: label,
            completed: m.completed,
            ongoing: m.total - m.completed
          };
        });

        setDashboard(data.trainingDashboard || {});
        setStatus(data.trainingStatus || {});
        setType(data.trainingtype || {});
        setMonths(formattedMonths);
        setLoading(false);
      })
      .catch((err) => {
        console.error("fetch error", err);
        setLoading(false);
      });

  }, [employee]);

  if (loading) return <p>Loading training dashboard…</p>;
>>>>>>> 36cf12c (all commits)

  return (
    <section className="page-shell training-layout">

      <aside className="stat-col">
        <h3>Training Numbers</h3>
        <div className="stat-box">{dashboard?.totalTrainings || 0}</div>

        <h3>Hours</h3>
        <div className="stat-box">{dashboard?.totalHours || 0}</div>

        <p className="muted compact">
          Placeholder metrics based on one quarter of activity.
        </p>
      </aside>

      <div className="training-main">
        <h2 className="section-title">Monthly Training Numbers</h2>
<<<<<<< HEAD
        <p className="muted">Trend view of how many training sessions were delivered each month.</p>
        <div className="month-legend">
          <span><i className="month-legend-box month-bar-completed" />Completed</span>
          <span><i className="month-legend-box month-bar-ongoing" />Ongoing</span>
        </div>
=======
        <p className="muted">
          Trend view of how many training sessions were delivered each month.
        </p>

>>>>>>> 36cf12c (all commits)
        <div className="month-bars">
          {months.map((item) => (
            <div key={item.month} className="month-item">
              <div className="month-bar-pair">
<<<<<<< HEAD
                <div className="month-bar-group">
                  <span className="month-value">{item.completed}</span>
                  <div style={{ height: `${item.completed * 12}px` }} className="month-bar month-bar-completed" />
                </div>
                <div className="month-bar-group">
                  <span className="month-value">{item.ongoing}</span>
                  <div style={{ height: `${item.ongoing * 12}px` }} className="month-bar month-bar-ongoing" />
                </div>
=======

                <div className="month-bar-group">
                  <span className="month-value">{item.completed}</span>
                  <div
                    style={{ height: `${item.completed * 12}px` }}
                    className="month-bar month-bar-completed"
                  />
                </div>

                <div className="month-bar-group">
                  <span className="month-value">{item.ongoing}</span>
                  <div
                    style={{ height: `${item.ongoing * 12}px` }}
                    className="month-bar month-bar-ongoing"
                  />
                </div>

>>>>>>> 36cf12c (all commits)
              </div>
              <small>{item.month}</small>
            </div>
          ))}
        </div>

        <div className="panel-box">
          <h3>Training Status</h3>

          <div className="h-bars">
<<<<<<< HEAD
            {statusData.map((item) => (
              <div key={item.label}>
                <label>{item.label}</label>
                <span
                  style={{ width: `${(item.value / maxStatus) * 100}%` }}
                  className={item.css}
                />
                <em>{item.value}</em>
              </div>
            ))}
=======
            <div>
              <label>Completed</label>
              <span style={{ width: `${status?.completed || 0}%` }} className="status-completed" />
            </div>

            <div>
              <label>In progress</label>
              <span style={{ width: `${status?.inProgress || 0}%` }} className="status-progress" />
            </div>

            <div>
              <label>Not started</label>
              <span style={{ width: `${status?.NotStarted || 0}%` }} className="status-not-started" />
            </div>

            <div>
              <label>Cancelled</label>
              <span style={{ width: `${status?.cancelled || 0}%` }} className="status-not-started" />
            </div>
>>>>>>> 36cf12c (all commits)
          </div>
        </div>

        <div className="panel-box">
          <h3>Training Types</h3>

          <div className="type-bars">
<<<<<<< HEAD
            {typeData.map((item) => (
              <div key={item.label}>
                <b>{item.value}</b>
                <span className={item.css} style={{ height: `${item.height}px` }} />
                {item.label}
              </div>
            ))}
=======
            <div>
              <span className="type-online" style={{ height: `${type?.online || 0}px` }} />
              Online
            </div>

            <div>
              <span className="type-house" style={{ height: `${type?.inHouse || 0}px` }} />
              In-house
            </div>

            <div>
              <span className="type-external" style={{ height: `${type?.External || 0}px` }} />
              External
            </div>
>>>>>>> 36cf12c (all commits)
          </div>
        </div>

      </div>
    </section>
  );
}

export default Training;
