//functions for turning api calls from JSON
import { useState } from "react";
import OpenAI from "openai";
import { json } from "react-router-dom";
// import * as pdfjs from "pdfjs-dist/build/pdf.min.mjs";
const apiKeyOpenAI = ""; // Add your API key here

const openai = new OpenAI({
  apiKey: apiKeyOpenAI,
  dangerouslyAllowBrowser: true,
});

//condensed prompts
const prompts = {
  grammar: ["Write in third person.", "Do not write run-on sentences."],

  tone: [
    "Write in the tone of a sociologist, expert in forensic psychology, and professional writer.",
    "You are an expert witness writing a report about a client's life, trauma, and social disadvantages.",
  ],

  quotes: [
    // "Do not edit the direct quotes.",
    "Do not write curse words or expletives.",
  ],

  themes: [
    "Transform the following notes into complete sentences.",
    "Do not abbreviate or consolidate the information.",
  ],
};

// Descriptions for each section
const sectionDescriptions = {
  background: "Backgrouund",
  caseInformation: "CaseInformation",
  familyDynamics: "Family Dynamics",
  community: "Community",
  schooling: "Schooling",
  adverseChildhoodExpriences: "Adverse Childhood Experiences",
  peersAndRoleModels: "Peers and Role Models",
  mentalHealth: "Mental Health",
  evidenceOfCharacter: "Evidence of Character",
};

var all_sections = {};

async function test_call() {
  const stream = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: "Say this is a test" }],
    stream: true,
  });
  for await (const chunk of stream) {
    console.log(chunk.choices[0]?.delta?.content || "");
  }
}

function add_from_json(inputText, key, prompt) {
  //check length of input text at key
  var instructions = "";
  if (inputText[key] !== null && inputText[key].length > 0) {
    instructions += inputText[key];
  } else {
    //add from prompts
    for (let key2 in prompts[key]) {
      instructions += prompts[key][key2];
    }
  }
  //cast to string
  return instructions.toString();
}

// Function that calls the API with each prompt
// section, subsections of section, prompt and full jsonData in CallApi
async function summarizeJsonData(jsonData) {
  const summaryPrompt = "Please summarize the following data for context: \n\n";
  const prompt = appendToPrompt(jsonData, summaryPrompt);

  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.3, // Controls randomness in text generation (lower is more deterministic)
    top_p: 0.5,
    messages: [{ role: "user", content: prompt }],
    stream: true,
  });

  let summary = "";
  for await (const chunk of stream) {
    summary += chunk.choices[0]?.delta?.content || "";
  }

  return summary;
}
let contextSummary = "";

function countWords(str) {
  return str.split(/\s+/).filter((word) => word.length > 0).length;
}

function trimToWordLimit(str, wordLimit) {
  const words = str.split(/\s+/).filter((word) => word.length > 0);
  if (words.length > wordLimit) {
    return words.slice(words.length - wordLimit).join(" ");
  }
  return str;
}

function updateContextSummary(newInfo) {
  // Append new information to the summary
  contextSummary += newInfo + " ";
  // Ensure the summary does not exceed the word limit
  if (countWords(contextSummary) > 1000) {
    contextSummary = trimToWordLimit(contextSummary, 1000);
  }
}

