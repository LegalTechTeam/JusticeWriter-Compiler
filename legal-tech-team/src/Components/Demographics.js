import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Paper,
  Divider,
  Button,
  ThemeProvider,
} from "@mui/material";

import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import themeWrapper from "../Layouts/ThemeWrapper";
import DateOfBirth from "../HelperFunctions/DateOfBirth";
import SmallTextInput from "../HelperFunctions/SmallTextInput";
import DropDown from "../HelperFunctions/DropDown";
import { SaveJSON, ReturnExistingInput } from "../HelperFunctions/formatJSON";

function Demographics() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  useEffect(() => {
    const existingData = ReturnExistingInput("demographics");
    if (existingData) {
      setFormData(existingData);
    }
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    attorneyName: "",
    investigatorName: "",
    attorneyOffice: "",
    caseNumber: "",
    gender: {
      gender: "",
      notes: [],
    },
    DOB: "",
    background: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: { ...formData[name], [name]: value } });
  };

  const handleQuotesChange = (subSection, newQuotes) => {
    console.log("handle quote change");
    console.log(subSection);
    setFormData({
      ...formData,
      [subSection]: { ...formData[subSection], ["notes"]: newQuotes },
    });
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
          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
              {/*Title of section: Demographics*/}
              <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
                Demographics
              </Typography>
              <Grid container spacing={3}>
                {/*Case Number*/}
                <SmallTextInput
                  field={"Case Number"}
                  id={"caseNumber"}
                  label={"Case Number"}
                  value={formData.caseNumber}
                  onChange={handleChange}
                  section={"demographics"}
                />
                {/*Attorney Name*/}
                <SmallTextInput
                  field={"Attorney Name"}
                  id={"attorneyName"}
                  label={"Attorney name"}
                  value={formData.attorneyName}
                  onChange={handleChange}
                  section={"demographics"}
                />
                {/*Investigator Name*/}

                <SmallTextInput
                  field={"Investigator Name"}
                  id={"investigatorName"}
                  label={"Investigator name"}
                  value={formData.investigatorName}
                  onChange={handleChange}
                  section={"demographics"}
                />
                {/*Attorney Office*/}
                <SmallTextInput
                  field={"Attorney office"}
                  id={"attorneyOffice"}
                  label={"Attorney office"}
                  value={formData.attorneyOffice}
                  onChange={handleChange}
                  section={"demographics"}
                />
                {/* </Grid> */}

                {/*First Name text*/}
                {/* <Box
            sx={{
              marginRight: "10%",
              marginLeft: "10%",
              paddingBottom: "40px",
              justifyContent: "left",
            }}
          > */}
                {/* <Grid container spacing={3}> */}
                <SmallTextInput
                  field={"First Name"}
                  id={"firstName"}
                  label={"First name"}
                  value={formData.firstName}
                  onChange={handleChange}
                  section={"demographics"}
                />
                <SmallTextInput
                  field={"Middle Name"}
                  id={"middleName"}
                  label={"Middle name"}
                  value={formData.middleName}
                  onChange={handleChange}
                  section={"demographics"}
                />

                {/*Last Name text*/}

                <SmallTextInput
                  field={"Last Name"}
                  id={"lastName"}
                  label={"Last name"}
                  value={formData.lastName}
                  onChange={handleChange}
                  section={"demographics"}
                />

                {/*Date of Birth*/}

                <DateOfBirth
                  field={"Date of Birth"}
                  id={"DOB"}
                  label={"MM-DD-YYYY"}
                  value={formData.DOB}
                  onChange={handleChange}
                />

                {/*Gender Drop Down*/}

                <DropDown
                  question={"What is your gender?"}
                  id={"gender"}
                  section={"demographics"}
                  value={formData.gender?.gender}
                  options={[
                    "Male",
                    "Female",
                    "Non-binary",
                    "Prefer not to answer",
                  ]}
                  onChange={handleDropdownChange}
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange("gender", newQuotes)
                  }
                />
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
                  value={formData.background}
                  onChange={handleChange}
                />
              </Grid>
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "demographics");
              navigate("/");
            }}
          >
            Back to Home
          </Button>
          <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "demographics");
              navigate("/familyDynamics");
            }}
          >
            Next
          </Button>
        </Paper>
      </div>
    </ThemeProvider>
  );
}

export default Demographics;
