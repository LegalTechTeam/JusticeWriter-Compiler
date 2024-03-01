import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Select,
  TextField,
  Box,
  Paper,
  InputLabel,
  Divider,
  Button,
  MenuItem,
  FormControl,
} from "@mui/material";

import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
function Demographics() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  // gender selection state
  const [gender, setGender] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
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
        <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
          {/*Title of section: Demographics*/}
          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Demographics
          </Typography>

          {/*First Name text*/}
          <Box
            sx={{
              marginRight: "10%",
              marginLeft: "10%",
              paddingBottom: "40px",
              justifyContent: "left",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  First Name
                </InputLabel>
              </Grid>

              {/*First Name text field*/}
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="firstName"
                  label="First Name"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              </Grid>

              {/*Last Name text*/}

              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Last Name
                </InputLabel>
              </Grid>

              {/*Last Name text field*/}
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="lastName"
                  label="Last Name"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              </Grid>

              {/*Attorney Name*/}
              <Grid item xs={12} sm={3}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Attorney Name
                </InputLabel>
              </Grid>

              {/*Attorney Name Text Field*/}
              <Grid item xs={12} sm={4} sx={{ marginLeft: "-65px" }}>
                <TextField 
                  required
                  id="attorney-name"
                  label="Attorney Name"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              </Grid>

              {/*Attorney Office*/}
              <Grid item xs={12} sm={3} sx={{ marginLeft: "-10px" }}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Attorney Office
                </InputLabel>
              </Grid>

              {/*Attorney Office Field*/}
              <Grid item xs={12} sm={4} sx={{ marginLeft: "-60px" }}>
                <TextField 
                  required
                  id="attorney-office"
                  label="Attorney's Law Office"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              </Grid>

              {/*Case Number*/}
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Case Number
                </InputLabel>
              </Grid>

              {/*Case Number Text Field*/}
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="caseNumber"
                  label="Case Number"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              </Grid>

              {/*Date of Birth*/}
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  DOB
                </InputLabel>
              </Grid>

              {/*Date of Birth Selector*/}
              <Grid item xs={12} sm={2} sx={{ marginLeft: "-80px" }}>
                <TextField
                  required
                  id="DOB"
                  label="MM-DD-YYYY"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              </Grid>

              {/*Gender*/}
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Gender
                </InputLabel>
              </Grid>

              {/*Gender Drop Down*/}
              <Grid item xs={12} sm={3} sx={{ marginLeft: "-60px" }}>
                <FormControl sx={{ display: "flex", justifyContent: "left", paddingBottom: "0px" }}>
                  <InputLabel id="gender-label">
                    Gender
                  </InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender-status"
                    value={gender}
                    label="Gender Status"
                    onChange={handleGenderChange}
                    sx={{ width: "180px", height: "45px" }}
                  >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"non-binary"}>Non-Binary</MenuItem>
                  <MenuItem value={"prefer not to answer"}>Prefer not to answer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {/*Divider*/}

          <Divider orientation="horizontal" flexItem />

          {/*Section title: Background*/}

          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Background
          </Typography>

          {/*Background Text Field*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "40px",
            }}
          >
            <Grid item xs={12} sm={10}>
              <TextField
                required
                multiline={true}
                rows={15}
                id="background"
                label="Background"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>
        </Box>
        <Button variant="contained" onClick={() => navigate("/familyDynamics")}>
          Next
        </Button>
      </Paper>
    </div>
  );
}

export default Demographics;
