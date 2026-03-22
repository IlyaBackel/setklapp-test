import { message } from "antd";
import { useState } from "react";

import { useRecords } from "../../../context/RecordsContext";

export const useTableActions = () => {
  const { deleteRecord } = useRecords();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsDrawerOpen(true);
  };

  const handleDelete = (key, name) => {
    deleteRecord(key);
    message.success(`Record "${name}" deleted successfully`);
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
