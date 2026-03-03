import { useEffect, useState } from "react";

function Home() {
const [profile, setProfile] = useState(null);

useEffect(() => {
  fetch("http://localhost:5000/api/profile")
    .then(async (res) => {
        const text = await res.text();
        console.log("RAW response", text);

        return JSON.parse(text);
    } )
    .then(data => setProfile(data))
    .catch(err => console.error("FETCH ERROR:", err));
}, []);

    return(
        <div>
            <h1>Hello</h1>

            {profile && (
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      )}
        </div>
    )
}

export default Home;