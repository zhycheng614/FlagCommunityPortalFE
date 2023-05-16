import React, { useState, useEffect } from "react";
import { getPayment, addPayment } from "../../util";
import { Table, Button, Modal, Input, DatePicker, Tabs } from "antd";

const { TabPane } = Tabs;

const ManagerPaymentPage = () => {
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

  const paidInvoices = invoices.filter((invoice) => invoice.paymentDate);
  const unpaidInvoices = invoices.filter(
    (invoice) => !invoice.paymentDate && new Date(invoice.dueDate) >= new Date()
  );
  const overdueInvoices = invoices.filter(
    (invoice) => !invoice.paymentDate && new Date(invoice.dueDate) < new Date()
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    invoiceName: "",
    amount: "",
    dueDate: "",
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      await addPayment(newInvoice);
      fetchData();
      setIsModalVisible(false);
    } catch (error) {
      console.log("Error adding new invoice:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    setNewInvoice({ ...newInvoice, [e.target.name]: e.target.value });
  };

  const handleDateChange = (_, dateString) => {
    setNewInvoice({ ...newInvoice, dueDate: dateString });
  };

  return (
    <div>
      <Button onClick={showModal}>Add Bills</Button>
      <Modal
        title="Add Bills"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          name="invoiceName"
          placeholder="Invoice Name"
          onChange={handleInputChange}
          value={newInvoice.invoiceName}
        />
        <br />
        <br />
        <Input
          name="amount"
          placeholder="Amount"
          type="number"
          onChange={handleInputChange}
          value={newInvoice.amount}
        />
        <br />
        <br />
        <DatePicker
          name="dueDate"
          onChange={handleDateChange}
          format="YYYY-MM-DD"
        />
      </Modal>
      <Tabs defaultActiveKey="1">
        <TabPane tab="All" key="1">
          <Table dataSource={invoices} columns={columns} loading={loading} />
        </TabPane>
        <TabPane tab="Paid" key="2">
          <Table
            dataSource={paidInvoices}
            columns={columns}
            loading={loading}
          />
        </TabPane>
        <TabPane tab="Unpaid" key="3">
          <Table
            dataSource={unpaidInvoices}
            columns={columns}
            loading={loading}
          />
        </TabPane>
        <TabPane tab="Overdue" key="4">
          <Table
            dataSource={overdueInvoices}
            columns={columns}
            loading={loading}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ManagerPaymentPage;
