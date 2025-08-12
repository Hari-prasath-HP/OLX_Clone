import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // reset error message
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="loginParentDiv">
      <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          required
        />
        <br />
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        <br />
        <button type="submit" disabled={!email || !password}>
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" style={{ cursor: "pointer", color: "blue" }}>
          Signup
        </Link>
      </p>
    </div>
  );
}

export default Login;
