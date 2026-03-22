import { Input, Space } from 'antd';
import { useEffect, useState } from 'react';

import { useDebounce } from '../../../hooks/useDebounce';

const { Search } = Input;

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  useEffect(() => {
    onSearch(debouncedSearchValue);
  }, [debouncedSearchValue, onSearch]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <Space>
      <Search
        placeholder="Search in all columns..."
        value={searchValue}
        onChange={handleChange}
        onSearch={handleSearch}
        onClear={handleClear}
        enterButton
        allowClear
        style={{ width: 300 }}
      />
    </Space>
  );
};

export default SearchBar;
