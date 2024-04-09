import * as React from "react";
import {
  Grid,
  Box,
  Paper,
  InputLabel,
  Button,
  FormGroup,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import CheckboxWithAdd from "../HelperFunctions/CheckBoxWithAdd";
import OtherNotes from "../HelperFunctions/OtherNotes";
import BigText from "../HelperFunctions/BigText";
function Community() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  const disadvantagesList = [
    {
      label: "Poverty",
      subs: [],
    },
    {
      label: "Lack of HealthCare Options",
      subs: [
        "Limited access to healthy food options",
        "Limited accesss to healthcare",
      ],
    },
    {
      label: "Crime",
      subs: [
        "Fights/Other violent conflicts",
        "Gun Violence",
        "Substance Abuse",
      ],
    },
    {
      label: "Unsafe and poor quality schools",
      subs: [],
    },
    {
      label: "Prostitution",
      subs: [],
    },
    {
      label: "Poor Infrastructure",
      subs: [],
    },
    {
      label: "Inadequate public service",
      subs: [
        "Lack of safe Outdoor Spaces",
        "Lack of Safe Recreational Areas",
        "Poor public transportation",
      ],
    },
    {
      label: "Housing Instability",
      subs: [],
    },

    {
      label: "Social Isolation",
      subs: [],
    },
    {
      label: "Economic Stagnation",
      subs: [],
    },
    {
      label: "Environmental Hazards",
      subs: [],
    },
    {
      label: "Residential Segregation",
      subs: [],
    },
  ];

  return (
    <>
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
          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Community
          </Typography>
          {/*Question*/}
          <Box
            sx={{
              marginRight: "10%",
              marginLeft: "10%",
              paddingBottom: "40px",
              justifyContent: "left",
            }}
          >
            <BigText
              question={
                "What were the names of the Neighborhoods you grew up in?"
              }
              id={"neighborhood"}
              label={"Neighborhoods"}
            />

            {/*Social Disadvantages*/}
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                  paddingTop: "5%",
                }}
              >
                Select all the COMMUNITY social disadvantages experienced in
                your community:
              </InputLabel>
            </Grid>

            <FormGroup>
              {disadvantagesList.map((disadvantage, index) => (
                <CheckboxWithAdd
                  key={index}
                  label={disadvantage.label}
                  subs={disadvantage.subs}
                />
              ))}
            </FormGroup>

            {/*other notes */}
            <OtherNotes />
          </Box>
        </Box>
        <Button variant="contained" onClick={() => navigate("/familyDynamics")}>
          Previous
        </Button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

        <Button variant="contained" onClick={() => navigate("/schooling")}>
          Next
        </Button>
      </Paper>
    </>
  );
}

export default Community;
