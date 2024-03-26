import * as React from "react";
import { useEffect } from "react";
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
import { useState } from "react";
import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";

function Community() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  const [selectedDisadvantages, setSelectedDisadvantages] = useState([]);

  const [forceUpdate, setForceUpdate] = useState(false);

  const handleDisadvantageChange = (disadvantageId, isChecked) => {
    console.log("Previous selected disadvantages:", selectedDisadvantages);

    setSelectedDisadvantages((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, disadvantageId];
      } else {
        return prevSelected.filter((id) => id !== disadvantageId);
      }
    });
  };

  const loadSavedData = () => {
    const savedData = ReturnExistingInput("community");
    console.log(savedData);
    if (savedData && savedData.selectedDisadvantages) {
      console.log("in here");
      setSelectedDisadvantages(savedData.selectedDisadvantages);
    }
  };

  useEffect(() => {
    loadSavedData();
  }, []);

  const disadvantagesList = [
    {
      label: "Poverty",
      id: "poverty",
      subs: [],
    },
    {
      label: "Lack of HealthCare Options",
      id: "lackOfHealthCareOptions",
      subs: [
        {
          label: "Limited access to healthy food options",
          id: "limitedAccessToHealthyFoodOptions",
        },
        {
          label: "Limited accesss to healthcare",
          id: "limitedAccesssToHealthcare",
        },
      ],
    },
    {
      label: "Crime",
      id: "crime",
      subs: [
        {
          label: "Fights/Other violent conflicts",
          id: "fightsViolentConflicts",
        },
        {
          label: "Gun Violence",
          id: "gunViolence",
        },
        {
          label: "Substance Abuse",
          id: "substanceAbuse",
        },
      ],
    },
    {
      label: "Unsafe and poor quality schools",
      id: "unsafeSchools",
      subs: [],
    },
    {
      label: "Prostitution",
      id: "prostitution",
      subs: [],
    },
    {
      label: "Poor Infrastructure",
      id: "poorInfrastructure",
      subs: [],
    },
    {
      label: "Inadequate public service",
      id: "inadequatePublicService",
      subs: [
        {
          label: "Inadequate public transportation",
          id: "inadequatePublicTransportation",
        },
        {
          label: "Inadequate public safety",
          id: "inadequatePublicSafety",
        },
        {
          label: "Inadequate public health",
          id: "inadequatePublicHealth",
        },
        {
          label: "Inadequate public housing",
          id: "inadequatePublicHousing",
        },
      ],
    },
    {
      label: "Housing Instability",
      id: "housingInstability",
      subs: [],
    },

    {
      label: "Social Isolation",
      id: "socialIsolation",
      subs: [],
    },
    {
      label: "Economic Stagnation",
      id: "economicStagnation",
      subs: [],
    },
    {
      label: "Environmental Hazards",
      id: "environmentalHazards",
      subs: [],
    },
    {
      label: "Residential Segregation",
      id: "residentialSegregation",
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
                <React.Fragment key={index}>
                  <CheckboxWithAdd
                    label={disadvantage.label}
                    id={disadvantage.id}
                    checked={selectedDisadvantages.includes(disadvantage.id)}
                    onChange={handleDisadvantageChange}
                    subs={disadvantage.subs}
                  />
                  {selectedDisadvantages.includes(disadvantage.id) && (
                    <React.Fragment>
                      <div style={{ paddingLeft: 30 }}>
                        {disadvantage.subs.map((sub, subIndex) => (
                          <CheckboxWithAdd
                            key={subIndex}
                            label={sub.label}
                            id={sub.id}
                            checked={selectedDisadvantages.includes(sub.id)}
                            onChange={handleDisadvantageChange}
                          />
                        ))}
                      </div>
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))}
            </FormGroup>

            {/*other notes */}
            <OtherNotes />
          </Box>
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            SaveJSON(
              {
                selectedDisadvantages: selectedDisadvantages,
              },
              "community"
            );

            navigate("/familyDynamics");
          }}
        >
          {" "}
          Previous
        </Button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

        <Button
          variant="contained"
          onClick={() => {
            SaveJSON(
              {
                selectedDisadvantages: selectedDisadvantages,
              },
              "community"
            );

            navigate("/schooling");
          }}
        >
          Next
        </Button>
      </Paper>
    </>
  );
}

export default Community;
