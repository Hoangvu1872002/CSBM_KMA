import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import LoginRegister from "./pages/LoginRegister/LoginRegister";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LoginRegister></LoginRegister>} />
          <Route path="/home" element={<Home></Home>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
