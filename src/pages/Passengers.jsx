import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { randomColor } from "../lib/randomColor.js";

export default function Passengers() {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cityId, setCityId] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    api
      .get("/passengers/getall")
      .then((data) => setPassengers(data.content))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function handleCreate() {
    api
      .post("/passengers/createnew", {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        city: { id: Number(cityId) },
      })
      .then((newPassenger) => {
        setPassengers([...passengers, newPassenger]);
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setCityId("");
      })
      .catch((err) => setError(err.message));
  }

  function handleDelete(id) {
    api
      .delete("/passengers/delete/id/" + id)
      .then(() => setPassengers(passengers.filter((p) => p.id !== id)))
      .catch((err) => setError(err.message));
  }

  function handleEditClick(p) {
    setEditingId(p.id);
    setFirstName(p.firstName);
    setLastName(p.lastName);
    setPhoneNumber(p.phoneNumber);
    setCityId(p.city?.id || "");
  }

  function handleUpdate() {
    api
      .put("/passengers/update/id/" + editingId, {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        city: { id: Number(cityId) },
      })
      .then((updated) => {
        setPassengers(
          passengers.map((p) => (p.id === editingId ? updated : p)),
        );
        setEditingId(null);
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setCityId("");
      })
      .catch((err) => setError(err.message));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Passengers</h1>

      <div>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          placeholder="Phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          placeholder="City ID"
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
        />
        <button
          onClick={editingId ? handleUpdate : handleCreate}
          onMouseEnter={(e) => (e.target.style.color = randomColor())}
          onMouseLeave={(e) => (e.target.style.color = "")}
        >
          {editingId ? "Save Changes" : "Add Passenger"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((p) => (
            <tr key={p.id}>
              <td>{p.firstName}</td>
              <td>{p.lastName}</td>
              <td>{p.phoneNumber}</td>
              <td>{p.city?.name}</td>
              <td>
                <button
                  onClick={() => handleEditClick(p)}
                  onMouseEnter={(e) => (e.target.style.color = randomColor())}
                  onMouseLeave={(e) => (e.target.style.color = "")}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
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
