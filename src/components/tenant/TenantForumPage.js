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
  Select,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { getPostByUser, deletePost, addPost, getAllPost } from "../../util";

const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

//1.Tenant forum home page
const TenantForumPage = () => {
  return (
    <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
      <TabPane tab="All Posts" key="1">
        <GetAllPosts />
      </TabPane>
      <TabPane tab="Create New" key="2">
        <CreateNewPost />
      </TabPane>
      <TabPane tab="Manage All" key="3">
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
      await addPost(values);
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

      <Form.Item
        // style={{ width: "300px" }}
        name="category"
        label="Category"
        rules={[{ required: true }]}
        // labelCol={{ span: 6, offset: 15 }}
      >
        <Select disabled={loading}>
          <Select.Option value="Second Hand Trading">
            Second Hand Trading
          </Select.Option>
          <Select.Option value="Lost & find">Lost & Found</Select.Option>
          <Select.Option value="Community">Community</Select.Option>
          <Select.Option value="Others">Others</Select.Option>
        </Select>
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

//6.show all posts
const GetAllPosts = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadData = async () => {
    setLoading(true);

    try {
      const allposts = await getAllPost();
      setData(allposts.reverse());
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
      width: "200px",
      filters: [
        {
          text: "Second Hand Trading",
          value: "Second Hand Trading",
        },
        {
          text: "Lost & find",
          value: "Lost & find",
        },
        {
          text: "Community",
          value: "Community",
        },
        {
          text: "Others",
          value: "Others",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.category.indexOf(value) === 0,
      sorter: (a, b) => a.category.length - b.category.length,
      sortDirections: ["descend"],
    },

    {
      title: "Title",
      dataIndex: "title",
      align: "center",
      key: "title",
    },

    {
      title: "Content",
      dataIndex: "content",
      align: "center",
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
      defaultSortOrder: "descend",
      sorter: (a, b) => new Date(a.time) - new Date(b.time),
    },

    {
      title: "Username",
      key: "userId",
      dataIndex: "userId",
      align: "center",
      width: "150px",
    },
  ];

  return <Table loading={loading} columns={columns} dataSource={data} />;
};

export default TenantForumPage;
