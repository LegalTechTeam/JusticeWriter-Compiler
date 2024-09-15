import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  ThemeProvider
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";
import SectionHeader from "../HelperFunctions/SectionHeader";
import SmallTextInput from "../HelperFunctions/SmallTextInput";
import SubSectionHeader from "../HelperFunctions/subSectionHeader";
import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import themeWrapper from "../Layouts/ThemeWrapper";

// Moving the formData and handlers inside the components
export default function CaseInformation() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  // useState must be inside a functional component
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

  useEffect(() => {
    const existingData = ReturnExistingInput("caseInformation");
    if (existingData) {
      setFormData(existingData);
    }
  }, []);

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
          <SectionHeader name="Background" />

          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
              {/*Title of section: CaseInformation*/}
              <SubSectionHeader name="Case Information" />
              <Grid container spacing={3}>
                {/*Case Number*/}
                <SmallTextInput
                  field={"Case Number"}
                  id={"caseNumber"}
                  label={"Case Number"}
                  value={formData.caseNumber}
                  onChange={handleChange}
                  section={"caseInformation"}
                />
                {/*Attorney Name*/}
                <SmallTextInput
                  field={"Attorney Name"}
                  id={"attorneyName"}
                  label={"Attorney name"}
                  value={formData.attorneyName}
                  onChange={handleChange}
                  section={"caseInformation"}
                />
                {/*Investigator Name*/}
                <SmallTextInput
                  field={"Investigator Name"}
                  id={"investigatorName"}
                  label={"Investigator name"}
                  value={formData.investigatorName}
                  onChange={handleChange}
                  section={"caseInformation"}
                />
                {/*Attorney Office*/}
                <SmallTextInput
                  field={"Attorney office"}
                  id={"attorneyOffice"}
                  label={"Attorney office"}
                  value={formData.attorneyOffice}
                  onChange={handleChange}
                  section={"caseInformation"}
                />
                {/*Date of Birth*/}
              </Grid>
            </Box>
            <Divider orientation="horizontal" flexItem />
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "caseInformation");
              navigate("/");
            }}
          >
            Back to Home
          </Button>
          <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "caseInformation");
              navigate("/clientInfo");
            }}
          >
            Next
          </Button>
        </Paper>
      </div>
    </ThemeProvider>
  );
}
