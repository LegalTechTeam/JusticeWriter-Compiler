import * as React from "react";
import { saveAs } from 'file-saver';
import * as docx from "docx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Paper,
  InputLabel,
  Button,
} from "@mui/material";
import "react-dropdown/style.css";

import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import { SaveJSON, ReturnExistingInput } from "../HelperFunctions/formatJSON";
import BigText from "../HelperFunctions/BigText";

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
        <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
          Evidence of Character and Potential To Change
        </Typography>

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
            navigate("/submit");
          }}
        >
          Save
        </Button>
      </Paper>
    </div>
  );
}
export default Evidence;
