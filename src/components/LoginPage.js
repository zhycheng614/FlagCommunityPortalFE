import React, { useState } from "react";
import { Form, Button, Input, Space, Checkbox, message, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login, register } from "../util";

const authorityOptions = [
  {
    value: "tenant",
    label: "Tenant",
  },
  {
    value: "manager",
    label: "Manager",
  },
  {
    value: "provider",
    label: "Provider",
  },
];

const LoginPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [authority, setAuthority] = useState("");

  const formRef = React.createRef();

  // get function from parent
  const { handleLoginSuccess } = props;

  // function to handle login button
  const handleLogin = async () => {
    // get data from the form - using ref
    const formInstance = formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    setLoading(true);

    try {
      // call utils function to send request
      const resp = await login(formInstance.getFieldsValue(true), authority);
      // this function is passed in from parent: App.js
      handleLoginSuccess(resp.apartmentNumber, resp.token, authority);
    } catch (error) {
      message.error(error.message);
    } finally {
      // no matter login success or not, we should return from loading state
      setLoading(false);
    }
  };

  // function to handle register button
  const handleRegister = async () => {
    // check if register as manager - not allowed
    if (authority === "manager") {
      message.error("Cannot register as manager.");
      return;
    }

    const formInstance = formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    setLoading(true);

    try {
      await register(formInstance.getFieldsValue(true), authority);
      message.success("Register Successfully");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 400, margin: "50px auto" }}>
      <Form ref={formRef}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username." }]}
        >
          <Input
            disabled={loading}
            prefix={
              <UserOutlined
                className="site-form-item-icon"
                placeholder="Username"
              />
            }
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password." }]}
        >
          <Input.Password
            disabled={loading}
            prefix={
              <LockOutlined
                className="site-form-item-icon"
                placeholder="Password"
              />
            }
          />
        </Form.Item>
      </Form>

      <Space size="large">
        <Select
          placeholder="Authority"
          onChange={(value) => {
            setAuthority(value);
          }}
          options={authorityOptions}
        />
        <Button
          onClick={handleLogin}
          disabled={loading}
          shape="round"
          type="primary"
        >
          Log In
        </Button>
        <Button
          onClick={handleRegister}
          disabled={loading}
          shape="round"
          type="primary"
        >
          Register
        </Button>
      </Space>
    </div>
  );
};

export default LoginPage;
