import { Form, Input } from "antd";
import { useRecords } from "../../../context/RecordsContext";

const CreateRecordForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const { addRecord } = useRecords();

  const onFinish = (values) => {
    addRecord({
      name: values.name,
      number: values.number,
      date: new Date().toISOString().split('T')[0], 
      value: values.number,
    });
    
    form.resetFields();
    
    
    if (onSuccess) onSuccess();
  };

  return (
    <Form 
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item 
        label="Name" 
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>

      <Form.Item 
        label="Number" 
        name="number"
        rules={[
          { required: true, message: "Please input your number!" },
          { pattern: /^\d+$/, message: "Please enter a valid number!" }
        ]}
      >
        <Input placeholder="Enter number" />
      </Form.Item>
    </Form>
  );
};

export default CreateRecordForm;