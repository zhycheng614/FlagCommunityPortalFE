import { Layout, Menu, message } from "antd";
import { useState } from "react";
import {
  DashboardOutlined,
  ToolOutlined,
  ScheduleOutlined,
  DollarCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import ManagerMaintenance from "./ManagerMaintenance.js";
import ManagerReservationPage from "./ManagerReservationPage.js";
import ManagerPaymentPage from "./ManagerPaymentPage.js";

const { Content, Sider } = Layout;

const managerMenuItems = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <DashboardOutlined />,
  },
  {
    label: "Maintenance",
    key: "maintenance",
    icon: <ToolOutlined />,
  },
  {
    label: "Reservation",
    key: "reservation",
    icon: <ScheduleOutlined />,
  },
  {
    label: "Payment",
    key: "payment",
    icon: <DollarCircleOutlined />,
  },
  {
    label: "Forum",
    key: "forum",
    icon: <TeamOutlined />,
  },
];

const ManagerHomePage = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  const onMenuItemSelect = ({ key }) => {
    switch (key) {
      case "dashboard":
        setSelectedMenuItem("dashboard");
        break;
      case "maintenance":
        setSelectedMenuItem(<ManagerMaintenance />);
        break;
      case "reservation":
        setSelectedMenuItem(<ManagerReservationPage />);
        break;
      case "payment":
        setSelectedMenuItem(<ManagerPaymentPage />);
        break;
      case "forum":
        setSelectedMenuItem("forum");
        break;
    }
  };

  return (
    <Layout>
      <Sider width={250} className="site-layout-background">
        <Menu
          mode="inline"
          onSelect={onMenuItemSelect}
          defaultSelectedKeys={["dashboard"]}
          style={{ height: "100%", marginTop: "20px", fontSize: "18px" }}
          items={managerMenuItems}
        />
      </Sider>
      <Layout style={{ padding: "24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            height: 800,
            overflow: "auto",
          }}
        >
          {selectedMenuItem}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagerHomePage;
