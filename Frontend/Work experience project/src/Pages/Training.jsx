import { useState, useEffect } from "react";

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
        <p className="muted">
          Trend view of how many training sessions were delivered each month.
        </p>

        <div className="month-bars">
          {months.map((item) => (
            <div key={item.month} className="month-item">
              <div className="month-bar-pair">

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

              </div>
              <small>{item.month}</small>
            </div>
          ))}
        </div>

        <div className="panel-box">
          <h3>Training Status</h3>

          <div className="h-bars">
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
          </div>
        </div>

        <div className="panel-box">
          <h3>Training Types</h3>

          <div className="type-bars">
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
          </div>
        </div>

      </div>
    </section>
  );
}

export default Training;
