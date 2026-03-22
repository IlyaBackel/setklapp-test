import { Form, message } from "antd";
import { useState } from "react";

import CreateButton from "../../../components/CreateButton";
import UniversalDrawer from "../../../components/UniversalDrawer";
import { useRecordsMethods } from "../../../context/RecordsContext";
import CreateRecordForm from "./CreateRecordForm";

const CreateRecordDrawer = () => {
  const [form] = Form.useForm();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { addRecord } = useRecordsMethods();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

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
      setIsDrawerOpen(false);
      message.success("Record created successfully!");
    } catch (error) {
      console.log("Validation failed:", error);
      message.error("Please fill all required fields correctly");
    }
  };

  return (
    <>
      <CreateButton onClick={() => setIsDrawerOpen(true)} />

      <UniversalDrawer
        title="Create Record"
        open={isDrawerOpen}
        onSubmit={handleSubmit}
        onCancel={() => setIsDrawerOpen(false)}
        submitButtonText="Create"
      >
        <CreateRecordForm form={form} />
      </UniversalDrawer>
    </>
  );
};

export default CreateRecordDrawer;
