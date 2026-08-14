import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleLogin() {
    setLoading(true);
    setError(null);

    supabase.auth
      .signInWithPassword({ email: email, password: password })
      .then((result) => {
        if (result.error) {
          setError(result.error.message);
        } else {
          navigate("/");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <div>
      <h1>Log In</h1>

      <div>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </div>

      {error && <p>Error: {error}</p>}
    </div>
  );
}
