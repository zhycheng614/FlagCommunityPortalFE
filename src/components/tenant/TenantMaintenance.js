import {
  Button,
  Card,
  Input,
  List,
  Modal,
  Space,
  Tabs,
  Tooltip,
  message,
} from "antd";
import { MessageOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import CreateNewMaintenance from "./CreateNewMaintenance";

const { TabPane } = Tabs;

const testDataSource = [
  {
    id: 1,
    title: "Ceiling Leak",
    location: "501",
    description: "My ceiling is leaking and I need help immediately.",
    status: "Submitted",
    time: "2023.5.1 16:38pm",
    message: "",
  },
  {
    id: 2,
    title: "Pipe Leak",
    location: "445",
    description: "The water pipe is not working well.",
    status: "Distributed",
    time: "2023.5.1 19:38pm",
    message: "I'll go to your home on Friday 10 am. My phone is: 606-614-8523.",
  },
  {
    id: 3,
    title: "Broken Door",
    location: "803",
    description: "The door is not working.",
    status: "Completed",
    time: "2023.5.1 13:59pm",
    message:
      "I'll go to your home on Friday 10 am. My phone is: 606-614-8523.\
    If you have any questions, please feel free to call me.",
  },
  {
    id: 4,
    title: "Broken Door 2",
    location: "803",
    description: "The door is not working.",
    status: "Completed",
    time: "2023.5.1 10:27pm",
    message:
      "I'll go to your home on Friday 10 am. My phone is: 606-614-8523.\
    If you have any questions, please feel free to call me.",
  },
  {
    id: 5,
    title: "Broken Door 3",
    location: "803",
    description: "The door is not working.",
    status: "Completed",
    time: "2023.5.1 19:33pm",
    message:
      "I'll go to your home on Friday 10 am. My phone is: 606-614-8523.\
    If you have any questions, please feel free to call me.",
  },
];

const MessageButton = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const message = props.maintenanceSheet.message;

  const openModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Tooltip title="View Provider's Message">
        <Button
          onClick={openModal}
          style={{ border: "none" }}
          size="large"
          icon={<MessageOutlined />}
        />
      </Tooltip>
      {modalVisible && ( // JS special grammer
        <Modal
          title="Provider's Message"
          centered={true}
          visible={modalVisible}
          closable={true}
          footer={null}
          onCancel={handleCancel}
        >
          <Space direction="vertical">
            <div>{message}</div>
          </Space>
        </Modal>
      )}
    </>
  );
};

const DeleteButton = (props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const { record, onDeleteSuccess } = props;

    /*     setLoading(true);

    try {
      await deleteRecord(record.id);
      onDeleteSuccess();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    } */
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

const statusStyle = [
  {
    fontColor: "#00FF00",
  },
  {
    fontColor: "#0000FF",
  },
  {
    fontColor: "#888888",
  },
];

// component to form the whole record pane
export const RecordPane = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const renderStatus = (item) => {
    let colorStyle = "";
    switch (item.status) {
      case "Submitted":
        colorStyle = statusStyle[0];
        break;
      case "Distributed":
        colorStyle = statusStyle[1];
        break;
      case "Completed":
        colorStyle = statusStyle[2];
        break;
    }
    return (
      <Text style={{ color: colorStyle.fontColor, fontWeight: 700 }}>
        {item.status}
      </Text>
    );
  };

  const loadData = async () => {
    /* setLoading(true);

    try {
      const resp = await getMaintenanceByUser(username); // user information will be passed in with token
      setData(resp);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    } */
  };

  const onDeleteSuccess = () => {
    message.success("Record deleted successfully");
    loadData();
  };

  return (
    <List
      loading={loading}
      pagination={{ pageSize: 3 }}
      grid={{ column: 1 }}
      dataSource={testDataSource} // should replace it by data
      renderItem={(item) => (
        <List.Item>
          <Card
            key={item.id}
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text ellipsis={true} style={{ maxWidth: 150 }}>
                  {item.title}
                </Text>
              </div>
            }
            extra={
              <Space size="large">
                <Text>{item.time}</Text>
                {renderStatus(item)}
                <MessageButton maintenanceSheet={item} />
                <DeleteButton record={item} onDeleteSuccess={onDeleteSuccess} />
              </Space>
            }
          >
            {item.description}
          </Card>
        </List.Item>
      )}
    />
  );
};

const TenantMaintenance = () => {
  return (
    <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
      <TabPane tab="My Record" key="1">
        <RecordPane />
      </TabPane>
      <TabPane tab="Create New" key="2">
        <CreateNewMaintenance asManager={false} />
      </TabPane>
    </Tabs>
  );
};

export default TenantMaintenance;
