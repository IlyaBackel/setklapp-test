import { Form, message } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

import UniversalDrawer from "../../../components/UniversalDrawer";
import { useRecordsMethods } from "../../../context/RecordsContext";
import UpdateRecordForm from "./UpdateRecordForm";

const UpdateRecordDrawer = ({ record, open, onOpenChange, onSuccess }) => {
  const [form] = Form.useForm();
  const { updateRecord } = useRecordsMethods();

  useEffect(() => {
    if (record && open) {
      form.setFieldsValue({
        name: record.name,
        number: record.number || record.value,
        date: record.date ? dayjs(record.date) : dayjs(),
      });
    }
  }, [record, open, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const dateString = values.date
        ? values.date.format("YYYY-MM-DD")
        : record.date;

      updateRecord(record.key, {
        ...record,
        name: values.name,
        number: values.number,
        value: values.number,
        date: dateString,
      });

      form.resetFields();
      onOpenChange(false);
      if (onSuccess) onSuccess();
      message.success("Record updated successfully!");
    } catch (error) {
      console.log("Validation failed:", error);
      message.error("Please fill all required fields correctly");
    }
  };

  return (
    <UniversalDrawer
      title="Update Record"
      open={open}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      submitButtonText="Update"
    >
      <UpdateRecordForm form={form} />
    </UniversalDrawer>
  );
};

export default UpdateRecordDrawer;
