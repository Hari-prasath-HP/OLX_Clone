import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext } from "../../store/FireBaseContext";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // update user in context
    });
    return () => unsubscribe();
  }, [setUser]);

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        {/* Removed undefined 'name' */}
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage">
          {user ? (
            <span>{user.displayName || user.email}</span>
          ) : (
            <span onClick={() => navigate("/login")}>Login</span>
          )}

          <hr />
          {user ? (
            <span
              onClick={async () => {
                const auth = getAuth();
                await signOut(auth);
                setUser(null);
                navigate("/login");
              }}
              className="logout-btn"
            >
              Logout
            </span>
          ) : null}
        </div>

        <div
          className="sellMenu"
          onClick={() => (user ? navigate("/create") : navigate("/login"))}
        >
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
