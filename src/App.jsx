import RecordsTable from "./modules/RecordsTable";
import CreateRecordDrawer from "./modules/CreateRecordDrawer";
import "./App.css";
import SearchBar from "./modules/SearchBar";

function App() {
  return (
    <div className="container">
      <CreateRecordDrawer />
      <RecordsTable />
    </div>
  );
}

export default App;
