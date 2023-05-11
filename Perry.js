import React from "react";
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

const { TextArea } = Input;
const { TabPane } = Tabs;

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

const CompletedPane = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    /* setLoading(true);

    try {
      const resp = await getCompletedRecords(); // user information will be passed in with token
      setData(resp);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    } */
  };

  return (
    <List
      loading={loading}
      pagination={{ pageSize: 10 }}
      grid={{ column: 1 }}
      dataSource={testDataSource} // should replace it by data
      renderItem={(item) => (
        <List.Item>
          <Card
            key={item.id}
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text ellipsis={true} style={{ maxWidth: 300 }}>
                  {`${item.title}\u00A0\u00A0\u00A0@${item.location}`}
                </Text>
              </div>
            }
            extra={
              <Space size="large">
                <Text>{item.time}</Text>
                <Text style={{ color: "#888888", fontWeight: 700 }}>
                  Completed
                </Text>
                <MessageButton maintenanceSheet={item} />
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

// component button for the provider to set complete for records
const CompleteButton = (props) => {
  const [loading, setLoading] = useState(false);

  const handleOnClick = async () => {
    const { record, onCompleteSuccess } = props;

    // set message and state to record
    record.status = "completed";
    /* we may also set a new time based on the new state */

    // call api to store the input to backend, and change state of it
    setLoading(true);
    /* 
    try {
      await updateRecord(record); // this api needs to be refined
      onRespondSuccess();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    } */
  };

  return (
    <Button loading={loading} onClick={handleOnClick} type="primary">
      Complete
    </Button>
  );
};

const RespondedPane = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    /* setLoading(true);

    try {
      const resp = await getRespondedRecords(); // user information will be passed in with token
      setData(resp);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    } */
  };

  return (
    <List
      loading={loading}
      pagination={{ pageSize: 10 }}
      grid={{ column: 1 }}
      dataSource={testDataSource2} // should replace it by data
      renderItem={(item) => (
        <List.Item>
          <Card
            key={item.id}
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text ellipsis={true} style={{ maxWidth: 300 }}>
                  {`${item.title}\u00A0\u00A0\u00A0@${item.location}`}
                </Text>
              </div>
            }
            extra={
              <Space size="large">
                <Text>{item.time}</Text>
                <Text style={{ color: "#0000FF", fontWeight: 700 }}>
                  Responded
                </Text>
                <MessageButton maintenanceSheet={item} />
                <CompleteButton record={item} onCompleteSuccess={loadData} />
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

// component button for the provider to give response to submitted record
const RespondButton = (props) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const handleOk = async () => {
    setModalVisible(false);
    const { record, onRespondSuccess } = props;

    // set message and state to record
    record.message = inputMessage;
    record.status = "distributed";
    /* we may also set a new time based on the new state */

    // call api to store the input to backend, and change state of it
    setLoading(true);
    /* 
    try {
      await updateRecord(record); // this api needs to be refined
      onRespondSuccess();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    } */
  };

  return (
    <>
      <Button
        loading={loading}
        onClick={() => setModalVisible(true)}
        type="primary"
      >
        Respond
      </Button>
      {modalVisible && (
        <Modal
          title="Message for Tenant"
          centered={true}
          open={modalVisible}
          closable={false}
          onOk={handleOk}
          onCancel={() => setModalVisible(false)}
        >
          <Space direction="vertical">
            <TextArea
              style={{ width: 472 }}
              rows={4}
              placeholder="Leave a message to the tenant to indicate the time of the home maintenance."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
          </Space>
        </Modal>
      )}
    </>
  );
};

const SubmittedPane = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    /* setLoading(true);

    try {
      const resp = await getsubmittedRecords(); // user information will be passed in with token
      setData(resp);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    } */
  };

  return (
    <List
      loading={loading}
      pagination={{ pageSize: 10 }}
      grid={{ column: 1 }}
      dataSource={testDataSource} // should replace it by data
      renderItem={(item) => (
        <List.Item>
          <Card
            key={item.id}
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text ellipsis={true} style={{ maxWidth: 300 }}>
                  {`${item.title}\u00A0\u00A0\u00A0@${item.location}`}
                </Text>
              </div>
            }
            extra={
              <Space size="large">
                <Text>{item.time}</Text>
                <Text style={{ color: "#00FF00", fontWeight: 700 }}>
                  Submmitted
                </Text>
                {/* <MessageButton maintenanceSheet={item} /> */}
                <RespondButton record={item} onRespondSuccess={loadData} />
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

const ProviderMaintenance = () => {
  return (
    <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
      <TabPane tab="Submitted" key="1">
        <SubmittedPane />
      </TabPane>
      <TabPane tab="Responded" key="2">
        <RespondedPane />
      </TabPane>
      <TabPane tab="Completed" key="3">
        <CompletedPane />
      </TabPane>
    </Tabs>
  );
};

export default ProviderMaintenance;

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
    status: "Submitted",
    time: "2023.5.1 19:38pm",
    message: "I'll go to your home on Friday 10 am. My phone is: 606-614-8523.",
  },
  {
    id: 3,
    title: "Broken Door",
    location: "803",
    description: "The door is not working.",
    status: "Submitted",
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
    status: "Submitted",
    time: "2023.5.1 10:27pm",
    message:
      "I'll go to your home on Friday 10 am. My phone is: 606-614-8523.\
    If you have any questions, please feel free to call me.",
  },
  {
    id: 5,
    title: "Broken Door 3",
    location: "Central Garden",
    description: "The door is not working.",
    status: "Submitted",
    time: "2023.5.1 19:33pm",
    message:
      "I'll go to your home on Friday 10 am. My phone is: 606-614-8523.\
    If you have any questions, please feel free to call me.",
  },
];

const testDataSource2 = [
  {
    id: 1,
    title: "Ceiling Leak",
    location: "501",
    description: "My ceiling is leaking and I need help immediately.",
    status: "Distributed",
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
    status: "Distributed",
    time: "2023.5.1 13:59pm",
    message:
      "I'll go to your home on Friday 10 am. My phone is: 606-614-8523.\
    If you have any questions, please feel free to call me.",
  },
];
