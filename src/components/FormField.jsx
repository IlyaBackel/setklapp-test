import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';

const FormFields = ({ initialValues = {} }) => {
  return (
    <>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: 'Please input your name!' },
          { min: 2, message: 'Name must be at least 2 characters' },
          { max: 50, message: 'Name cannot exceed 50 characters' },
        ]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>

      <Form.Item
        label="Number"
        name="number"
        rules={[
          { required: true, message: 'Please input your number!' },
          { pattern: /^\d+$/, message: 'Please enter a valid number!' },
          { max: 50, message: 'Number cannot exceed 50 characters' },
        ]}
      >
        <Input placeholder="Enter number" type="number" />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        initialValue={initialValues?.date ? dayjs(initialValues.date) : dayjs()}
        rules={[{ required: true, message: 'Please select a date!' }]}
      >
        <DatePicker
          style={{ width: '100%' }}
          format="DD.MM.YYYY"
          placeholder="Select date"
        />
      </Form.Item>
    </>
  );
};

export default FormFields;
