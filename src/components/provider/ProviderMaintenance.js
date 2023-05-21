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
import {
  claimTask,
  completeMaintenance,
  getMaintenanceClaimed,
  getMaintenanceCompleted,
  getMaintenanceSubmitted,
} from "../../util";

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
      {modalVisible && (
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
    setLoading(true);

    try {
      const resp = await getMaintenanceCompleted();
      setData(resp.reverse());
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <List
      loading={loading}
      pagination={{ pageSize: 10 }}
      grid={{ column: 1 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            key={item.id}
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text ellipsis={true} style={{ maxWidth: 500 }}>
                  {`${item.title}\u00A0\u00A0\u00A0@${item.location}`}
                </Text>
              </div>
            }
            extra={
              <Space size="large">
                <Text>{item.complete_date}</Text>
                <Text style={{ color: "#888888", fontWeight: 700 }}>
                  Completed
                </Text>
                <MessageButton maintenanceSheet={item} />
              </Space>
            }
          >
            {item.issueDescription}
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

    setLoading(true);

    try {
      await completeMaintenance(record.id);
      onCompleteSuccess();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
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
    setLoading(true);

    try {
      const resp = await getMaintenanceClaimed();
      setData(resp.reverse());
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <List
      loading={loading}
      pagination={{ pageSize: 10 }}
      grid={{ column: 1 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            key={item.id}
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text ellipsis={true} style={{ maxWidth: 500 }}>
                  {`${item.title}\u00A0\u00A0\u00A0@${item.location}`}
                </Text>
              </div>
            }
            extra={
              <Space size="large">
                <Text>{item.process_date}</Text>
                <Text style={{ color: "#0000FF", fontWeight: 700 }}>
                  Responded
                </Text>
                <MessageButton maintenanceSheet={item} />
                <CompleteButton record={item} onCompleteSuccess={loadData} />
              </Space>
            }
          >
            {item.issueDescription}
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

    setLoading(true);

    try {
      await claimTask(record.id, inputMessage);
      onRespondSuccess();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
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
    setLoading(true);

    try {
      const resp = await getMaintenanceSubmitted();
      setData(resp.reverse());
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onRespondSuccess = () => {
    loadData();
    message.success("Responded successfully.");
  };

  return (
    <List
      loading={loading}
      pagination={{ pageSize: 10 }}
      grid={{ column: 1 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            key={item.id}
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text ellipsis={true} style={{ maxWidth: 500 }}>
                  {`${item.title}\u00A0\u00A0\u00A0@${item.location}`}
                </Text>
              </div>
            }
            extra={
              <Space size="large">
                <Text>{item.submit_date}</Text>
                <Text style={{ color: "#00FF00", fontWeight: 700 }}>
                  Submmitted
                </Text>
                <RespondButton
                  record={item}
                  onRespondSuccess={onRespondSuccess}
                />
              </Space>
            }
          >
            {item.issueDescription}
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
