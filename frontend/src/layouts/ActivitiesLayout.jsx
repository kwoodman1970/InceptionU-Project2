import { NavLink, Outlet } from "react-router-dom";
import App2 from "../App2";

export default function ActivitiesLayout() {
  return (
    <div className="Actvities-layout">
      <h2>Activities</h2>
      <p>Join or Create an activity!!!</p>
      <nav>
        <NavLink to="createactivity">Create Activity</NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
