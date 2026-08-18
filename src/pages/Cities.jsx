import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { randomColor } from "../lib/randomColor.js";

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // here is for the crud op

  const [name, setName] = useState("");
  const [stateField, setStateField] = useState("");
  const [population, setPopulation] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    api
      .get("/cities/getall")
      .then((data) => setCities(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function handleCreate() {
    api
      .post("/cities/createnew", {
        name: name,
        state: stateField,
        population: Number(population),
      })
      .then((newCity) => {
        setCities([...cities, newCity]);
        setName("");
        setStateField("");
        setPopulation("");
      })
      .catch((err) => setError(err.message));
  }

  function handleDelete(id) {
    api
      .delete("/cities/delete/id/" + id)
      .then(() => setCities(cities.filter((c) => c.id !== id)))
      .catch((err) => setError(err.message));
  }

  function handleEditClick(city) {
    setEditingId(city.id);
    setName(city.name);
    setStateField(city.state);
    setPopulation(city.population);
  }

  function handleUpdate() {
    api
      .put("/cities/update/id/" + editingId, {
        name: name,
        state: stateField,
        population: Number(population),
      })
      .then((updated) => {
        setCities(cities.map((c) => (c.id === editingId ? updated : c)));
        setEditingId(null);
        setName("");
        setStateField("");
        setPopulation("");
      })
      .catch((err) => setError(err.message));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Cities</h1>

      <div>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Province"
          value={stateField}
          onChange={(e) => setStateField(e.target.value)}
        />
        <input
          placeholder="Population"
          value={population}
          onChange={(e) => setPopulation(e.target.value)}
        />
        <button
          onClick={editingId ? handleUpdate : handleCreate}
          onMouseEnter={(e) => (e.target.style.color = randomColor())}
          onMouseLeave={(e) => (e.target.style.color = "")}
        >
          {editingId ? "Save Changes" : "Add City"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Province</th>
            <th>Population</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.id}>
              <td>{city.name}</td>
              <td>{city.state}</td>
              <td>{city.population}</td>
               <td>
                <button
                  onClick={() => handleEditClick(city)}
                  onMouseEnter={(e) => (e.target.style.color = randomColor())}
                  onMouseLeave={(e) => (e.target.style.color = "")}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(city.id)}
                  onMouseEnter={(e) => (e.target.style.color = randomColor())}
                  onMouseLeave={(e) => (e.target.style.color = "")}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
