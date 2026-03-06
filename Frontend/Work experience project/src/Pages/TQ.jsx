// import { useEffect, useState } from "react";

// function TQ({employee}) {
//   const [qualifications, setQualifications] = useState([]);
//   const [loading, setLoading] = useState(true);


//   useEffect(() =>{
//     if (!employee) return;

//     fetch(`http://localhost:5000/api/profile/${employee.userId}`)
//     .then((res) => {
//       if (!res.ok){
//         throw new Error(`HTTP error ${res.status}`);
//       }
//       return res.json();
//     })

//     .then((data) => {
//       setQualifications(data.technicalQualifications || []);
//       setLoading(false);
//     })
//     .catch((err) => {
//       console.error("Fetch error", err);
//       setLoading(false);
//     });
//   }, [employee]);


//   if (loading) return <p>Loading certificates…</p>;

//   return (
//     <section className="page-shell">
//       <h1 className="page-title">Technical qualifications</h1>
//       <p className="muted">Baseline qualifications by category. Pulls directly from employee profile data.</p>

//       <table className="matrix-table">
//         <thead>
//           <tr>
//             <th>Category</th>
//             <th>Technical Qualifications</th>
//           </tr>
//         </thead>
//         <tbody>
//           {qualifications.map((item, index) => (
//               <tr key={item.category + index}>
//                 <td>{item.category}</td>
//                 <td>{item.tq.join(", ")}</td>
//               </tr>
//           ))}
//         </tbody>
//       </table>
//     </section>
//   );
// }

// export default TQ;

import { useEffect, useState } from "react";

function TQ({ employee }) {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!employee || !employee.userId) {
      console.warn("No employee or userId available");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/profile/${employee.userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setQualifications(data.technicalQualifications || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [employee]);

  if (loading) return <p>Loading qualifications…</p>;

  return (
    <section className="page-shell">
      <h1 className="page-title">Technical qualifications</h1>
      <p className="muted">
        Baseline qualifications by category. Pulls directly from employee profile data.
      </p>

      <table className="matrix-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Technical Qualifications</th>
          </tr>
        </thead>

        <tbody>
          {qualifications.map((item, index) => (
            <tr key={item.category + index}>
              <td>{item.category}</td>
              <td>{item.tq?.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TQ;