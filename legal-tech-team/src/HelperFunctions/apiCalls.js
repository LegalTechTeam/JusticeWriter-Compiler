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
  demographics: "Demographics",
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
      background: `This section is about ${sectionDescriptions[section_name]}. The interviewee is ${jsonData.demographics.firstName} ${jsonData.demographics.lastName}. `,
      demographics: `This section is about ${sectionDescriptions[section_name]}. The interviewee is ${jsonData.demographics.firstName} ${jsonData.demographics.lastName}. `,
      familyDynamics: `This section discusses the ${sectionDescriptions[section_name]} of ${jsonData.demographics.firstName} ${jsonData.demographics.lastName}. `,
      community: `This section is about ${sectionDescriptions[section_name]}. `,
      schooling: `This section is about ${sectionDescriptions[section_name]}. `,
      adverseChildhoodExpriences: `This section is about ${sectionDescriptions[section_name]}. `,
      peersAndRoleModels: `This section is about ${sectionDescriptions[section_name]}. `,
      mentalHealth: `This section is about ${jsonData.demographics.firstName} ${jsonData.demographics.lastName}'s ${sectionDescriptions[section_name]}. `,
      evidenceOfCharacter: `This section is about ${sectionDescriptions[section_name]}.`,
    };
  }

  const sectionActions = {
    demographics: ["tone", "quotes", "themes", "grammar"],
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
        Mother's Name: ${section_values.motherName}
        Mother's Birthday: ${section_values.motherBday}
        Mother's Arrested: ${section_values.motherArrested}
        Number of Children (Mother): ${section_values.motherNumChildren}
        Mother's Education: ${section_values.motherEducation}
        Mother's Marital Status: ${section_values.motherMaritalStatus}
        Father's Arrested: ${section_values.fatherArrested}
      `,
      Other: `
        Siblings: ${section_values.siblings}
        Family Conflict: ${section_values.familyConflict}
        Family Relocation: ${section_values.familyRelocation}
        Housing Assistance: ${section_values.housingAssistance}
      `,
    };
  }
  if (section_name === "demographics" && section_values.background) {
    section_values = {
      background: section_values.background,
    };
  }

  // Merge relevant fields for adverse childhood experiences
  if (section_name === "adverseChildhoodExpriences") {
    section_values = {
      mentalHealthAndDrugUse: `
        Alcohol Abuse: ${section_values.alcoholAbuse}
        Mental Illness: ${section_values.mentalIllness}
        Drug Use: ${section_values.drugUse}
        Diagnosed SUD: ${section_values.diagnosedSUD}
        Treated SUD: ${section_values.treatedSUD}
      `,
      separation: section_values.separation,
      familyMembersInPrison: section_values.familyMembersInPrison,
      lossesAndDeaths: section_values.lossesAndDeaths,

      emotionalAbuse: section_values.emotionalAbuse,
      physicalAbuse: section_values.physicalAbuse,
      sexualAbuse: section_values.sexualAbuse,
      emotionalNeglect: section_values.emotionalNeglect,
      physicalNeglect: section_values.physicalNeglect,
      familyMemberAbusedOrThreatened:
        section_values.familyMemberAbusedOrThreatened,
    };
  }

  // Merge relevant fields for peers and role models
  if (section_name === "peersAndRoleModels") {
    section_values = {
      neighborhood: `
        Number of Neighborhood College Students: ${section_values.numberNeighborhoodCollege}
        Number of Neighborhood Prison Inmates: ${section_values.numberNeighborhoodPrison}
        Number of Relatives Arrested: ${section_values.numberRelativesArrested}
        Neighborhood Arrests: ${section_values.neighborhoodArrests}
        Neighborhood Degrees: ${section_values.neighborhoodDegrees}
      `,
      mentalHealthIssues: section_values.mentalHealthIssues,
      affectedByMentalHealth: section_values.affectedByMentalHealth,
      associationWithPeers: section_values.associationWithPeers,
    };
  }

  if (section_name === "schooling") {
    section_values = {
      educationHistory: `
        schoolsAttended: ${section_values.schoolsAttended}
        schoolChanges: ${section_values.schoolChanges}
        schoolQuality: ${section_values.schoolQuality}
      
      `,
      noDisciplinaryAction: section_values.noDisciplinaryAction,
      emotionalAbuse: section_values.emotionalAbuse,
    };
  }

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
    if (section_name === "demographics") {
      all_sections["summary"] = curr_section;
    }
  }
}

export var chatPatches = null;

export async function generateReport(jsonData, inputText) {
  console.log("Generating Report for JSON data in api calls");
  console.log("jsonData: \n", jsonData);

  if (jsonData.demographics?.DOB) {
    all_sections["date"] = escapeDoubleQuotes(jsonData.demographics.DOB);
  }
  if (jsonData.demographics?.attorneyName) {
    all_sections["attorneyName"] = jsonData.demographics.attorneyName;
  }
  if (jsonData.demographics?.attorneyOffice) {
    all_sections["attorneyOffice"] = jsonData.demographics.attorneyOffice;
  }
  if (jsonData.demographics?.caseNumber) {
    all_sections["caseNumber"] = jsonData.demographics.caseNumber;
  }
  if (jsonData.demographics?.firstName) {
    all_sections["firstName"] = jsonData.demographics.firstName;
  }
  if (jsonData.demographics?.lastName) {
    all_sections["lastName"] = jsonData.demographics.lastName;
  }
  if (jsonData.demographics?.gender) {
    all_sections["gender"] = jsonData.demographics.gender;
  }
  if (jsonData.demographics?.background) {
    all_sections["background"] = jsonData.demographics.background;
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
    if (typeof jsonObject[key] === "object" && jsonObject[key] !== null) {
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
