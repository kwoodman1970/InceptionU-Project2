import React, { useState, useContext } from "react";
import {UserContext} from "./UserContext.jsx";

const VITE_SERVER_URL_ROOT = import.meta.env.VITE_SERVER_URL_ROOT;

export const Login = (props) => {
  const loggedInUser = useContext(UserContext);
  const {user, setUser} = loggedInUser;

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${VITE_SERVER_URL_ROOT}/login?name=${name}&password=${pass}`);
    const result = await response.json();

    console.log(response);
    console.log(response.statusText);
    console.log(result);

    if (response.ok) {
      console.log(`Logging in as user ${name} (${pass})`);
      console.log(result);
      setUser(result);
    } else if (response.status == 404){
      window.alert(`Login failed.\n\n${result.msg}`);
    } else {
      window.alert(`Login failed.\n\nReason:  ${response.statusText}`);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Your name"
          id="name"
          name="name"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="*********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("register")}>
        Don't have an account? Register here.
      </button>
    </div>
  );
};
