import { Layout, Menu } from "antd";
import { useState } from "react";
import {
  DashboardOutlined,
  ToolOutlined,
  ScheduleOutlined,
  DollarCircleOutlined,
  TeamOutlined,
  NotificationOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import ManagerMaintenance from "./ManagerMaintenance.js";
import ManagerReservationPage from "./ManagerReservationPage.js";
import ManagerPaymentPage from "./ManagerPaymentPage.js";
import ManagerAnnouncementPage from "./ManagerAnnouncementPage.js";
import ManagerAssignmentPage from "./ManagerAssignmentPage.js";

const { Content, Sider } = Layout;

const managerMenuItems = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <DashboardOutlined />,
  },
  {
    label: "Room Assignment",
    key: "assignment",
    //icon: <UserOutlined />,
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
  {
    label: "Announcement",
    key: "announcement",
    icon: <NotificationOutlined />,
  },
  {
    label: "Management",
    key: "management",
    icon: <SolutionOutlined />,
  },
];

const ManagerHomePage = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");

  const onMenuItemSelect = ({ key }) => {
    switch (key) {
      case "dashboard":
        setSelectedMenuItem("dashboard");
        break;
      case "assignment":
        setSelectedMenuItem(<ManagerAssignmentPage />);
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
        setSelectedMenuItem("ManagerForumPage");
        break;
      case "announcement":
        setSelectedMenuItem(<ManagerAnnouncementPage />);
        break;
      case "management":
        setSelectedMenuItem("management");
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
          style={{ height: "90%", marginTop: "20px", fontSize: "18px" }}
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
