import React, { useState, useEffect } from "react";
import { getPayment, addPayment } from "../../util";
import {
  Table,
  Button,
  Modal,
  Input,
  DatePicker,
  Tabs,
  Select,
  Form,
} from "antd";

const { TabPane } = Tabs;
const { Option } = Select;

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

  const calculateAmount = (apartmentType, invoiceName) => {
    const rates = {
      "1-Bedroom": { "Management Fee": 600, Rent: 3500 },
      "2-Bedroom": { "Management Fee": 700, Rent: 4000 },
      Studio: { "Management Fee": 500, Rent: 3000 },
    };
    if (
      invoiceName !== "Other" &&
      rates[apartmentType] &&
      rates[apartmentType][invoiceName]
    ) {
      return rates[apartmentType][invoiceName];
    }

    return "";
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    console.log(newInvoice);
    const finalInvoice = {
      invoiceName: newInvoice.invoiceName,
      amount: newInvoice.amount,
      dueDate: `${newInvoice.dueDate}T23:59:59`,
    };
    try {
      await addPayment(
        finalInvoice,
        newInvoice.apartmentType,
        newInvoice.invoiceName
      );
      fetchData();
      setIsModalVisible(false);
    } catch (error) {
      console.log("Error adding new invoice:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (name, value) => {
    let updatedInvoice = { ...newInvoice, [name]: value };
    if (name === "invoiceName" && value === "Other") {
      updatedInvoice = { ...updatedInvoice, amount: "" };
    } else if (name === "invoiceName" || name === "apartmentType") {
      updatedInvoice = {
        ...updatedInvoice,
        amount: calculateAmount(
          updatedInvoice.apartmentType,
          updatedInvoice.invoiceName
        ),
      };
    }
    setNewInvoice(updatedInvoice);
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
        <Form.Item label="Room Type">
          <Select
            name="apartmentType"
            placeholder="Apartment Type"
            style={{ width: 200 }}
            onChange={(value) => handleInputChange("apartmentType", value)}
            value={newInvoice.apartmentType}
          >
            <Option value="1-Bedroom">1-Bedroom</Option>
            <Option value="2-Bedroom">2-Bedroom</Option>
            <Option value="Studio">Studio</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Bill Type">
          <Select
            name="invoiceName"
            placeholder="Bill Type"
            style={{ width: 200 }}
            onChange={(value) => handleInputChange("invoiceName", value)}
            value={newInvoice.invoiceName}
          >
            <Option value="Management Fee">Management Fee</Option>
            <Option value="Rent">Rent</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Amount">
          <Input
            name="amount"
            placeholder="Amount"
            type="number"
            disabled={newInvoice.invoiceName !== "Other"}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            value={newInvoice.amount}
          />
        </Form.Item>

        <Form.Item label="Due Date">
          <DatePicker
            name="dueDate"
            onChange={handleDateChange}
            format="YYYY-MM-DD"
          />
        </Form.Item>
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
