import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [flightNumber, setFlightNumber] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [status, setStatus] = useState("");
  const [gate, setGate] = useState("");
  const [terminal, setTerminal] = useState("");
  const [aircraftId, setAircraftId] = useState("");
  const [departureAirportId, setDepartureAirportId] = useState("");
  const [arrivalAirportId, setArrivalAirportId] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    api
      .get("/flight/findall")
      .then((data) => setFlights(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // builds the request body - used by both create and update
  function buildBody() {
    return {
      flightNumber: flightNumber,
      departure: departure,
      arrival: arrival,
      status: status,
      gate: gate,
      terminal: terminal,
      aircraft: { id: Number(aircraftId) },
      airportDeparture: { id: Number(departureAirportId) },
      airportArrival: { id: Number(arrivalAirportId) },
    };
  }

  function clearForm() {
    setFlightNumber("");
    setDeparture("");
    setArrival("");
    setStatus("");
    setGate("");
    setTerminal("");
    setAircraftId("");
    setDepartureAirportId("");
    setArrivalAirportId("");
    setEditingId(null);
  }

  function handleCreate() {
    api
      .post("/flight/createnew", buildBody())
      .then((newFlight) => {
        setFlights([...flights, newFlight]);
        clearForm();
      })
      .catch((err) => setError(err.message));
  }

  function handleDelete(id) {
    api
      .delete("/flight/delete/id/" + id)
      .then(() => setFlights(flights.filter((f) => f.id !== id)))
      .catch((err) => setError(err.message));
  }

  function handleEditClick(f) {
    setEditingId(f.id);
    setFlightNumber(f.flightNumber);
    setDeparture(f.departure);
    setArrival(f.arrival);
    setStatus(f.status);
    setGate(f.gate);
    setTerminal(f.terminal);
    setAircraftId(f.aircraft?.id || "");
    setDepartureAirportId(f.airportDeparture?.id || "");
    setArrivalAirportId(f.airportArrival?.id || "");
  }

  function handleUpdate() {
    api
      .put("/flight/update/id/" + editingId, buildBody())
      .then((updated) => {
        setFlights(flights.map((f) => (f.id === editingId ? updated : f)));
        clearForm();
      })
      .catch((err) => setError(err.message));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Flights</h1>

      <div>
        <input
          placeholder="Flight Number"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
        />
        <input
          type="datetime-local"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />
        <input
          type="datetime-local"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
        />
        <input
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          placeholder="Gate"
          value={gate}
          onChange={(e) => setGate(e.target.value)}
        />
        <input
          placeholder="Terminal"
          value={terminal}
          onChange={(e) => setTerminal(e.target.value)}
        />
        <input
          placeholder="Aircraft ID"
          value={aircraftId}
          onChange={(e) => setAircraftId(e.target.value)}
        />
        <input
          placeholder="From Airport ID"
          value={departureAirportId}
          onChange={(e) => setDepartureAirportId(e.target.value)}
        />
        <input
          placeholder="To Airport ID"
          value={arrivalAirportId}
          onChange={(e) => setArrivalAirportId(e.target.value)}
        />
        <button onClick={editingId ? handleUpdate : handleCreate}>
          {editingId ? "Save Changes" : "Add Flight"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Flight</th>
            <th>From</th>
            <th>To</th>
            <th>Departs</th>
            <th>Arrives</th>
            <th>Gate</th>
            <th>Terminal</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((f) => (
            <tr key={f.id}>
              <td>{f.flightNumber}</td>
              <td>{f.airportDeparture?.code}</td>
              <td>{f.airportArrival?.code}</td>
              <td>{f.departure}</td>
              <td>{f.arrival}</td>
              <td>{f.gate}</td>
              <td>{f.terminal}</td>
              <td>{f.status}</td>
              <td>
                <button onClick={() => handleEditClick(f)}>Edit</button>
                <button onClick={() => handleDelete(f.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
