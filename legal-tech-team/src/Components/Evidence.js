import {
  Box,
  Button,
  Paper,
  ThemeProvider
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import "react-dropdown/style.css";
import { useNavigate } from "react-router-dom";
import themeWrapper from "../Layouts/ThemeWrapper";

import BigText from "../HelperFunctions/BigText";
import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";
import SectionHeader from "../HelperFunctions/SectionHeader";
import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";

function Evidence() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  useEffect(() => {
    const existingDataEvidence = ReturnExistingInput("evidenceOfCharacter");
    if (existingDataEvidence) {
      setFormDataEvidence(existingDataEvidence);
    }
  }, []);

  const [formDataEvidence, setFormDataEvidence] = useState({
    exampleOfCharacter: {
      exampleOfCharacter: "",
      notes: [],
    },
    exampleOfGoodDeed: {
      exampleOfGoodDeed: "",
      notes: [],
    },
    volunteeringAndCommunityEngagement: {
      volunteeringAndCommunityEngagement: "",
      notes: [],
    },
    areParent: {
      areParent: "",
      notes: [],
    },
    remorseAndCompassion: {
      remorseAndCompassion: "",
      notes: [],
    },
    examplesOfChange: {
      examplesOfChange: "",
      notes: [],
    },
    rehabilitationPlan: {
      rehabilitationPlan: "",
      notes: [],
    },
  });
  const handleChangeEvidence = (e) => {
    const { id, value } = e.target;
    setFormDataEvidence({
      ...formDataEvidence,
      [id]: { ...formDataEvidence[id], [id]: value },
    });
  };
  const handleQuotesChangeEvidence = (subSection, newQuotes) => {
    setFormDataEvidence((prevFormData) => ({
      ...prevFormData,
      [subSection]: {
        ...prevFormData[subSection],
        notes: newQuotes ? [...newQuotes] : [],
      },
    }));
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
          <SectionHeader name="Evidence of Character"/>
          
          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
              <BigText
                question={
                  "Can you provide evidence of remorse, compassion or regret?"
                }
                id={"remorseAndCompassion"}
                label={"remorse And Compassion"}
                onChange={handleChangeEvidence}
                value={
                  formDataEvidence.remorseAndCompassion &&
                  formDataEvidence.remorseAndCompassion.remorseAndCompassion
                }
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChangeEvidence("remorseAndCompassion", newQuotes)
                }
                section={"evidenceOfCharacter"}
              />
            </Box>

            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
              <BigText
                question={
                  "can you give examples of trustworthiness, commitment, and your contribution to society?"
                }
                id={"examplesOfChange"}
                label={"examplesOfChange"}
                onChange={handleChangeEvidence}
                value={formDataEvidence.examplesOfChange?.examplesOfChange}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChangeEvidence("examplesOfChange", newQuotes)
                }
                section={"evidenceOfCharacter"}
              />
            </Box>

            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
              <BigText
                question={
                  "What is your plan for rehabilitation while in the system and/or upon re-entry?  Include plans for work,\n living situations, and how you plan to escape negative influences."
                }
                id={"rehabilitationPlan"}
                label={"rehabilitation Plan"}
                onChange={handleChangeEvidence}
                value={
                  formDataEvidence.rehabilitationPlan &&
                  formDataEvidence.rehabilitationPlan.rehabilitationPlan
                }
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChangeEvidence("rehabilitationPlan", newQuotes)
                }
                section={"evidenceOfCharacter"}
              />
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formDataEvidence, "evidenceOfCharacter");
              navigate("/mental-health");
            }}
          >
            Previous
          </Button>

          <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formDataEvidence, "evidenceOfCharacter");
              navigate("/");
            }}
          >
            Save
          </Button>
        </Paper>
      </div>
    </ThemeProvider>
  );
}
export default Evidence;