async function callAPI(
  section_name,
  section_values,
  inputText,
  jsonData,
  contextSummary
) {
  var adjustedPrompts = sectionDescriptions;

  if (section_values !== null && jsonData !== null) {
    adjustedPrompts = {
      background: `This section is about ${sectionDescriptions[section_name]}. The interviewee is ${jsonData.caseInformation.firstName} ${jsonData.caseInformation.lastName}. `,
      caseInformation: `This section is about ${sectionDescriptions[section_name]}. The interviewee is ${jsonData.caseInformation.firstName} ${jsonData.caseInformation.lastName}. `,
      familyDynamics: `This section discusses the ${sectionDescriptions[section_name]} of ${jsonData.caseInformation.firstName} ${jsonData.caseInformation.lastName}. `,
      community: `This section is about ${sectionDescriptions[section_name]}. `,
      schooling: `This section is about ${sectionDescriptions[section_name]}. `,
      adverseChildhoodExpriences: `This section is about ${sectionDescriptions[section_name]}. `,
      peersAndRoleModels: `This section is about ${sectionDescriptions[section_name]}. `,
      mentalHealth: `This section is about ${jsonData.caseInformation.firstName} ${jsonData.caseInformation.lastName}'s ${sectionDescriptions[section_name]}. `,
      evidenceOfCharacter: `This section is about ${sectionDescriptions[section_name]}.`,
    };
  }

  const sectionActions = {
    caseInformation: ["tone", "quotes", "themes", "grammar"],
    familyDynamics: ["tone", "quotes", "themes", "grammar"],
    background: ["tone", "quotes", "themes", "grammar"],
    community: ["tone", "quotes", "themes", "grammar"],
    schooling: ["tone", "quotes", "themes", "grammar"],
    adverseChildhoodExpriences: ["tone", "quotes", "themes", "grammar"],
    peersAndRoleModels: ["tone", "quotes", "themes", "grammar"],
    mentalHealth: ["tone", "quotes", "themes", "grammar"],
    evidenceOfCharacter: ["tone", "quotes", "themes", "grammar"],
  };

  // Merge relevant fields for family dynamics
  if (section_name === "familyDynamics") {
    section_values = {
      Parent: `
        Mother's Name: ${JSON.stringify(section_values.motherName, null, 2)}
        Mother's Birthday: ${JSON.stringify(section_values.motherBday, null, 2)}
        Mother's Arrested: ${JSON.stringify(
          section_values.motherArrested,
          null,
          2
        )}
        Number of Children (Mother): ${JSON.stringify(
          section_values.motherNumChildren,
          null,
          2
        )}
        Mother's Education: ${JSON.stringify(
          section_values.motherEducation,
          null,
          2
        )}
        Mother's Marital Status: ${JSON.stringify(
          section_values.motherMaritalStatus,
          null,
          2
        )}
        Father's Arrested: ${JSON.stringify(
          section_values.fatherArrested,
          null,
          2
        )}
         Father's name: ${JSON.stringify(
          section_values.fatherName,
          null,
          2
        )}
      `,
      Other: `
        Siblings: ${JSON.stringify(section_values.siblings, null, 2)}
        Family Conflict: ${JSON.stringify(
          section_values.familyConflict,
          null,
          2
        )}
        Family Relocation: ${JSON.stringify(
          section_values.familyRelocation,
          null,
          2
        )}
        Housing Assistance: ${JSON.stringify(
          section_values.housingAssistance,
          null,
          2
        )}
      `,
    };
  }

  if (section_name === "caseInformation" && section_values.background) {
    section_values = {
      background: JSON.stringify(section_values.background, null, 2),
    };
  }
  if (section_name === "mentalHealth") {
    section_values = {
     
      participatedMentalHealthOrDrugProgram: JSON.stringify(section_values.participatedMentalHealthOrDrugProgram, null, 2),
      receivedMentalHealthTreatment: JSON.stringify(
        section_values.receivedMentalHealthTreatment,
        null,
        2
      ),
      addressedMentalHealthIssues: JSON.stringify(section_values.addressedMentalHealthIssues, null, 2),

      treatmentOrCounseling: JSON.stringify(section_values.treatmentOrCounseling, null, 2),
    
    };
  }

  // Merge relevant fields for adverse childhood experiences
  if (section_name === "adverseChildhoodExpriences") {
    section_values = {
      mentalHealthAndDrugUse: `
        Alcohol Abuse: ${JSON.stringify(section_values.alcoholAbuse, null, 2)}
        Mental Illness: ${JSON.stringify(section_values.mentalIllness, null, 2)}
        Drug Use: ${JSON.stringify(section_values.drugUse, null, 2)}
        Diagnosed SUD: ${JSON.stringify(section_values.diagnosedSUD, null, 2)}
        Treated SUD: ${JSON.stringify(section_values.treatedSUD, null, 2)}
      `,
      separation: JSON.stringify(section_values.separation, null, 2),
      familyMembersInPrison: JSON.stringify(
        section_values.familyMembersInPrison,
        null,
        2
      ),
      lossesAndDeaths: JSON.stringify(section_values.lossesAndDeaths, null, 2),

      emotionalAbuse: JSON.stringify(section_values.emotionalAbuse, null, 2),
      physicalAbuse: JSON.stringify(section_values.physicalAbuse, null, 2),
      sexualAbuse: JSON.stringify(section_values.sexualAbuse, null, 2),
      emotionalNeglect: JSON.stringify(
        section_values.emotionalNeglect,
        null,
        2
      ),
      physicalNeglect: JSON.stringify(section_values.physicalNeglect, null, 2),
      familyMemberAbusedOrThreatened: JSON.stringify(
        section_values.familyMemberAbusedOrThreatened,
        null,
        2
      ),
    };
  }

  // Merge relevant fields for peers and role models
  if (section_name === "peersAndRoleModels") {
    section_values = {
      neighborhood: `
        Number of Neighborhood College Students: ${JSON.stringify(
          section_values.numberNeighborhoodCollege,
          null,
          2
        )}
        Number of Neighborhood Prison Inmates: ${JSON.stringify(
          section_values.numberNeighborhoodPrison,
          null,
          2
        )}
        Number of Relatives Arrested: ${JSON.stringify(
          section_values.numberRelativesArrested,
          null,
          2
        )}
        Neighborhood Arrests: ${JSON.stringify(
          section_values.neighborhoodArrests,
          null,
          2
        )}
        Neighborhood Degrees: ${JSON.stringify(
          section_values.neighborhoodDegrees,
          null,
          2
        )}
      `,
      mentalHealthIssues: JSON.stringify(
        section_values.mentalHealthIssues,
        null,
        2
      ),
      affectedByMentalHealth: JSON.stringify(
        section_values.affectedByMentalHealth,
        null,
        2
      ),
      associationWithPeers: JSON.stringify(
        section_values.associationWithPeers,
        null,
        2
      ),
    };
  }

  if (section_name === "schooling") {
    section_values = {
      educationHistory: `
        schoolsAttended: ${JSON.stringify(
          section_values.schoolsAttended,
          null,
          2
        )}
        schoolChanges: ${JSON.stringify(section_values.schoolChanges, null, 2)}
        schoolQuality: ${JSON.stringify(section_values.schoolQuality, null, 2)}
      `,
      noDisciplinaryAction: JSON.stringify(
        section_values.noDisciplinaryAction,
        null,
        2
      ),
      emotionalAbuse: JSON.stringify(section_values.emotionalAbuse, null, 2),
    };
  }

  // Function to append section values to prompt
  for (let subsection in section_values) {
    let prompt = contextSummary + "\n\n";
    prompt += adjustedPrompts[section_name];
    if (sectionActions[section_name]) {
      sectionActions[section_name].forEach((action) => {
        prompt += add_from_json(inputText, action, prompt);
      });
    } else {
      console.warn(
        "Section name not found, report sections may not be accurate."
      );
    }

    prompt += "Below is the information provided by the interviewee: \n\n";
    prompt = appendToPrompt(
      { [subsection]: section_values[subsection] },
      prompt
    );

    console.log(`Prompt for ${section_name} - ${subsection}:`, prompt);

    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.3, // Controls randomness in text generation (lower is more deterministic)
      top_p: 0.5,
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    console.log(`Response for ${section_name} - ${subsection}:`);
    let curr_section = "";
    for await (const chunk of stream) {
      curr_section += chunk.choices[0]?.delta?.content || "";
    }

    console.log(curr_section);

    if (!all_sections[section_name]) {
      all_sections[section_name] = {};
    }
    all_sections[section_name][subsection] = escapeDoubleQuotes(curr_section);

    // Update the context summary with new information
    //updateContextSummary(curr_section);
    if (section_name === "caseInformation") {
      all_sections["summary"] = curr_section;
    }
  }
}

