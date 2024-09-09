import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Add from "./Views/Add/Add";
import List from "./Views/List/List";
import Orders from "./Views/Orders/Orders";

function App() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <hr />
      <div className="w-full flex">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
