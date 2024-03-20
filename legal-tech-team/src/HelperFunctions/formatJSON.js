let globalJsonData = {
    demographics: {},
    familyDynamics: {},
    community: {},
    schooling: {},
    adverseChildhoodExpriences: {},
    peersAndRoleModels: {},
    mentalHealth: {},
    evidenceOfCharacter: {},
  };

export function SaveJSON(formData, section) {
    const jsonData = JSON.stringify(formData);
    console.log("section data: ");
    console.log(jsonData); 

    globalJsonData[section] = formData; 
    console.log("global data: ");
    console.log(globalJsonData);
}

export function ReturnExistingInput(section) {
    return globalJsonData[section];
}
