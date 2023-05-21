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
      const username = localStorage.getItem("username"); //获取保存的username
      const response = await getPaymentByUser(username); //传递username
      console.log(response); // 打印后端返回的数据
      setInvoices(response);
    } catch (error) {
      console.log("Error fetching payment data:", error);
    }
    setLoading(false);
  };

  const getColumns = (isUnpaidTable) => {
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
      setSelectedInvoices([...selectedInvoices, record.invoiceID]);
    } else {
      setSelectedInvoices(
        selectedInvoices.filter((id) => id !== record.invoiceID)
      );
    }
  };

  const handlePayment = async () => {
    try {
      for (let invoiceID of selectedInvoices) {
        const invoice = invoices.find(
          (invoice) => invoice.invoiceID === invoiceID
        );
        if (!invoice) {
          throw new Error(`Invoice with ID ${invoiceID} not found`);
        }

        invoice.paymentDate = new Date().toISOString();

        await updatePayment(invoice);
      }
      setSelectedInvoices([]);
      fetchData();
    } catch (error) {
      console.log("Error updating payment:", error);
    }
  };

  const paidDataSource = invoices.filter((item) =>
    moment(item.paymentDate).isValid()
  );
  const unpaidDataSource = invoices.filter(
    (item) =>
      !moment(item.paymentDate).isValid() &&
      moment(item.dueDate).isAfter(moment())
  );
  const overdueDataSource = invoices.filter(
    (item) =>
      !moment(item.paymentDate).isValid() &&
      moment(item.dueDate).isBefore(moment())
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
            Pay
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
