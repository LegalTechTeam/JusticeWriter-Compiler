import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Demographics from "./Components/Demographics";
import ACEp2 from "./Components/ACEp2";
import PeersRoleModels from "./Components/PeersRoleModels";

import FamilyDynamics from "./Components/FamilyDynamics";
import Community from "./Components/Community";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" Component={Demographics} />
          <Route path="/familyDynamics" Component={FamilyDynamics} />
          <Route path="/community" Component={Community} />
          <Route path="/ace" Component={ACEp2} />
          <Route path="/peers-role-models" Component={PeersRoleModels} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
