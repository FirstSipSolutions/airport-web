import { useEffect, useState } from "react";
import { api } from "../lib/api.js";





export default function Cities() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/cities")
      .then(data => setCities(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Cities</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Province</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {cities.map(city => (
            <tr key={city.id}>
              <td>{city.name}</td>
              <td>{city.state}</td>
              <td>{city.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}