import {
  Box,
  Grid,
  Paper,
  ThemeProvider
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DateOfBirth from "../HelperFunctions/DateOfBirth";
import DropDown from "../HelperFunctions/DropDown";
import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";
import SectionHeader from "../HelperFunctions/SectionHeader";
import SmallTextInput from "../HelperFunctions/SmallTextInput";
import SubSectionHeader from "../HelperFunctions/subSectionHeader";
import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import themeWrapper from "../Layouts/ThemeWrapper";
import FamilyDynamics from "./FamilyDynamics";
export default function ClientInformation() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
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
    SaveJSON(formData, "caseInformation")
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: { ...formData[name], [name]: value } });
    SaveJSON(formData, "caseInformation")
  };

  const handleQuotesChange = (subSection, newQuotes) => {
    setFormData({
      ...formData,
      [subSection]: { ...formData[subSection], ["notes"]: newQuotes },
    });
  };
  const handleDateChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    SaveJSON(formData, "caseInformation")

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
          <SectionHeader number = "Section 2" name="Background" />

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
                    onChange={handleDateChange}
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
