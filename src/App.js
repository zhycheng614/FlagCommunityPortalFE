import { Layout, Menu, Dropdown, Button, message } from "antd";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import TenantHomePage from "./components/tenant/TenantHomePage";
import ManagerHomePage from "./components/manager/ManagerHomePage";
import ProviderHomePage from "./components/provider/ProviderHomePage";
import LoginPage from "./components/LoginPage";
import Text from "antd/lib/typography/Text";

const { Header } = Layout;

const App = () => {
  const [authed, setAuthed] = useState(false);
  const [authority, setAuthority] = useState("");

  // function that will be passed to login component and called after login
  const handleLoginSuccess = (apartmentNumber, token, authority) => {
    if (authority === "tenant") {
      localStorage.setItem("authToken", token.token);
      localStorage.setItem("apartmentNumber", apartmentNumber);
    } else {
      localStorage.setItem("authToken", token);
    }
    localStorage.setItem("authority", authority);
    setAuthed(true);
    setAuthority(authority);
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authority");
    if (authority === "tenant") {
      localStorage.removeItem("apartmentNumber");
    }
    setAuthed(false);
  };

  // different content based on different authorites
  const renderContent = () => {
    if (!authed) {
      return <LoginPage handleLoginSuccess={handleLoginSuccess} />;
    }

    switch (authority) {
      case "tenant":
        return <TenantHomePage />;
      case "manager":
        return <ManagerHomePage />;
      case "provider":
        return <ProviderHomePage />;
    }

    return <div>Authority is invalid.</div>;
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: "white" }}>
          Flag Community Portal
        </div>
        <div>
          {authed && (
            <div>
              <Dropdown trigger="click" overlay={userMenu}>
                {/* <Text>
                  Apartment Number: {localStorage.getItem("apartmentNumber")}
                </Text> */}
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </div>
          )}
        </div>
      </Header>
      {renderContent()}
    </Layout>
  );
};

export default App;
