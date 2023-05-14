import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  List,
  Modal,
  Space,
  Table,
  Tabs,
  Tooltip,
  message,
} from "antd";
import { InfoCircleOutlined, PushpinOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import {
  addAnnouncement,
  deleteAnnouncement,
  getAnnouncementByManager,
} from "../../util";

const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

// component to create new announcement
const CreateNewAnnouncement = () => {
  const [stickyOnTop, setStickyOnTop] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      await addAnnouncement({ ...values, priority: stickyOnTop });
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
      name="nest-messages"
      onFinish={handleSubmit} // data collected by antd automatically on finish
      style={{ maxWidth: 1000, margin: "auto" }}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input disabled={loading} placeholder="Title of announcement" />
      </Form.Item>
      <Form.Item name="content" label="Content" rules={[{ required: true }]}>
        <Input.TextArea
          disabled={loading}
          autoSize={{ minRows: 2, maxRows: 6 }}
          placeholder="Content of announcement"
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
        <Checkbox
          disabled={loading}
          checked={stickyOnTop}
          onChange={(e) => setStickyOnTop(e.target.checked)}
        >
          Sticky On Top
        </Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

// sub-component to delete a record in the table
const DeleteButton = (props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const { announcement, onDeleteSuccess } = props;

    setLoading(true);

    try {
      await deleteAnnouncement(announcement.id);
      onDeleteSuccess();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      loading={loading}
      onClick={handleDelete}
      type="primary"
      danger={true}
    >
      Delete
    </Button>
  );
};

// sub-component to show content of an annoucement
export const ContentDetailButton = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Tooltip title="View Stay Details">
        <Button
          onClick={openModal}
          style={{ border: "none" }}
          size="large"
          icon={<InfoCircleOutlined />}
        />
      </Tooltip>
      {modalVisible && (
        <Modal
          title={props.announcement.title}
          centered={true}
          open={modalVisible}
          closable={true}
          footer={null}
          onCancel={handleCancel}
        >
          {props.announcement.content}
        </Modal>
      )}
    </>
  );
};

// component to show all announcement by the current manager
const ManageAllAnnouncement = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadData = async () => {
    setLoading(true);

    try {
      const resp = await getAnnouncementByManager();
      setData(resp.reverse());
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onDeleteSuccess = () => {
    message.success("Record deleted successfully");
    loadData();
  };

  const columns = [
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      align: "center",
      width: "15px",
      render: (text, record) => {
        return (
          record.priority && <PushpinOutlined style={{ fontSize: "150%" }} />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (text, record, index) => (
        <Space>
          <Text>Details</Text>
          <ContentDetailButton announcement={data[index]} />
        </Space>
      ),
    },
    {
      title: "Release Time",
      key: "time",
      dataIndex: "time",
      align: "center",
      width: "150px",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: "150px",
      render: (text, record, index) => (
        <DeleteButton
          announcement={data[index]}
          onDeleteSuccess={onDeleteSuccess}
        />
      ),
    },
  ];

  return <Table loading={loading} columns={columns} dataSource={data} />;
};

const ManagerAnnouncementPage = () => {
  return (
    <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
      <TabPane tab="Create New" key="1">
        <CreateNewAnnouncement />
      </TabPane>
      <TabPane tab="Manage All" key="2">
        <ManageAllAnnouncement />
      </TabPane>
    </Tabs>
  );
};

export default ManagerAnnouncementPage;

// const testData = [
//   {
//     key: "1",
//     name: "Perry Manager",
//     title: "Power Off Notice1",
//     release_time: "2023.5.15 19:36",
//     content:
//       "Power off tomorrow. Power off tomorrow. Power off tomorrow. Power off tomorrow.",
//   },
//   {
//     key: "2",
//     name: "Perry Manager",
//     title: "Power Off Notice2",
//     release_time: "2023.5.16 19:36",
//     content:
//       "I am a candidate searching for internship in software engineering. With a strong engineering background, I’m capable of solving problems logistically and efficiently. Besides, I boast rich project experience in the field of full-stack web application developing and Android developing. I have a good command of Java and JavaScript, and am also mature in Python and C++. Frameworks like Spring Boot and React were applied in my projects. I’m also familiar with the main-stream database and cloud services like AWS and GCP, with which I designed the databases and deployed my application for better stability.",
//   },
// ];

// const testData2 = [
//   {
//     key: "1",
//     name: "Christine Manager",
//     title: "Power Off Notice1",
//     release_time: "2023.5.15 19:36",
//     content:
//       "Power off tomorrow. Power off tomorrow. Power off tomorrow. Power off tomorrow.",
//   },
//   {
//     key: "2",
//     name: "Perry Manager",
//     title: "Power Off Notice2",
//     release_time: "2023.5.16 19:36",
//     content:
//       "I am a candidate searching for internship in software engineering. With a strong engineering background, I’m capable of solving problems logistically and efficiently. Besides, I boast rich project experience in the field of full-stack web application developing and Android developing. I have a good command of Java and JavaScript, and am also mature in Python and C++. Frameworks like Spring Boot and React were applied in my projects. I’m also familiar with the main-stream database and cloud services like AWS and GCP, with which I designed the databases and deployed my application for better stability.",
//   },
// ];
