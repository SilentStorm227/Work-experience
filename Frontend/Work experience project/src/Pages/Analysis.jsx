const TECH_KEYS = [
  { key: "programmingLanguages", label: "Programming languages" },
  { key: "systemsKnowledge", label: "Systems knowledge" },
  { key: "softwareTools", label: "Software tools" },
  { key: "industryKnowledge", label: "Industry knowledge" }
];

const SOFT_KEYS = [
  { key: "communication", label: "Communication" },
  { key: "presentation", label: "Presentation skills" },
  { key: "teamwork", label: "Teamwork" },
  { key: "leadership", label: "Leadership potential" },
  { key: "timeManagement", label: "Time management" },
  { key: "clientConfidence", label: "Client confidence" },
  { key: "problemSolving", label: "Problem solving" }
];

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function scoreByKey(employees, key, type) {
  const scores = employees.map((employee) => {
    if (type === "technicalSkills") {
      return employee.technicalSkills?.[key] || 0;
    }

    if (type === "softSkills") {
      const skill = employee.softSkills?.find((s) => s.skills === key);
      return skill?.level || 0;
    }

    return 0;
  });

  return average(scores);
}

function getTopAndBottom(employees, map, type) {
  const scored = map.map((item) => ({
    ...item,
    score: scoreByKey(employees, item.key, type)
  }));

  const sorted = [...scored].sort((a, b) => b.score - a.score);

  return {
    top: sorted.slice(0, 2),
    bottom: sorted.slice(-2)
  };
}

function Analysis({ employees }) {

  const technical = getTopAndBottom(employees, TECH_KEYS, "technicalSkills");
  const soft = getTopAndBottom(employees, SOFT_KEYS, "softSkills");

  const mostCertified = [...employees].sort(
    (a, b) =>
      (b.professionalCertificates?.length || 0) -
      (a.professionalCertificates?.length || 0)
  )[0];

  const avgTech = average(
    employees.map((employee) =>
      average(Object.values(employee.technicalSkills || {}))
    )
  ).toFixed(1);

  const avgSoft = average(
    employees.map((employee) =>
      average(employee.softSkills?.map((s) => s.level) || [])
    )
  ).toFixed(1);

  return (
    <section className="page-shell">

      <h1 className="page-title">Overall analysis</h1>

      <p className="muted">
        Summary generated from profile, skills, qualification,
        certification and training data.
      </p>

      <div className="analysis-grid">

        <article className="analysis-box">
          <h2 className="question">Team snapshot</h2>

          <p className="muted">
            {employees.length} employees in the system.
            Average technical score is {avgTech}/5 and
            average soft skills score is {avgSoft}/5.
            Most certifications belong to {mostCertified?.userId}.
          </p>

        </article>

        <article className="analysis-box">

          <h2 className="question">Where should we invest in development?</h2>

          <p className="muted">
            Lowest technical areas are {technical.bottom[0]?.label} and{" "}
            {technical.bottom[1]?.label}.
            Lowest people skills are {soft.bottom[0]?.label} and{" "}
            {soft.bottom[1]?.label}.
            Focus training here for fastest improvement.
          </p>

        </article>

        <article className="analysis-box">

          <h2 className="question">Technical strengths</h2>

          <p className="muted">
            Strongest technical areas are {technical.top[0]?.label} and{" "}
            {technical.top[1]?.label}.
            These are core team capabilities.
          </p>

        </article>

        <article className="analysis-box">

          <h2 className="question">Business strengths</h2>

          <p className="muted">
            Strongest people skills are {soft.top[0]?.label} and{" "}
            {soft.top[1]?.label}.
            Maintain these while improving weaker areas.
          </p>

        </article>

        <article className="analysis-box">

          <h2 className="question">Training signal</h2>

          <p className="muted">
            Training dashboards indicate strong engagement,
            but further structured learning plans can help
            increase overall capability and project readiness.
          </p>

        </article>

      </div>

    </section>
  );
}

export default Analysis;

// import { useEffect, useState } from "react";

// const TECH_KEYS = [
//   { key: "programmingLanguages", label: "Programming languages" },
//   { key: "systemsKnowledge", label: "Systems knowledge" },
//   { key: "softwareTools", label: "Software tools" },
//   { key: "industryKnowledge", label: "Industry knowledge" }
// ];

