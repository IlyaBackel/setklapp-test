import { useState, useRef } from "react";
import UniversalDrawer from "../../UI/UniversalDrawer";
import CreateRecordForm from "./components/CreateRecordForm";

const CreateRecordDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const formRef = useRef();

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  const handleSuccess = () => {
    setIsDrawerOpen(false);
  };

  const handleCancel = () => {
    setIsDrawerOpen(false);
  };

  return (
    <UniversalDrawer
      title="Create Record"
      open={isDrawerOpen}
      onSubmit={handleSubmit}
      onOpenChange={setIsDrawerOpen}
      onCancel={handleCancel}
    >
      <CreateRecordForm 
        formRef={formRef}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </UniversalDrawer>
  );
};

export default CreateRecordDrawer;