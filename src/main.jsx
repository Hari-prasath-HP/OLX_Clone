import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Components/Context/Auth.jsx";
import { ItemsContextProvider } from "./Components/Context/Item.jsx";
import Context from "./store/FireBaseContext"; // assuming this is the correct default export
import firebase from "./firebase/config"; // keep if used elsewhere

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ItemsContextProvider>
        <AuthProvider>
          <Context>
            <App />
          </Context>
        </AuthProvider>
      </ItemsContextProvider>
    </BrowserRouter>
  </StrictMode>
);
