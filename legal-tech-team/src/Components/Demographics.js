import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Paper,
  Divider,
  Button,
} from "@mui/material";

import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import DateOfBirth from "../HelperFunctions/DateOfBirth";
import SmallTextInput from "../HelperFunctions/SmallTextInput";
import DropDown from "../HelperFunctions/DropDown";
function Demographics() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  return (
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
          {/*Title of section: Demographics*/}
          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Demographics
          </Typography>

          {/*First Name text*/}
          <Box
            sx={{
              marginRight: "10%",
              marginLeft: "10%",
              paddingBottom: "40px",
              justifyContent: "left",
            }}
          >
            <Grid container spacing={3}>
              <SmallTextInput
                field={"First Name"}
                id={"firstName"}
                label={"First name"}
              />

              {/*Last Name text*/}

              <SmallTextInput
                field={"Last Name"}
                id={"lastName"}
                label={"Last name"}
              />

              {/*Attorney Name*/}
              <SmallTextInput
                field={"Attorney Name"}
                id={"attorneyName"}
                label={"Attorney name"}
              />

              {/*Attorney Office*/}
              <SmallTextInput
                field={"Attorney office"}
                id={"attorneyOffice"}
                label={"Attorney office"}
              />

              {/*Case Number*/}
              <SmallTextInput
                field={"Case Number"}
                id={"caseNumber"}
                label={"Case Number"}
              />

              {/*Date of Birth*/}

              <DateOfBirth />

              {/*Gender Drop Down*/}

              <DropDown
                question={"What is your gender?"}
                id={"Gender"}
                options={[
                  "Male",
                  "Female",
                  "Non-binary",
                  "Prefer not to answer",
                ]}
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
              />
            </Grid>
          </Box>
        </Box>
        <Button variant="contained" onClick={() => navigate("/familyDynamics")}>
          Next
        </Button>
      </Paper>
    </div>
  );
}

export default Demographics;
