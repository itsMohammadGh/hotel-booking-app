import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="appLayout">
      <Outlet />
      <div className="sidebar">sidebar</div>
      <div className="mapContainer">map</div>
    </div>
  );
}

export default AppLayout;
