import { useState } from "react";
import UniversalDrawer from "../../UI/UniversalDrawer";
import CreateRecordForm from "./components/CreateRecordForm";

const CreateRecordDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSubmit = () => {
    const form = document.getElementById('record-form');
    if (form) {
      const event = new Event('submit', { cancelable: true, bubbles: true });
      form.dispatchEvent(event);
    }
  };

  const handleSuccess = () => {
    setIsDrawerOpen(false);
  };

  return (
    <UniversalDrawer
      title="Create Record"
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
      onSubmit={handleSubmit}
      onCancel={() => setIsDrawerOpen(false)}
    >
      <CreateRecordForm onSuccess={handleSuccess} />
    </UniversalDrawer>
  );
};

export default CreateRecordDrawer;