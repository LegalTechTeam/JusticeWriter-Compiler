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

export function ReturnExistingSubSection(section, sub) {
    if (globalJsonData[section] && globalJsonData[section][sub]) {
        return globalJsonData[section][sub];
    } else {
        console.error(`Sub-section '${sub}' does not exist in section '${section}'.`);
        return null; 
    }
}

export function DownloadJsonData() {
    const filename = 'globalJsonData.json';
    const jsonStr = JSON.stringify(globalJsonData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}