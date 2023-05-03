import React, { useState, useContext } from "react";
import {UserContext} from "./UserContext.jsx";

export const Login = (props) => {
  const loggedInUser = useContext(UserContext);
  const {user, setUser} = loggedInUser;

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Logging in as user ${name} (${pass})`);
    setUser(name);
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
