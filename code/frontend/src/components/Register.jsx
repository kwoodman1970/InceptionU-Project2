import React, { useState, useContext } from "react";
import {UserContext} from "./UserContext.jsx";

const VITE_SERVER_URL_ROOT = import.meta.env.VITE_SERVER_URL_ROOT;

export const Register = (props) => {
  const loggedInUser = useContext(UserContext);
  const setUser = loggedInUser.setUser;

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {userInfo:  {name, email}, password:  pass};
    const init =  {
      method: "POST",
      mode: "cors",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newUser)
    }

    const response = await fetch(`${VITE_SERVER_URL_ROOT}/user`, init);
    const result = await response.json();

    if (response.ok) {
      setUser(newUser.userInfo);
    } else if (response.status == 403){
      window.alert(`Registration failed.\n\n${result.msg}`);
    } else {
      window.alert(`Registration failed.\n\nReason:  ${response.status} -- ${response.statusText}`);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
          placeholder="full name"
        />
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="*********"
          id="password"
          name="password"
        />
        <button type="submit">Register</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Log in here.
      </button>
    </div>
  );
};
