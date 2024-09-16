import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Grid, Paper, ThemeProvider, Divider } from "@mui/material";
import BigText from "../HelperFunctions/BigText";
import OtherNotes from "../HelperFunctions/OtherNotes";
import SectionHeader from "../HelperFunctions/SectionHeader";
import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";
import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import themeWrapper from "../Layouts/ThemeWrapper";

function OtherRiskFactors() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  useEffect(() => {
    const existingData = ReturnExistingInput("otherRiskFactors");
    if (existingData) {
      setFormData(existingData);
    }
  }, []);


  const [formData, setFormData] = useState({
    cultureAndMedia: {
      cultureAndMedia: "",
      notes: [],
    },
    RacismOrHateVictimization: {
      RacismOrHateVictimization: "",
      notes: [],
    },
  
    otherInformation: {
      otherInformation: "",
      notes: [],
    },
    top3MostHurtfulExperiences: {
        top3MostHurtfulExperiences: "",
        notes: []
    }
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
    }));
  }, []);
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
    console.log(formData);
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
          <SectionHeader
            number="Section 9"
            name="Other Risk Factors"
          />
          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
            {/*input one*/}
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
                marginTop: "30px",
              }}
            >
              <BigText
                question={"Do you believe that exposure to certain types of media, such as drill music, has influenced your experiences or actions?"}
                id={"cultureAndMedia"}
                label={"cultureAndMedia"}
                onChange={handleChange}
                value={formData.cultureAndMedia?.cultureAndMedia}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("cultureAndMedia", newQuotes)
                }
                section={"otherRiskFactors"}
              />
              <BigText
                question={
                 "Have you ever experienced racism or discrimination that you believe impacted your life or decisions?"
                }
                id={"RacismOrHateVictimization"}
                label={"RacismOrHateVictimization"}
                onChange={handleChange}
                value={
                  formData.RacismOrHateVictimization
                    ?.RacismOrHateVictimization
                }
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("RacismOrHateVictimization", newQuotes)
                }
                section={"otherRiskFactors"}
              />
                <BigText
                question={
                 "              What are the top 3 most hurtful experiences of your life? Why do you think your life did not end up in a more positive and healthy path?"
                }
                id={"top3MostHurtfulExperiences"}
                label={"top3MostHurtfulExperiences"}
                onChange={handleChange}
                value={
                  formData.top3MostHurtfulExperiences
                    ?.top3MostHurtfulExperiences
                }
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("top3MostHurtfulExperiences", newQuotes)
                }
                section={"otherRiskFactors"}
              />
            
              <OtherNotes
                onChange={handleChange}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("otherInformation", newQuotes)
                }
                value={formData.otherNotes?.otherNotes}
                section={"otherRiskFactors"}
                id={"otherInformation"}
              />
            </Box>

            <Button
              variant="contained"
              onClick={() => {
                SaveJSON(formData, "otherRiskFactors");
                navigate("/justiceInvolvement");
              }}
            >
              Previous
            </Button>
            <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

            <Button
              variant="contained"
              onClick={() => {
                SaveJSON(formData, "otherRiskFactors");
                navigate("/mental-health");
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

export default OtherRiskFactors;
