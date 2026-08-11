import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

export default function Airports() {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/airports")
      .then((data) => setAirports(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  //loading handler here
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Airports</h1>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {airports.map((airport) => (
            <tr key={airport.id}>
              <td>{airport.code}</td>
              <td>{airport.name}</td>
              <td>{airport.city?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
