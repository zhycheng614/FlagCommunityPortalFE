import React from "react";
import { Col, Row, message, Tabs, List, Typography, Button, Card } from "antd";
import AmenitiesPage from "./AmenitiesPage";
import { getReservationsByUser, cancelReservation } from "../../util";

const { Text } = Typography;
const { TabPane } = Tabs;

export class MyReservationsBlock extends React.Component {
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
      const resp = await getReservationsByUser();
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
    // const { loading, reservations } = this.state;
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
          style={{ margin: "auto", height: 100, overflow: "auto" }}
          loading={this.state.loading}
          dataSource={this.state.data}
          renderItem={(item) => (
            //超出显示滚动条
            <List.Item
            // actions={[
            //   <CancelReservationButton
            //     onCancelSuccess={this.loadData}
            //     reservationId={item.reservation_id}
            //   />,
            // ]}
            >
              <List.Item.Meta
                description={
                  <>
                    <Text>
                      <Row>
                        <Col span={6}> {item.reservationName}</Col>
                        <Col span={5}>{item.date}</Col>
                        <Col span={6}>Start: {item.startTime}</Col>
                        <Col span={6}>End: {item.endTime}</Col>
                      </Row>
                    </Text>
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
      >
        Cancel Reservation
      </Button>
    );
  }
}

class MyReservations extends React.Component {
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
      const resp = await getReservationsByUser();
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
    // const { loading, reservations } = this.state;

    return (
      <List
        style={{ width: 1200, margin: "auto" }}
        loading={this.state.loading}
        dataSource={this.state.data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <CancelReservationButton
                onCancelSuccess={this.loadData}
                reservationId={item.reservation_id}
              />,
            ]}
          >
            <List.Item.Meta
              title={<Text>{item.amenity_name}</Text>}
              description={
                <>
                  <Text>
                    <Row>
                      <Col span={5}> Location: {item.reservationName}</Col>

                      <Col span={5}>
                        Reservation ID:
                        {item.reservation_id}
                      </Col>
                      <Col span={4}>Date: {item.date}</Col>
                      <Col span={4}>Start: {item.startTime}</Col>
                      <Col span={4}>
                        End:
                        {item.endTime}
                      </Col>
                    </Row>
                  </Text>
                </>
              }
            />
          </List.Item>
        )}
      />
    );
  }
}

class TenantReservationPage extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
        <TabPane tab="Amenities" key="1">
          <AmenitiesPage />
        </TabPane>
        <TabPane tab="MyReservations" key="2">
          <MyReservations />
        </TabPane>
      </Tabs>
    );
  }
}

export default TenantReservationPage;
