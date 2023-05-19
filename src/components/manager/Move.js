import { Button, Form, Input, Select, message } from "antd";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { moveIn, moveOut, moveOutAndAssign } from "../../util";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const Move = () => {
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  const handleSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      if (values.dropdown === "in") {
        await moveIn(values);
      } else if (
        values.dropdown === "out" &&
        (typeof values.owner === "undefined" || values.owner === "")
      ) {
        await moveOut(values);
      } else if (
        values.dropdown === "out" &&
        (values.owner !== "undefined" || values.owner !== "")
      ) {
        await moveOutAndAssign(values);
      }
      message.success("Submitted successfully.");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form
      {...layout} // unfold layout object
      //name="nest-messages"
      onFinish={handleSubmit} // data collected by antd automatically on finish
      style={{ maxWidth: 1000, margin: "auto" }}
    >
      <Form.Item
        label="Move In/Move Out"
        name="dropdown"
        rules={[{ required: true }]}
        labelCol={{ span: 8, offset: 0 }}
      >
        <Select>
          <Select.Option value="in">Move in</Select.Option>
          <Select.Option value="out">Move out</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="tenant"
        label="Tenant"
        rules={[{ required: true }]}
        labelCol={{ span: 8, offset: 0 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="apt"
        label="Apartment"
        rules={[
          ({ getFieldValue }) => ({
            required: getFieldValue("dropdown") === "in",
            message: "Please enter the apartment",
          }),
        ]}
        labelCol={{ span: 8, offset: 0 }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="owner"
        label="New Apartment Owner"
        labelCol={{ span: 8, offset: 0 }}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Move;
