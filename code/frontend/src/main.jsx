import React from "react";
import ReactDOM from "react-dom/client";
import UserContextProvider from './components/UserContext.jsx'
import App2 from "./App2";
import App3 from "./App3";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <App3 />
    </UserContextProvider>
</React.StrictMode>
);
