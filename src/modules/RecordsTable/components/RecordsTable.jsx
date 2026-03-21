import { Table } from "antd";
import { useEffect } from "react";

import { useRecords } from "../../../context/RecordsContext";
import { UpdateRecordDrawer } from "../../UpdateDrawer";
import { useSearch } from "../hooks/useSearch";
import { useTableActions } from "../hooks/useTableActions";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const RecordsTable = ({ searchText, onRecordsChange }) => {
  const { records, loading } = useRecords();
  const { filteredRecords } = useSearch(records, searchText);
  const {
    selectedRecord,
    isDrawerOpen,
    handleEdit,
    handleDelete,
    handleCloseDrawer,
  } = useTableActions();

  useEffect(() => {
    if (onRecordsChange) {
      onRecordsChange(records.length, filteredRecords.length);
    }
  }, [records, filteredRecords, onRecordsChange]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      render: (_, record) => record.number || record.value,
      sorter: (a, b) => (a.number || a.value) - (b.number || b.value),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 150,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => new Date(date).toLocaleDateString("ru-RU"),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <EditButton record={record} onEdit={() => handleEdit(record)} />
          <DeleteButton
            name={record.name}
            onDelete={() => handleDelete(record.key, record.name)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={filteredRecords}
        columns={columns}
        loading={loading}
        bordered
        borderColor="#000000ff"
        rowKey="key"
        pagination={{
          pageSize: 7,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />

      {selectedRecord && (
        <UpdateRecordDrawer
          record={selectedRecord}
          open={isDrawerOpen}
          onOpenChange={handleCloseDrawer}
          onSuccess={handleCloseDrawer}
        />
      )}
    </>
  );
};

export default RecordsTable;
