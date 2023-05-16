import Move from "../manager/Move.js";
import {
    Tabs
  } from "antd";
import TenantList from "./TenantList.js";
const { TabPane } = Tabs;

const ManagerAssignmentPage = () => {
  return (
    <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
      <TabPane tab="Move In/Move Out" key="1">
        <Move />
      </TabPane>
      <TabPane tab="Search for Roommate" key="2">
        <TenantList />
      </TabPane>
    </Tabs>
  );
};

export default ManagerAssignmentPage;
