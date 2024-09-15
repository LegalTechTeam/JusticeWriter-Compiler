/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./index.css";
import "./index.js";
import "./Components/CaseInformation.js";
import "./Components/ClientInformation.js";
import "./Components/ACEp1.js";
import "./Components/ACEp2.js";
import "./Components/PeersRoleModels.js";
import "./Components/Syndemics.js"
import "./Components/CageAid.js"

import "./Components/FamilyDynamics.js";
import "./Components/Community.js";
import "./Components/Schooling.js";
import "./Components/crimeStats.js";

import "./Components/Submit.js";
import "./Components/MentalHealth.js";
import "./Components/Evidence.js";

import "./HelperFunctions/DateOfBirth.js";
import "./HelperFunctions/SmallTextInput.js";
import "./HelperFunctions/DropDown.js";
import "./HelperFunctions/formatJSON.js";
import "./HelperFunctions/BigText.js";
import "./HelperFunctions/CheckBoxWithAdd.js";
import "./HelperFunctions/OtherNotes.js";
import "./HelperFunctions/RadioYesNo.js";
import "./HelperFunctions/apiCalls.js";
import "./HelperFunctions/AddQuotes.js";

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);
