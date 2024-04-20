//functions for turning api calls from JSON
import { useState } from "react";
import OpenAI from "openai";
import { json } from "react-router-dom";

const apiKeyOpenAI = ""; // Add your API key here

const openai = new OpenAI({
  apiKey: apiKeyOpenAI,
  dangerouslyAllowBrowser: true,
});

// Descriptions for each section
const sectionDescriptions = {
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

// Function that calls the API with each prompt
async function callAPI(section_name, json_values, inputText, jsonData) {
  if (inputText === null) {
    inputText =
      "Write a detailed long-form expert witness paragraph on below for a professional legal proceeding. The language should be written as a sociologist, expert in forensic psychology, and professional writer.";
  } else {
    //combine tone, grammar, quotes, and theme sections of the input text
    //iterate through the input text and combine the sections
    console.log("inputText: ", inputText);
    for (let key in inputText) {
      inputText += inputText[key];
    }
  }
  var adjustedPrompts = sectionDescriptions;

  if (json_values !== null) {
    //adjust the prompts based on the section
    adjustedPrompts = {
      demographics: "This section is about " + sectionDescriptions[section_name] + " The interviewee is " + jsonData.demographics.firstName + " " + jsonData.demographics.lastName + ". ",
      familyDynamics: "This section discusses the " + sectionDescriptions[section_name] + " of " + jsonData.demographics.firstName + " " + jsonData.demographics.lastName + ". ",
      community: "This section is about " + sectionDescriptions[section_name] + ". ",
      schooling: "This section is about " + sectionDescriptions[section_name] + ". ",
      adverseChildhoodExpriences: "This section is about " + sectionDescriptions[section_name] + ". ",
      peersAndRoleModels: "This section is about " + sectionDescriptions[section_name] + ". ",
      mentalHealth: "This section is about " + jsonData.demographics.firstName + " " + jsonData.demographics.lastName + "'s " + sectionDescriptions[section_name] + ". ",
      evidenceOfCharacter: "This section is about " + sectionDescriptions[section_name],
    };
  }
  console.log("current section name: ", section_name);
  console.log("inputText: ", inputText);
  var prompt = adjustedPrompts[section_name];
  if (inputText !== null) {
    //tone, grammar, quotes, and theme sections of the input text
    for (let key in inputText) {
      for (let key2 in inputText[key]) {
        prompt += inputText[key][key2];
    }
  }
}

  for (let key in json_values) {
    prompt += JSON.stringify(json_values[key]);
  }

  console.log("Prompt for", section_name, ":", prompt);

  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    stream: true,
  });

  //print the response
  console.log("Response for", section_name, ":");
  let curr_section = "";
  for await (const chunk of stream) {
    curr_section += chunk.choices[0]?.delta?.content || "";
  }

  console.log(curr_section);

  all_sections[section_name] = escapeDoubleQuotes(curr_section);
}

export var chatPatches = null;
// Function to generate a report from JSON data
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

  try {
    const sections = Object.keys(jsonData).filter((key) => {
      // Assuming sections have certain characteristics (you can adjust this condition)
      return typeof jsonData[key] === "object" && !Array.isArray(jsonData[key]);
    });
    sections.forEach(async (section) => {
      await callAPI(section, jsonData[section], inputText, jsonData);
    });
    console.log("All sections:", all_sections);
  } catch (error) {
    console.log("error caused by this section of json " + section);
    console.error("Error parsing JSON:", error);
  }
  console.log("Generating Report for JSON data in api calls");
  console.log("jsonData: \n", jsonData);
  try {
    const sections = Object.keys(jsonData).filter((key) => {
      // Assuming sections have certain characteristics (you can adjust this condition)
      return typeof jsonData[key] === "object" && !Array.isArray(jsonData[key]);
    });
    /*await Promise.all(sections.forEach(async (section) => {
          await callAPI(section, jsonData[section]);
        }));*/
    await Promise.all(
      sections.map(async (section) => {
        await callAPI(section, jsonData[section], inputText, jsonData);
      })
    );
    // all_sections = all_sections.substring(0, all_sections.length - 2);
    // all_sections += "}";
    const all_sections_json = JSON.stringify(all_sections);

    console.log("All Sections: ", all_sections);
    chatPatches = JSON.parse(all_sections_json);
    console.log("Chat Patches:", chatPatches);
    //console.log(all_sections);
  } catch (error) {
    console.log("line 168");
    console.error("Error parsing JSON:", error);
  }
}

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
      case "\\":
        return "\\\\";
      default:
        return match; // Return as is if not a control character
    }
    // str = str.replace(/\n/g, "\\n");
  });
  return str;
}
