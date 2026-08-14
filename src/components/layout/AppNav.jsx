import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/nav.css";

const BRAND = "Airport Board";

const NAV_LINKS = [
  { to: "/board",      label: "Board" },
  { to: "/flights",    label: "Flights" },
  { to: "/airports",   label: "Airports" },
  { to: "/aircraft",   label: "Aircraft" },
  { to: "/cities",     label: "Cities" },
  { to: "/passengers", label: "Passengers" },
];
export default function AppNav() {
  const { pathname } = useLocation();
  const [navState, setNavState] = useState("pinned");

  const lastY = useRef(0);
  const delta = useRef(0);


  useEffect(() => {
    const DOWN_THRESHOLD = 60;  
    const UP_THRESHOLD   = 15;  
    const PIN_THRESHOLD  = 80;  

    function onScroll() {
      const y    = window.scrollY;
      const diff = y - lastY.current;
      lastY.current = y;

      if (diff > 0 && delta.current < 0) delta.current = 0;
      if (diff < 0 && delta.current > 0) delta.current = 0;
      delta.current += diff;

      setNavState(prev => {
        if (y < PIN_THRESHOLD) {
          delta.current = 0;
          return "pinned";
        }
        if ((prev === "pinned" || prev === "visible") && delta.current >= DOWN_THRESHOLD) {
          delta.current = 0;
          return "hidden";
        }
        if (prev === "hidden" && delta.current <= -UP_THRESHOLD) {
          delta.current = 0;
          return "visible";
        }
        return prev;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function active(path) {
    return pathname === path ? " active" : "";
  }

  return (
    <nav className={`db-nav db-nav--${navState}`}>
      <Link to="/" className="db-nav-brand">{BRAND}</Link>

      <div className="db-nav-links">
        {NAV_LINKS.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`db-nav-link${active(link.to)}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="db-nav-actions">
        <Link to="/login" className="db-nav-login">Log In</Link>
      </div>
    </nav>
  );
}