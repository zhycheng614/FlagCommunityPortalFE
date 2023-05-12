import React from "react";
import { Button, DatePicker, Form, Input, Table, Tabs, Checkbox } from "antd";
import moment from "moment";

const { TabPane } = Tabs;
const { Item: FormItem } = Form;

class ManagerPaymentPage extends React.Component {
  state = {
    selectedRowKeys: [],
  };

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
        title: (
          <Checkbox
            onChange={this.onSelectAll}
            checked={
              this.state.selectedRowKeys.length ===
              this.state.unpaidDataSource.length
            }
          />
        ),
        dataIndex: "checkbox",
        render: (_, record) => (
          <Checkbox
            checked={this.state.selectedRowKeys.includes(record.id)}
            onChange={() => this.onSelectRow(record.id)}
          />
        ),
        key: "checkbox",
      });
    }

    return columns;
  }

  onSelectAll = (e) => {
    const selectedRowKeys = e.target.checked
      ? this.state.unpaidDataSource.map((item) => item.id)
      : [];
    this.setState({ selectedRowKeys });
  };

  onSelectRow = (id) => {
    const { selectedRowKeys } = this.state;
    const index = selectedRowKeys.indexOf(id);
    if (index === -1) {
      selectedRowKeys.push(id);
    } else {
      selectedRowKeys.splice(index, 1);
    }
    this.setState({ selectedRowKeys });
  };

  onFinish = (values) => {
    const { testDataSource } = this.state;
    const newRecord = {
      ...values,
      status: "Unpaid",
      time: `${values.time.format("YYYY.M.D")} 11:59pm`,
    };
    this.setState({ testDataSource: [...testDataSource, newRecord] });
  };

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

    this.state.unpaidDataSource = unpaidDataSource;

    return (
      <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
        <TabPane tab="Paid" key="1">
          <Table
            columns={this.getColumns(false)}
            dataSource={unpaidDataSource}
            rowKey="id"
          />
        </TabPane>
        <TabPane tab="Unpaid" key="2">
          <Table
            columns={this.getColumns(false)}
            dataSource={unpaidDataSource}
            rowKey="id"
          />
        </TabPane>
        <TabPane tab="Overdue" key="3">
          <Table
            columns={this.getColumns(true)}
            dataSource={overdueDataSource}
            rowKey="id"
          />
          <div style={{ textAlign: "right", marginTop: "15px" }}>
            <Button type="primary" onClick={this.sendNotification}>
              Send Notification
            </Button>
          </div>
        </TabPane>
        <TabPane tab="Add Bills" key="4">
          <Form onFinish={this.onFinish}>
            <FormItem
              label="ID"
              name="id"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </FormItem>
            <FormItem
              label="Title"
              name="title"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </FormItem>
            <FormItem
              label="Location"
              name="location"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </FormItem>
            <FormItem
              label="Description"
              name="description"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </FormItem>
            <FormItem
              label="Amount"
              name="amount"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </FormItem>
            <FormItem
              label="Time"
              name="time"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DatePicker format="YYYY.M.D" />
            </FormItem>
            <FormItem style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
    );
  }

  sendNotification = () => {
    // Implement the logic to send notifications to the selected users
    console.log("Sending notifications to:", this.state.selectedRowKeys);
  };
}

export default ManagerPaymentPage;

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
