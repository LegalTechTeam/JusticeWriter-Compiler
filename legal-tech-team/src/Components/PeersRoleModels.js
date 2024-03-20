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
  Divider,
  FormGroup,
  Checkbox,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import dayjs from "dayjs";

import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import DropDown from "../HelperFunctions/DropDown";
import { SaveJSON, ReturnExistingInput } from "../HelperFunctions/formatJSON";
function PeersRoleModels() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  useEffect(() => {
    const existingData = ReturnExistingInput("peersAndRoleModels");
    if (existingData) {
      setFormData(existingData);
    }
  }, []); 

  const [formData, setFormData] = useState({
    associationWithPeers: "",
    involvementInGangs: "",
    enjoyAdmireStreetGuys: "",
    enjoyAdmireGangstaLifestyle: "",
    numberNeighborhoodCollege: "",
    numberNeighborhoodPrsion: "",
    numberRelativesArrested: "",
    neighborhoodArrests: "",
    neighborhoodDegrees: "",
    mentalHealthIssues: "",
    affectedByMentalHealth: "",
    otherRiskFactors: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleDropdownChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const options = ["None", "1", "< 5", "More than 5"];

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
        <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Peers and Role Models
          </Typography>

          {/*Check boxes*/}
          <Box
            sx={{ marginLeft: "10%", marginRight: "5%", paddingBottom: "30px" }}
          >
            <Grid container>
              <Grid item xs={6}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontWeight: 700,
                    marginBottom: 1, // Adjust spacing as needed
                  }}
                >
                  Other traumatic experiences
                </InputLabel>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.associationWithPeers} 
                        id="associationWithPeers" 
                        onChange={handleChange}
                      />
                    }
                    label="Association with delinquent peers"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.involvementInGangs} 
                        id="involvementInGangs" 
                        onChange={handleChange}
                      />
                    }
                    label="Involvement in gangs"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.enjoyAdmireStreetGuys} 
                        id="enjoyAdmireStreetGuys" 
                        onChange={handleChange}
                      />
                    }
                    label="Enjoy or admire street guys in my neighborhood "
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.enjoyAdmireGangstaLifestyle} 
                        id="enjoyAdmireGangstaLifestyle" 
                        onChange={handleChange}
                      />
                    }
                    label="Enjoy or admire the gangsta lifestyle"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Box>

          {/*Dropdown*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid container>
              {/* <Grid item xs={6}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontWeight: 700,
                    marginBottom: 1,
                  }}
                >
                  How many peers in your neighborhood went to college?
                </InputLabel>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontWeight: 700,
                    marginBottom: 1,
                  }}
                >
                  How many of them went to prison?
                </InputLabel>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontWeight: 700,
                    marginBottom: 1,
                  }}
                >
                  How many relatives have been arrested?
                </InputLabel>
              </Grid> */}
              <Grid container spacing={3}>
                <DropDown
                  options={options}
                  id={"numberNeighborhoodCollege"}
                  question={"How many peers in your neighborhood went to college?"}
                  placeholder="Select an option"
                  value={formData.numberNeighborhoodCollege}
                  onChange={handleDropdownChange}
                />
                <DropDown
                  options={options}
                  id={"numberNeighborhoodPrsion"}
                  question={"How many of them went to prison?"}
                  placeholder="Select an option"
                  value={formData.numberNeighborhoodPrsion}
                  onChange={handleDropdownChange}
                />
                <DropDown
                  options={options}
                  id={"numberRelativesArrested"}
                  question={"How many relatives have been arrested?"}
                  placeholder="Select an option"
                  value={formData.numberRelativesArrested}
                  onChange={handleDropdownChange}
                />
              </Grid>
            </Grid>
          </Box>

          {/*input one*/}
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
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                In your neighborhood, do most youths and adults get arrested?
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="neighborhoodArrests"
                label="Neighborhood arrests"
                fullWidth
                variant="outlined"
                value={formData.neighborhoodArrests}
                onChange={handleChange}
              />
            </Grid>
          </Box>

          {/*input two*/}
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
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                In your neighborhood, do most youths and adults have degrees?
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="neighborhoodDegrees"
                label="Neighborhood degrees"
                fullWidth
                variant="outlined"
                value={formData.neighborhoodDegrees}
                onChange={handleChange}
              />
            </Grid>
          </Box>

          <Divider orientation="horizontal" flexItem />

          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Any Other Risk Factors
          </Typography>

          {/*Question 1 Radio buttons*/}
          <Box
            sx={{ marginLeft: "10%", marginRight: "5%", paddingBottom: "5px" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontWeight: 700,
                    marginBottom: 1, // Adjust spacing as needed
                  }}
                >
                  Ever experienced mental health issues?
                </InputLabel>
              </Grid>
              <Grid item xs={6}>
                <RadioGroup
                  row
                  aria-label="mentalHealthIssues"
                  name="mentalHealthIssues"
                  value={formData.mentalHealthIssues}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio id={"mentalHealthIssues"} />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio id={"mentalHealthIssues"} />} label="No" />
                </RadioGroup>
              </Grid>
            </Grid>
          </Box>

          {/*Questio 2 Radio buttons*/}
          <Box
            sx={{ marginLeft: "10%", marginRight: "5%", paddingBottom: "30px" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontWeight: 700,
                    marginBottom: 1, // Adjust spacing as needed
                  }}
                >
                  Ever been affected by mental health issues?
                </InputLabel>
              </Grid>
              <Grid item xs={6}>
                <RadioGroup
                  row
                  aria-label="affectedByMentalHealth"
                  name="affectedByMentalHealth"
                  value={formData.affectedByMentalHealth}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio id={"affectedByMentalHealth"} />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio id={"affectedByMentalHealth"} />} label="No" />
                </RadioGroup>
              </Grid>
            </Grid>
          </Box>

          {/*last input*/}
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
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Potential other risk factors experienced
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="otherRiskFactors"
                label="Other"
                fullWidth
                variant="outlined"
                value={formData.otherRiskFactors}
                onChange={handleChange}
              />
            </Grid>
          </Box>
        </Box>
        <Button variant="contained" onClick={() => navigate("/aceTwo")}>
          Previous
        </Button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
        <Button variant="contained" onClick={() => { SaveJSON(formData, "peersAndRoleModels"); navigate("/mental-health"); }}>
          Next
        </Button>
      </Paper>
    </div>
  );
}
export default PeersRoleModels;
