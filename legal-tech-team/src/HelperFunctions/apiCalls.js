//functions for turning api calls from JSON
import axios, { all } from 'axios'; // Import axios directly
import { useState } from 'react';
import OpenAI from "openai";
const apiKey = ""; // Add your API key here

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});



// Descriptions for each section
const sectionDescriptions = {
    "demographics": "Demographics",
    "familyDynamics": "Family Dynamics",
    "community": "Community",
    "schooling": "Schooling",
    "adverseChildhoodExpriences": "Adverse Childhood Experiences",
    "peersAndRoleModels": "Peers and Role Models",
    "mentalHealth": "Mental Health",
    "evidenceOfCharacter": "Evidence of Character"
}

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
var all_sections = "";
// Function that calls the API with each prompt 
async function callAPI(section_name, json_values) {
  console.log("current section name: ", section_name);
  var prompt = "This section is about " + sectionDescriptions[section_name] + ". Please provide a summary of the information in this section using the data provided below:\n\n";
  for (let key in json_values) {
    prompt += key + ": " + json_values[key] + "\n";
  }

  console.log("Prompt for", section_name, ":", prompt);

  const stream = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    stream: true,
  });
  all_sections += "\n";
  all_sections += section_name + ": ";
  all_sections += "\n";
  for await (const chunk of stream) {
    all_sections += chunk.choices[0]?.delta?.content || "";
  }
  
}


// Function to generate a report from JSON data
export async function generateReport(jsonData) {
    console.log("Generating Report for JSON data in api calls");
    console.log("jsonData: \n", jsonData);
    try {
      const sections = Object.keys(jsonData).filter(key => {
        // Assuming sections have certain characteristics (you can adjust this condition)
        return typeof jsonData[key] === "object" && !Array.isArray(jsonData[key]);
      });
        sections.forEach(async (section) => {
          await callAPI(section, jsonData[section]);
        });
        console.log("All sections:", all_sections);
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
}
