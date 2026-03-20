import { Form, Input } from "antd";
import { useEffect } from "react";
import { useRecords } from "../../../context/RecordsContext";

const UpdateRecordForm = ({ initialValues, onSuccess, formRef }) => {
  const [form] = Form.useForm();
  const { updateRecord } = useRecords();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        number: initialValues.number || initialValues.value, 
      });
    }
  }, [initialValues, form]);

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
    if (!initialValues) return;

    updateRecord(initialValues.key, {
      ...initialValues,
      name: values.name,
      number: values.number,
      value: values.number,
      date: initialValues.date || new Date().toISOString().split('T')[0],
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

export default UpdateRecordForm;