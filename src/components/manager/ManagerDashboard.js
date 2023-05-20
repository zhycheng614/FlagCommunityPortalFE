import { AnnouncementBlock } from "../tenant/TenantDashboard";

import  {AllReservationsBlock} from "../manager/ManagerReservationPage";
import React from "react";
const ManagerDashboard = () => {
  return (
    <>
      <div style={{ width: "50%", height: "100%", float: "left" }}>
        <AnnouncementBlock />
      </div>
      <div style={{ width: "50%", height: "50%", float: "left" }}>2</div>
      <div style={{ width: "50%", height: "50%", float: "left" }}>
          <AllReservationsBlock />
      </div>
    </>
  );
};

export default ManagerDashboard;
