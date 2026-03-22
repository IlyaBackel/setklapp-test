import SearchBar from "../../SearchBar";

const TableHeader = ({ onSearch, searchText, totalRecords, filteredCount }) => {
  return (
    <div className="table-header">
      <SearchBar onSearch={onSearch} />
      {searchText && (
        <span className="search-info">
          Found: {filteredCount} of {totalRecords} records
        </span>
      )}
    </div>
  );
};

export default TableHeader;
