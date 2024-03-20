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
} from "@mui/material";
import "react-dropdown/style.css";

import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import { SaveJSON, ReturnExistingInput } from "../HelperFunctions/formatJSON";

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
    exampleOfCharacter: "",
    exampleOfGoodDeed: "",
    volunteeringAndCommunityEngagement: "",
    areParent: "",

    remorseAndCompassion: "",
    rehabilitationPlan: "",
  });

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
                Can you provide evidence of remorse, compassion or regret?
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="remorseAndCompassion"
                label="Remorse?"
                fullWidth
                variant="outlined"
                value={formDataEvidence.remorseAndCompassion}
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
                  textWrap: "wrap",
                }}
              >
                What is your plan for rehabilitation while in the system and/or
                upon reentry? Include plans for work, living situations, and how
                you plan to escape negative influences.
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="rehabilitationPlan"
                label="Plans"
                fullWidth
                variant="outlined"
                value={formDataEvidence.rehabilitationPlan}
                onChange={handleChangeEvidence}
              />
            </Grid>
          </Box>
        </Box>

        <Button variant="contained" onClick={() => navigate("/mental-health")}>
          Previous
        </Button>

        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

        <Button variant="contained" onClick={() => { SaveJSON(formDataEvidence, "evidenceOfCharacter"); navigate("/submit"); }}>
          Save
        </Button>
      </Paper>
    </div>
  );
}
export default Evidence;
