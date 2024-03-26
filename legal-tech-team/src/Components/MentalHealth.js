import * as React from "react";
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
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import "react-dropdown/style.css";

import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import RadioYesNo from "../HelperFunctions/RadioYesNo";
import { SaveJSON, ReturnExistingInput } from "../HelperFunctions/formatJSON";
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

  const [formData, setFormData] = useState({
    receivedMentalHealthTreatment: "",
    participatedMentalHealthOrDrugProgram: "",
    treatmentOrCounseling: "",
  });

  const [formDataEvidence, setFormDataEvidence] = useState({
    exampleOfCharacter: "",
    exampleOfGoodDeed: "",
    volunteeringAndCommunityEngagement: "",
    areParent: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleChangeEvidence = (e) => {
    setFormDataEvidence({ ...formDataEvidence, [e.target.id]: e.target.value });
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
                  question={"Have you ever received behavioral or mental health treatment?"} 
                  value={formData.participatedMentalHealthOrDrugProgram}
                  onChange={handleChange}
                  checkedValue={formData.participatedMentalHealthOrDrugProgram}
                />
            <RadioYesNo 
              id={"receivedMentalHealthTreatment"}
              question={"Have you ever participated in a mental health or drug program?"} 
              value={formData.receivedMentalHealthTreatment}
              onChange={handleChange}
              checkedValue={formData.receivedMentalHealthTreatment}
            />
          </Grid>
          </Box>

          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid item xs={12} sm={10}>
              <InputLabel
                sx={{
                  label: "Size",
                  id: "outlined-size-small",
                  defaultValue: "Small",
                  size: "small",
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Treatments/Counseling (if any)
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="treatmentOrCounseling"
                label="Treatments/Counseling"
                fullWidth
                variant="outlined"
                value={formData.treatmentOrCounseling}
                onChange={handleChange}
              />
            </Grid>
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
            <Grid item xs={12} sm={10}>
              <InputLabel
                sx={{
                  label: "Size",
                  id: "outlined-size-small",
                  defaultValue: "Small",
                  size: "small",
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Provide an example of your character
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="exampleOfCharacter"
                label="Character Examples"
                fullWidth
                variant="outlined"
                value={formDataEvidence.exampleOfCharacter}
                onChange={handleChangeEvidence}
              />
            </Grid>
          </Box>

          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid item xs={12} sm={10}>
              <InputLabel
                sx={{
                  label: "Size",
                  id: "outlined-size-small",
                  defaultValue: "Small",
                  size: "small",
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Give examples of good deeds and contributions that you’ve made
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="exampleOfGoodDeed"
                label="Good Deeds"
                fullWidth
                variant="outlined"
                value={formDataEvidence.exampleOfGoodDeed}
                onChange={handleChangeEvidence}
              />
            </Grid>
          </Box>

          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid item xs={12} sm={10}>
              <InputLabel
                sx={{
                  label: "Size",
                  id: "outlined-size-small",
                  defaultValue: "Small",
                  size: "small",
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                List any volunteering, employment, mentoring, community
                engagement that you’ve done
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="volunteeringAndCommunityEngagement"
                label="Extracurriculars"
                fullWidth
                variant="outlined"
                value={formDataEvidence.volunteeringAndCommunityEngagement}
                onChange={handleChangeEvidence}
              />
            </Grid>
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
                    question={"Are you a parent?"} 
                    value={formDataEvidence.areParent}
                    onChange={handleChangeEvidence}
                    checkedValue={formDataEvidence.areParent}
                  />
            </Grid>
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={() => navigate("/peers-role-models")}
        >
          Previous
        </Button>

        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

        <Button variant="contained" onClick={() => { SaveJSON(formData, "mentalHealth"); SaveJSON(formDataEvidence, "evidenceOfCharacter"); navigate("/evidence"); }}>
          Next
        </Button>
      </Paper>
    </div>
  );
}
export default MentalHealth;
