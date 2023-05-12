import { Button, Form, Input } from "antd";
import { useState } from "react";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const CreateNew = (props) => {
  const [loading, setLoading] = useState(false);
  const { asManager } = props;

  const handleSubmit = async (values) => {
    /*     setLoading(true);

    try {
      await submitRecord(values);
      message.success("Upload successfully.");
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
        <Input disabled={!asManager} defaultValue={asManager ? "" : "501"} />
      </Form.Item>
      <Form.Item
        name="issue_description"
        label="Issue Description"
        rules={[{ required: true }]}
      >
        <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button
          type="primary"
          /* 
              tell form that after click this button, the form will finish and thus trigger onFinish() 
              we can use onclick, but in that case we need to use ref to collect data
              if we submit form, the onFinish() function will pass in the data object to us automatically
            */
          htmlType="submit"
          loading={loading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateNew;
