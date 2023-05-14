import { Button, Form, Input } from "antd";
import { useState } from "react";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const CreateNewMaintenance = (props) => {
  const [loading, setLoading] = useState(false);
  const { asManager } = props;

  const handleSubmit = async (values) => {
    /*     setLoading(true);

    try {
      await addMaintenance(values);
      message.success("Submitted successfully.");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    } */
  };

  return (
    <Form
      {...layout} // unfold layout object
      name="nest-messages"
      onFinish={handleSubmit} // data collected by antd automatically on finish
      style={{ maxWidth: 1000, margin: "auto" }}
    >
      <Form.Item name="location" label="Location" rules={[{ required: true }]}>
        <Input
          disabled={!asManager}
          defaultValue={
            asManager ? "" : localStorage.getItem("apartmentNumber")
          }
        />
      </Form.Item>
      <Form.Item
        name="issue_description"
        label="Issue Description"
        rules={[{ required: true }]}
      >
        <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateNewMaintenance;
