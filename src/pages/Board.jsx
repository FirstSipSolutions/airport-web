import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

const REFRESH_MS = 30000;

function statusClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "delayed") return "board-status board-status-delayed";
  if (s === "cancelled") return "board-status board-status-cancelled";
  if (s === "boarding") return "board-status board-status-boarding";
  if (s === "on time" || s === "scheduled") return "board-status board-status-ontime";
  return "board-status";
}

export default function Board() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function loadFlights() {
    api
      .get("/flight/findall")
      .then((data) => setFlights(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadFlights();
    const interval = setInterval(loadFlights, REFRESH_MS);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Board</h1>

      <div className="board-grid">
        {flights.map((f) => (
          <div key={f.id} className="board-card">
            <div className="board-card-top">
              <span className="board-flight-number">{f.flightNumber}</span>
              <span className={statusClass(f.status)}>{f.status}</span>
            </div>
            <div className="board-route">
              <span>{f.airportDeparture?.code || "—"}</span>
              <span className="board-route-arrow">→</span>
              <span>{f.airportArrival?.code || "—"}</span>
            </div>
            <div className="board-times">
              <span>Departs {f.departure}</span>
              <span>Arrives {f.arrival}</span>
            </div>
            <div className="board-meta">
              <span>Gate {f.gate}</span>
              <span>Terminal {f.terminal}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
