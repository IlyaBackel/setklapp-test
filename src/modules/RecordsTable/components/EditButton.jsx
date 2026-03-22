import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const EditButton = ({ onEdit }) => {
  return (
    <Button
      type="primary"
      shape="circle"
      size="medium"
      icon={<EditOutlined />}
      onClick={onEdit}
      style={{ backgroundColor: '#cca300ff' }}
    />
  );
};

export default EditButton;
