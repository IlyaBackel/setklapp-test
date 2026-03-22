import { message } from 'antd';
import { useState } from 'react';

import { useRecordsMethods } from '../../../context/RecordsContext';

export const useTableActions = () => {
  const { deleteRecord } = useRecordsMethods();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsDrawerOpen(true);
  };

  const handleDelete = (record) => {
    deleteRecord(record.key);
    message.success(`Record "${record.name}" deleted successfully`);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedRecord(null);
  };

  return {
    selectedRecord,
    isDrawerOpen,
    handleEdit,
    handleDelete,
    handleCloseDrawer,
  };
};
