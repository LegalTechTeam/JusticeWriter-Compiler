import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Paper,
  InputLabel,
  Divider,
  FormControl,
  Select,
  FormGroup,
  Checkbox,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import dayjs from "dayjs";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import Header from "../Layouts/Header";

function PeersRoleModels() {
  const navigate = useNavigate();

  const [mentalHealth, setMentalHealth] = useState("no");
  const [affectedMentalHealth, setAffectedMentalHealth] = useState("no");

  // State variables for checkbox responses
  const [associationWithPeers, setAssociationWithPeers] = useState(false);
  const [involvementInGangs, setInvolvementInGangs] = useState(false);
  const [enjoyAdmireStreetGuys, setEnjoyAdmireStreetGuys] = useState(false);
  const [enjoyAdmireGangstaLifestyle, setEnjoyAdmireGangstaLifestyle] =
    useState(false);

  // State variables for dropdown responses
  const [collegePeers, setCollegePeers] = useState(null);
  const [prisonPeers, setPrisonPeers] = useState(null);
  const [arrestedRelatives, setArrestedRelatives] = useState(null);

  const handleMentalHealthChange = (event) => {
    setMentalHealth(event.target.value);
  };

  const handleAffectedMentalHealthChange = (event) => {
    setAffectedMentalHealth(event.target.value);
  };

  const handleDropdownChange = (type, value) => {
    // Update state based on dropdown selection
    if (type === "collegePeers") setCollegePeers(value);
    else if (type === "prisonPeers") setPrisonPeers(value);
    else if (type === "arrestedRelatives") setArrestedRelatives(value);
  };

  // Functions to handle checkbox changes
  const handleAssociationWithPeersChange = () => {
    setAssociationWithPeers(!associationWithPeers);
  };

  const handleInvolvementInGangsChange = () => {
    setInvolvementInGangs(!involvementInGangs);
  };

  const handleEnjoyAdmireStreetGuysChange = () => {
    setEnjoyAdmireStreetGuys(!enjoyAdmireStreetGuys);
  };

  const handleEnjoyAdmireGangstaLifestyleChange = () => {
    setEnjoyAdmireGangstaLifestyle(!enjoyAdmireGangstaLifestyle);
  };

  const options = ["None", "1", "< 5", "More than 5"];

  return (
    <div>
      <Header />

      <Paper
        elevation={3}
        sx={{ marginRight: "10%", marginLeft: "15%", paddingBottom: "5%" }}
      >
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
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
                        checked={associationWithPeers}
                        onChange={handleAssociationWithPeersChange}
                      />
                    }
                    label="Association with delinquent peers"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={involvementInGangs}
                        onChange={handleInvolvementInGangsChange}
                      />
                    }
                    label="Involvement in gangs"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={enjoyAdmireStreetGuys}
                        onChange={handleEnjoyAdmireStreetGuysChange}
                      />
                    }
                    label="Enjoy or admire street guys in my neighborhood "
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={enjoyAdmireGangstaLifestyle}
                        onChange={handleEnjoyAdmireGangstaLifestyleChange}
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
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  {/* Use the handleDropdownChange function to update state */}
                  <Dropdown
                    options={options}
                    placeholder="Select an option"
                    onChange={(value) =>
                      handleDropdownChange("collegePeers", value)
                    }
                  />
                  <Dropdown
                    options={options}
                    placeholder="Select an option"
                    onChange={(value) =>
                      handleDropdownChange("prisonPeers", value)
                    }
                  />
                  <Dropdown
                    options={options}
                    placeholder="Select an option"
                    onChange={(value) =>
                      handleDropdownChange("arrestedRelatives", value)
                    }
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Box>

          {/*input one*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "15%",
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
                id="Neighborhood arrests"
                label="Neighborhood arrests"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

          {/*input two*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "15%",
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
                id="Neighborhood degrees"
                label="Neighborhood degrees"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

          <Divider orientation="horizontal" flexItem />

          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 3 }}>
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
                  aria-label="mentalHealth"
                  name="mentalHealth"
                  value={mentalHealth}
                  onChange={handleMentalHealthChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
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
                  aria-label="affectedMentalHealth"
                  name="affectedMentalHealth"
                  value={affectedMentalHealth}
                  onChange={handleAffectedMentalHealthChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>
            </Grid>
          </Box>

          {/*last input*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "15%",
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
                id="Other"
                label="Other"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>
        </Box>
        <Button variant="contained" onClick={() => navigate("/aceTwo")}>
          Previous
        </Button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
        <Button
          variant="contained"
          onClick={() => navigate("/mental-health")}
        >
          Next
        </Button>
      </Paper>
    </div>
  );
}
export default PeersRoleModels;
