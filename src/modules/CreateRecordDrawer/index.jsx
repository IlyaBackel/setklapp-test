import { useState } from "react";
import UniversalDrawer from "../../UI/UniversalDrawer";
import RecordForm from "./components/RecordForm";

const CreateRecordDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
      onOpenChange={setIsDrawerOpen}
      onCancel={handleCancel}
    >
      <RecordForm 
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </UniversalDrawer>
  );
};

export default CreateRecordDrawer;