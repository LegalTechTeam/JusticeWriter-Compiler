import { Box, Button, Paper, Grid, ThemeProvider } from "@mui/material";
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
import RadioYesNo from "../HelperFunctions/RadioYesNo";
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
          <SectionHeader
            number="Section 11"
            name="Evidence of Character and Potential To Change"
          />

          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
                marginTop: "30px",
              }}
            >
              <BigText
                question={"Provide an example of your character"}
                id={"exampleOfCharacter"}
                label={"example Of Character"}
                onChange={handleChangeEvidence}
                value={
                  formDataEvidence.exampleOfCharacter &&
                  formDataEvidence.exampleOfCharacter.exampleOfCharacter
                }
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChangeEvidence("exampleOfCharacter", newQuotes)
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
                  "Give examples of good deeds and contributions that you’ve made"
                }
                id={"exampleOfGoodDeed"}
                label={"example Of Good Deed"}
                onChange={handleChangeEvidence}
                value={
                  formDataEvidence.exampleOfGoodDeed &&
                  formDataEvidence.exampleOfGoodDeed.exampleOfGoodDeed
                }
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChangeEvidence("exampleOfGoodDeed", newQuotes)
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
                  "List any volunteering, employment, mentoring, community engagement that you’ve done"
                }
                id={"volunteeringAndCommunityEngagement"}
                label={"volunteering And Community Engagement"}
                onChange={handleChangeEvidence}
                value={
                  formDataEvidence.volunteeringAndCommunityEngagement &&
                  formDataEvidence.volunteeringAndCommunityEngagement
                    .volunteeringAndCommunityEngagement
                }
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChangeEvidence(
                    "volunteeringAndCommunityEngagement",
                    newQuotes
                  )
                }
                section={"evidenceOfCharacter"}
              />

              <Box
                sx={{
                  marginLeft: "10%",
                  marginRight: "10%",
                  paddingBottom: "30px",
                }}
              >
                <Grid container spacing={3}>
                  <RadioYesNo
                    id={"areParent"}
                    section={"evidenceOfCharacter"}
                    question={"Are you a parent?"}
                    value={formDataEvidence.areParent?.areParent}
                    onChange={handleChangeEvidence}
                    checkedValue={formDataEvidence.areParent?.areParent}
                    handleQuotesChange={(newQuotes) =>
                      handleQuotesChangeEvidence("areParent", newQuotes)
                    }
                  />
                </Grid>
              </Box>

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
