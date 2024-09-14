import * as React from "react";
import { useState, useEffect } from "react";
import Header from "../Layouts/Header";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  Paper,
  InputLabel,
  Divider,
  ThemeProvider,
} from "@mui/material";
import themeSubHeading from "../Layouts/Theme";
import RadioYesNo from "../HelperFunctions/RadioYesNo";
import DropDown from "../HelperFunctions/DropDown";
import DateOfBirth from "../HelperFunctions/DateOfBirth";
import SmallTextInput from "../HelperFunctions/SmallTextInput";
import themeWrapper from "../Layouts/ThemeWrapper";

import { SaveJSON, ReturnExistingInput } from "../HelperFunctions/formatJSON";
import BigText from "../HelperFunctions/BigText";
import SectionHeader from "../HelperFunctions/SectionHeader";
import SubSectionHeader from "../HelperFunctions/subSectionHeader";
function FamilyDynamics() {
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
    motherName: {
      motherName: "",
      notes: [],
    },
    motherBday: "",
    motherAgeWhenSheFirstGaveBirth: {
      motherAgeWhenSheFirstGaveBirth: "",
      notes: [],
    },
    motherAgeWhenSheGaveBirthToClient: {
      motherAgeWhenSheFirstGaveBirthToClient: "",
      notes: [],
    },

    motherArrested: {
      motherArrested: "",
      notes: [],
    },
    housingAssistance: {
      housingAssistance: "",
      notes: [],
    },
    foodStamps: {
      foodStamps: "",
      notes: [],
    },
    motherMaritalStatus: {
      motherMaritalStatus: "",
      notes: [],
    },
    motherEducation: {
      motherEducation: "",
      notes: [],
    },
    motherNumChildren: {
      motherNumChildren: "",
      notes: [],
    },
    fatherName: {
      fatherName: "",
      notes: [],
    },
    fatherBday: "",
    fatherArrested: {
      fatherArrested: "",
      notes: [],
    },
    siblings: {
      siblings: "",
      notes: [],
    },
    familyConflict: {
      familyConflict: "",
      notes: [],
    },
    familyRelocation: {
      familyRelocation: "",
      notes: [],
    },
    otherInformationAboutFamily: {
      otherInformationAboutFamily: "",
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
      <>
        
          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
            {/*Title of section: Family Dynamics*/}
           
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "40px",
              }}
            >
                         <SubSectionHeader name="Mother"/>

              {/*Mother Name text*/}
              <Grid container spacing={3}>
                <SmallTextInput
                  field={"Mother Name"}
                  id={"motherName"}
                  label={"Mother name"}
                  value={formData.motherName?.motherName}
                  onChange={handleChange}
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange("motherName", newQuotes)
                  }
                  section={"familyDynamics"}
                />

                {/*Date of Birth*/}

                <DateOfBirth
                  field={"Date of Birth"}
                  id={"motherBday"}
                  label={"MM-DD-YYYY"}
                  value={formData.motherBday}
                  onChange={handleDateChange}
                />
              </Grid>
              <Grid>
                <BigText
                  question={"How old was your mother when you were born?"}
                  onChange={handleChange}
                  id={"motherAgeWhenSheGaveBirthToClient"}
                  label={"motherAgeWhenSheGaveBirthToClient"}
                  rows={1}
                  value={
                    formData.motherAgeWhenSheGaveBirthToClient
                      ?.motherAgeWhenSheGaveBirthToClient
                  }
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange(
                      "motherAgeWhenSheGaveBirthToClient",
                      newQuotes
                    )
                  }
                  section={"familyDynamics"}
                />
                <BigText
                  question={"At what age did your mother first give birth?"}
                  onChange={handleChange}
                  id={"motherAgeWhenSheFirstGaveBirth"}
                  label={"motherAgeWhenSheFirstGaveBirth"}
                  rows={1}
                  value={
                    formData.motherAgeWhenSheFirstGaveBirth
                      ?.motherAgeWhenSheFirstGaveBirth
                  }
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange(
                      "motherAgeWhenSheFirstGaveBirth",
                      newQuotes
                    )
                  }
                  section={"familyDynamics"}
                />
              </Grid>

              <Grid container spacing={3}>
                {/*Question 1 */}

                <RadioYesNo
                  id={"motherArrested"}
                  section={"familyDynamics"}
                  question={"Has your mother ever been arrested?"}
                  value={formData.motherArrested?.motherArrested}
                  onChange={handleRadioChange}
                  checkedValue={formData.motherArrested?.motherArrested}
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange("motherArrested", newQuotes)
                  }
                />

                {/*Question 2 */}

                <RadioYesNo
                  id={"housingAssistance"}
                  section={"familyDynamics"}
                  question={
                    " Did your mother ever receive government housing assistance?"
                  }
                  value={formData.housingAssistance?.housingAssistance}
                  onChange={handleRadioChange}
                  checkedValue={formData.housingAssistance?.housingAssistance}
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange("housingAssistance", newQuotes)
                  }
                />

                {/*Question 3 */}

                <RadioYesNo
                  id={"foodStamps"}
                  section={"familyDynamics"}
                  question={"Did your family ever receive foodstamps?"}
                  value={formData.foodStamps?.foodStamps}
                  onChange={handleRadioChange}
                  checkedValue={formData.foodStamps?.foodStamps}
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange("foodStamps", newQuotes)
                  }
                />
                {/*MArital Status */}

                <DropDown
                  question={"What is your mother's marital status?"}
                  id={"motherMaritalStatus"}
                  section={"familyDynamics"}
                  options={["Single", "Divorced", "Married", "Widow", "N/A"]}
                  value={formData.motherMaritalStatus?.motherMaritalStatus}
                  onChange={handleDropdownChange}
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange("motherMaritalStatus", newQuotes)
                  }
                />

                {/*Education Status*/}

                <DropDown
                  question={"What is your mother's highest level of education?"}
                  id={"motherEducation"}
                  section={"familyDynamics"}
                  options={[
                    "Middle school",
                    "High school",
                    "GED",
                    "College",
                    "Masters",
                    "N/A",
                  ]}
                  value={formData.motherEducation?.motherEducation}
                  onChange={handleDropdownChange}
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange("motherEducation", newQuotes)
                  }
                />

                {/*Number of Children*/}

                <DropDown
                  question={"How many children did your mother have?"}
                  id={"motherNumChildren"}
                  section={"familyDynamics"}
                  options={[
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    ">8",
                    "N/A",
                  ]}
                  value={formData.motherNumChildren?.motherNumChildren}
                  onChange={handleDropdownChange}
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange("motherNumChildren", newQuotes)
                  }
                />
              </Grid>

              {/*Divider*/}

              <Divider
                orientation="horizontal"
                flexItem
                style={{ marginTop: "20px" }}
              />
              <Grid item xs={12} sm={2}></Grid>

              {/*Father Information Header*/}
              <SubSectionHeader name="Father"/>


              {/*Father Name text*/}
              <Grid container spacing={3}>
                <SmallTextInput
                  field={"Father Name"}
                  id={"fatherName"}
                  label={"Father name"}
                  value={formData.fatherName?.fatherName}
                  onChange={handleDropdownChange}
                />

                {/*Date of Birth*/}

                <DateOfBirth
                  field={"Date of Birth"}
                  id={"fatherBday"}
                  label={"MM-DD-YYYY"}
                  value={formData.fatherBday}
                  onChange={handleDateChange}
                />

                {/*Question 4 text*/}

                <RadioYesNo
                  id={"fatherArrested"}
                  section={"familyDynamics"}
                  question={" Has your father ever been arrested?"}
                  value={formData.fatherArrested?.fatherArrested}
                  onChange={handleRadioChange}
                  checkedValue={formData.fatherArrested?.fatherArrested}
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange("fatherArrested", newQuotes)
                  }
                />
              </Grid>

              <BigText
                question={"Please list the names of YOUR siblings (if any)"}
                onChange={handleChange}
                id={"siblings"}
                label={"siblings"}
                rows={1}
                value={formData.siblings?.siblings}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("siblings", newQuotes)
                }
                section={"familyDynamics"}
              />
              <Grid item xs={12} sm={2}></Grid>

              <Grid
                container
                spacing={3}
                sx={{ paddingTop: "40px", paddingBottom: "40px" }}
              >
                <DropDown
                  question={"How often did your family have conflicts?"}
                  id={"familyConflict"}
                  section={"familyDynamics"}
                  options={[
                    "never",
                    "rarely",
                    "sometimes",
                    "often",
                    "always",
                    "N/A",
                  ]}
                  value={formData.familyConflict?.familyConflict}
                  onChange={handleDropdownChange}
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange("familyConflict", newQuotes)
                  }
                />
                <DropDown
                  question={"How often did your family relocate?"}
                  id={"familyRelocation"}
                  section={"familyDynamics"}
                  options={[
                    "never",
                    "rarely",
                    "sometimes",
                    "often",
                    "always",
                    "N/A",
                  ]}
                  value={formData.familyRelocation?.familyRelocation}
                  onChange={handleDropdownChange}
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange("familyRelocation", newQuotes)
                  }
                />
              </Grid>

                {/* Background Field - Full Width Below */}
           <Grid item xs={12}>
                    <TextField
                      required
                      multiline={true}
                      rows={10}
                      id="background"
                      label="Other Information about family"
                      fullWidth
                      variant="outlined"
                      value={formData.otherInformationAboutFamily?.otherInformationAboutFamily}
                      onChange={handleChange}
                    />
                  </Grid>

            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "familyDynamics");
              navigate("/caseInformation");
            }}
          >
            Previous
          </Button>
          <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "familyDynamics");
              navigate("/careTaker");
            }}
          >
            Next
          </Button>
       
      </>
    </ThemeProvider>
  );
}

export default FamilyDynamics;
