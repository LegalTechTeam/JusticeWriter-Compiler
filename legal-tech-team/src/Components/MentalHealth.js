import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Paper,
  InputLabel,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import "react-dropdown/style.css";

import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import RadioYesNo from "../HelperFunctions/RadioYesNo";
import { SaveJSON, ReturnExistingInput } from "../HelperFunctions/formatJSON";
import BigText from "../HelperFunctions/BigText";
import CheckboxWithAdd from "../HelperFunctions/CheckBoxWithAdd";
function MentalHealth() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  useEffect(() => {
    const existingData = ReturnExistingInput("mentalHealth");
    if (existingData) {
      setFormData(existingData);
    }
    const existingDataEvidence = ReturnExistingInput("evidenceOfCharacter");
    if (existingDataEvidence) {
      setFormDataEvidence(existingDataEvidence);
    }
  }, []);
  const mentalHealthList = [
    {
      label: "Therapy",
      id: "Therapy",
      subs: [],
    },
    {
      label: "Mental health coaching",
      id: "Mental health coaching",
      subs: [],
    },
    {
      label: "Counseling to address mental health",
      id: "Counseling to address mental health",
      subs: [],
    },
    {
      label: "Services for trauma",
      id: "Services for trauma",
      subs: [],
    },
    {
      label: "Grief counseling",
      id: "Grief counseling",
      subs: [],
    },
    {
      label: "None of the Above",
      id: "none",
      subs: [],
    },
  ];

  const handlePerformanceChange = (disadvantagesId, isChecked) => {
    setFormData((prevFormData) => {
      const addressedMentalHealthIssues =
        prevFormData.addressedMentalHealthIssues || {
          addressedMentalHealthIssues: [],
        };

      return {
        ...prevFormData,
        addressedMentalHealthIssues: {
          ...addressedMentalHealthIssues,
          addressedMentalHealthIssues: isChecked
            ? [
                ...addressedMentalHealthIssues.addressedMentalHealthIssues,
                disadvantagesId,
              ]
            : addressedMentalHealthIssues.addressedMentalHealthIssues.filter(
                (id) => id !== disadvantagesId
              ),
        },
      };
    });
  };
  const [formData, setFormData] = useState({
    receivedMentalHealthTreatment: {
      receivedMentalHealthTreatment: "",
      notes: [],
    },
    participatedMentalHealthOrDrugProgram: {
      participatedMentalHealthOrDrugProgram: "",
      notes: [],
    },
    treatmentOrCounseling: {
      treatmentOrCounseling: "",
      notes: [],
    },
    addressedMentalHealthIssues: {
      addressedMentalHealthIssues: "",
      notes: [],
    },
  });

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
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: { ...formData[id], [id]: value } });
  };

  const handleChangeEvidence = (e) => {
    const { id, value } = e.target;
    setFormDataEvidence({
      ...formDataEvidence,
      [id]: { ...formDataEvidence[id], [id]: value },
    });
  };

  const handleRadioChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: { ...formData[id], [id]: value } });
  };

  const handleRadioChangeEvidence = (e) => {
    const { id, value } = e.target;
    setFormDataEvidence({
      ...formDataEvidence,
      [id]: { ...formDataEvidence[id], [id]: value },
    });
  };

  const handleQuotesChange = (subSection, newQuotes) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [subSection]: {
        ...prevFormData[subSection],
        notes: newQuotes ? [...newQuotes] : [],
      },
    }));
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
          Mental Health Treatment
        </Typography>

        {/* First Yes or No Question */}
        <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid container spacing={3}>
              <RadioYesNo
                id={"participatedMentalHealthOrDrugProgram"}
                section={"mentalHealth"}
                question={
                  "Have you ever received behavioral or mental health treatment?"
                }
                value={
                  formData.participatedMentalHealthOrDrugProgram
                    ?.participatedMentalHealthOrDrugProgram
                }
                onChange={handleRadioChange}
                checkedValue={
                  formData.participatedMentalHealthOrDrugProgram
                    ?.participatedMentalHealthOrDrugProgram
                }
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange(
                    "participatedMentalHealthOrDrugProgram",
                    newQuotes
                  )
                }
              />
              <RadioYesNo
                id={"receivedMentalHealthTreatment"}
                section={"mentalHealth"}
                question={
                  "Have you ever participated in a mental health or drug program?"
                }
                value={
                  formData.receivedMentalHealthTreatment
                    ?.receivedMentalHealthTreatment
                }
                onChange={handleRadioChange}
                checkedValue={
                  formData.receivedMentalHealthTreatment
                    ?.receivedMentalHealthTreatment
                }
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("receivedMentalHealthTreatment", newQuotes)
                }
              />

              <Grid item xs={12} sm={8}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Have you ever completed therapy, coaching, or counseling to{" "}
                  <br></br>
                  address mental health, trauma, or grief?{" "}
                </InputLabel>
              </Grid>
              <FormGroup
              //onChange={handleChange}
              >
                {mentalHealthList.map((disadvantage, index) => (
                  <React.Fragment key={index}>
                    <CheckboxWithAdd
                      label={disadvantage.label}
                      id={disadvantage.id}
                      checked={formData.addressedMentalHealthIssues?.addressedMentalHealthIssues.includes(
                        disadvantage.id
                      )}
                      onChange={handlePerformanceChange}
                      subs={disadvantage.subs}
                      handleQuotesChange={(newQuotes) =>
                        handleQuotesChange(disadvantage.id, newQuotes)
                      }
                      section={"mentalHealth"}
                    />
                  </React.Fragment>
                ))}
              </FormGroup>
            </Grid>
          </Box>

          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <BigText
              question={"Treatments/Counseling (if any)"}
              id={"treatment Or Counseling"}
              label={"treatmentOrCounseling"}
              onChange={handleChange}
              value={
                formData.treatmentOrCounseling &&
                formData.treatmentOrCounseling.treatmentOrCounseling
              }
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange("treatmentOrCounseling", newQuotes)
              }
              section={"mentalHealth"}
            />
          </Box>

          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Evidence of Character and Potential To Change
          </Typography>

          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
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
          </Box>

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
                onChange={handleRadioChangeEvidence}
                checkedValue={formDataEvidence.areParent?.areParent}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChangeEvidence("areParent", newQuotes)
                }
              />
            </Grid>
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={() => {
            SaveJSON(formData, "mentalHealth");
            SaveJSON(formDataEvidence, "evidenceOfCharacter");
            navigate("/peers-role-models");
          }}
        >
          Previous
        </Button>

        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

        <Button
          variant="contained"
          onClick={() => {
            SaveJSON(formData, "mentalHealth");
            SaveJSON(formDataEvidence, "evidenceOfCharacter");
            navigate("/evidence");
          }}
        >
          Next
        </Button>
      </Paper>
    </div>
  );
}
export default MentalHealth;
