import React, { useState, useContext } from "react";
import {UserContext} from "./UserContext.jsx";

export const Logout = () => {
  const loggedInUser = useContext(UserContext);
  const {user, setUser} = loggedInUser;

  return (
    <div className="auth-form-container">
      <p>Currently logged in as <b>{user.name}</b></p>
      <button type="submit" onClick={() => setUser(null)}>Log Out</button>
    </div>
  );
};
