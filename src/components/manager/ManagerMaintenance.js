import CreateNew from "../tenant/CreateNew";
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

const { TabPane } = Tabs;

const ManagerMaintenance = () => {
  return (
    <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
      <TabPane tab="My Record" key="1">
        <RecordPane />
      </TabPane>
      <TabPane tab="Create New" key="2">
        <CreateNew asManager={true} />
      </TabPane>
    </Tabs>
  );
};

export default ManagerMaintenance;
