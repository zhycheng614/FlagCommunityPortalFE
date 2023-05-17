import React, { useState, useEffect } from "react";
import { Button, Table, Tabs } from "antd";
import { getPaymentByUser, updatePayment } from "../../util";
import moment from "moment";

const { TabPane } = Tabs;

const TenantPaymentPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoices, setSelectedInvoices] = useState([]);

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

  const getColumns = (isUnpaidTable) => {
    const columns = [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Title", dataIndex: "title", key: "title" },
      { title: "Location", dataIndex: "location", key: "location" },
      { title: "Description", dataIndex: "description", key: "description" },
      { title: "Amount", dataIndex: "amount", key: "amount" },
      { title: "Time", dataIndex: "time", key: "time" },
    ];

    if (isUnpaidTable) {
      columns.push({
        title: "Select",
        dataIndex: "select",
        key: "select",
        render: (_, record) => (
          <input
            type="checkbox"
            onChange={(e) => handleCheckboxChange(e, record)}
          />
        ),
      });
    }

    return columns;
  };

  const handleCheckboxChange = (e, record) => {
    if (e.target.checked) {
      setSelectedInvoices([...selectedInvoices, record.id]);
    } else {
      setSelectedInvoices(selectedInvoices.filter((id) => id !== record.id));
    }
  };

  const handlePayment = async () => {
    try {
      await updatePayment(selectedInvoices);
      setSelectedInvoices([]);
      fetchData();
    } catch (error) {
      console.log("Error updating payment:", error);
    }
  };

  const paidDataSource = invoices.filter((item) => item.status === "Paid");
  const unpaidDataSource = invoices.filter((item) => item.status === "Unpaid");
  const overdueDataSource = invoices.filter(
    (item) =>
      item.status === "Unpaid" &&
      moment(item.time, "YYYY.MM.DD h:mmA").isBefore(moment())
  );

  return (
    <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
      <TabPane tab="Paid" key="1">
        <Table
          columns={getColumns(false)}
          dataSource={paidDataSource}
          rowKey="id"
          loading={loading}
        />
      </TabPane>
      <TabPane tab="Unpaid" key="2">
        <Table
          columns={getColumns(true)}
          dataSource={unpaidDataSource}
          rowKey="id"
          loading={loading}
        />
        <div style={{ textAlign: "right", marginTop: "15px" }}>
          <Button type="primary" onClick={handlePayment}>
            Payment
          </Button>
        </div>
      </TabPane>
      <TabPane tab="Overdue" key="3">
        <Table
          columns={getColumns(false)}
          dataSource={overdueDataSource}
          rowKey="id"
          loading={loading}
        />
      </TabPane>
    </Tabs>
  );
};

export default TenantPaymentPage;