export var chatPatches = null;

export async function generateReport(jsonData, inputText) {
  console.log("Generating Report for JSON data in api calls");
  console.log("jsonData: \n", jsonData);

  if (jsonData.caseInformation?.DOB) {
    all_sections["date"] = escapeDoubleQuotes(jsonData.caseInformation.DOB);
  }
  if (jsonData.caseInformation?.attorneyName) {
    all_sections["attorneyName"] = jsonData.caseInformation.attorneyName;
  }
  if (jsonData.caseInformation?.attorneyOffice) {
    all_sections["attorneyOffice"] = jsonData.caseInformation.attorneyOffice;
  }
  if (jsonData.caseInformation?.caseNumber) {
    all_sections["caseNumber"] = jsonData.caseInformation.caseNumber;
  }
  if (jsonData.caseInformation?.firstName) {
    all_sections["firstName"] = jsonData.caseInformation.firstName;
  }
  if (jsonData.caseInformation?.lastName) {
    all_sections["lastName"] = jsonData.caseInformation.lastName;
  }
  if (jsonData.caseInformation?.gender) {
    all_sections["gender"] = jsonData.caseInformation.gender;
  }
  if (jsonData.caseInformation?.background) {
    all_sections["background"] = jsonData.caseInformation.background;
  }

  try {
    const sections = Object.keys(jsonData).filter((key) => {
      return typeof jsonData[key] === "object" && !Array.isArray(jsonData[key]);
    });

    const initialContextSummary = await summarizeJsonData(jsonData);
    updateContextSummary(initialContextSummary);

    await Promise.all(
      sections.map(async (section) => {
        await callAPI(
          section,
          jsonData[section],
          inputText,
          jsonData,
          contextSummary
        );
      })
    );

    const all_sections_json = JSON.stringify(all_sections);
    console.log("All Sections: ", all_sections);
    chatPatches = JSON.parse(all_sections_json);
    console.log("Chat Patches:", chatPatches);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}

function appendToPrompt(jsonObject, prompt, indent = "") {
  for (let key in jsonObject) {
    if (Array.isArray(jsonObject[key])) {
      prompt += `${indent}${key}: \n`;
      jsonObject[key].forEach((item) => {
        if (typeof item === "object" && item !== null) {
          prompt = appendToPrompt(item, prompt, indent + "  ");
        } else {
          prompt += `${indent}  ${JSON.stringify(item)}\n`;
        }
      });
    } else if (
      typeof jsonObject[key] === "object" &&
      jsonObject[key] !== null
    ) {
      prompt += `${indent}${key}: \n`;
      prompt = appendToPrompt(jsonObject[key], prompt, indent + "  ");
    } else {
      prompt += `${indent}${key}: ${JSON.stringify(jsonObject[key])}\n`;
    }
  }
  return prompt;
}

// PDF STUFF

const extractTextFromPDF = async (pdfFile) => {
  // Load the PDF file using PDF.js
  //const loadingTask = pdfjsLib.getDocument(pdfFile);
  const loadingTask = pdfjs.getDocument(pdfFile);

  try {
    // Wait for the PDF file to be loaded
    const pdf = await loadingTask.promise;

    // Initialize an empty string to store the extracted text
    let text = "";

    // Iterate through each page of the PDF
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      // Get the text content of the page
      const page = await pdf.getPage(pageNum);
      const pageText = await page.getTextContent();

      // Concatenate the text content of the page to the overall text
      pageText.items.forEach((item) => {
        text += item.str + " ";
      });
    }

    // Return the extracted text
    if (text.length > 16000) {
      console.warn(
        "Extracted text is too long. Truncating to 16000 characters."
      );
      return text.substring(0, 15000);
    } else {
      return text;
    }
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    return null;
  }
};

