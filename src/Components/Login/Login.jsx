import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({ email: "", password: "", general: "" });

    let hasError = false;
    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
      hasError = true;
    }
    if (!password.trim()) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
      hasError = true;
    }

    if (hasError) return;

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      let errorMessage = "";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email format.";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        default:
          errorMessage = "Login failed. Please try again.";
      }
      setErrors((prev) => ({ ...prev, general: errorMessage }));
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
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
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
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <br />
        {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
        <br />
        <button type="submit">Login</button>
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
