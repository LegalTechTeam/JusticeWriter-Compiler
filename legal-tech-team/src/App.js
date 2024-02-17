import "./App.css";
import Demographics from "./Components/Demographics";
import FamilyDynamics from "./Components/FamilyDynamics";
import Community from "./Components/Community";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Demographics />} />{" "}
          <Route path="/familyDynamics" element={<FamilyDynamics />} />{" "}
          <Route path="/community" element={<Community />} />{" "}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
