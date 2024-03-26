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
} from "@mui/material";
import themeSubHeading from "../Layouts/Theme";
import RadioYesNo from "../HelperFunctions/RadioYesNo";
import DropDown from "../HelperFunctions/DropDown";
import DateOfBirth from "../HelperFunctions/DateOfBirth";
import SmallTextInput from "../HelperFunctions/SmallTextInput";
import { SaveJSON, ReturnExistingInput } from "../HelperFunctions/formatJSON";
function FamilyDynamics() {
  
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  useEffect(() => {
    const existingData = ReturnExistingInput("familyDynamics");
    if (existingData) {
      setFormData(existingData);
    }
    
  }, []); 

  const [formData, setFormData] = useState({
    motherName: "",
    motherBday: "",
    motherArrested: "",
    housingAssistance: "",
    foodStamps: "",
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
    fatherName: "",
    fatherBday: "",
    fatherArrested: "",
    siblings: "",
    familyConflict: {
      familyConflict: "",
      notes: [],
    },
    familyRelocation : {
      familyRelocation : "",
      notes: [],
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: { ...formData[name], [name]: value }});
  }

  const handleQuotesChange = (subSection, newQuotes) => {
    console.log("handle quote change");   
    console.log(subSection);     
    setFormData({ ...formData, [subSection]: { ...formData[subSection], ["notes"]: newQuotes }});
  };

  return (
    <>
      <Header />

      <Paper
        elevation={3}
        sx={{
          marginRight: "15%",
          marginLeft: "15%",
          paddingBottom: "5%",
        }}
      >
        <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
          {/*Title of section: Family Dynamics*/}
          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Family Dynamics
          </Typography>
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "40px",
            }}
          >
            {/*Mother Name text*/}
            <Grid container spacing={3}>
              <SmallTextInput
                field={"Mother Name"}
                id={"motherName"}
                label={"Mother name"}
                value={formData.motherName}
                onChange={handleChange}
              />

              {/*Date of Birth*/}

              <DateOfBirth 
                field={"Date of Birth"}
                id={"motherBday"}
                label={"MM-DD-YYYY"}
                value={formData.motherBday}
                onChange={handleChange}
              />

              {/*Question 1 */}

              <RadioYesNo 
                id={"motherArrested"}
                question={"Has your mother ever been arrested?"} 
                value={formData.motherArrested}
                onChange={handleChange}
                checkedValue={formData.motherArrested}
              />

              {/*Question 2 */}

              <RadioYesNo
                id={"housingAssistance"}
                question={
                  " Did your mother ever receive government housing assistance?"
                }
                value={formData.housingAssistance}
                onChange={handleChange}
                checkedValue={formData.housingAssistance}
              />

              {/*Question 3 */}

              <RadioYesNo
                id={"foodStamps"}
                question={"Did your family ever receive foodstamps?"}
                value={formData.foodStamps}
                onChange={handleChange}
                checkedValue={formData.foodStamps}
              />
              {/*MArital Status */}

              <DropDown
                question={"What is your mother's marital status?"}
                id={"motherMaritalStatus"}
                section={"familyDynamics"}
                options={["Single", "Divorced", "Married", "Widow", "N/A"]}
                value={formData.motherMaritalStatus?.motherMaritalStatus}
                onChange={handleDropdownChange}
                handleQuotesChange={newQuotes => handleQuotesChange("motherMaritalStatus", newQuotes)}
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
                handleQuotesChange={newQuotes => handleQuotesChange("motherEducation", newQuotes)}
              />

              {/*Number of Children*/}

              <DropDown
                question={"How many children did your mother have?"}
                id={"motherNumChildren"}
                section={"familyDynamics"}
                options={["1", "2", "3", "4", "5", "6", "7", "8", ">8", "N/A"]}
                value={formData.motherNumChildren?.motherNumChildren}
                onChange={handleDropdownChange}
                handleQuotesChange={newQuotes => handleQuotesChange("motherNumChildren", newQuotes)}
              />
            </Grid>

            {/*Divider*/}

            <Divider
              orientation="horizontal"
              flexItem
              style={{ marginTop: "20px" }}
            />
            <Grid item xs={12} sm={2}></Grid>

            {/*Other Information Header*/}

            <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
              Other Information
            </Typography>

            {/*Father Name text*/}
            <Grid container spacing={3}>
              <SmallTextInput
                field={"Father Name"}
                id={"fatherName"}
                label={"Father name"}
                value={formData.fatherName}
                onChange={handleDropdownChange}
              />

              {/*Date of Birth*/}

              <DateOfBirth 
                field={"Date of Birth"}
                id={"fatherBday"}
                label={"MM-DD-YYYY"}
                value={formData.fatherBday}
                onChange={handleChange}
              />

              {/*Question 4 text*/}

              <RadioYesNo 
                id={"fatherArrested"}
                question={" Has your father ever been arrested?"} 
                value={formData.fatherArrested}
                onChange={handleChange}
                checkedValue={formData.fatherArrested}
              />

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
                  value={formData.siblings}
                  onChange={handleChange}
                />
              </Grid>

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
                handleQuotesChange={newQuotes => handleQuotesChange("familyConflict", newQuotes)}
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
                handleQuotesChange={newQuotes => handleQuotesChange("familyRelocation", newQuotes)}
              />
            </Grid>
          </Box>
        </Box>
        <Button variant="contained" onClick={() => navigate("/")}>
          Previous
        </Button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

        <Button variant="contained" onClick={() => { SaveJSON(formData, "familyDynamics"); navigate("/community"); }}>
          Next
        </Button>
      </Paper>
    </>
  );
}

export default FamilyDynamics;
