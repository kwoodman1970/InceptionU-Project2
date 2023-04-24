import { Outlet } from "react-router-dom";

export default function ActivitiesLayout() {
  return (
    <div className="Actvities-layout">
      <h2>Activities</h2>
      <p>Join or Create an activity!!!</p>

      <Outlet />
    </div>
  );
}
