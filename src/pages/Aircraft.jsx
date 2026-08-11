import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

export default function Aircraft() {
  const [aircraft, setAircraft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/aircraft")
      .then(data => setAircraft(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Aircraft</h1>
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Airline</th>
          </tr>
        </thead>
        <tbody>
          {aircraft.map(a => (
            <tr key={a.id}>
              <td>{a.model}</td>
              <td>{a.airline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}