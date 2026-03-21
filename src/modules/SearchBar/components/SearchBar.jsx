import { Input, Space } from "antd";

const { Search } = Input;

const SearchBar = ({ onSearch }) => {
  return (
    <Space>
      <Search
        placeholder="Search in all columns..."
        onSearch={onSearch}
        onChange={(e) => onSearch(e.target.value)}
        enterButton
        allowClear
      />
    </Space>
  );
};

export default SearchBar;