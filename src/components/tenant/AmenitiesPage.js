import React from "react";
import {
  Checkbox,
  Select,
  Input,
  Col,
  Row,
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
  Modal,
  Tooltip,
  Space,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  getReservations,
  addReservation,
  getReservationsByDate,
} from "../../util";

const { Text } = Typography;

const handleChange = (value) => {
    console.log(`Selected: ${value}`);
};

export class AmenityDetailInfoButton extends React.Component {
    state = {
        modalVisible: false,
    };

    openModal = () => {
        this.setState({
            modalVisible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            modalVisible: false,
        });
    };

  render() {
    const { amenity } = this.props;
    const { capacity } = amenity;
    const { modalVisible } = this.state;
    return (
      <>
        <Tooltip title="View Amenity Capacity">
          <Button
            onClick={this.openModal}
            style={{ border: "none" }}
            size="large"
            icon={<InfoCircleOutlined />}
          />
        </Tooltip>
        {modalVisible && (
          <Modal
            centered={true}
            visible={modalVisible}
            closable={false}
            footer={null}
            onCancel={this.handleCancel}
          >
            <Space direction="vertical">
              <Text strong={true}>Capacity</Text>
              <Text type="secondary">{capacity}</Text>
            </Space>
          </Modal>
        )}
      </>
    );
  }
}

class AmenitiesList extends React.Component {
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
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        <List
          loading={this.state.loading}
          grid={{
            gutter: 4,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{
                  width: 220,
                  height: 200,
                }}
                title={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AmenityDetailInfoButton amenity={item} />
                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                      {item.name}
                    </Text>
                  </div>
                }
                cover={
                            <Image
                              src={item.Image}
                              alt={item.name}
                              style={{
                                display: "block",
                              }}
                            />
                          }
                        ></Card>
                      </List.Item>
                    )}
                  />
            </Space>
        );
    }
}

class SelectAmenityButton extends React.Component {
  state = {
    loading: false,
    modalVisible: false,
    data: [],
    allReservations: [],
    location: "",
    date: "",
    maxCapacity: 0,
  };

  selectDate = async (value) => {
    value = value.format("YYYY-MM-DD");
    this.setState({
      date: value,
    });
    this.loadData();
  };

  filterByValue(value) {
    var resp = this.state.allReservations;
    for (let i = 0; i < resp.length; i++) {
      if (resp[i].startTime == value) {
        return true;
      }
    }
    return false;
  }

