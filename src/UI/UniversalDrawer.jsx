import { Drawer, Space, Button } from "antd";
import CreateButton from "./CreateButton";

const UniversalDrawer = ({ 
  children, 
  title = "Create Record",
  open, 
  onOpenChange,
  onCancel,
  size = 720
}) => {
  const handleSubmit = () => {
    const form = document.querySelector('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  return (
    <>
      <CreateButton onClick={() => onOpenChange(true)} />
      <Drawer
        title={title}
        size={size}
        open={open}
        onClose={() => onOpenChange(false)}
        extra={
          <Space>
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={handleSubmit} type="primary">
              Submit
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