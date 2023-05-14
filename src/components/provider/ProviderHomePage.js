import { Layout, Menu, message } from "antd";
import { useState } from "react";
import {
  ToolOutlined,
  TeamOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import ManagerMaintenance from "./ProviderMaintenance";
import ProviderAnnouncement from "./ProviderAnnouncement";

const { Content, Sider } = Layout;

const providerMenuItems = [
  {
    label: "Announcement",
    key: "announcement",
    icon: <NotificationOutlined />,
  },
  {
    label: "Maintenance",
    key: "maintenance",
    icon: <ToolOutlined />,
  },
  {
    label: "Forum",
    key: "forum",
    icon: <TeamOutlined />,
  },
];

const ProviderHomePage = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    <ProviderAnnouncement />
  );

  const onMenuItemSelect = ({ key }) => {
    switch (key) {
      case "announcement":
        setSelectedMenuItem(<ProviderAnnouncement />);
        break;
      case "maintenance":
        setSelectedMenuItem(<ManagerMaintenance />);
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
          items={providerMenuItems}
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

export default ProviderHomePage;
