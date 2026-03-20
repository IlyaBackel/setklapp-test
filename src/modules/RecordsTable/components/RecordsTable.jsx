import { Table, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRecords } from "../../../context/RecordsContext";
import { useState } from "react";
import UpdateRecordDrawer from "../../UpdateRecordDrawer";

const RecordsTable = () => {
  const { records, loading, deleteRecord } = useRecords();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDelete = (key, name) => {
    deleteRecord(key);
    message.success(`Record "${name}" deleted successfully`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      render: (_, record) => record.number || record.value,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedRecord(record);
              setIsDrawerOpen(true);
            }}
          >
            Edit
          </Button>
          
          <Popconfirm
            title="Delete Record"
            description={`Are you sure you want to delete "${record.name}"?`}
            onConfirm={() => handleDelete(record.key, record.name)}
            okText="Yes"
            cancelText="No"
            placement="topRight"
          >
            <Button 
              type="link" 
              danger
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table 
        dataSource={records} 
        columns={columns} 
        bordered 
        loading={loading}
        rowKey="key"
        pagination={{
          pageSize: 5,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
      
      {selectedRecord && (
        <UpdateRecordDrawer
          record={selectedRecord}
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          onSuccess={() => setSelectedRecord(null)}
        />
      )}
    </>
  );
};

export default RecordsTable;