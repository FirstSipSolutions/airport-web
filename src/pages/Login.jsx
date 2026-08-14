import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSocialLogin() {
    alert("Sorry, not available yet");
  }

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
    <div className="login-box">
      <h1>Log In</h1>

      <div className="login-social">
        <p>Sign in with:</p>
        <button className="login-btn" onClick={handleSocialLogin}>Facebook</button>
        <button className="login-btn" onClick={handleSocialLogin}>Google</button>
        <button className="login-btn" onClick={handleSocialLogin}>GitHub</button>
        <p>or:</p>
      </div>

      <div className="login-form">
        <input
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn login-btn-main" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </div>

      {error && <p className="login-error">Error: {error}</p>}
    </div>
  );
}
