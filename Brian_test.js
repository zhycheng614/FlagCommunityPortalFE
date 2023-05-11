import { Layout, Dropdown, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import LoginPage from "./components/LoginPage";
import TenantPaymentPage from "./components/TenantPaymentPage";
import ManagerPaymentPage from "./components/ManagerPaymentPage";

const { Header, Content } = Layout;

class App extends React.Component {
  state = {
    authed: true, // should be false.
    asManager: false, // can be changed
  };

  componentDidMount() {
    const authToken = localStorage.getItem("authToken");
    const asManager = localStorage.getItem("asManager") === "true";
    this.setState({
      authed: authToken !== null,
      asManager,
    });
  }

  handleLoginSuccess = (token, asManager) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("asManager", asManager);
    this.setState({
      authed: true,
      asManager,
    });
  };

  handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("asManager");
    this.setState({
      authed: false,
    });
  };

  renderContent = () => {
    if (!this.state.authed) {
      return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />;
    }

    if (this.state.asManager) {
      return <ManagerPaymentPage />;
    }

    return <TenantPaymentPage />;
  };

  userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={this.handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
            FLAG CAMP Payment Demo
          </div>
          {this.state.authed && (
            <div>
              <Dropdown trigger="click" overlay={this.userMenu}>
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </div>
          )}
        </Header>
        <Content
          style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
        >
          {/* {this.renderContent()} */}
          <TenantPaymentPage />
        </Content>
      </Layout>
    );
  }
}

export default App;
