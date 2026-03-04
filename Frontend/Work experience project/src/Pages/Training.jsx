function Training() {
  const months = [5, 3, 5, 4, 5, 4, 2, 5, 4, 6, 3, 2];

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
        <div className="month-bars">
          {months.map((value, index) => (
            <div key={index} className="month-item">
              <span>{value}</span>
              <div style={{ height: `${value * 12}px` }} className="month-bar" />
              <small>{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}</small>
            </div>
          ))}
        </div>

        <div className="panel-box">
          <h3>Training Status</h3>
          <div className="h-bars">
            <div><label>Completed</label><span style={{ width: "32%" }} className="status-completed" /></div>
            <div><label>In progress</label><span style={{ width: "12%" }} className="status-progress" /></div>
            <div><label>Not started</label><span style={{ width: "70%" }} className="status-not-started" /></div>
          </div>
        </div>

        <div className="panel-box">
          <h3>Training Types</h3>
          <div className="type-bars">
            <div><span className="type-online" style={{ height: "90px" }} />Online</div>
            <div><span className="type-house" style={{ height: "65px" }} />In-house</div>
            <div><span className="type-external" style={{ height: "20px" }} />External</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Training;