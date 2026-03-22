import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

const DeleteButton = ({ name, onDelete }) => {
  return (
    <Popconfirm
      title="Delete Record"
      description={`Are you sure you want to delete "${name}"?`}
      onConfirm={onDelete}
      okText="Yes"
      cancelText="No"
    >
      <Button
        type="primary"
        shape="circle"
        size="medium"
        danger
        icon={<DeleteOutlined />}
      />
    </Popconfirm>
  );
};

export default DeleteButton;
