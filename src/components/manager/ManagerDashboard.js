import { AnnouncementBlock } from "../tenant/TenantDashboard";

const ManagerDashboard = () => {
  return (
    <>
      <div style={{ width: "50%", height: "100%", float: "left" }}>
        <AnnouncementBlock />
      </div>
      <div style={{ width: "50%", height: "50%", float: "left" }}>2</div>
      <div style={{ width: "50%", height: "50%", float: "left" }}>3</div>
    </>
  );
};

export default ManagerDashboard;
