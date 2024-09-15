import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Layouts/Header";

import { Box, Button, Grid, Paper, ThemeProvider } from "@mui/material";
import BigText from "../HelperFunctions/BigText";
import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";
import SectionHeader from "../HelperFunctions/SectionHeader";
import SmallTextInput from "../HelperFunctions/SmallTextInput";
import SubSectionHeader from "../HelperFunctions/subSectionHeader";
import themeSubHeading from "../Layouts/Theme";
import themeWrapper from "../Layouts/ThemeWrapper";
function OtherCaretaker() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  useEffect(() => {
    const existingData = ReturnExistingInput("familyDynamics");
    if (existingData) {
      setFormData(existingData);
    }
  }, []);

  const [notes, setNotes] = useState([]);

  const [formData, setFormData] = useState({
    caretakerFirstName: {
      caretakerFirstName: "",
      notes: [],
    },
    caretakerLastName: {
      caretakerLastName: "",
      notes: [],
    },
    caretakerInformation: {
      caretakerInformation: "",
      notes: [],
    },
    otherInformation: {
      otherInformation: "",
      notes: [],
    },
  });
  const handleDateChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: { ...formData[id], [id]: value } });
  };

  const handleRadioChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: { ...formData[id], [id]: value } });
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

  return (
    <ThemeProvider theme={themeWrapper}>
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
          {/*Title of section: Family Dynamics*/}

          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "40px",
            }}
          >

            <SubSectionHeader name="Other Care Taker or Guardian" />

            {/*Mother Name text*/}
            <Grid container spacing={3}>
              <SmallTextInput
                field={"First Name"}
                id={"caretakerFirstName"}
                label={"First name"}
                value={formData.caretakerFirstName?.caretakerFirstName}
                onChange={handleChange}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("caretakerFirstName", newQuotes)
                }
                section={"familyDynamics"}
              />
              <SmallTextInput
                field={"Last Name"}
                id={"caretakerLastName"}
                label={"Last name"}
                value={formData.caretakerLastName?.caretakerLastName}
                onChange={handleChange}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("caretakerLastName", newQuotes)
                }
                section={"familyDynamics"}
              />
            </Grid>
            {/* Background Field - Full Width Below */}
            <BigText
              sx={{ marginTop: "20px" }}
              question={"Any information relevant to the caretaker"}
              id={"caretakerInformation"}
              label={"caretakerInformation"}
              onChange={handleChange}
              value={formData.caretakerInformation?.caretakerInformation}
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange("caretakerInformation", newQuotes)
              }
              section={"familyDynamics"}
            />
            <SubSectionHeader name="Other Background Information" />
            <BigText
              sx={{ marginTop: "20px" }}
              question={"Background Information not covered"}
              id={"otherInformation"}
              label={"otherInformation"}
              onChange={handleChange}
              value={formData.otherInformation?.otherInformation}
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange("caretakerInformation", newQuotes)
              }
              section={"familyDynamics"}
            />
          </Box>
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            SaveJSON(formData, "familyDynamics");
            navigate("/clientInfo");
          }}
        >
          Previous
        </Button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

        <Button
          variant="contained"
          onClick={() => {
            SaveJSON(formData, "familyDynamics");
            navigate("/community");
          }}
        >
          Next
        </Button>
      </Paper>
    </ThemeProvider>
  );
}

export default OtherCaretaker;
