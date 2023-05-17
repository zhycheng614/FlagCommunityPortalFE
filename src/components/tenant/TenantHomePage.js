import { Layout, Menu, message } from "antd";
import { useState } from "react";
import {
  DashboardOutlined,
  ToolOutlined,
  ScheduleOutlined,
  DollarCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import TenantMaintenance from "./TenantMaintenance";
import TenantReservationPage from "./TenantReservationPage";
import TenantPaymentPage from "./TenantPaymentPage";
import Dashboard from "./TenantDashboard";
import TenantForumPage from "./TenantForumPage";

const { Content, Sider } = Layout;

const tenantMenuItems = [
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

const TenantHomePage = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(<Dashboard />);

  const onMenuItemSelect = ({ key }) => {
    switch (key) {
      case "dashboard":
        setSelectedMenuItem(<Dashboard />);
        break;
      case "maintenance":
        setSelectedMenuItem(<TenantMaintenance />);
        break;
      case "reservation":
        setSelectedMenuItem(<TenantReservationPage />);
        break;
      case "payment":
        setSelectedMenuItem(<TenantPaymentPage />);
        break;
      case "forum":
        setSelectedMenuItem(<TenantForumPage />);
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
          items={tenantMenuItems}
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

export default TenantHomePage;
