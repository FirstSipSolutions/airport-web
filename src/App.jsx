import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNav from "./components/layout/AppNav.jsx";
//adding import for the page airports-this was missing
import Airports from "./pages/Airports.jsx";
//cities import
import Cities from "./pages/Cities.jsx";
//aircarft import for hooks and components 
import Aircraft from "./pages/Aircraft.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <div className="db-root">
        <AppNav />
        <main className="db-main">
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/airports" element={<Airports />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/aircraft" element={<Aircraft />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
