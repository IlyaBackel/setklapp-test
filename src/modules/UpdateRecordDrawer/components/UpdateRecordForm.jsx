import { Form, Input, DatePicker } from "antd";
import { useEffect } from "react";
import { useRecords } from "../../../context/RecordsContext";
import dayjs from "dayjs";

const UpdateRecordForm = ({ initialValues, onSuccess }) => {
  const [form] = Form.useForm();
  const { updateRecord } = useRecords();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        number: initialValues.number || initialValues.value,
        date: dayjs(initialValues.date),
      });
    }
  }, [initialValues, form]);

  const onFinish = (values) => {
    if (!initialValues) return;

    const dateString = values.date.format('YYYY-MM-DD');
    
    updateRecord(initialValues.key, {
      ...initialValues,
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
      id="update-record-form"
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
      >
        <DatePicker 
          style={{ width: '100%' }}
          format="DD.MM.YYYY"
        />
      </Form.Item>
    </Form>
  );
};

export default UpdateRecordForm;