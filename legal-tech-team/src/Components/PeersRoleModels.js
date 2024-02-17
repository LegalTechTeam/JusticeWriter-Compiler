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
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Header from "../Layouts/Header";

function PeersRoleModels() {
  const navigate = useNavigate(); 

  // gender selection state
  const [gender, setGender] = useState("male");
  const [otherGender, setOtherGender] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleOtherGenderChange = (event) => {
    setOtherGender(event.target.value);
  };

  return (
    <div>
      <Header />

      <Paper
        elevation={3}
        sx={{ marginRight: "15%", marginLeft: "15%", paddingBottom: "5%" }}
      >
        <Box sx={{ padding: 5 }}>
          {/*Title of section: ACE*/}
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Peers and Role Models
          </Typography>

          {/*First Name text*/}

          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
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
                  justifyContent: "center",
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

            {/*Case Number*/}
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                Case Number
              </InputLabel>
            </Grid>

            {/*Case Number Text Field*/}
            <Grid item xs={12} sm={10}>
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
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                Date of Birth
              </InputLabel>
            </Grid>

            {/*Date of Birth Selector*/}

            <Grid item xs={12} sm={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="DOB"
                  slotProps={{
                    textField: {
                      helperText: "MM/DD/YYYY",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={2}></Grid>

            {/*Gender Radio buttons*/}
            <Grid item xs={12} sm={4}>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={handleGenderChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </Grid>

            {/*Other Gender Input*/}
            <Grid item xs={12} sm={2}>
              {gender === "other" && (
                <TextField
                  label="Other Gender"
                  variant="outlined"
                  value={otherGender}
                  onChange={handleOtherGenderChange}
                />
              )}
            </Grid>
          </Grid>
        </Box>

        {/*Divider*/}

        <Divider orientation="horizontal" flexItem />

        {/*Section title: Background*/}

        <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
          Background
        </Typography>

        {/*Case Number Text Field*/}
        <Box
          sx={{ marginLeft: "15%", marginRight: "15%", paddingBottom: "40px" }}
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
        <Button variant="contained" onClick={() => navigate("/ace")}>Back</Button>
        <span style={{ marginLeft: '10px', marginRight: '10px' }}></span>
        <Button variant="contained">Next</Button>
      </Paper>
    </div>
  );
}
export default PeersRoleModels;