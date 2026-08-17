import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api.js";

const SECTIONS = [
  { to: "/flights", label: "Flights" },
  { to: "/airports", label: "Airports" },
  { to: "/cities", label: "Cities" },
  { to: "/aircraft", label: "Aircraft" },
  { to: "/passengers", label: "Passengers" },
];

export default function Home() {
  const [flightCount, setFlightCount] = useState(null);
  const [airportCount, setAirportCount] = useState(null);
  const [cityCount, setCityCount] = useState(null);
  const [aircraftCount, setAircraftCount] = useState(null);
  const [passengerCount, setPassengerCount] = useState(null);

  useEffect(() => {
    api.get("/flight/findall").then((data) => setFlightCount(data.length));
    api.get("/airports/getall").then((data) => setAirportCount(data.length));
    api.get("/cities/getall").then((data) => setCityCount(data.length));
    api.get("/aircraft/findall").then((data) => setAircraftCount(data.length));
    api.get("/passengers/getall").then((data) => setPassengerCount(data.totalElements));
  }, []);

  const stats = [
    { label: "Flights", value: flightCount },
    { label: "Airports", value: airportCount },
    { label: "Cities", value: cityCount },
    { label: "Aircraft", value: aircraftCount },
    { label: "Passengers", value: passengerCount },
  ];

  return (
    <div>
      <h1>Airport Board</h1>
      <p>Live arrivals and departures, plus airports, cities, aircraft, and passengers.</p>

      <div className="home-stats">
        {stats.map((s) => (
          <div key={s.label} className="home-stat">
            <span className="home-stat-value">{s.value === null ? "..." : s.value}</span>
            <span className="home-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="home-links">
        {SECTIONS.map((s) => (
          <Link key={s.to} to={s.to} className="home-link">
            {s.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
