import { useState } from "react";

import CreateButton from "../../../components/CreateButton";
import UniversalDrawer from "../../../components/UniversalDrawer";
import CreateRecordForm from "./CreateRecordForm";

const CreateRecordDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSubmit = () => {
    const form = document.getElementById('create-record-form');
    if (form) {
      const event = new Event('submit', { cancelable: true, bubbles: true });
      form.dispatchEvent(event);
    }
  };

  const handleSuccess = () => {
    setIsDrawerOpen(false);
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
        <CreateRecordForm onSuccess={handleSuccess} />
      </UniversalDrawer>
    </>
  );
};

export default CreateRecordDrawer;