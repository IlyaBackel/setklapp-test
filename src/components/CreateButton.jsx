import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

const CreateButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      style={{
        width: isHovered ? '7rem' : '2.25rem',
        transition: 'width 0.2s ease-in-out',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isHovered ? 'flex-start' : 'center',
        padding: isHovered ? '0 15px' : '0',
      }}
      onClick={() => onClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <span
          style={{
            marginLeft: '8px',
            whiteSpace: 'nowrap',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.7s ease-in-out',
          }}
        >
          Create
        </span>
      )}
    </Button>
  );
};

export default CreateButton;
