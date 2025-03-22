import "./App.css";
import DataTableVisits from "./components/DataTable/DataTableVisits/component";
import Header from "./Layout/Header/component";

function App() {
  return (
    <div className="App">
      <Header />

      <DataTableVisits />
    </div>
  );
}

export default App;
