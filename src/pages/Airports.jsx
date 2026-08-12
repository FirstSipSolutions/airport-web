import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

export default function Airports() {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //added in more use states 

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [cityId, setCityId] = useState("");
  //airports was not rendering so added a console log here
  useEffect(() => {
    console.log("effect ran");
    api
      .get("/airports")
      .then((data) => {
        console.log("got:", data);
        setAirports(data);
      })
      .catch((err) => {
        console.log("failed:", err);
        setError(err.message);
      })
      .finally(() => {
        console.log("finally");
        setLoading(false);
      });
  }, []);

  // CREATE PART - this is part of the crud that is being built out
    function handleCreate() {
    api
      .post("/airports", {
        name: name,
        code: code,
        city: { id: Number(cityId) },
      })
      .then((newAirport) => {
        setAirports([...airports, newAirport]);
        setName("");
        setCode("");
        setCityId("");
      })
      .catch((err) => setError(err.message));
  }


     // DELETE PART
  function handleDelete(id) {
    api
      .delete("/airports/" + id)
      .then(() => {
        setAirports(airports.filter((a) => a.id !== id));
      })
      .catch((err) => setError(err.message));
  }


  //loading handler here
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (


    <div>
      <h1>Airports</h1>
            <div>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}/>
        <input
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}/>
        <input
          placeholder="City ID"
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}/>
        <button onClick={handleCreate}>Add Airport</button>
      </div>

 
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {airports.map((airport) => (
            <tr key={airport.id}>
              <td>{airport.code}</td>
              <td>{airport.name}</td>
              <td>{airport.city?.name}</td>
               <td>
                <button onClick={() => handleDelete(airport.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



    </div>
  );
}
// adding in state for the application 