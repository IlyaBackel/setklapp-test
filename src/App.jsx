import RecordsTable from "./modules/RecordsTable/components/RecordsTable";
import "./App.css";

import CreateRecordDrawer from "./modules/CreateRecordDrawer";

function App() {
  return (
    <div className="container">
      <CreateRecordDrawer />
      <RecordsTable />
    </div>
  );
}

export default App;
