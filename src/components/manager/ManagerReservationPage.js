import React from "react";
import { message, Tabs, List, Typography, Button } from "antd";
import AmenitiesPage from "../tenant/AmenitiesPage";
import { getReservations, cancelReservation } from "../../util";

const { Text } = Typography;
const { TabPane } = Tabs;

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

class AllReservations extends React.Component {
  state = {
    loading: false,
    data: [],
  };

  componentDidMount() {
    this.loadData();
  }

  //暂时

  // renderStatus = (item) => {
  //   let colorStyle = "";
  //   switch (item.status) {
  //     case "Submitted":
  //       colorStyle = statusStyle[0];
  //       break;
  //     case "Distributed":
  //       colorStyle = statusStyle[1];
  //       break;
  //     case "Completed":
  //       colorStyle = statusStyle[2];
  //       break;
  //   }
  //   return (
  //     <Text style={{ color: colorStyle.fontColor, fontWeight: 700 }}>
  //       {item.status}
  //     </Text>
  //   );
  // };

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
      <List
        style={{ width: 1000, margin: "auto" }}
        loading={this.state.loading}
        dataSource={this.state.data}
        // dataSource={data}
        renderItem={(item) => (
          //测试data
          <List.Item
            actions={[
              <CancelReservationButton
                onCancelSuccess={this.loadData}
                reservationId={item.id}
              />,
            ]}
          >
            <List.Item.Meta
              title={<Text>{item.amenity_name}</Text>}
              description={
                <>
                  <Text>
                    Event: {item.reservation_name}, Reservation ID:
                    {item.reservation_id}
                  </Text>
                  <br />
                  <Text>
                    Date: {item.event.date}, Start Time: {item.start_time}, End
                    Time: {item.end_time}
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

const statusStyle = [
  {
    fontColor: "#00FF00",
  },
  {
    fontColor: "#0000FF",
  },
  {
    fontColor: "#888888",
  },
];

const data = [
  {
    amenity_name: "Party Room",
    reservation_id: 141325234,
    event_titile: "birthday party",
    date: 5 / 3,
    start_time: 1,
    end_time: 2,
  },
  {
    amenity_name: "Yoga Room",
    reservation_id: 23411,
    event_titile: "yoga class",
    date: 5 / 25,
    start_time: 1,
    end_time: 2,
  },
];