// const SOFT_KEYS = [
//   { key: "communication", label: "Communication" },
//   { key: "presentation", label: "Presentation skills" },
//   { key: "teamwork", label: "Teamwork" },
//   { key: "leadership", label: "Leadership potential" },
//   { key: "timeManagement", label: "Time management" },
//   { key: "clientConfidence", label: "Client confidence" },
//   { key: "problemSolving", label: "Problem solving" }
// ];

// function average(values) {
//   if (!values.length) return 0;
//   return values.reduce((sum, value) => sum + value, 0) / values.length;
// }

// function scoreByKey(employees, key, type) {
//   const scores = employees.map((employee) => {
//     if (type === "technicalSkills") {
//       return employee.technicalSkills?.[key] || 0;
//     }

//     if (type === "softSkills") {
//       const skill = employee.softSkills?.find((s) => s.skills === key);
//       return skill?.level || 0;
//     }

//     return 0;
//   });

//   return average(scores);
// }

// function getTopAndBottom(employees, map, type) {
//   const scored = map.map((item) => ({
//     ...item,
//     score: scoreByKey(employees, item.key, type)
//   }));

//   const sorted = [...scored].sort((a, b) => b.score - a.score);

//   return {
//     top: sorted.slice(0, 2),
//     bottom: sorted.slice(-2)
//   };
// }

// function Analysis() {

//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/employees")
//       .then((res) => res.json())
//       .then((data) => setEmployees(data))
//       .catch((err) => console.error(err));
//   }, []);

//   if (employees.length === 0) {
//     return <div className="page-shell">Loading analysis...</div>;
//   }

//   const technical = getTopAndBottom(employees, TECH_KEYS, "technicalSkills");
//   const soft = getTopAndBottom(employees, SOFT_KEYS, "softSkills");

//   const mostCertified = [...employees].sort(
//     (a, b) =>
//       (b.professionalCertificates?.length || 0) -
//       (a.professionalCertificates?.length || 0)
//   )[0];

//   const avgTech = average(
//     employees.map((employee) =>
//       average(Object.values(employee.technicalSkills || {}))
//     )
//   ).toFixed(1);

//   const avgSoft = average(
//     employees.map((employee) =>
//       average(employee.softSkills?.map((s) => s.level) || [])
//     )
//   ).toFixed(1);

//   return (
//     <section className="page-shell">

//       <h1 className="page-title">Overall analysis</h1>

//       <p className="muted">
//         Summary generated from profile, skills, qualification,
//         certification and training data.
//       </p>

//       <div className="analysis-grid">

//         <article className="analysis-box">
//           <h2 className="question">Team snapshot</h2>

//           <p className="muted">
//             {employees.length} employees in the system.
//             Average technical score is {avgTech}/5 and
//             average soft skills score is {avgSoft}/5.
//             Most certifications belong to {mostCertified?.userId}.
//           </p>

//         </article>

//         <article className="analysis-box">

//           <h2 className="question">Where should we invest in development?</h2>

//           <p className="muted">
//             Lowest technical areas are {technical.bottom[0]?.label} and{" "}
//             {technical.bottom[1]?.label}.
//             Lowest people skills are {soft.bottom[0]?.label} and{" "}
//             {soft.bottom[1]?.label}.
//             Focus training here for fastest improvement.
//           </p>

//         </article>

//         <article className="analysis-box">

//           <h2 className="question">Technical strengths</h2>

//           <p className="muted">
//             Strongest technical areas are {technical.top[0]?.label} and{" "}
//             {technical.top[1]?.label}.
//             These are core team capabilities.
//           </p>

//         </article>

//         <article className="analysis-box">

//           <h2 className="question">Business strengths</h2>

//           <p className="muted">
//             Strongest people skills are {soft.top[0]?.label} and{" "}
//             {soft.top[1]?.label}.
//             Maintain these while improving weaker areas.
//           </p>

//         </article>

//         <article className="analysis-box">

//           <h2 className="question">Training signal</h2>

//           <p className="muted">
//             Training dashboards indicate strong engagement,
//             but further structured learning plans can help
//             increase overall capability and project readiness.
//           </p>

//         </article>

//       </div>

//     </section>
//   );
// }

// export default Analysis;