import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNav from "./components/layout/AppNav.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <div className="db-root">
        <AppNav />
        <main className="db-main">
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}