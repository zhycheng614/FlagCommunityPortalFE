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
  Radio,
  Tooltip,
  Space,
} from "antd";
import { useState } from "react";
import {
  LeftCircleFilled,
  RightCircleFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { getStatusClassNames } from "antd/lib/_util/statusUtils";
// import AmenityDetailInfoButton from "./TenantReservationPage";

const { Text } = Typography;
const { TabPane } = Tabs;
const options = [];
const handleChange = (value) => {
  console.log(`Selected: ${value}`);
};

const data = [
  { name: "Gym", capacity: "15", Image: "./img/gym.jpeg" },
  { name: "Game Room", capacity: "5", Image: "./img/game.jpeg" },
  { name: "Meeting Room", capacity: "10", Image: "./img/meetingroom.jpeg" },
  { name: "Yoga Room", capacity: "20", Image: "./img/yoga.jpeg" },
  { name: "Kids Room", capacity: "15", Image: "./img/kids.jpeg" },
  { name: "Pool", capacity: "10", Image: "./img/pool.jpeg" },
];

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
    const { name, capacity } = amenity;
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
            // title={name}
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
  };

  componentDidMount() {
    // this.loadData();
  }

  // loadData = async () => {
  //   this.setState({
  //     loading: true,
  //   });

  //   try {
  //     const resp = await getStaysByHost();
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
  // };
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
                  width: 240,
                  height: 220,
                }}
                // key={item.id}
                // title={<AddReservationButton />}
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <AmenityDetailInfoButton amenity={item} />
                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                      {item.name}
                    </Text>
                  </div>
                }
                // extra={<SelectAmenityButton amenity={item} />}
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
  };

  handleSubmit = async (values) => {
    const { amenity } = this.props;
    this.setState({
      loading: true,
    });

    // try {
    //   await addReservation({
    //     date: values.date.format("YYYY-MM-DD"),
    //     start_time: values.start_time.format("HHHH-MM-SS"),
    //     end_time: values.end_time.format("HHHH-MM-SS"),
    //     amenity: {
    //       id: amenity.id,
    //     },
    //   });
    //   message.success("Successfully book amenity");
    // } catch (error) {
    //   message.error(error.message);
    // } finally {
    //   this.setState({
    //     loading: false,
    //   });
    // }
  };

  render() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
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
          onFinish={this.handleSubmit}
          style={{
            maxWidth: 800,
          }}
        >
          <Form.Item
            // layout="vertical"
            // label="Location"
            name="Location"
            rules={[{ required: true }]}
          >
            <Select
              style={{
                width: 150,
              }}
              // dataSource={amenity}
              // location={amenity.name}
              // defaultValue="Party Room"
              placeholder="Location"
              onChange={handleChange}
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
                  disabled: true,
                },
                {
                  value: "Pool",
                  label: "Pool",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            // layout="horizontal"
            // label="Date"
            name="Date"
            rules={[{ required: true }]}
          >
            <DatePicker
              placeholder="Select date"
              style={{
                width: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            // layout="horizontal"
            // label="Guest number"
            name="Guest number"
            rules={[{ required: true }]}
          >
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
            // label="Event"
            name="Event"
          >
            <Input.TextArea placeholder="Event" />
          </Form.Item>

          <Form.Item
            label="Available Slots"
            name="Time Slot"
            // layout="vertical"
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
                  <Checkbox value="0">07:00 AM - 07:30 AM</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="1">07:30 AM - 08:00 AM</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox value="2">08:00 AM - 08:30 AM</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="3">08:30 AM - 09:00 AM</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox value="4">09:00 AM - 09:30 AM</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="5">09:30 AM - 09:00 AM</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox value="6">10:00 AM - 10:30 AM</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="7">10:30 AM - 11:00 AM</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox indeterminate disabled value="8">
                    11:00 AM - 11:30 AM
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox indeterminate disabled value="9">
                    11:30 AM - 12:00 PM
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox value="10">12:00 PM - 12:30 PM</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox indeterminate disabled value="11">
                    12:30 PM - 01:00 PM
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox value="12">01:00 PM - 01:30 PM</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="13">01:30 PM - 02:00 PM</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox value="14">02:00 PM - 02:30 PM</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="15">02:30 PM - 03:00 PM</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox value="16">03:00 PM - 03:30 PM</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="17">03:30 PM - 04:00 PM</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox value="18">04:00 PM - 04:30 PM</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="19">04:30 PM - 05:00 PM</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox indeterminate disabled value="20">
                    05:00 PM - 05:30 PM
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox indeterminate disabled value="21">
                    05:30 AM - 06:00 AM
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox value="22">06:00 AM - 06:30 PM</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="23">06:30 PM - 07:00 PM</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Checkbox value="24">07:00 PM - 07:30 PM</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="25">07:30 PM - 08:00 PM</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            label="Available Slots"
            name="Time Slot"
            // layout="vertical"
            rules={[{ required: true }]}
          >
            <Radio.Group
              buttonStyle="solid"
              style={{
                marginTop: 0,
              }}
            >
              {" "}
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="0"
              >
                07:00 AM - 07:30 AM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="1"
              >
                07:30 AM - 08:00 AM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="2"
              >
                08:00 AM - 08:30 AM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="3"
              >
                08:30 AM - 09:00 AM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="4"
              >
                09:00 AM - 09:30 AM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="5"
              >
                09:30 AM- 10:00 AM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="6"
              >
                10:00 AM - 10:30 AM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="7"
              >
                10:30 AM - 11:00 AM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="8"
                disabled
              >
                11:00 AM - 11:30 AM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="9"
                disabled
              >
                11:30 AM - 12:00 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="10"
              >
                12:00 PM - 12:30 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="11"
                disabled
              >
                12:30 PM - 01:00 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="12"
              >
                01:00 PM - 01:30 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="13"
              >
                01:30 PM - 02:00 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="14"
              >
                02:00 PM - 02:30 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="15"
              >
                02:30 PM - 03:00 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="16"
              >
                03:00 PM - 03:30 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="17"
              >
                03:30 PM - 04:00 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="18"
              >
                04:00 PM - 04:30 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="19"
              >
                04:30 PM - 05:00 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="20"
                disabled
              >
                05:00 PM - 05:30 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="21"
                disabled
              >
                05:30 PM - 06:00 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="22"
              >
                06: 00 PM - 06:30 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="23"
              >
                06:30 PM - 07:00 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="24"
              >
                07:00 PM - 07:30 PM
              </Radio.Button>
              <Radio.Button
                style={{
                  marginTop: 0,
                  width: 180,
                  height: 30,
                }}
                value="25"
              >
                07:30 PM - 08:00 PM
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              loading={this.state.loading}
              type="primary"
              htmlType="submit"
            >
              Book
            </Button>
          </Form.Item>
          {/* <Form>
              <TimeSeletButton />
            </Form> */}
        </Form>
      </>
    );
  }
}

const AmenitiesPage = () => (
  <>
    <Row>
      <Col span={10}>
        <AmenitiesList />
      </Col>
      <Col span={2}></Col>
      <Col span={12}>
        <SelectAmenityButton />
      </Col>
    </Row>
    {/* <AmenitiesList /> */}
  </>
);

export default AmenitiesPage;
