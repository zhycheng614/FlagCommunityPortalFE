import { Layout } from "antd";
import ManagerMaintenance from "./ProviderMaintenance";
import ProviderAnnouncement from "./ProviderAnnouncement";

const { Content, Sider } = Layout;

const ProviderHomePage = () => {
  return (
    <Layout>
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
          <ManagerMaintenance />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProviderHomePage;
