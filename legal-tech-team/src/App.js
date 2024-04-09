import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Demographics from "./Components/Demographics";
import ACEp1 from "./Components/ACEp1";
import ACEp2 from "./Components/ACEp2";
import PeersRoleModels from "./Components/PeersRoleModels";

import FamilyDynamics from "./Components/FamilyDynamics";
import Community from "./Components/Community";
import Schooling from "./Components/Schooling";

import Submit from "./Components/Submit";
import MentalHealth from "./Components/MentalHealth";
import Evidence from "./Components/Evidence";

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
