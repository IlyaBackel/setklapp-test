import { Form } from "antd";

import FormFields from "../../../components/FormField";
import { useRecords } from "../../../context/RecordsContext";

const CreateRecordForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const { addRecord } = useRecords();

  const onFinish = (values) => {
    const dateString = values.date
      ? values.date.format("YYYY-MM-DD")
      : new Date().toISOString().split("T")[0];

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
      id="create-record-form"
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <FormFields />
    </Form>
  );
};

export default CreateRecordForm;
