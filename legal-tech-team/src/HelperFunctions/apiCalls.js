//functions for turning api calls from JSON
import OpenAI from "openai";
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
  background: "Background",
  caseInformation: "CaseInformation",
  familyDynamics: "Family Dynamics",
  community: "Community",
  syndemics: "Syndemics",
  schooling: "Schooling",
  adverseChildhoodExpriences: "Adverse Childhood Experiences",
  justiceInvolvement: "Justice Involvement",
  mobility : "Residential and School Mobility",
  cageAID: "CAGE-AID",
  peersAndRoleModels: "Peers and Role Models",
  mentalHealth: "Mental Health",
  evidenceOfCharacter: "Evidence of Character",
  otherRiskFactors: "Other Risk Factors"
};
export const setChatPatches = (value) => {
  chatPatches = value;
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
      syndemics: `This section is about ${sectionDescriptions[section_name]}. `,
      mobility: `This section is about ${sectionDescriptions[section_name]}. `,
      justiceInvolvement: `This section is about ${sectionDescriptions[section_name]}. `,
      cageAID: `This section is about ${sectionDescriptions[section_name]}. `,
      schooling: `This section is about ${sectionDescriptions[section_name]}. `,
      adverseChildhoodExpriences: `This section is about ${sectionDescriptions[section_name]}. `,
      peersAndRoleModels: `This section is about ${sectionDescriptions[section_name]}. `,
      mentalHealth: `This section is about ${jsonData.caseInformation.firstName} ${jsonData.caseInformation.lastName}'s ${sectionDescriptions[section_name]}. `,
      evidenceOfCharacter: `This section is about ${sectionDescriptions[section_name]}.`,
      otherRiskFactors: `This section is about ${sectionDescriptions[section_name]}.`,

    };
  }

  const sectionActions = {
    caseInformation: ["tone", "quotes", "themes", "grammar"],
    familyDynamics: ["tone", "quotes", "themes", "grammar"],
    background: ["tone", "quotes", "themes", "grammar"],
    community: ["tone", "quotes", "themes", "grammar"],
    syndemics: ["tone", "quotes", "themes", "grammar"],
    schooling: ["tone", "quotes", "themes", "grammar"],
    adverseChildhoodExpriences: ["tone", "quotes", "themes", "grammar"],
    cageAID: ["tone", "quotes", "themes", "grammar"],
    otherRiskFactors: ["tone", "quotes", "themes", "grammar"],
    mobility: ["tone", "quotes", "themes", "grammar"],
    justiceInvolvement: ["tone", "quotes", "themes", "grammar"],
    peersAndRoleModels: ["tone", "quotes", "themes", "grammar"],
    mentalHealth: ["tone", "quotes", "themes", "grammar"],
    evidenceOfCharacter: ["tone", "quotes", "themes", "grammar"],
  };

  // Merge relevant fields for family dynamics
  if (section_name === "familyDynamics") {
    section_values = {
      Mother: {
        "Mother's Name": section_values.motherName,
        "Mother's Birthday": section_values.motherBday,
        "Mother's Age When She First Gave Birth": section_values.motherAgeWhenSheFirstGaveBirth,
        "Mother's Age When She Gave Birth to Client": section_values.motherAgeWhenSheGaveBirthToClient,
        "Mother Arrested": section_values.motherArrested,
        "Housing Assistance": section_values.housingAssistance,
        "Food Stamps": section_values.foodStamps,
        "Mother's Marital Status": section_values.motherMaritalStatus,
        "Mother's Education": section_values.motherEducation,
        "Mother's Number of Children": section_values.motherNumChildren,
        "Mother's Number of Siblings": section_values.motherNumSiblings,
      },
      Father: {
        "Father's Name": section_values.fatherName,
        "Father's Birthday": section_values.fatherBday,
        "Father Arrested": section_values.fatherArrested,
        "Father's Number of Siblings": section_values.fatherNumSiblings,
      },
      Caretaker: {
        "Caretaker's First Name": section_values.caretakerFirstName,
        "Caretaker's Last Name": section_values.caretakerLastName,
        "Caretaker Information": section_values.caretakerInformation,
      },
      Other: {
        "Siblings": section_values.siblings,
        "Family Conflict": section_values.familyConflict,
        "Family Relocation": section_values.familyRelocation,
        "Other Information About Family": section_values.otherInformationAboutFamily,
      },
      background: {
        "otherInformation": section_values.otherInformation
      }
    };
  
    };
    if (section_name === "community") {
      section_values = {
        Info: `
        NeighborhoodsLivedIn: ${JSON.stringify(section_values.NeighborhoodsLivedIn, null, 2)}
        otherNotes: ${JSON.stringify(section_values.otherNotes, null, 2)}
      
      `,
        selectedDisadvantages: JSON.stringify(
          section_values.selectedDisadvantages,
          null,
          2
        ),
      };
    }
    if (section_name === "syndemics") {
      section_values = {
        negativelyImpactedBy: JSON.stringify(
          section_values.negativelyImpactedBy,
          null,
          2
        ),
        otherNotes: JSON.stringify(section_values.otherNotes, null, 2),
      };
    }
    if (section_name === "schooling") {
      section_values = {
        info: {
          "School Changes": JSON.stringify(section_values.schoolChanges, null, 2),
          "School Experiences": JSON.stringify(section_values.schoolExperiences, null, 2),
          "School Quality": JSON.stringify(section_values.schoolQuality, null, 2),
          "Academic Performance": JSON.stringify(section_values.academicPerformance, null, 2),
          "No Disciplinary Action": JSON.stringify(section_values.noDisciplinaryAction, null, 2),
        },
      };
    }
    
    if (section_name === "mobility") {
      section_values = {
        info: {
          "Schools Attended": JSON.stringify(section_values.schoolsAttended, null, 2),
          "Zip Codes Lived In": JSON.stringify(section_values.zipCodesLivedIn, null, 2),
          "Feelings About Moving to Different Schools": JSON.stringify(section_values.anyFeelingsAboutMoveToDifferentSchoolsIfAny, null, 2),
          "Feelings About Moving to Different Areas": JSON.stringify(section_values.anyFeelingsAboutMoveToDifferentAreasIfAny, null, 2),
          "Other Notes": JSON.stringify(section_values.otherNotes, null, 2),
        },
      };
    }
    
   
  

  if (section_name === "caseInformation" && section_values.background) {
    section_values = {
      background: JSON.stringify(section_values.background, null, 2),
    };
  }

 

  

  // Merge relevant fields for adverse childhood experiences
  if (section_name === "adverseChildhoodExpriences") {
    section_values = {
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
      separation: JSON.stringify(section_values.separation, null, 2),
      familyMembersInPrision: JSON.stringify(
        section_values.familyMembersInPrision,
        null,
        2
      ),
      lossesAndDeaths: JSON.stringify(section_values.lossesAndDeaths, null, 2),
      otherTraumaticExperience: JSON.stringify(section_values.lossesAndDeaths, null, 2),

    };
  }
  if (section_name === "cageAID") {
    section_values = {
      SubstanceUse: {
        "Drug Use": JSON.stringify(section_values.drugUse, null, 2),
        "Drug Use Frequency and Severity": JSON.stringify(section_values.drugUseFrequencyAndSeverity, null, 2),
        "Diagnosed Substance Use Disorder (SUD)": JSON.stringify(section_values.diagnosedSUD, null, 2),
        "Treated or Tested for SUD": JSON.stringify(section_values.treatedOrTestedSUD, null, 2),
      },
      CAGE: {
        "Felt the Need to Cut Down on Drinking or Drug Use": JSON.stringify(section_values.feltTheNeedToCutDownOnDrinkingOrDrugUse, null, 2),
        "People Criticized You for Drinking or Drug Use": JSON.stringify(section_values.peopleCritizedYouForDrinkingOrDrugUse, null, 2),
        "Felt Bad or Guilty About Your Drinking or Drug Use": JSON.stringify(section_values.feltBadOrGuiltyAboutYourDrinkingOrDrugUse, null, 2),
        "Had a Drink or Used Drugs First Thing in the Morning": JSON.stringify(section_values.hadADrinkOrUsedDrugsFirstThingInTheMorning, null, 2),
      },
      OtherInformation: {
        "Other Information": JSON.stringify(section_values.otherInformation, null, 2),
      },
      CAGEScore: JSON.stringify(section_values.score, null, 2),
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
      otherRiskFactorsExperienced: JSON.stringify(
        section_values.otherRiskFactorsExperienced,
        null,
        2
      ),
    };
  }
  if (section_name === "justiceInvolvement") {
    section_values = {
      JusticeInvolvement: {
        "Age First Involved": JSON.stringify(section_values.ageFirstInvolved, null, 2),
        "Nature of First Involvement": JSON.stringify(section_values.natureOfFirstInvolvement, null, 2),
        "Frequency of Negative Encounters": JSON.stringify(section_values.frequencyOfNegativeEncounters, null, 2),
        "Times Re-Arrested": JSON.stringify(section_values.timesReArrested, null, 2),
        "Placed in Institution": JSON.stringify(section_values.placedInInstitution, null, 2),
        "Institutionalization Impact Level": JSON.stringify(section_values.InstitutionalizationImpactLevel, null, 2),
        "Accumulation and Complexity": JSON.stringify(section_values.accumulationAndComplexity, null, 2),
      },
    };
  }
  
  if (section_name === "otherRiskFactors") {
    section_values = {
      CultureAndMedia: {
        "Culture and Media": JSON.stringify(section_values.cultureAndMedia, null, 2),
      },
      RacismOrHateVictimization: {
        "Racism or Hate Victimization": JSON.stringify(section_values.RacismOrHateVictimization, null, 2),
      },
      OtherInformation: {
        "Other Information": JSON.stringify(section_values.otherInformation, null, 2),
      },
      Top3MostHurtfulExperiences: {
        "Top 3 Most Hurtful Experiences": JSON.stringify(section_values.top3MostHurtfulExperiences, null, 2),
      },
    };
  }
  
 
  if (section_name === "mentalHealth") {
    section_values = {
      participatedMentalHealthOrDrugProgram: JSON.stringify(
        section_values.participatedMentalHealthOrDrugProgram,
        null,
        2
      ),
      receivedMentalHealthTreatment: JSON.stringify(
        section_values.receivedMentalHealthTreatment,
        null,
        2
      ),
      addressedMentalHealthIssues: JSON.stringify(
        section_values.addressedMentalHealthIssues,
        null,
        2
      ),

      treatmentOrCounseling: JSON.stringify(
        section_values.treatmentOrCounseling,
        null,
        2
      ),
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

  if (jsonData.caseInformation?.date) {
    all_sections["date"] = escapeDoubleQuotes(jsonData.caseInformation.date);
  }
  if (jsonData.caseInformation?.DOB) {
    all_sections["dob"] = escapeDoubleQuotes(jsonData.caseInformation.DOB);
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
  if (jsonData.caseInformation?.investigatorName) {
    all_sections["investigatorName"] =
      jsonData.caseInformation.investigatorName;
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
