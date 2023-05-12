import React from "react";
import { Button, Table, Tabs } from "antd";
import moment from "moment";

const { TabPane } = Tabs;

class TenantPaymentPage extends React.Component {
  getColumns(isUnpaidTable) {
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
        render: (_, record) => <input type="checkbox" />,
      });
    }

    return columns;
  }

  render() {
    const paidDataSource = testDataSource.filter(
      (item) => item.status === "Paid"
    );
    const unpaidDataSource = testDataSource.filter(
      (item) => item.status === "Unpaid"
    );
    const overdueDataSource = testDataSource.filter(
      (item) =>
        item.status === "Unpaid" &&
        moment(item.time, "YYYY.MM.DD h:mmA").isBefore(moment())
    );

    return (
      <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
        <TabPane tab="Paid" key="1">
          <Table
            columns={this.getColumns(false)}
            dataSource={paidDataSource}
            rowKey="id"
          />
        </TabPane>
        <TabPane tab="Unpaid" key="2">
          <Table
            columns={this.getColumns(true)}
            dataSource={unpaidDataSource}
            rowKey="id"
          />
          <div style={{ textAlign: "right", marginTop: "15px" }}>
            <Button type="primary">Payment</Button>
          </div>
        </TabPane>
        <TabPane tab="Overdue" key="3">
          <Table
            columns={this.getColumns(false)}
            dataSource={overdueDataSource}
            rowKey="id"
          />
        </TabPane>
      </Tabs>
    );
  }
}

export default TenantPaymentPage;

const testDataSource = [
  {
    id: 1,
    title: "Rent",
    location: "501",
    description: "This is the rent for April",
    amount: "3500",
    status: "Paid",
    time: "2023.4.1 11:59pm",
  },
  {
    id: 2,
    title: "Utilities Fee",
    location: "501",
    description: "This is the utilities fee for April",
    amount: "250",
    status: "Paid",
    time: "2023.4.1 11:59pm",
  },
  {
    id: 3,
    title: "Rent",
    location: "502",
    description: "This is the rent for April",
    amount: "3200",
    status: "Unpaid",
    time: "2023.4.1 11:59pm",
  },
  {
    id: 4,
    title: "Utilities Fee",
    location: "502",
    description: "This is the utilities fee for April",
    amount: "230",
    status: "Unpaid",
    time: "2023.4.1 11:59pm",
  },
  {
    id: 5,
    title: "Rent",
    location: "503",
    description: "This is the rent for June",
    amount: "3800",
    status: "Unpaid",
    time: "2023.6.1 11:59pm",
  },
  {
    id: 6,
    title: "Utilities Fee",
    location: "503",
    description: "This is the utilities fee for June",
    amount: "300",
    status: "Unpaid",
    time: "2023.6.1 11:59pm",
  },
  {
    id: 7,
    title: "Rent",
    location: "504",
    description: "This is the rent for June",
    amount: "3400",
    status: "Unpaid",
    time: "2023.6.1 11:59pm",
  },
  {
    id: 8,
    title: "Utilities Fee",
    location: "504",
    description: "This is the utilities fee for June",
    amount: "280",
    status: "Unpaid",
    time: "2023.6.1 11:59pm",
  },
];
