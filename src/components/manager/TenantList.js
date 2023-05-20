import { Button, Form, Input, message, Table } from "antd";
import { useState, useEffect } from "react";
import {getFlatMate, getFlatMateByApart, getFlatMateByTenant} from "../../util.js";

const TenantList = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);
    const columns = [
        { title: 'Name', dataIndex: 'value', key: 'name' },
        { title: 'Apartment number', dataIndex: 'value2', key: 'apart' },
        { title: 'Owner', dataIndex: 'value3', key: 'owner' },
    ];

    const data = result.map((item, index) => ({
        key: `row_${index}`,
        value: item.Name,
        value2 : item.apart,
        value3 : item.Owner,
    }));

    const formResult = (values) => {
        let data = [];
        for (const element of values.tenants) {
            let row = {"Name" : element, "apart" : values.apartmentNumber,
                            "Owner" : element === values.owner ? "Yes" : ""};
            data.push(row);
        }
        setResult(data);
    };

    useEffect(() => {
        handleSubmit();
      }, []);

    const handleSubmit = async (values) => {
        setResult([]);
        if (values == null) {
            return;
        }
        if (!values.username && !values.apart) {
            message.error("No tenant or apartment number given");
        }
        setLoading(true); 
        try {
            if (values.username && !values.apart) {
                console.log(values.username)
                const result = await getFlatMateByTenant(values.username);
                formResult(result);
                message.success("Submitted successfully.");
            } else if (!values.username && values.apart) {
                console.log(values.username)
                const result = await getFlatMateByApart(values.apart);
                formResult(result);
                message.success("Submitted successfully.");
            } else {
                const result1 = await getFlatMateByTenant(values.username);
                const result2 = await getFlatMateByApart(values.apart);
                console.log(result1);
                console.log(result2);
                if (result1.apartmentNumber === result2.apartmentNumber) {
                    formResult(result1);
                } else {
                    message.error("Incorrect pair of tenant and apartment number");
                }
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        } 
    };
    return (
        <div>
        <Form name="nest-messages" onFinish={handleSubmit}
            style={{ maxWidth: 1000, margin: "auto" }}>
            <Form.Item name="username" label="Tenant name" >
                <Input/>
            </Form.Item>
            <Form.Item name="apart" label="Apartment number" >
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