import React from "react";
import { useEffect, useState } from "react";
import {
    HashRouter,
    Route,
    Routes
  } from "react-router-dom";
import Demographics from "./Components/Demographics";
import ACEp1 from "./Components/ACEp1";
import ACEp2 from "./Components/ACEp2";
import PeersRoleModels from "./Components/PeersRoleModels";
import "./index.css";

import FamilyDynamics from "./Components/FamilyDynamics";
import Community from "./Components/Community";
import Schooling from "./Components/Schooling";

import Submit from "./Components/Submit";
import MentalHealth from "./Components/MentalHealth";
import Evidence from "./Components/Evidence";
import { initializeFromStore } from "./HelperFunctions/formatJSON";
function App() {
  const [data, setData] = useState('');

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
    <Route path="/" exact     element={<Submit/>} />
    <Route path="/demographics" element={<Demographics/>} />
    <Route path="/familyDynamics" element={<FamilyDynamics/>} />
          <Route path="/community" element={<Community/>} />
          <Route path="/schooling" element={<Schooling/>} />
          <Route path="/aceOne" element={<ACEp1/>} />
          <Route path="/aceTwo" element={<ACEp2/>} />
          <Route path="/peers-role-models" element={<PeersRoleModels/>} />
          <Route path="/mental-health" element={<MentalHealth/>}/>
          <Route path="/evidence"element={<Evidence/>}/>
    </Routes>

</HashRouter>    
</div>
  );
}

export default App;
