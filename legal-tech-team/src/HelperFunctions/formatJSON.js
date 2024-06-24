// Original globalJsonData object
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

// Function to initialize globalJsonData with data from store
export async function initializeFromStore() {
  // Check if window.electron is available
  if (window.electron) {
    // Retrieve JSON data from store if available
    const storedData = await window.electron.getStoreData("jsonDataGlobal");
    globalJsonData = JSON.parse(storedData);
    console.log("Logging global data:", globalJsonData);
    console.log("check");
  }
}

// Initialize globalJsonData with data from store on app startup

export function SaveJSON(formData, section) {
  const jsonData = JSON.stringify(formData);
  console.log("section data: ");
  console.log(jsonData);

  globalJsonData[section] = formData;

  // Update store with formData
  window.electron.setStoreData(
    "jsonDataGlobal",
    JSON.stringify(globalJsonData)
  );

  // Log the updated data in store
}
// Function to retrieve JSON data using globalJsonData
export function ReturnExistingInput(section) {
  // Check if window.electron is available
  console.log(window.electron.getStoreData("jsonDataGlobal"));
  return globalJsonData[section];
}
// Function to clear JSON data using globalJsonData and store
export function clearJSON() {
  // Clear globalJsonData
  globalJsonData = {
    demographics: {},
    familyDynamics: {},
    community: {},
    schooling: {},
    adverseChildhoodExpriences: {},
    peersAndRoleModels: {},
    mentalHealth: {},
    evidenceOfCharacter: {},
  };

  // Clear store if available
  if (window.electron) {
    window.electron.setStoreData(
      "jsonDataGlobal",
      JSON.stringify(globalJsonData)
    );
  }
}

// Function to return existing subsection data using globalJsonData
export function ReturnExistingSubSection(section, sub) {
  if (globalJsonData[section] && globalJsonData[section][sub]) {
    return JSON.stringify(globalJsonData[section][sub]);
  } else {
    // console.error(`Sub-section '${sub}' does not exist in section '${section}'.`);
    return null;
  }
}

// Function to download JSON data using globalJsonData
export function DownloadJsonData() {
  const filename = "globalJsonData.json";
  const jsonStr = JSON.stringify(globalJsonData, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
