import { Button, Form, Input, message, Table } from "antd";
import { useState, useEffect } from "react";
import {getFlatMate} from "../../util.js";

const TenantList = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);
    const columns = [
        { title: 'Name', dataIndex: 'value', key: 'name' },
    ];
    const data = result.map((string, index) => ({
        key: `row_${index}`,
        value: string,
    }));
    useEffect(() => {
        handleSubmit();
      }, []);

    const handleSubmit = async (values) => {
        if (values == null) {
            return;
        }
        setLoading(true);
        try {
            setResult(await getFlatMate(values));
            message.success("Submitted successfully.");
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        } 
    };
    return (
        <div>
        <Form name="nest-messages" onFinish={handleSubmit} // data collected by antd automatically on finish
            style={{ maxWidth: 1000, margin: "auto" }}>
            <Form.Item name="username" label="Tenant name" 
                rules={[{ required: true }]}>
                <Input/>
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>

        <Table dataSource={data} columns={columns} loading={loading} />;
        </div>
        
    );
};

export default TenantList;