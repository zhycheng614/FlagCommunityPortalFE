import { AnnouncementBlock, MaintenanceBlock } from "../tenant/TenantDashboard";
import { AllReservationsBlock } from "../manager/ManagerReservationPage";
import React, { useState, useEffect } from "react";
import { getPayment } from "../../util";
import { Table, Card, Typography } from "antd";

const { Text } = Typography;

export const PaymentBlock = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "invoiceID",
    },
    {
      title: "Tenant",
      dataIndex: "tenant",
    },
    {
      title: "Invoice Name",
      dataIndex: "invoiceName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getPayment();
      setInvoices(response);
    } catch (error) {
      console.log("Error fetching payment data:", error);
    }
    setLoading(false);
  };

  const unpaidInvoices = invoices.filter(
    (invoice) => !invoice.paymentDate && new Date(invoice.dueDate) >= new Date()
  );

  return (
    <Card
      style={{ margin: "10px" }}
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text ellipsis={true} style={{ maxWidth: 150 }}>
            Unpaid Invoices
          </Text>
        </div>
      }
    >
      <Table
        dataSource={unpaidInvoices}
        columns={columns}
        loading={loading}
        rowKey="invoiceID"
      />
    </Card>
  );
};

const ManagerDashboard = () => {
  return (
    <>
      <div style={{ width: "50%", height: "100%", float: "left" }}>
        <AnnouncementBlock />
      </div>
      <div style={{ width: "50%", height: "50%", float: "left" }}>
        <MaintenanceBlock rows={3} />
      </div>
      <div style={{ width: "50%", height: "50%", float: "left" }}>
        <AllReservationsBlock />
      </div>
      <div style={{ width: "50%", height: "50%", float: "left" }}>
        <PaymentBlock />
      </div>
    </>
  );
};

export default ManagerDashboard;
