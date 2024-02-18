import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Header from "../Layouts/Header";
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
  MenuItem,
  FormControl,
  Select,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import dayjs from "dayjs";

function FamilyDynamics() {
  const navigate = useNavigate();

  /*yes/no question answer states*/

  const [answer1, setAnswer1] = useState("no");

  const handleAnswer1Change = (event) => {
    setAnswer1(event.target.value);
  };

  const [answer2, setAnswer2] = useState("no");

  const handleAnswer2Change = (event) => {
    setAnswer2(event.target.value);
  };

  const [answer3, setAnswer3] = useState("no");

  const handleAnswer3Change = (event) => {
    setAnswer3(event.target.value);
  };

  const [answer4, setAnswer4] = useState("no");

  const handleAnswer4Change = (event) => {
    setAnswer4(event.target.value);
  };

  /*marital status state*/

  const [maritalStatus, setMaritalStatus] = React.useState("");

  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

  /*education status state*/

  const [educationStatus, setEducationStatus] = React.useState("");

  const handleEducationStatusChange = (event) => {
    setEducationStatus(event.target.value);
  };

  /*Number of Children state*/

  const [childrenStatus, setChildrenStatus] = React.useState("");

  const handleChildrenStatusChange = (event) => {
    setChildrenStatus(event.target.value);
  };

  /*Conflicts state*/

  const [conflictStatus, setConflictStatus] = React.useState("");

  const handleConflictStatusChange = (event) => {
    setConflictStatus(event.target.value);
  };

  /*Relocate state*/

  const [relocateStatus, setRelocateStatus] = React.useState("");

  const handleRelocateStatusChange = (event) => {
    setRelocateStatus(event.target.value);
  };

  return (
    <>
      <Header />

      <Paper
        elevation={3}
        sx={{ marginRight: "15%", marginLeft: "15%", paddingBottom: "5%" }}
      >
        <Box sx={{ padding: 5 }}>
          {/*Title of section: Family Dynamics*/}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ paddingBottom: 5, fontFamily: "Noto Sans" }}
          >
            Family Dynamics
          </Typography>
          {/*Mother Name text*/}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Mother Name
              </InputLabel>
            </Grid>

            {/*Mother Name text field*/}
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="motherName"
                label="Name Of Mother"
                fullWidth
                size="small"
                variant="outlined"
              />
            </Grid>

            {/*Date of Birth text*/}

            <Grid item xs={12} sm={2.5}>
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

            <Grid item xs={12} sm={3}>
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

            {/*Question 1 text*/}

            <Grid item xs={12} sm={8}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Has your mother ever been arrested?
              </InputLabel>
            </Grid>

            {/*Yes/No Radio buttons*/}
            <Grid item xs={12} sm={3}>
              <RadioGroup
                row
                aria-label="answer"
                name="answer"
                value={answer1}
                onChange={handleAnswer1Change}
              >
                <FormControlLabel value="no" control={<Radio />} label="No" />
                <FormControlLabel value="yes" control={<Radio />} label="yes" />
              </RadioGroup>
            </Grid>

            {/*Question 2 text*/}

            <Grid item xs={12} sm={8}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Did your mother ever receive government housing assistance?
              </InputLabel>
            </Grid>

            {/*Yes/No Radio buttons*/}
            <Grid item xs={12} sm={3}>
              <RadioGroup
                row
                aria-label="answer"
                name="answer"
                value={answer2}
                onChange={handleAnswer2Change}
              >
                <FormControlLabel value="no" control={<Radio />} label="No" />
                <FormControlLabel value="yes" control={<Radio />} label="yes" />
              </RadioGroup>
            </Grid>

            {/*Question 3 text*/}

            <Grid item xs={12} sm={8}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                  paddingBottom: "20px",
                }}
              >
                Did your family ever receive foodstamps?
              </InputLabel>
            </Grid>

            {/*Yes/No Radio buttons*/}
            <Grid item xs={12} sm={3}>
              <RadioGroup
                row
                aria-label="answer"
                name="answer"
                value={answer3}
                onChange={handleAnswer3Change}
                sx={{
                  paddingBottom: "20px",
                }}
              >
                <FormControlLabel value="no" control={<Radio />} label="No" />
                <FormControlLabel value="yes" control={<Radio />} label="yes" />
              </RadioGroup>
            </Grid>
          </Grid>

          {/*Marital Status*/}
          <Grid item xs={12} sm={10}>
            <FormControl sx={{ paddingRight: "40px", paddingBottom: "20px" }}>
              <InputLabel id="marital-status-label">Marital Status</InputLabel>
              <Select
                labelId="marital-status-label"
                id="marital-status"
                value={maritalStatus}
                label="Marital Status"
                onChange={handleMaritalStatusChange}
                sx={{ width: "220px", height: "50px" }}
              >
                <MenuItem value={"married"}>Married</MenuItem>
                <MenuItem value={"single"}>Single</MenuItem>
                <MenuItem value={"divorced"}>Divorced</MenuItem>
                <MenuItem value={"widow"}>Widow</MenuItem>
              </Select>
            </FormControl>

            {/*Education Status*/}

            <FormControl sx={{ paddingRight: "40px", paddingBottom: "20px" }}>
              <InputLabel id="education-status-label">
                Highest level of Education
              </InputLabel>
              <Select
                labelId="education-status-label"
                id="education-status"
                value={educationStatus}
                label="Education Status"
                onChange={handleEducationStatusChange}
                sx={{ width: "220px", height: "50px" }}
              >
                <MenuItem value={"middleSchool"}>Middle school</MenuItem>
                <MenuItem value={"highSchool"}>High school</MenuItem>
                <MenuItem value={"college"}>College</MenuItem>
                <MenuItem value={"masteres"}>Masters</MenuItem>
                <MenuItem value={"phd"}>PHD</MenuItem>
              </Select>
            </FormControl>

            {/*Number of Children*/}

            <FormControl sx={{ paddingBottom: "20px" }}>
              <InputLabel id="children-status-label">
                Number of Children
              </InputLabel>
              <Select
                labelId="children-status-label"
                id="children-status"
                value={childrenStatus}
                label="Children Status"
                onChange={handleChildrenStatusChange}
                sx={{ width: "220px", height: "50px" }}
              >
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
                <MenuItem value={"4"}>4</MenuItem>
                <MenuItem value={"5"}>5</MenuItem>
                <MenuItem value={">5"}>{">"}5</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/*Divider*/}

          <Divider orientation="horizontal" flexItem />
          <Grid item xs={12} sm={2}></Grid>

          {/*Other Information Header*/}

          <Typography
            variant="h6"
            gutterBottom
            sx={{ paddingBottom: 5, paddingTop: 4, fontFamily: "Noto Sans" }}
          >
            Other Information
          </Typography>

          {/*Father Name text*/}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Father Name
              </InputLabel>
            </Grid>

            {/*Father Name text field*/}
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="fatherName"
                label="Name Of Father"
                fullWidth
                size="small"
                variant="outlined"
              />
            </Grid>

            {/*Date of Birth text*/}

            <Grid item xs={12} sm={2.5}>
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

            <Grid item xs={12} sm={3}>
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

            {/*Question 4 text*/}

            <Grid item xs={12} sm={8}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                  paddingBottom: "20px",
                }}
              >
                Has your father ever been arrested?
              </InputLabel>
            </Grid>

            {/*Yes/No Radio buttons*/}
            <Grid item xs={12} sm={3}>
              <RadioGroup
                row
                aria-label="answer"
                name="answer"
                value={answer4}
                onChange={handleAnswer4Change}
                sx={{
                  paddingBottom: "20px",
                }}
              >
                <FormControlLabel value="no" control={<Radio />} label="No" />
                <FormControlLabel value="yes" control={<Radio />} label="yes" />
              </RadioGroup>
            </Grid>

            {/*Siblings*/}
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Any siblings?
              </InputLabel>
            </Grid>

            {/*Siblings Text Field*/}
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="siblings"
                label="Siblings"
                fullWidth
                size="small"
                variant="outlined"
              />
            </Grid>

            {/*Conflicts*/}
            <Grid item xs={12} sm={5}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                How often did your family have conflicts?
              </InputLabel>
            </Grid>

            <FormControl sx={{ paddingTop: "20px", paddingLeft: "10px" }}>
              <InputLabel
                sx={{ paddingTop: "10px" }}
                id="conflicts-status-label"
              >
                Select an option
              </InputLabel>
              <Select
                labelId="conflicts-status-label"
                id="conflict-status"
                value={conflictStatus}
                label="Conflict Status"
                onChange={handleConflictStatusChange}
                sx={{ width: "220px", height: "30px" }}
              >
                <MenuItem value={"rarely"}>Rarely</MenuItem>
                <MenuItem value={"sometimes"}>Sometimes</MenuItem>
                <MenuItem value={"often"}>Often</MenuItem>
                <MenuItem value={"always"}>Always</MenuItem>
              </Select>
            </FormControl>

            {/*Relocation*/}
            <Grid item xs={12} sm={5}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                How often did your family relocate?
              </InputLabel>
            </Grid>

            <FormControl sx={{ paddingTop: "20px", paddingLeft: "10px" }}>
              <InputLabel
                sx={{ paddingTop: "10px" }}
                id="relocation-status-label"
              >
                Select an option
              </InputLabel>
              <Select
                labelId="relocation-status-label"
                id="relocation-status"
                value={relocateStatus}
                label="Relocation Status"
                onChange={handleRelocateStatusChange}
                sx={{ width: "220px", height: "30px" }}
              >
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
                <MenuItem value={"4"}>4</MenuItem>
                <MenuItem value={"5"}>5</MenuItem>
                <MenuItem value={">5"}>{">"}5</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Box>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          style={{ marginRight: "30px" }}
        >
          Previous
        </Button>
        <Button variant="contained" onClick={() => navigate("/community")}>
          Next
        </Button>
      </Paper>
    </>
  );
}

export default FamilyDynamics;
