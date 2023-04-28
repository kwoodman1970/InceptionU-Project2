import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./providers/AuthProvider";
import App2 from "./App2";
import App3 from "./App3";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App3 />
    </AuthProvider>
</React.StrictMode>
);
