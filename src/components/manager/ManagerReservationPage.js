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
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

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
                    {item.childrenList.map((child) => {
                      // Check if the child's date is today or after today
                      if (child.date >= today) {
                        return (
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
                        );
                      }
                      return null; // Skip rendering for reservations before today
                    })}
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

  loadData = async () => {
    console.log(Result);
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
    const today = new Date().toISOString().split("T")[0];

    return (
      <List
        style={{ width: 1200, margin: "auto" }}
        loading={this.state.loading}
        dataSource={this.state.data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<Text>{item.amenityName}</Text>}
              description={
                <>
                  {item.childrenList.map((child) => {
                    if (child.date >= today) {
                      return (
                        <div key={child.reservation_id}>
                          <Text>
                            <Row>
                              <Col span={4}>
                                Reservation ID: {child.reservation_id}
                              </Col>
                              <Col span={4}>User ID: {child.userId}</Col>
                              <Col span={3}>Date: {child.date}</Col>
                              <Col span={3}>Start: {child.startTime}</Col>
                              <Col span={3}>End: {child.endTime}</Col>
                              <Col span={2}>
                                <CancelReservationButton
                                  onCancelSuccess={this.loadData}
                                  reservationId={child.reservation_id}
                                />
                              </Col>
                            </Row>
                          </Text>
                          <br />
                        </div>
                      );
                    }
                    return null;
                  })}
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
