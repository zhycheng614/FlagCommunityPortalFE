import React from "react";
import {
  message,
  Tabs,
  List,
  Typography,
  Button,
  Card,
  Row,
  Col,
  Result,
} from "antd";
import AmenitiesPage from "../tenant/AmenitiesPage";
import moment from "moment";
import { getReservations, cancelReservation } from "../../util";

const { Text } = Typography;
const { TabPane } = Tabs;

export class AllReservationsBlock extends React.Component {
  state = {
    loading: false,
    data: [],
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({
      loading: true,
    });
    try {
      const resp = await getReservations();
      this.setState({
        data: resp,
      });
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <Card
        style={{
          margin: "10px",
        }}
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text ellipsis={true} style={{ maxWidth: 200 }}>
              Upcoming Reservations
            </Text>
          </div>
        }
      >
        <List
          style={{ margin: "auto", height: 242, overflow: "auto" }}
          loading={this.state.loading}
          dataSource={this.state.data}
          renderItem={(item) => (
            //超出显示滚动条
            <List.Item>
              <List.Item.Meta
                title={<Text>{item.amenityName}</Text>}
                description={
                  <>
                    {/* 循环children并输出 <Text>
                    Event: {item.reservation_name}, Reservation ID:
                    {item.reservation_id}
                  </Text>
                  <br />
                  <Text>
                    Date: {item.date}, Start Time: {item.start_time}, End Time:
                    {item.end_time}
                  </Text>*/}
                    {item.childrenList.map((child) => (
                      <>
                        <Text>
                          <Row>
                            <Col span={6}>Name: {child.userId}</Col>
                            <Col span={5}>{child.date}</Col>
                            <Col span={6}>Start: {child.startTime}</Col>
                            <Col span={6}>End: {child.endTime}</Col>
                          </Row>
                        </Text>
                        <br />
                      </>
                    ))}
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

class CancelReservationButton extends React.Component {
  state = {
    loading: false,
  };

  handleCancelReservation = async () => {
    const { reservationId, onCancelSuccess } = this.props;
    this.setState({
      loading: true,
    });

    try {
      await cancelReservation(reservationId);
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }

    onCancelSuccess();
  };

  render() {
    return (
      <Button
        loading={this.state.loading}
        onClick={this.handleCancelReservation}
        danger={true}
        shape="round"
        type="primary"
        style={{ marginLeft: 100 }}
      >
        Cancel Reservation
      </Button>
    );
  }
}

class AllReservations extends React.Component {
  state = {
    loading: false,
    data: [],
  };

  componentDidMount() {
    this.loadData();
  }

  //   dataFormat(date) {
  //     const { today } = this.state;
  //     const todayTime = moment().format("YYYY-MM-DD");
  //     const dateFormat = date.replace(/-/g, "/");
  //     const newDateFormat = Date.parse(dateFormat);
  //     const newDate = newDateFormat <= today ? todayTime : date;
  //     return newDate;
  //   }

  loadData = async () => {
    console.log(Result);
    this.setState({
      loading: true,
    });

    try {
      const resp = await getReservations();
      //   if (nowDate > this.date) {
      //     const resp2 = await getReservations(this.state.date);
      //     this.setState({
      //       allReservations: resp2,
      //     });
      //   }
      this.setState({
        data: resp,
      });
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <List
        style={{ width: 1200, margin: "auto" }}
        loading={this.state.loading}
        dataSource={this.state.data}
        renderItem={(item) => (
          //测试data
          <List.Item>
            <List.Item.Meta
              title={<Text>{item.amenityName}</Text>}
              description={
                <>
                  {/* 循环children并输出 <Text>
                    Event: {item.reservation_name}, Reservation ID:
                    {item.reservation_id}
                  </Text>
                  <br />
                  <Text>
                    Date: {item.date}, Start Time: {item.start_time}, End Time:
                    {item.end_time}
                  </Text>*/}
                  {item.childrenList.map((child) => (
                    <>
                      <Text>
                        <Row>
                          <Col span={4}>
                            Reservation ID:
                            {child.reservation_id}
                          </Col>
                          <Col span={4}>User ID: {child.userId}</Col>
                          <Col span={3}>Date: {child.date}</Col>
                          <Col span={3}>Start: {child.startTime}</Col>
                          <Col span={3}>
                            End:
                            {child.endTime}
                          </Col>
                          <Col span={2}>
                            <CancelReservationButton
                              onCancelSuccess={this.loadData}
                              reservationId={child.reservation_id}
                            />
                          </Col>
                        </Row>
                      </Text>
                      <br />
                    </>
                  ))}
                </>
              }
            />
          </List.Item>
        )}
      />
    );
  }
}

class ManagerReservationPage extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
        <TabPane tab="Amenities" key="1">
          <AmenitiesPage />
        </TabPane>
        <TabPane tab="All Reservations" key="2">
          <AllReservations />
        </TabPane>
      </Tabs>
    );
  }
}

export default ManagerReservationPage;
