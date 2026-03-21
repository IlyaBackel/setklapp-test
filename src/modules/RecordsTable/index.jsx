import { Table, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRecords } from "../../context/RecordsContext";
import { useState, useMemo } from "react";
import UpdateRecordDrawer from "../UpdateRecordDrawer";
import SearchBar from "../SearchBar";

const RecordsTable = () => {
  const { records, loading, deleteRecord } = useRecords();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filterRecords = (records, searchValue) => {
    if (!searchValue) return records;
    
    const lowerSearchValue = searchValue.toLowerCase();
    
    return records.filter(record => {
      return Object.values(record).some(value => {
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerSearchValue);
      });
    });
  };


  const filteredRecords = useMemo(() => {
    return filterRecords(records, searchText);
  }, [records, searchText]);

  const handleDelete = (key, name) => {
    deleteRecord(key);
    message.success(`Record "${name}" deleted successfully`);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

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
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => new Date(date).toLocaleDateString('ru-RU'),
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
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SearchBar onSearch={handleSearch} />
        {searchText && (
          <span style={{ color: '#666' }}>
            Found: {filteredRecords.length} of {records.length} records
          </span>
        )}
      </div>
      
      <Table 
        dataSource={filteredRecords}
        columns={columns} 
        bordered 
        loading={loading}
        rowKey="key"
        pagination={{
          pageSize: 7,
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