import { Button, Drawer, Space } from "antd";

const UniversalDrawer = ({
  children,
  title,
  open,
  onSubmit,
  onCancel,
  submitButtonText,
}) => {
  return (
    <Drawer
      title={title}
      open={open}
      onClose={onCancel}
      extra={
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onSubmit} type="primary">
            {submitButtonText}
          </Button>
        </Space>
      }
    >
      {children}
    </Drawer>
  );
};

export default UniversalDrawer;
