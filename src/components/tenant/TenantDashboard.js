import { Card, Space, Table, message } from "antd";
import { PushpinOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { MyReservationsBlock } from "./TenantReservationPage";
import { useEffect, useState } from "react";
import {
  getAllAnnouncements,
  getMaintenanceByUser,
  getPaymentByUser,
  updatePayment,
} from "../../util";
import { ContentDetailButton } from "../manager/ManagerAnnouncementPage";
import { MessageButton } from "./TenantMaintenance";
import moment from "moment";

export const MaintenanceBlock = ({ rows }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadData = async () => {
    setLoading(true);

    try {
      const resp = await getMaintenanceByUser();
      const inProgressRecord = resp.filter(
        (resp) => resp.status === "In Progress"
      );
      setData(inProgressRecord.reverse().slice(0, rows));
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
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      key: "process_date",
      dataIndex: "process_date",
      align: "center",
      width: "20%",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      width: "20%",
      render: (text, record, index) => (
        <Text style={{ color: "#0000FF", fontWeight: 700 }}>
          {data[index].status}
        </Text>
      ),
    },
    {
      title: "Message",
      key: "message",
      dataIndex: "message",
      align: "center",
      width: "1%",
      render: (text, record, index) => (
        <MessageButton maintenanceSheet={data[index]} />
      ),
    },
  ];

  return (
    <Card
      style={{
        height: "100%",
        margin: "10px",
      }}
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text ellipsis={true} style={{ maxWidth: 400 }}>
            Maintenance In Progress
          </Text>
        </div>
      }
    >
      <Table
        showHeader={false}
        size="small"
        pagination={false}
        loading={loading}
        columns={columns}
        dataSource={data}
      />
    </Card>
  );
};

export const AnnouncementBlock = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // helper function to process announcement to a certain order
  const processAnnouncement = (assembledData, annoucementResp) => {
    const reversedArray = annoucementResp.reverse();
    const result = [];
    for (let announcement of reversedArray) {
      if (announcement.priority) {
        result.push(announcement);
      }
    }
    for (let announcement of reversedArray) {
      if (!announcement.priority) {
        result.push(announcement);
      }
    }
    assembledData[0] = result;
  };

  const loadData = async () => {
    setLoading(true);

    try {
      const annoucementResp = await getAllAnnouncements();
      const assembledData = Array(4);
      processAnnouncement(assembledData, annoucementResp);
      // get maintenance, reservation, and payment
      setData(assembledData);
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
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      align: "center",
      width: "10px",
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
      width: "130px",
      render: (text, record) => (
        <Space>
          <Text>Details</Text>
          <ContentDetailButton announcement={record} />
        </Space>
      ),
    },
    {
      title: "Release Time",
      key: "time",
      dataIndex: "time",
      align: "center",
      width: "120px",
    },
  ];

  return (
    <Card
      style={{
        height: "100%",
        margin: "10px",
      }}
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text ellipsis={true} style={{ maxWidth: 150 }}>
            Announcement
          </Text>
        </div>
      }
    >
      <Table
        // style={{ height: "400px" }}
        // scroll={{ y: "500px" }}
        pagination={{ pageSize: 5 }}
        loading={loading}
        columns={columns}
        dataSource={data[0]}
      />
    </Card>
  );
};

export const PaymentBlock = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getPaymentByUser();
      setInvoices(response);
    } catch (error) {
      console.log("Error fetching payment data:", error);
    }
    setLoading(false);
  };

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "invoiceID",
      key: "invoiceID",
    },
    {
      title: "Tenant",
      dataIndex: "tenant",
      key: "tenant",
    },
    {
      title: "Invoice Name",
      dataIndex: "invoiceName",
      key: "invoiceName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      render: (invoiceDate) =>
        moment(invoiceDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate) =>
        moment(dueDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (paymentDate) =>
        paymentDate
          ? moment(paymentDate, "YYYY-MM-DD HH:mm:ss").format(
              "YYYY-MM-DD HH:mm"
            )
          : "",
    },
  ];

  const unpaidDataSource = invoices.filter(
    (item) =>
      !moment(item.paymentDate).isValid() &&
      moment(item.dueDate).isAfter(moment())
  );

  return (
    <Card
      style={{ height: "100%", margin: "10px" }}
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text ellipsis={true} style={{ maxWidth: 150 }}>
            Unpaid Invoices
          </Text>
        </div>
      }
    >
      <Table
        style={{ height: "0px" }}
        showHeader={false}
        columns={columns}
        dataSource={unpaidDataSource}
        rowKey="id"
        size="small"
        loading={loading}
      />
    </Card>
  );
};

const TenantDashboard = () => {
  return (
    <>
      <div style={{ width: "50%", height: "100%", float: "left" }}>
        <AnnouncementBlock />
      </div>
      <div style={{ width: "50%", height: "33.3%", float: "left" }}>
        <MaintenanceBlock rows={2} />
      </div>
      <div
        style={{
          width: "50%",
          height: "33.3%",
          float: "left",
          marginTop: "10px",
        }}
      >
        <MyReservationsBlock />
      </div>
      <div
        style={{
          width: "50%",
          height: "33.3%",
          float: "left",
          marginTop: "10px",
        }}
      >
        <PaymentBlock />
      </div>
    </>
  );
};

export default TenantDashboard;