  selectLocation = async (value) => {
    data.forEach((item) => {
      if (item.name == value) {
        this.setState({
          maxCapacity: item.capacity,
        });
      }
    });
    if (value == "Gym") {
      value = 1;
    } else if (value == "Game Room") {
      value = 2;
    } else if (value == "Meeting Room") {
      value = 3;
    } else if (value == "Yoga Room") {
      value = 4;
    } else if (value == "Kids Room") {
      value = 5;
    } else if (value == "Pool") {
      value = 6;
    }
    this.setState({
      location: value,
    });
    this.loadData();
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
      if (this.state.date != "" && this.state.location != "") {
        const resp2 = await getReservationsByDate(
          this.state.date,
          this.state.location
        );
        this.setState({
          allReservations: resp2,
        });
      }
      this.setState({
        data: resp,
      });
      console.log(this.state);
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  handleSubmit = async (values) => {
    if (values.GuestNumber > this.state.maxCapacity) {
      message.error("Guest count exceeds max capacity");
      return;
    }
    const { amenity } = this.props;
    this.setState({
      loading: true,
    });

    var data = [];
    if (values.Location == "Gym") {
      values.amenity_id = 1;
    } else if (values.Location == "Game Room") {
      values.amenity_id = 2;
    } else if (values.Location == "Meeting Room") {
      values.amenity_id = 3;
    } else if (values.Location == "Yoga Room") {
      values.amenity_id = 4;
    } else if (values.Location == "Kids Room") {
      values.amenity_id = 5;
    } else if (values.Location == "Pool") {
      values.amenity_id = 6;
    }

    values.TimeSlot.forEach((t) => {
      var sj = {
        date: values.Date.format("YYYY-MM-DD"),
        amenityId: values.amenity_id,
        guestCount: values.guest_count,
        reservationName: values.Location,
        startTime: "",
        endTime: "",
      };
      if (t == 0) {
        sj.startTime = "07:00 AM";
        sj.endTime = "07:30 AM";
      } else if (t == 1) {
        sj.startTime = "07:30 AM";
        sj.endTime = "08:00 AM";
      } else if (t == 2) {
        sj.startTime = "08:00 AM";
        sj.endTime = "08:30 AM";
      } else if (t == 3) {
        sj.startTime = "08:30 AM";
        sj.endTime = "09:00 AM";
      } else if (t == 4) {
        sj.startTime = "09:00 AM";
        sj.endTime = "09:30 AM";
      } else if (t == 5) {
        sj.startTime = "09:30 AM";
        sj.endTime = "10:00 AM";
      } else if (t == 6) {
        sj.startTime = "10:00 AM";
        sj.endTime = "10:30 AM";
      } else if (t == 7) {
        sj.startTime = "10:30 AM";
        sj.endTime = "11:00 AM";
      } else if (t == 8) {
        sj.startTime = "11:00 AM";
        sj.endTime = "11:30 AM";
      } else if (t == 9) {
        sj.startTime = "11:30 AM";
        sj.endTime = "12:00 PM";
      } else if (t == 10) {
        sj.startTime = "12:00 PM";
        sj.endTime = "12:30 PM";
      } else if (t == 11) {
        sj.startTime = "12:30 PM";
        sj.endTime = "01:00 PM";
      } else if (t == 12) {
        sj.startTime = "01:00 PM";
        sj.endTime = "01:30 PM";
      } else if (t == 13) {
        sj.startTime = "01:30 PM";
        sj.endTime = "02:00 PM";
      } else if (t == 14) {
        sj.startTime = "02:00 PM";
        sj.endTime = "02:30 PM";
      } else if (t == 15) {
        sj.startTime = "02:30 PM";
        sj.endTime = "03:00 PM";
      } else if (t == 16) {
        sj.startTime = "03:00 PM";
        sj.endTime = "03:30 PM";
      } else if (t == 17) {
        sj.startTime = "03:30 PM";
        sj.endTime = "04:00 PM";
      } else if (t == 18) {
        sj.startTime = "04:00 PM";
        sj.endTime = "04:30 PM";
      } else if (t == 19) {
        sj.startTime = "04:30 PM";
        sj.endTime = "05:00 PM";
      } else if (t == 20) {
        sj.startTime = "05:00 PM";
        sj.endTime = "05:30 PM";
      } else if (t == 21) {
        sj.startTime = "05:30 PM";
        sj.endTime = "06:00 PM";
      } else if (t == 22) {
        sj.startTime = "06:00 PM";
        sj.endTime = "06:30 PM";
      } else if (t == 23) {
        sj.startTime = "06:30 PM";
        sj.endTime = "07:00 PM";
      } else if (t == 24) {
        sj.startTime = "07:00 PM";
        sj.endTime = "07:30 PM";
      } else if (t == 25) {
        sj.startTime = "07:30 PM";
        sj.endTime = "08:00 PM";
      }
      data.push(sj);
    });
    try {
      console.log(data);
      await addReservation(data);
      message.success("Successfully book amenity");
      this.loadData();
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

    //   try {
    //     const startTime = new Date(values["Time Slot"][0]);
    //     const endTime = new Date(values["Time Slot"][1]);

    //     // Perform the comparison or any other logic with startTime and endTime here

    //     await addReservation({
    //       date: values.date.format("YYYY-MM-DD"),
    //       start_time: startTime.toISOString(), // Convert start_time to Date object
    //       end_time: endTime.toISOString(), // Convert end_time to Date object
    //       amenity: {
    //         id: amenity.id,
    //       },
    //     });
    //     message.success("Successfully booked amenity");
    //   } catch (error) {
    //     message.error(error.message);
    //   } finally {
    //     this.setState({
    //       loading: false,
    //     });
    //   }
    // };
    handleSubmit = async (values) => {
        const {amenity} = this.props;
        this.setState({
            loading: true,
        });
        console.log(values);
        var data = [];
        if (values.Location == "Gym") {
            values.amenity_id = 1;
        }

        else   if (values.Location == "Game Room") {
            values.amenity_id = 2;
        }
        else   if (values.Location == "Meeting Room") {
            values.amenity_id = 3;
        }
        else   if (values.Location == "Yoga Room") {
            values.amenity_id = 4;
        }
        else   if (values.Location == "Kids Room") {
            values.amenity_id = 5
        }
        else if (values.Location == "Pool") {
            values.amenity_id = 6;
        }


        values.TimeSlot.forEach(t => {
            var sj = {
                date: values.Date.format("YYYY-MM-DD"),
                amenityId: values.amenity_id,
                guestCount: values.guest_count,
                reservationName: values.Location,
                startTime: "",
                endTime: ""
            };
            if (t == 0) {
                sj.startTime = "07:00 AM";
                sj.endTime = "07:30 AM";
            }
            else  if (t == 1) {
                sj.startTime = "07:30 AM";
                sj.endTime = "08:00 AM";
            }
            else  if (t == 2) {
                sj.startTime = "08:00 AM";
                sj.endTime = "08:30 AM";
            }
            else  if (t == 3) {
                sj.startTime = "08:30 AM";
                sj.endTime = "09:00 AM";
            }

            else   if (t == 4) {
                sj.startTime = "09:00 AM";
                sj.endTime = "09:30 AM";
            }
            else  if (t == 5) {
                sj.startTime = "09:30 AM";
                sj.endTime = "10:00 AM";
            }

            else  if (t == 6) {
                sj.startTime = "10:00 AM";
                sj.endTime = "10:30 AM";
            }
            else  if (t == 7) {
                sj.startTime = "10:30 AM";
                sj.endTime = "11:00 AM";
            }

            else  if (t == 8) {
                sj.startTime = "11:00 AM";
                sj.endTime = "11:30 AM";
            }
            else  if (t == 9) {
                sj.startTime = "11:30 AM";
                sj.endTime = "12:00 PM";
            }

            else  if (t == 10) {
                sj.startTime = "12:00 PM";
                sj.endTime = "12:30 PM";
            }
           else  if (t == 11) {
                sj.startTime = "12:30 PM";
                sj.endTime = "01:00 PM";
            }

           else  if (t == 12) {
                sj.startTime = "01:00 PM";
                sj.endTime = "01:30 PM";
            }
           else  if (t == 13) {
                sj.startTime = "01:30 PM";
                sj.endTime = "02:00 PM";
            }

           else  if (t == 14) {
                sj.startTime = "02:00 PM";
                sj.endTime = "02:30 PM";
            }
           else  if (t == 15) {
                sj.startTime = "02:30 PM";
                sj.endTime = "03:00 PM";
            }

           else  if (t == 16) {
                sj.startTime = "03:00 PM";
                sj.endTime = "03:30 PM";
            }
           else  if (t == 17) {
                sj.startTime = "03:30 PM";
                sj.endTime = "04:00 PM";
            }

           else  if (t == 18) {
                sj.startTime = "04:00 PM";
                sj.endTime = "04:30 PM";
            }
           else  if (t == 19) {
                sj.startTime = "04:30 PM";
                sj.endTime = "05:00 PM";
            }

           else  if (t == 20) {
                sj.startTime = "05:00 PM";
                sj.endTime = "05:30 PM";
            }

           else  if (t == 21) {
                sj.startTime = "05:30 PM";
                sj.endTime = "06:00 PM";
            }

           else  if (t == 22) {
                sj.startTime = "06:00 PM";
                sj.endTime = "06:30 PM";
            }
           else  if (t == 23) {
                sj.startTime = "06:30 PM";
                sj.endTime = "07:00 PM";
            }

           else  if (t == 24) {
                sj.startTime = "07:00 PM";
                sj.endTime = "07:30 PM";
            }

           else  if (t == 25) {
                sj.startTime = "07:30 PM";
                sj.endTime = "08:00 PM";
            }
            data.push(sj);
        });
        try {
            console.log(data)
            await addReservation(data);
            message.success("Successfully book amenity");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };
    return (
      <>
        <Form
          layout="vertical"
          dataSource={data}
          {...layout}
          preserve={false}
          onFinish={(values) => this.handleSubmit(values)}
          style={{
            maxWidth: 800,
          }}
        >
          <Form.Item name="Location" rules={[{ required: true }]}>
            <Select
              style={{
                width: 150,
              }}
              placeholder="Location"
              onChange={this.selectLocation}
              options={[
                {
                  value: "Gym",
                  label: "Gym",
                },
                {
                  value: "Game Room",
                  label: "Game Room",
                },
                {
                  value: "Meeting Room",
                  label: "Meeting Room",
                },
                {
                  value: "Yoga Room",
                  label: "Yoga Room",
                },
                {
                  value: "Kids Room",
                  label: "Kids Room",
                },
                {
                  value: "Pool",
                  label: "Pool",
                },
              ]}
            />
          </Form.Item>

          <Form.Item name="Date" rules={[{ required: true }]}>
            <DatePicker
              placeholder="Select date"
              style={{
                width: 150,
              }}
              onChange={this.selectDate}
            />
          </Form.Item>

          <Form.Item name="GuestNumber" rules={[{ required: true }]}>
            <InputNumber
              placeholder="Guest number"
              style={{
                width: 150,
              }}
              min={1}
            />
          </Form.Item>

          <Form.Item
            style={{
              width: 540,
            }}
            name="Event"
          >
            <Input.TextArea placeholder="Event" />
          </Form.Item>

          <Form.Item
            label="Available Slots"
            name="TimeSlot"
            rules={[{ required: true }]}
          >
            <Checkbox.Group
              buttonStyle="solid"
              style={{
                marginTop: 0,
                width: 540,
              }}
            >
              {" "}
              <Row>
                <Col span={8}>
                  <Checkbox value="0" disabled={this.filterByValue("07:00 AM")}>
                    07:00 AM - 07:30 AM
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="1" disabled={this.filterByValue("07:30 AM")}>
                    07:30 AM - 08:00 AM
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox value="2" disabled={this.filterByValue("08:00 AM")}>
                    08:00 AM - 08:30 AM
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="3" disabled={this.filterByValue("08:30 AM")}>
                    08:30 AM - 09:00 AM
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  {/*显示次{this.filterByValue("09:00 AM")}*/}
                  <Checkbox value="4" disabled={this.filterByValue("09:00 AM")}>
                    09:00 AM - 09:30 AM
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="5" disabled={this.filterByValue("09:30 AM")}>
                    09:30 AM - 09:00 AM
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox value="6" disabled={this.filterByValue("10:00 AM")}>
                    10:00 AM - 10:30 AM
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="7" disabled={this.filterByValue("10:30 AM")}>
                    10:30 AM - 11:00 AM
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox value="8" disabled={this.filterByValue("11:00 AM")}>
                    11:00 AM - 11:30 AM
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="9" disabled={this.filterByValue("11:30 AM")}>
                    11:30 AM - 12:00 PM
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox
                    value="10"
                    disabled={this.filterByValue("12:00 PM")}
                  >
                    12:00 PM - 12:30 PM
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="11"
                    disabled={this.filterByValue("12:30 PM")}
                  >
                    12:30 PM - 01:00 PM
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox
                    value="12"
                    disabled={this.filterByValue("01:00 PM")}
                  >
                    01:00 PM - 01:30 PM
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="13"
                    disabled={this.filterByValue("01:30 PM")}
                  >
                    01:30 PM - 02:00 PM
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox
                    value="14"
                    disabled={this.filterByValue("02:00 PM")}
                  >
                    02:00 PM - 02:30 PM
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="15"
                    disabled={this.filterByValue("02:30 PM")}
                  >
                    02:30 PM - 03:00 PM
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox
                    value="16"
                    disabled={this.filterByValue("03:00 PM")}
                  >
                    03:00 PM - 03:30 PM
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="17"
                    disabled={this.filterByValue("03:30 PM")}
                  >
                    03:30 PM - 04:00 PM
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox
                    value="18"
                    disabled={this.filterByValue("04:00 PM")}
                  >
                    04:00 PM - 04:30 PM
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="19"
                    disabled={this.filterByValue("04:30 PM")}
                  >
                    04:30 PM - 05:00 PM
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox
                    value="20"
                    disabled={this.filterByValue("05:00 PM")}
                  >
                    05:00 PM - 05:30 PM
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="21"
                    disabled={this.filterByValue("05:30 PM")}
                  >
                    05:30 AM - 06:00 AM
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox
                    value="22"
                    disabled={this.filterByValue("06:00 PM")}
                  >
                    06:00 AM - 06:30 PM
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="23"
                    disabled={this.filterByValue("06:30 PM")}
                  >
                    06:30 PM - 07:00 PM
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox
                    value="24"
                    disabled={this.filterByValue("07:00 PM")}
                  >
                    07:00 PM - 07:30 PM
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="25"
                    disabled={this.filterByValue("07:30 PM")}
                  >
                    07:30 PM - 08:00 PM
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item {...tailLayout}>
            {/*组装数据*/}
            <Button
              loading={this.state.loading}
              type="primary"
              htmlType="submit"
            >
              Book
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

const AmenitiesPage = () => (
    <>
        <Row>
            <Col span={10}>
                <AmenitiesList/>
            </Col>
            <Col span={2}></Col>
            <Col span={12}>
                <SelectAmenityButton/>
            </Col>
        </Row>
        {/* <AmenitiesList /> */}
    </>
);

export default AmenitiesPage;

const data = [
  { name: "Gym", amenityId: "1", capacity: "15", Image: "./img/gym.jpeg" },
  {
    name: "Game Room",
    amenityId: "2",
    capacity: "5",
    Image: "./img/game.jpeg",
  },
  {
    name: "Meeting Room",
    amenityId: "3",
    capacity: "10",
    Image: "./img/meetingroom.jpeg",
  },
  {
    name: "Yoga Room",
    amenityId: "4",
    capacity: "20",
    Image: "./img/yoga.jpeg",
  },
  {
    name: "Kids Room",
    amenityId: "5",
    capacity: "15",
    Image: "./img/kids.jpeg",
  },
  { name: "Pool", amenityId: "6", capacity: "10", Image: "./img/pool.jpeg" },
];
