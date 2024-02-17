import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Demographics from "./Components/Demographics";
import ACEp2 from "./Components/ACEp2";
import PeersRoleModels from "./Components/PeersRoleModels";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" Component={Demographics}/>
          <Route path="/ace" Component={ACEp2}/>
          <Route path="/peers-role-models" Component={PeersRoleModels} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
