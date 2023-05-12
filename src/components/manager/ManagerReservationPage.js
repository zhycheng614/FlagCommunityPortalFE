import React from "react";
import {
  Row,
  Col,
  Image,
  message,
  Tabs,
  List,
  Typography,
  Form,
  InputNumber,
  DatePicker,
  Button,
  Card,
  Carousel,
  Modal,
} from "antd";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import AmenitiesPage from "../tenant/AmenitiesPage";

const { Text } = Typography;
const { TabPane } = Tabs;
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

class AllReservations extends React.Component {
  state = {
    loading: false,
    data: [],
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    //   this.setState({
    //     loading: true,
    //   });
    //   try {
    //     const resp = await getAllReservation();
    //     this.setState({
    //       data: resp,
    //     });
    //   } catch (error) {
    //     message.error(error.message);
    //   } finally {
    //     this.setState({
    //       loading: false,
    //     });
    //   }
  };

  render() {
    return (
      <List
        style={{ width: 1000, margin: "auto" }}
        loading={this.state.loading}
        // dataSource={this.state.data}
        dataSource={data}
        renderItem={(item) => (
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
                    Event: {item.event_titile}, Reservation ID:
                    {item.reservation_id}
                  </Text>
                  <br />
                  <Text>
                    Date: {item.event_date}, Start Time: {item.start_time}, End
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

class CancelReservationButton extends React.Component {
  state = {
    loading: false,
  };

  // handleCancelReservation = async () => {
  //   const { reservation_id, onCancelSuccess } = this.props;
  //   this.setState({
  //     loading: true,
  //   });

  //   try {
  //     await cancelReservation(reservation_id);
  //   } catch (error) {
  //     message.error(error.message);
  //   } finally {
  //     this.setState({
  //       loading: false,
  //     });
  //   }

  //   onCancelSuccess();
  // };

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
