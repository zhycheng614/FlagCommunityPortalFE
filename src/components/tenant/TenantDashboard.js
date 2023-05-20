import {Button, Card, Space, Table, message} from "antd";
import {PushpinOutlined} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import {useEffect, useState} from "react";
import {getAllAnnouncements} from "../../util";
import {ContentDetailButton} from "../manager/ManagerAnnouncementPage";
import {MyReservationsBlock} from "./TenantReservationPage";

export const AnnouncementBlock = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    // helper function to process announcement to a certain order
    const processAnnouncement = (assembledData, annoucementResp) => {
        const reversedArray = annoucementResp.reverse();
        const result = [];
        for (let announcement of reversedArray) {
            if (announcement.priority) {
                result.push(announcement);
            }
        }
        for (let announcement of reversedArray) {
            if (!announcement.priority) {
                result.push(announcement);
            }
        }
        assembledData[0] = result;
    };

    const loadData = async () => {
        setLoading(true);

        try {
            const annoucementResp = await getAllAnnouncements();
            const assembledData = Array(4);
            processAnnouncement(assembledData, annoucementResp);
            // get maintenance, reservation, and payment
            setData(assembledData);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const columns = [
        {
            title: "Priority",
            dataIndex: "priority",
            key: "priority",
            align: "center",
            width: "10px",
            render: (text, record) => {
                return (
                    record.priority && <PushpinOutlined style={{fontSize: "150%"}}/>
                );
            },
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
            width: "130px",
            render: (text, record) => (
                <Space>
                    <Text>Details</Text>
                    <ContentDetailButton announcement={record}/>
                </Space>
            ),
        },
        {
            title: "Release Time",
            key: "time",
            dataIndex: "time",
            align: "center",
            width: "120px",
        },
    ];

    return (
        <Card
            style={{
                margin: "10px",
            }}
            title={
                <div style={{display: "flex", alignItems: "center"}}>
                    <Text ellipsis={true} style={{maxWidth: 150}}>
                        Announcement
                    </Text>
                </div>
            }
        >
            <Table
                pagination={{pageSize: 7}}
                loading={loading}
                columns={columns}
                dataSource={data[0]}
            />
        </Card>
    );
};

const TenantDashboard = () => {
    return (
        <>
            <div style={{width: "50%", height: "100%", float: "left"}}>
                <AnnouncementBlock/>
            </div>
            <div style={{width: "50%", height: "33.3%", float: "left"}}>2</div>
            <div style={{width: "50%", height: "33.3%", float: "left"}}>
                <MyReservationsBlock/>
            </div>
            <div style={{width: "50%", height: "33.3%", float: "left"}}>4</div>
        </>
    );
};

export default TenantDashboard;
