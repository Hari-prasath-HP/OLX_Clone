import "./App.css";
import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import Details from "./components/Details/Details"; // keep this from first version if needed

import { AuthContext } from "./store/FireBaseContext";
import Post from "./store/PostContext";
import NavbarContext from "./store/FireBaseContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <div>
      <NavbarContext>
        <Post>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<Create />} />
              <Route path="/view" element={<View />} />
              <Route path="/details" element={<Details />} /> {/* added from HEAD */}
            </Routes>
          </Router>
        </Post>
      </NavbarContext>
    </div>
  );
};

export default App;
