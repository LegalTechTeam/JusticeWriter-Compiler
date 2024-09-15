import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import CaseInformation from "./Components/CaseInformation";
import ClientInformation from "./Components/ClientInformation.js";

import ACEp1 from "./Components/ACEp1";
import ACEp2 from "./Components/ACEp2";
import PeersRoleModels from "./Components/PeersRoleModels";
import "./index.css";

import Community from "./Components/Community";
import FamilyDynamics from "./Components/FamilyDynamics";
import Schooling from "./Components/Schooling";

import CageAid from "./Components/CageAid.js";
import Evidence from "./Components/Evidence";
import MentalHealth from "./Components/MentalHealth";
import OtherCaretaker from "./Components/OtherCaretaker.js";
import Submit from "./Components/Submit";
import Syndemics from "./Components/Syndemics.js";
import CrimeStats from "./Components/crimeStats";
import { initializeFromStore } from "./HelperFunctions/formatJSON";
function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    // Load data from store when component mounts
    const fetchData = async () => {
      initializeFromStore();
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" exact element={<Submit />} />
          <Route path="/caseInformation" element={<CaseInformation />} />
          <Route path="/familyDynamics" element={<FamilyDynamics />} />
          <Route path="/community" element={<Community />} />
          <Route path="/schooling" element={<Schooling />} />
          <Route path="/aceOne" element={<ACEp1 />} />
          <Route path="/aceTwo" element={<ACEp2 />} />
          <Route path="/peers-role-models" element={<PeersRoleModels />} />
          <Route path="/mental-health" element={<MentalHealth />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/crime-stats" element={<CrimeStats />} />
          <Route path="/clientInfo" element={<ClientInformation />} />
          <Route path="/careTaker" element={<OtherCaretaker />} />
          <Route path="/syndemics" element={<Syndemics />} />
          <Route path="/cageAid" element={<CageAid />} />



        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
