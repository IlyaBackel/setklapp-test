import { Form, Input } from "antd";
import { useEffect } from "react";
import { useRecords } from "../../../context/RecordsContext";

const CreateRecordForm = ({ onSuccess, formRef }) => {
  const [form] = Form.useForm();
  const { addRecord } = useRecords();

  useEffect(() => {
    if (formRef) {
      formRef.current = {
        submitForm: () => {
          form.submit();
        },
      };
    }
  }, [form, formRef]);

  const onFinish = (values) => {
    addRecord({
      name: values.name,
      number: Number(values.number),
      date: new Date().toISOString().split('T')[0], 
    });
    
    form.resetFields();
    
    if (onSuccess) onSuccess();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
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