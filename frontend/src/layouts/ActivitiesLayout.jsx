import { NavLink, Outlet } from "react-router-dom";
import { useContext } from 'react'
import {UserContext} from "../components/UserContext.jsx";

//import App2 from "../App2";

export default function ActivitiesLayout() {
  const loggedInUser = useContext(UserContext);
  const user = loggedInUser.user;

  return (
    <div className="activities-layout">
      <h2>Activities</h2>
      <p>Join or Create an activity!!!</p>
      {user != null ?
        <>
          <p>Currently logged in as <b>{user}</b></p>
          <nav>
            <NavLink to="createactivities">Create Activity</NavLink>
            <NavLink to="joinedactivities">Join Activity</NavLink>
          </nav>
        </> :
        <p>You aren't logged in.  Please <a href="/">log in</a> to see your activities.</p>
      }
      <Outlet />
    </div>
  );
}
