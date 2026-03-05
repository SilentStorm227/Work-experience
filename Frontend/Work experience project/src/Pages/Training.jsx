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

  return (
    <section className="page-shell training-layout">
      <aside className="stat-col">
        <h3>Training Numbers</h3>
        <div className="stat-box">48</div>
        <h3>Hours</h3>
        <div className="stat-box">60</div>
        <p className="muted compact">Placeholder metrics based on one quarter of activity.</p>
      </aside>

      <div className="training-main">
        <h2 className="section-title">Monthly Training Numbers</h2>
        <p className="muted">Trend view of how many training sessions were delivered each month.</p>
        <div className="month-legend">
          <span><i className="month-legend-box month-bar-completed" />Completed</span>
          <span><i className="month-legend-box month-bar-ongoing" />Ongoing</span>
        </div>
        <div className="month-bars">
          {months.map((item) => (
            <div key={item.month} className="month-item">
              <div className="month-bar-pair">
                <div className="month-bar-group">
                  <span className="month-value">{item.completed}</span>
                  <div style={{ height: `${item.completed * 12}px` }} className="month-bar month-bar-completed" />
                </div>
                <div className="month-bar-group">
                  <span className="month-value">{item.ongoing}</span>
                  <div style={{ height: `${item.ongoing * 12}px` }} className="month-bar month-bar-ongoing" />
                </div>
              </div>
              <small>{item.month}</small>
            </div>
          ))}
        </div>

        <div className="panel-box">
          <h3>Training Status</h3>
          <div className="h-bars">
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
          </div>
        </div>

        <div className="panel-box">
          <h3>Training Types</h3>
          <div className="type-bars">
            {typeData.map((item) => (
              <div key={item.label}>
                <b>{item.value}</b>
                <span className={item.css} style={{ height: `${item.height}px` }} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Training;
