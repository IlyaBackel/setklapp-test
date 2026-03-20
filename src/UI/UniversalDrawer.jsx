import { Drawer, Space, Button } from "antd";
import CreateButton from "./CreateButton";

const UniversalDrawer = ({ 
  children, 
  title = "Create Record",
  open, 
  onOpenChange,
  onSubmit,
  onCancel,
  size = 720,
  submitButtonText = "Submit"
}) => {
  const handleClose = () => {
    onOpenChange(false);
    if (onCancel) onCancel();
  };

  return (
    <>
      <CreateButton onClick={() => onOpenChange(true)} />
      <Drawer
        title={title}
        size={size}
        open={open}
        onClose={handleClose}
        extra={
          <Space>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={onSubmit} type="primary">
              {submitButtonText}
            </Button>
          </Space>
        }
      >
        {children}
      </Drawer>
    </>
  );
};

export default UniversalDrawer;