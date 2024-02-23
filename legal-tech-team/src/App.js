import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Demographics from "./components/Demographics";
import ACEp1 from "./components/ACEp1";
import ACEp2 from "./components/ACEp2";
import PeersRoleModels from "./components/PeersRoleModels";

import FamilyDynamics from "./components/FamilyDynamics";
import Community from "./components/Community";
import Schooling from "./components/Schooling";

import Submit from "./components/Submit";
import MentalHealth from "./components/MentalHealth";
import Evidence from "./components/Evidence";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" Component={Demographics} />
          <Route path="/familyDynamics" Component={FamilyDynamics} />
          <Route path="/community" Component={Community} />
          <Route path="/schooling" Component={Schooling} />
          <Route path="/aceOne" Component={ACEp1} />
          <Route path="/aceTwo" Component={ACEp2} />
          <Route path="/peers-role-models" Component={PeersRoleModels} />
          <Route path="/mental-health" Component={MentalHealth}/>
          <Route path="/evidence" Component={Evidence}/>
          <Route path="/submit" Component={Submit} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
