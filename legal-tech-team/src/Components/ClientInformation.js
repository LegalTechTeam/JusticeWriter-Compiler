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
import SectionHeader from "../HelperFunctions/SectionHeader";
import SubSectionHeader from "../HelperFunctions/subSectionHeader";
import FamilyDynamics from "./FamilyDynamics";
export default function ClientInformation() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

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

          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 0 }}>
            {/* Client Information Section */}
            <Box
              sx={{
                marginTop: "20px",
                marginBottom: "30px",
              }}
            >
              <Box
                sx={{
                  marginLeft: "10%",
                  marginRight: "10%",
                  paddingBottom: "30px",
                }}
              >
                <SubSectionHeader name="Client Information" />

                <Grid container spacing={3} sx={{ marginTop: "10px" }}>
                  {/* Date of Birth and Gender - Side by Side */}
                  <SmallTextInput
                    field={"First Name"}
                    id={"firstName"}
                    label={"First name"}
                    value={formData.firstName}
                    onChange={handleChange}
                    section={"caseInformation"}
                  />
                  <SmallTextInput
                    field={"Middle Name"}
                    id={"middleName"}
                    label={"Middle name"}
                    value={formData.middleName}
                    onChange={handleChange}
                    section={"caseInformation"}
                  />

                  {/*Last Name text*/}
                  <SmallTextInput
                    field={"Last Name"}
                    id={"lastName"}
                    label={"Last name"}
                    value={formData.lastName}
                    onChange={handleChange}
                    section={"caseInformation"}
                  />
                  <DateOfBirth
                    field={"Date of Birth"}
                    id={"DOB"}
                    label={"MM-DD-YYYY"}
                    value={formData.DOB}
                    onChange={handleChange}
                  />
                  <DropDown
                    question={"Gender"}
                    id={"gender"}
                    section={"caseInformation"}
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
            </Box>
          </Box>
          <FamilyDynamics />
        </Paper>
      </div>
    </ThemeProvider>
  );
}
