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
import { deleteMaintenance, getMaintenanceByUser } from "../../util";

const { TabPane } = Tabs;

export const MessageButton = (props) => {
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
    setLoading(true);
    try {
      await deleteMaintenance(record.id);
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
    let statusDate = "";
    let status = "";
    switch (item.status) {
      case "submitted":
        colorStyle = statusStyle[0];
        statusDate = item.submit_date;
        status = "Submitted";
        break;
      case "In Progress":
        colorStyle = statusStyle[1];
        statusDate = item.process_date;
        status = "In Progress";
        break;
      case "complete":
        colorStyle = statusStyle[2];
        statusDate = item.complete_date;
        status = "Completed";
        break;
    }
    return (
      <>
        <Text>{statusDate}</Text>
        <Text style={{ color: colorStyle.fontColor, fontWeight: 700 }}>
          {status}
        </Text>
      </>
    );
  };

  const loadData = async () => {
    setLoading(true);

    try {
      const resp = await getMaintenanceByUser();
      setData(resp.reverse());
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteSuccess = () => {
    message.success("Record deleted successfully");
    loadData();
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
                <Text ellipsis={true} style={{ maxWidth: 150 }}>
                  {item.title}
                </Text>
              </div>
            }
            extra={
              <Space size="large">
                {renderStatus(item)}
                <MessageButton maintenanceSheet={item} />
                <DeleteButton record={item} onDeleteSuccess={onDeleteSuccess} />
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
