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
            <Grid container>
              <Grid item xs={7}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontWeight: 700,
                    marginBottom: 1,
                  }}
                >
                  Have you ever received behavioral or mental health treatment?
                </InputLabel>
              </Grid>
              <Grid item xs={5}>
              <RadioGroup
                  row
                  aria-label="participatedMentalHealthOrDrugProgram"
                  name="participatedMentalHealthOrDrugProgram"
                  value={formData.participatedMentalHealthOrDrugProgram}
                  onChange={handleChange}
                >
                  <FormControlLabel value="yes" control={<Radio id={"participatedMentalHealthOrDrugProgram"} />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio id={"participatedMentalHealthOrDrugProgram"} />} label="No" />
                </RadioGroup>
              </Grid>
            </Grid>
          </Box>

          {/*Second Yes or no question */}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid container>
              <Grid item xs={7}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontWeight: 700,
                    textWrap: "balance",
                    marginBottom: 1, // Adjust spacing as needed
                  }}
                >
                  Have you ever participated in a mental health or drug program?
                </InputLabel>
              </Grid>

              <Grid item xs={5}>
              <RadioGroup
                  row
                  aria-label="receivedMentalHealthTreatment"
                  name="receivedMentalHealthTreatment"
                  value={formData.receivedMentalHealthTreatment}
                  onChange={handleChange}
                >
                  <FormControlLabel value="yes" control={<Radio id={"receivedMentalHealthTreatment"} />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio id={"receivedMentalHealthTreatment"} />} label="No" />
                </RadioGroup>
              </Grid>
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
            <Grid container>
              <Grid item xs={7}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontWeight: 700,
                    textWrap: "balance",
                    marginBottom: 1, // Adjust spacing as needed
                  }}
                >
                  Are you a parent?
                </InputLabel>
              </Grid>
              <Grid item xs={5}>
              <RadioGroup
                  row
                  aria-label="areParent"
                  name="areParent"
                  value={formDataEvidence.areParent}
                  onChange={handleChangeEvidence}
                >
                  <FormControlLabel value="yes" control={<Radio id={"areParent"} />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio id={"areParent"} />} label="No" />
                </RadioGroup>
              </Grid>
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
