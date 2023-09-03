import React, { useState, useContext } from "react";
import {UserContext} from "../components/UserContext.jsx";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { Logout } from "../components/Logout";

export default function Home() {
  const loggedInUser = useContext(UserContext);
  const user = loggedInUser.user;
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
        {user != null ?
          <Logout /> :
          currentForm === "login" ?
            <Login onFormSwitch={toggleForm} /> :
            <Register onFormSwitch={toggleForm} />
        }
      </h4>
    </div>
  );
}
