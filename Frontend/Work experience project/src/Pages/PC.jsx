// import { useEffect, useState } from "react";

// function PC({employee}) {
//   const [certificates, setCertificates] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     if (!employee || !employee.userId) {
//     console.warn("No employee or userId available");
//     setLoading(false);
//     return;
//   }

//     fetch(`http://localhost:5000/api/profile/${employee.userId}`)
//     .then((res) => {
//       if (!res.ok){
//         throw new Error(`HTTP error ${res.status}`);
//       }
//       return res.json();
//     })

//     .then((data) => {
//       // setProfile(data);
//       setCertificates(data.professionalCertificates);
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
//       <h1 className="page-title">Professional certificates</h1>
//       <p className="muted">Quick reference of active certifications per team member. Placeholder data can be replaced with real records.</p>

//       <div className="cards-grid">
//         {certificates.map((cert, index) => (
//           <article key={cert._id} className="cert-card">
//             <h3>{cert.title}</h3>
//             <p>{cert.organisation}</p>
//             <small>{cert.year}</small>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default PC;

import { useEffect, useState } from "react";

function PC({ employee }) {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!employee || !employee.userId) {
      console.warn("No employee or userId available");
      setCertificates([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`http://localhost:5000/api/profile/${employee.userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCertificates(data.professionalCertificates || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error", err);
        setCertificates([]);
        setLoading(false);
      });

  }, [employee]);

  if (loading) return <p>Loading certificates…</p>;

  return (
    <section className="page-shell">
      <h1 className="page-title">Professional certificates</h1>

      <p className="muted">
        Quick reference of active certifications per team member.
      </p>

      <div className="cards-grid">

        {certificates.length === 0 ? (
          <p className="muted">No certificates found.</p>
        ) : (
          certificates.map((cert, index) => (
            <article key={cert._id || index} className="cert-card">
              <h3>{cert.title || "Certificate"}</h3>
              <p>{cert.organisation || "Organisation"}</p>
              <small>{cert.year || "-"}</small>
            </article>
          ))
        )}

      </div>
    </section>
  );
}

export default PC;