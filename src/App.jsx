import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNav from "./components/layout/AppNav.jsx";
import Home from "./pages/Home.jsx";
//adding import for the page airports-this was missing
import Airports from "./pages/Airports.jsx";
//cities import
import Cities from "./pages/Cities.jsx";
//aircarft import for hooks and components
import Aircraft from "./pages/Aircraft.jsx";
//passengers import
import Passengers from "./pages/Passengers.jsx";
import Flights from "./pages/Flights.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="db-root">
        <AppNav />
        <main className="db-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/airports" element={<Airports />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/aircraft" element={<Aircraft />} />
            <Route path="/passengers" element={<Passengers />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
