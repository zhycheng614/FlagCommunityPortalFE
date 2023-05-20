import { Button, Form, Select, message } from "antd";
import { useState } from "react";
// import { useForm } from "antd/lib/form/Form";
import { findAssignedTenant, findAvailableApart, findUnassignedTenant, getFlatMate, moveIn, moveOut, moveOutAndAssign } from "../../util";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const Move = () => {
  const [loading, setLoading] = useState(false);
  const [vacantApart, setVacantApart] = useState([]);
  const [tenant, setTenant] = useState([]);
  const [owner, setOwner] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState("");
  const [selectedApart, setSelectedApart] = useState("");
  const [selectedOwner, setSelectedOwner] = useState("");
  const [move, setMove] = useState("");

  const handleSelectOwner = (event) => {
    setSelectedOwner(event);
  }

  const handleSelectTenant = (event) => {
    setSelectedTenant(event);
    console.log(event)
    const searchFlatMate = async () => {
      if (move === 'out') {
        setLoading(true);
        try {
          console.log(event)
          const ownerData = await getFlatMate(event);
          console.log(ownerData)
          if (ownerData) {
            setOwner(ownerData);
          }
        } catch (error) {
          console.error("Error:", error);
        }
        setLoading(false);
      }
    };
    searchFlatMate();
  };

  

  const handleSelectApart = (event) => {
    setSelectedApart(event);
  };

  const handleMoveSelect = (event) => {
    setMove(event);
    if (event === "in") {
      const fetchInitialData = async () => {
        setLoading(true);
        try {
          const vacantApartData = await findAvailableApart();
          const tenantData = await findUnassignedTenant();
          if (vacantApartData) {
            setVacantApart(vacantApartData);
          }
          if (tenantData) {
            setTenant(tenantData);
          }
        } catch (error) {
          console.error("Error:", error);
        }
        setLoading(false);
      };
      setTenant([]);
      setVacantApart([]);
      setOwner([]);
      fetchInitialData();
    } else {
      const fetchInitialData =async () => {
        setLoading(true);
        try {
          const assignedTenantData = await findAssignedTenant();
          
          if (assignedTenantData) {
            setTenant(assignedTenantData);
          }
          
        } catch (error) {
          console.error("Error:", error);
        }
        setLoading(false);
      };
      setTenant([]);
      setVacantApart([]);
      setOwner([]);
      fetchInitialData();
    }
  }

  const handleSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      if (values.dropdown === "in") {
        await moveIn(values);
      } else if (
        values.dropdown === "out" &&
        (typeof values.owner === "undefined" || values.owner === "")
      ) {
        await moveOut(values);
      } else if (
        values.dropdown === "out" &&
        (values.owner !== "undefined" || values.owner !== "")
      ) {
        await moveOutAndAssign(values);
      }
      setTenant([]);
      setVacantApart([]);
      setOwner([]);
      setSelectedApart("");
      setSelectedTenant("");
      message.success("Submitted successfully.");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form
      {...layout} // unfold layout object
      //name="nest-messages"
      onFinish={handleSubmit} // data collected by antd automatically on finish
      style={{ maxWidth: 1000, margin: "auto" }}
    >
      <Form.Item
        label="Move In/Move Out"
        name="dropdown"
        rules={[{ required: true }]}
        labelCol={{ span: 8, offset: 0 }}
      >
        <Select value={move} onChange={handleMoveSelect}> 
          <Select.Option value="in">Move in</Select.Option>
          <Select.Option value="out">Move out</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="tenant"
        label="Tenant"
        rules={[{ required: true }]}
        labelCol={{ span: 8, offset: 0 }}
      >
        <Select value={selectedTenant} onChange={handleSelectTenant}>
        <Select.Option value="">Select tenant</Select.Option >
        {tenant && Array.isArray(tenant) && // Check if tenant is defined and an array
          tenant.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
        ))}
        </Select>
      
      </Form.Item>
      <Form.Item
        name="apt"
        label="Apartment"
        rules={[
          ({ getFieldValue }) => ({
            required: getFieldValue("dropdown") === "in",
            message: "Please enter the apartment",
          }),
        ]}
        labelCol={{ span: 8, offset: 0 }}
      >
        <Select value={selectedApart} onChange={handleSelectApart}
          disable={move === "out"}>
        <Select.Option  value="">Select apartment</Select.Option >
        {vacantApart && Array.isArray(vacantApart) && // Check if tenant is defined and an array
          vacantApart.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
        ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="owner"
        label="New Apartment Owner"
        labelCol={{ span: 8, offset: 0 }}
      >
        <Select value={selectedOwner} onChange={handleSelectOwner}
          disable={move === "in"}>
        <Select.Option  value="">Select new owner</Select.Option >
        {owner && Array.isArray(owner) && // Check if tenant is defined and an array
          owner.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
        ))}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Move;
