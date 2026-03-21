import { Form } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

import FormFields from "../../../components/FormField";
import { useRecords } from "../../../context/RecordsContext";

const UpdateRecordForm = ({ initialValues, onSuccess }) => {
  const [form] = Form.useForm();
  const { updateRecord } = useRecords();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        number: initialValues.number || initialValues.value,
        date: initialValues.date ? dayjs(initialValues.date) : dayjs(),
      });
    }
  }, [initialValues, form]);

  const onFinish = (values) => {
    if (!initialValues) return;

    const dateString = values.date ? values.date.format('YYYY-MM-DD') : initialValues.date;
    
    updateRecord(initialValues.key, {
      ...initialValues,
      name: values.name,
      number: values.number,
      value: values.number,
      date: dateString,
    });
    
    if (onSuccess) onSuccess();
  };

  return (
    <Form 
      id="update-record-form"
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <FormFields form={form} />
    </Form>
  );
};

export default UpdateRecordForm;