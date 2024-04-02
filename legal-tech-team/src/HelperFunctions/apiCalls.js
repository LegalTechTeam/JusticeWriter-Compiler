//functions for turning api calls from JSON
import { useState } from 'react';
import fs from 'fs';
const axios = require('axios');

const apiKey = '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 ';


/*
"demographics": {},
  "familyDynamics": {},
  "community": {},
  "schooling": {},
  "adverseChildhoodExpriences": {},
  "peersAndRoleModels": {},
  "mentalHealth": {},
  "evidenceOfCharacter": {}
*/

//descript each section 
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

//function that calls the api with each prompt 

export function callAPI(section_name, json_values) {
    console.log(`Calling API for section: ${section_name}`);
    console.log(`JSON values:`, json_values);
    var prompt = "This section is about " + sectionDescriptions[section_name] + ". Please provide a summary of the data. \n\n" + JSON.stringify(json_values);
    axios.post('https://api.openai.com/v1/completions', {
        model: "text-davinci-003",
        prompt: prompt
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}
//parameter for this function is a json 
export function generateReport(filePath) {
    console.log("Generating Report for file path in api calls ", filePath);
    //file read json
    var jsonData = fs.readFileSync(filePath, 'utf8');
    console.log(jsonData);
    fs.readFileSync(filePath, 'utf8', (err, data) => {
        //check if file is empty

        if (err) {
          console.error('Error reading file:', err);
          return;
        }
      
        try {
          // Parse JSON data
          const jsonData = JSON.parse(data);
      
          // Now you can work with the parsed JSON object
          console.log(jsonData);

          for (let section_name in jsonData) {
            // Call the API function for each key and its corresponding value
            callAPI(section_name, jsonData[section_name]);
        }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      });

    
    
}
