import { Table } from "antd";
import { useRecords } from "../../../context/RecordsContext";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Number",
    dataIndex: "number",
    key: "umber",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];

const RecordsTable = () => {
  const { records } = useRecords();

  return <Table dataSource={records} columns={columns} bordered />;
};

export default RecordsTable;
