import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

export default function Aircraft() {
  const [aircraft, setAircraft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState("");
  const [airlineName, setAirlineName] = useState("");
  const [numberOfPassengers, setNumberOfPassengers] = useState("");
  const [editingId, setEditingId] = useState(null);




  useEffect(() => {
    api.get("/aircraft")
      .then(data => setAircraft(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

function handleCreate() {
    api
      .post("/aircraft", {
        type: type,
        airlineName: airlineName,
        numberOfPassengers: Number(numberOfPassengers),
      })
      .then((newAircraft) => {
        setAircraft([...aircraft, newAircraft]);
        setType("");
        setAirlineName("");
        setNumberOfPassengers("");
      })
      .catch((err) => setError(err.message));
  }

  function handleDelete(id) {
    api
      .delete("/aircraft/" + id)
      .then(() => setAircraft(aircraft.filter((a) => a.id !== id)))
      .catch((err) => setError(err.message));
  }

  function handleEditClick(a) {
    setEditingId(a.id);
    setType(a.type);
    setAirlineName(a.airlineName);
    setNumberOfPassengers(a.numberOfPassengers);
  }

  function handleUpdate() {
    api
      .put("/aircraft/" + editingId, {
        type: type,
        airlineName: airlineName,
        numberOfPassengers: Number(numberOfPassengers),
      })
      .then((updated) => {
        setAircraft(aircraft.map((a) => (a.id === editingId ? updated : a)));
        setEditingId(null);
        setType("");
        setAirlineName("");
        setNumberOfPassengers("");
      })
      .catch((err) => setError(err.message));
  }


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;




  return (
    <div>
      <h1>Aircraft</h1>
      <div>
        <input
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          placeholder="Airline"
          value={airlineName}
          onChange={(e) => setAirlineName(e.target.value)}
        />
        <input
          placeholder="Passengers"
          value={numberOfPassengers}
          onChange={(e) => setNumberOfPassengers(e.target.value)}
        />
        <button onClick={editingId ? handleUpdate : handleCreate}>
          {editingId ? "Save Changes" : "Add Aircraft"}
        </button>
      </div>
      <table>
               <thead>
          <tr>
            <th>Type</th>
            <th>Airline</th>
            <th>Passengers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {aircraft.map(a => (
            <tr key={a.id}>
              <td>{a.type}</td>
              <td>{a.airlineName}</td>
              <td>{a.numberOfPassengers}</td>
              <td>
                <button onClick={() => handleEditClick(a)}>Edit</button>
                <button onClick={() => handleDelete(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}