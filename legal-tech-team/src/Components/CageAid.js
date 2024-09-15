import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Grid, Paper, ThemeProvider } from "@mui/material";
import OtherNotes from "../HelperFunctions/OtherNotes";
import RadioYesNo from "../HelperFunctions/RadioYesNo";
import SectionHeader from "../HelperFunctions/SectionHeader";
import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";
import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import themeWrapper from "../Layouts/ThemeWrapper";
function CageAid() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  useEffect(() => {
    const existingData = ReturnExistingInput("cageAID");
    if (existingData) {
      setFormData(existingData);
    }
  }, []);

  const [cageScore, setCageScore] = useState(0);
  

  const [formData, setFormData] = useState({
    feltTheNeedToCutDownOnDrinkingOrDrugUse: {
      feltTheNeedToCutDownOnDrinkingOrDrugUse: "",
      notes: [],
    },
    peopleCritizedYouForDrinkingOrDrugUse: {
      peopleCritizedYouForDrinkingOrDrugUse: "",
      notes: [],
    },
    feltBadOrGuiltyAboutYourDrinkingOrDrugUse: {
      feltBadOrGuiltyAboutYourDrinkingOrDrugUse: "",
      notes: [],
    },
    hadADrinkOrUsedDrugsFirstThingInTheMorning: {
      hadADrinkOrUsedDrugsFirstThingInTheMorning: "",
      notes: [],
    },

    otherInformation: {
      otherInformation: "",
      notes: [],
    },
    score: cageScore,
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      score: cageScore,
    }));
  }, [cageScore]);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: { ...formData[id], [id]: value } });
  };

  const handleRadioChange = (e, questionNumber) => {
    const { id, value } = e.target;
    
    // Get the current value of the selected question
    const currentValue = formData[id]?.[id];
  
    // Only increment the score if the previous value was not "yes" and the new value is "yes"
    if (value === "yes" && currentValue !== "yes") {
      setCageScore(cageScore + 1);
    }
  
    // Only decrement the score if the previous value was "yes" and the new value is "no"
    if (value === "no" && currentValue === "yes") {
      setCageScore(cageScore - 1);
    }
  
    // Update the form data with the new value
    setFormData({ ...formData, [id]: { ...formData[id], [id]: value } });
    console.log(formData)
  };

  const handleQuotesChange = (subSection, newQuotes) => {
    setFormData({
      ...formData,
      [subSection]: { ...formData[subSection], ["notes"]: newQuotes },
    });
  };

  return (
    <ThemeProvider theme={themeWrapper}>
      <div>
        <Header />

        <Paper
          elevation={3}
          sx={{
            marginRight: "15%",
            marginLeft: "15%",
            paddingBottom: "5%",
            fontFamily: "Noto Sans",
          }}
        >
          <SectionHeader name="CAGE-AID" />
          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>

            {/*input one*/}
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
                <Box sx={{ marginTop: 3, textAlign: "center" }}>
              <h3> Score: {cageScore}</h3>
            </Box>
          <Grid container spacing={3}>
            {/*Question 1 */}

            <RadioYesNo
              id={"feltTheNeedToCutDownOnDrinkingOrDrugUse"}
              section={"cageAID"}
              question={
                " C: Have you ever felt you ought to Cut down on your drinking or drug use?"
              }
              value={
                formData.feltTheNeedToCutDownOnDrinkingOrDrugUse
                  ?.feltTheNeedToCutDownOnDrinkingOrDrugUse || ""
              }
              onChange={(e) => handleRadioChange(e, 4)}
              checkedValue={
                formData.feltTheNeedToCutDownOnDrinkingOrDrugUse
                  ?.feltTheNeedToCutDownOnDrinkingOrDrugUse 
              }
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange(
                  "feltTheNeedToCutDownOnDrinkingOrDrugUse",
                  newQuotes
                )
              }
            />

            {/*Question 2 */}

            <RadioYesNo
              id={"peopleCritizedYouForDrinkingOrDrugUse"}
              section={"cageAID"}
              question={
                " A: Have people Annoyed you by criticizing your drinking or drug use?"
              }
              value={
                formData.peopleCritizedYouForDrinkingOrDrugUse
                  ?.peopleCritizedYouForDrinkingOrDrugUse || ""
              }
              onChange={(e) => handleRadioChange(e, 2)}
              checkedValue={
                formData.peopleCritizedYouForDrinkingOrDrugUse
                  ?.peopleCritizedYouForDrinkingOrDrugUse
              }
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange(
                  "peopleCritizedYouForDrinkingOrDrugUse",
                  newQuotes
                )
              }
            />

            {/*Question 3 */}

            <RadioYesNo
              id={"feltBadOrGuiltyAboutYourDrinkingOrDrugUse"}
              section={"cageAID"}
              question={
                " G: Have you ever felt bad or Guilty about your drinking or drug use?"
              }
              value={
                formData.feltBadOrGuiltyAboutYourDrinkingOrDrugUse
                  ?.feltBadOrGuiltyAboutYourDrinkingOrDrugUse || ""
              }
              onChange={(e) => handleRadioChange(e, 3)}
              checkedValue={
                formData.feltBadOrGuiltyAboutYourDrinkingOrDrugUse
                  ?.feltBadOrGuiltyAboutYourDrinkingOrDrugUse
              }
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange(
                  "feltBadOrGuiltyAboutYourDrinkingOrDrugUse",
                  newQuotes
                )
              }
            />
            {/*Question 3 */}

            <RadioYesNo
              id={"hadADrinkOrUsedDrugsFirstThingInTheMorning"}
              section={"cageAID"}
              question={
                "E: Have you ever had a drink or used drugs first thing in the morning (as an Eye-opener) to steady your nerves or to get rid of a hangover?"
              }
              value={
                formData.hadADrinkOrUsedDrugsFirstThingInTheMorning
                  ?.hadADrinkOrUsedDrugsFirstThingInTheMorning || ""
              }
              onChange={(e) => handleRadioChange(e, 4)}
              checkedValue={
                formData.hadADrinkOrUsedDrugsFirstThingInTheMorning
                  ?.hadADrinkOrUsedDrugsFirstThingInTheMorning
              }
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange(
                  "hadADrinkOrUsedDrugsFirstThingInTheMorning",
                  newQuotes
                )
              }
            />
          </Grid>
          <OtherNotes
            onChange={handleChange}
            handleQuotesChange={(newQuotes) =>
              handleQuotesChange("otherNotes", newQuotes)
            }
            value={formData.otherNotes?.otherNotes}
            section={"community"}
            id={"otherNotes"}
          />
        </Box>

        <Button
          variant="contained"
          onClick={() => {
            SaveJSON(formData, "cageAID");
            navigate("/aceTwo");
          }}
        >
          Previous
        </Button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

        <Button
          variant="contained"
          onClick={() => {
            SaveJSON(formData, "cageAID");
            navigate("/peers-role-models");
          }}
        >
          Next
        </Button>
        </Box>
        </Paper>

      </div>
    </ThemeProvider>
  );
}

export default CageAid;
