import "./App.css";

import { useState } from "react";

import CreateRecordDrawer from "./modules/CreateDrawer";
import { RecordsTable, TableHeader } from "./modules/RecordsTable";

function App() {
  const [searchText, setSearchText] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleRecordsChange = (total, filtered) => {
    setTotalRecords(total);
    setFilteredCount(filtered);
  };

  return (
    <div className="container">
      <div className="header-section">
        <CreateRecordDrawer />
        <TableHeader
          onSearch={handleSearch}
          searchText={searchText}
          totalRecords={totalRecords}
          filteredCount={filteredCount}
        />
      </div>

      <RecordsTable
        searchText={searchText}
        onRecordsChange={handleRecordsChange}
      />
    </div>
  );
}

export default App;