export async function summarizeFile(pdfData) {
  const text = await extractTextFromPDF(pdfData);

  //check for token length
  console.log("Extracted text:", text);
  var prompt = "Here is a pdf file. Summarize the text below: \n\n" + text;

  // call openai
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3, // Controls randomness in text generation (lower is more deterministic)
    top_p: 0.5,
    stream: true,
  });

  var curr_section = "";
  for await (const chunk of stream) {
    //all_sections += chunk.choices[0]?.delta?.content || "";
    curr_section += chunk.choices[0]?.delta?.content || "";
  }

  console.log("Summary for the PDF file:", curr_section);
  //return response.data.messages[0].content;
}

function escapeDoubleQuotes(str) {
  //str = str.replace(/([^\\])"/g, '$1\\"');
  str = str.replace(/"/g, '\\"');

  // Escape common control characters for JSON.parse
  str = str.replace(/[\b\f\n\r\t"\\]/g, function (match) {
    // Replace control characters with their escaped versions
    switch (match) {
      case "\b":
        return "\\b";
      case "\f":
        return "\\f";
      case "\r":
        return "\\r";
      case "\t":
        return "\\t";
      default:
        return match; // Return as is if not a control character
    }

    // str = str.replace(/\n/g, "\\n");
  });
  str = str.replace(/\\/g, "");
  return str;
}

// for (let key in json_values) {
//   //check if json at key is a list
//   if (typeof json_values[key] !== "string") {
//     // console.log("json_values[key] is a list");
//     prompt += key + ": ";
//     for (let key2 in json_values[key]) {
//       prompt += JSON.stringify(json_values[key][key2]);
//       prompt += "\n";
//     }
//   } else {
//     prompt += key + ": ";
//     prompt += JSON.stringify(json_values[key]);
//     prompt += "\n";
//   }
//   prompt += "\n";
// }

// // call api for sections
// try {
//   const sections = Object.keys(jsonData).filter((key) => {
//     // Assuming sections have certain characteristics (you can adjust this condition)
//     return typeof jsonData[key] === "object";
//   });

//   // section, subsections of section, prompt and full jsonData in CallApi
//   await Promise.all(
//     sections.map(async (section) => {
//       await callAPI(section, jsonData[section], inputText, jsonData);
//     })
//   );

//   console.log("All sections:", all_sections);
//   console.log("Generating Report for JSON data in api calls");
//   console.log("jsonData: \n", jsonData);

//   // all_sections = all_sections.substring(0, all_sections.length - 2);
//   // all_sections += "}";
//   const all_sections_json = JSON.stringify(all_sections);

//   console.log("All Sections: ", all_sections);
//   const chatPatches = JSON.parse(all_sections_json);
//   console.log("Chat Patches:", chatPatches);
//   //console.log(all_sections);
// } catch (error) {
//   console.error("Error parsing JSON:", error);
// }
