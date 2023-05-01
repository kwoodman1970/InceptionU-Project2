import React, { useState } from "react";
import { Login } from "../components/Login";
import { Register } from "../components/Register";

export default function Home() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <div className="home">
      <h2>Welcome To Calgary Fit Friends!!!</h2>
      <p>
        Thank you for joining us and we home you the best on your jouney for
        fitness and we hope you brings some friends along for the ride!
      </p>
      <h4>
        {currentForm === "login" ? (
          <Login onFormSwitch={toggleForm} />
        ) : (
          <Register onFormSwitch={toggleForm} />
        )}
      </h4>
    </div>
  );
}
