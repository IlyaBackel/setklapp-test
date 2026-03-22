import UniversalDrawer from "../../../components/UniversalDrawer";
import UpdateRecordForm from "./UpdateRecordForm";

const UpdateRecordDrawer = ({ record, open, onOpenChange, onSuccess }) => {
  const handleSubmit = () => {
    const form = document.getElementById("update-record-form");
    if (form) {
      const event = new Event("submit", { cancelable: true, bubbles: true });
      form.dispatchEvent(event);
    }
  };

  const handleSuccess = () => {
    onOpenChange(false);
    if (onSuccess) onSuccess();
  };

  return (
    <UniversalDrawer
      title="Update Record"
      open={open}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      submitButtonText="Update"
    >
      <UpdateRecordForm initialValues={record} onSuccess={handleSuccess} />
    </UniversalDrawer>
  );
};

export default UpdateRecordDrawer;
