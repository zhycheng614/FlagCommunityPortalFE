import CreateNewMaintenance from "../tenant/CreateNewMaintenance";
import { RecordPane } from "../tenant/TenantMaintenance";
import {
  Button,
  Card,
  Input,
  List,
  Modal,
  Space,
  Tabs,
  Tooltip,
  message,
} from "antd";
import TenantList from "./TenantList";

const { TabPane } = Tabs;

const ManagerAssignmentPage = () => {
  return (
    <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
      <TabPane tab="Search for current tenant" key="1">
        <TenantList />
      </TabPane>
      <TabPane tab="Create New" key="2">
        <CreateNewMaintenance asManager={true} />
      </TabPane>
    </Tabs>
  );
};

export default ManagerAssignmentPage;
