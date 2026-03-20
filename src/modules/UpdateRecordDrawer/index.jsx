import { useRef } from "react";
import UniversalDrawer from "../../UI/UniversalDrawer";
import UpdateRecordForm from "./components/UpdateRecordForm";

const UpdateRecordDrawer = ({ record, open, onOpenChange, onSuccess }) => {
  const formRef = useRef();

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleSuccess = () => {
    onOpenChange(false);
    if (onSuccess) onSuccess();
  };

  return (
    <UniversalDrawer
      title="Update Record"
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      size={720}
      submitButtonText="Update"
    >
      <UpdateRecordForm 
        formRef={formRef}
        initialValues={record}
        onSuccess={handleSuccess}
      />
    </UniversalDrawer>
  );
};

export default UpdateRecordDrawer;