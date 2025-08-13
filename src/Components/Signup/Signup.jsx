import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    general: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset all errors
    setErrors({ userName: "", email: "", phone: "", password: "", general: "" });

    let hasError = false;

    if (!userName.trim()) {
      setErrors((prev) => ({ ...prev, userName: "Username is required." }));
      hasError = true;
    }
    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
      hasError = true;
    }
    if (!phone.trim()) {
      setErrors((prev) => ({ ...prev, phone: "Phone number is required." }));
      hasError = true;
    }
    if (!password.trim()) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
      hasError = true;
    } else if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters."
      }));
      hasError = true;
    }

    if (hasError) return;

    const auth = getAuth();
    const db = getFirestore();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      const user = userCredential.user;

      await updateProfile(user, { displayName: userName.trim() });

      // Store in Firestore with UID as document ID
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        userName: userName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        authProvider: "local"
      });

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error.code, error.message);

      let errorMessage = "";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email is already registered. Please log in.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      } else {
        errorMessage = "Something went wrong. Please try again.";
      }

      setErrors((prev) => ({ ...prev, general: errorMessage }));
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />

        {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            id="username"
          />
          {errors.userName && <p style={{ color: "red" }}>{errors.userName}</p>}

          <label htmlFor="email">Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

          <label htmlFor="phone">Phone</label>
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
          />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

          <label htmlFor="password">Password</label>
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

          <button type="submit">Signup</button>
        </form>

        <a
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Login
        </a>
      </div>
    </div>
  );
}
