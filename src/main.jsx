import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Components/Context/Auth.jsx";
import { ItemsContextProvider } from "./components/Context/Item.jsx";
import Context from "./store/FireBaseContext"; // assuming this is the correct default export

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
