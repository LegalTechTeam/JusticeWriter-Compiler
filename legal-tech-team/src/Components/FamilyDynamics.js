import * as React from "react";
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
function FamilyDynamics() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

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
              />

              {/*Date of Birth*/}

              <DateOfBirth />

              {/*Question 1 */}

              <RadioYesNo question={"Has your mother ever been arrested?"} />

              {/*Question 2 */}

              <RadioYesNo
                question={
                  " Did your mother ever receive government housing assistance?"
                }
              />

              {/*Question 3 */}

              <RadioYesNo
                question={"Did your family ever receive foodstamps?"}
              />
              {/*MArital Status */}

              <DropDown
                question={"What is your mother's marital status?"}
                id={"Mother marital status"}
                options={["Single", "Divorced", "Married", "Widow", "N/A"]}
              />

              {/*Education Status*/}

              <DropDown
                question={"What is your mother's highest level of education?"}
                id={"Mother Highest Level of Education"}
                options={[
                  "Middle school",
                  "High school",
                  "GED",
                  "College",
                  "Masters",
                  "N/A",
                ]}
              />

              {/*Number of Children*/}

              <DropDown
                question={"How many children did your mother have?"}
                id={"Mother - number of Children"}
                options={["1", "2", "3", "4", "5", "6", "7", "8", ">8", "N/A"]}
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
              />

              {/*Date of Birth*/}

              <DateOfBirth />

              {/*Question 4 text*/}

              <RadioYesNo question={" Has your father ever been arrested?"} />

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

              <DropDown
                question={"How often did your family have conflicts?"}
                id={"Family Conflict"}
                options={[
                  "never",
                  "rarely",
                  "sometimes",
                  "often",
                  "always",
                  "N/A",
                ]}
              />
              <DropDown
                question={"How often did your family relocate?"}
                id={"Family relocation"}
                options={[
                  "never",
                  "rarely",
                  "sometimes",
                  "often",
                  "always",
                  "N/A",
                ]}
              />
            </Grid>
          </Box>
        </Box>
        <Button variant="contained" onClick={() => navigate("/")}>
          Previous
        </Button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

        <Button variant="contained" onClick={() => navigate("/community")}>
          Next
        </Button>
      </Paper>
    </>
  );
}

export default FamilyDynamics;
