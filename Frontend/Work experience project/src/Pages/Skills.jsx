// const skillRows = [
//   { label: "Communication", key: "communication" },
//   { label: "Presentation skills", key: "presentation" },
//   { label: "Teamwork", key: "teamwork" },
//   { label: "Leadership potential", key: "leadership" },
//   { label: "Time management", key: "timeManagement" },
//   { label: "Client confidence", key: "clientConfidence" },
//   { label: "Problem solving", key: "problemSolving" }
// ];

// function Skills({ employees }) {
//   const people = employees;

//   return (
//     <section className="page-shell">
//       <h1 className="page-title">Soft skills and people development</h1>
//       <p className="muted">People capability ratings used for coaching plans and project role matching.</p>

//       <div className="table-scroll">
//         <table className="matrix-table matrix-five">
//           <thead>
//             <tr>
//               <th>Skill</th>
//               {people.map((member) => (
//                 <th key={member.id}>{member.name.split(" ")[0]}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {skillRows.map((row) => (
//               <tr key={row.key}>
//                 <td>{row.label}</td>
//                 {people.map((member) => (
//                   <td key={member.id + row.key}>{member.softRatings[row.key]}</td>
//                 ))}
//               </tr>
//             ))}
//             <tr>
//               <td>Overall</td>
//               {people.map((member) => {
//                 const values = Object.values(member.softRatings);
//                 const avg = (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1);
//                 return <td key={member.id + "overall-soft"}>{avg}</td>;
//               })}
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <p className="scale-note">1 - No competence | 2 - Low competence | 3 - Some competence | 4 - High competence | 5 - Expert</p>
//     </section>
//   );
// }

// export default Skills;


import { useEffect, useState } from "react";

// const skillRows = [
//   { label: "Communication", key: "communication" },
//   { label: "Presentation skills", key: "presentation" },
//   { label: "Teamwork", key: "teamwork" },
//   { label: "Leadership potential", key: "leadership" },
//   { label: "Time management", key: "timeManagement" },
//   { label: "Client confidence", key: "clientConfidence" },
//   { label: "Problem solving", key: "problemSolving" }
// ];

const skillRows = [
  { label: "Communication", key: "communication" },
  { label: "Presentation skills", key: "presentationskills" },
  { label: "Teamwork", key: "teamwork" },
  { label: "Leadership potential", key: "leadership" },
  { label: "Time management", key: "timemanagement" },
  { label: "Client confidence", key: "clientconfidence" },
  { label: "Problem solving", key: "problemsolving" }
];

// Helper to map Mongo softSkills array to a lookup object
function mapSoftSkillsArray(softSkillsArray) {
  const map = {};
  (softSkillsArray || []).forEach((item) => {
    const key = item.skills
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace("potential", ""); // match your skillRows keys
    map[key] = item.level;
  });
  return map;
}

function Skills() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/profile")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profiles");
        return res.json();
      })
      .then((data) => {
        // map each employee's softSkills array to softRatings object
        const mapped = (data || []).map((employee) => ({
          ...employee,
          softRatings: mapSoftSkillsArray(employee.softSkills)
        }));
        setPeople(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setPeople([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading skills...</p>;

  return (
    <section className="page-shell">
      <h1 className="page-title">Soft skills and people development</h1>
      <p className="muted">
        People capability ratings used for coaching plans and project role matching.
      </p>

      <div className="table-scroll">
        <table className="matrix-table matrix-five">
          <thead>
            <tr>
              <th>Skill</th>
              {people.map((member) => (
                <th key={member.userId}>
                  {(member.name || member.userId || "").split("-")[0]}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {skillRows.map((row) => (
              <tr key={row.key}>
                <td>{row.label}</td>
                {people.map((member) => (
                  <td key={member.userId + row.key}>
                    {member.softRatings?.[row.key] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}

            <tr>
              <td>Overall</td>
              {people.map((member) => {
                const values = Object.values(member.softRatings || {});
                const avg =
                  values.length > 0
                    ? (
                        values.reduce((sum, value) => sum + value, 0) /
                        values.length
                      ).toFixed(1)
                    : "-";
                return (
                  <td key={member.userId + "overall-soft"}>
                    <strong>{avg}</strong>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="scale-note">
        1 - No competence | 2 - Low competence | 3 - Some competence | 4 - High competence | 5 - Expert
      </p>
    </section>
  );
}

export default Skills;