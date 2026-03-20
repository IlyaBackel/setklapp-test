import { Form, Input, DatePicker } from "antd";
import { useRecords } from "../../../context/RecordsContext";
import dayjs from "dayjs";

const CreateRecordForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const { addRecord } = useRecords();

  const onFinish = (values) => {
    const dateString = values.date.format('YYYY-MM-DD');
    
    addRecord({
      name: values.name,
      number: values.number,
      value: values.number,
      date: dateString,
    });
    
    form.resetFields();
    if (onSuccess) onSuccess();
  };

  return (
    <Form 
      id="record-form"
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

      <Form.Item 
        label="Date" 
        name="date"
        rules={[{ required: true, message: "Please select date!" }]}
        initialValue={dayjs()}
      >
        <DatePicker 
          style={{ width: '100%' }}
          format="DD.MM.YYYY"
        />
      </Form.Item>
    </Form>
  );
};

export default CreateRecordForm;