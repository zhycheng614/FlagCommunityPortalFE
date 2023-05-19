import { getMaintenance } from "../../util";
import CreateNewMaintenance from "../tenant/CreateNewMaintenance";
import { MessageButton, RecordPane } from "../tenant/TenantMaintenance";
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
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";

const { TabPane } = Tabs;

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

export const AllRecordsPane = () => {
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
      const resp = await getMaintenance();
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
                <Text ellipsis={true} style={{ maxWidth: 300 }}>
                  {`${item.title}\u00A0\u00A0\u00A0@${item.location}`}
                </Text>
              </div>
            }
            extra={
              <Space size="large">
                {renderStatus(item)}
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

const ManagerMaintenance = () => {
  return (
    <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
      <TabPane tab="My Record" key="1">
        <RecordPane />
      </TabPane>
      <TabPane tab="All Records" key="2">
        <AllRecordsPane />
      </TabPane>
      <TabPane tab="Create New" key="3">
        <CreateNewMaintenance asManager={true} />
      </TabPane>
    </Tabs>
  );
};

export default ManagerMaintenance;
