import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Tabs,
  Tooltip,
  message,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { getPostByUser, deletePost, addPost } from "../../util";

const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

//1.Tenant forum home page
const TenantForumPage = () => {
  return (
    <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
      <TabPane tab="Create New" key="1">
        <CreateNewPost />
      </TabPane>
      <TabPane tab="Manage All" key="2">
        <GetAllPostByUser />
      </TabPane>
    </Tabs>
  );
};

//2.add new post
const CreateNewPost = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      await addPost({ values });
      message.success("Submitted successfully.");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={handleSubmit}
      style={{ maxWidth: 1000, margin: "auto" }}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input disabled={loading} placeholder="Title of post" />
      </Form.Item>

      <Form.Item name="category" label="category" rules={[{ required: true }]}>
        <Input disabled={loading} placeholder="Category of post" />
      </Form.Item>

      <Form.Item name="content" label="Content" rules={[{ required: true }]}>
        <Input.TextArea
          disabled={loading}
          autoSize={{ minRows: 2, maxRows: 6 }}
          placeholder="Content of post"
        />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

//3.delete post
const DeleteButton = (props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const { post, onDeleteSuccess } = props;
    setLoading(true);

    try {
      await deletePost(post.id);
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

//4.PostDetailButton
export const PostDetailButton = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Tooltip title="View Post Details">
        <Button
          onClick={openModal}
          style={{ border: "none" }}
          size="large"
          icon={<InfoCircleOutlined />}
        />
      </Tooltip>

      {modalVisible && (
        <Modal
          title={props.post.title}
          centered={true}
          open={modalVisible}
          closable={true}
          footer={null}
          onCancel={handleCancel}
        >
          {props.post.content}
        </Modal>
      )}
    </>
  );
};

//5.show all post by manager
const GetAllPostByUser = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadData = async () => {
    setLoading(true);

    try {
      const resp = await getPostByUser();
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
      title: "Category",
      dataIndex: "category",
      key: "category",
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
          <PostDetailButton post={data[index]} />
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
        <DeleteButton post={data[index]} onDeleteSuccess={onDeleteSuccess} />
      ),
    },
  ];

  return <Table loading={loading} columns={columns} dataSource={data} />;
};

export default TenantForumPage;
